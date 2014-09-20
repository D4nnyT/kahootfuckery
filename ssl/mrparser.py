#!/usr/bin/python

from pprint import pprint
from time import sleep


info = {}

def init():
	ret = {}
	ret["expect"] = "clientstart"
	return ret


def client_forward(request, ssock):
	print "client -> server: "+request["method"]+" "+request["path"]

	req = []
	req.append(request["method"]+" "+request["path"]+" "+request["ver"])
	for k in request["headers"]:
		print "  "+k+": "+request["headers"][k]
		req.append(k+": "+request["headers"][k])

	req.append("")
	req = "\r\n".join(req)+"\r\n"
	ssock.send(req)


def client(data, connid, serversock):
	# Initialize
	connid = str(connid)
	if not connid in info:
		info[connid] = init()

	this = info[connid]

	if (not "client" in this) or (this["expect"] == 'clientstart'):
		this["client"] = {}

	cli = this["client"]

	if "cbuf" in this:
		data = this["cbuf"]+data
		this["cbuf"] = ""
	else:
		this["cbuf"] = ""

	if this["expect"] == "clientstart":
		# Push to the buffer if we don't have a newline
		if not "\n" in data:
			this["cbuf"] += data
			return

		line, data = data.split("\n", 1)
		line = line.rstrip("\r").split(" ", 2)


		cli["method"] = line[0]
		cli["path"] = line[1]
		cli["ver"] = line[2]

		this["expect"] = "clientheaders"

		if data:
			return client(data,connid,serversock)
	elif this["expect"] == "clientheaders":
		if not "\n" in data:
			this["cbuf"] += data
			return

		line, data = data.split("\n", 1)
		line = line.rstrip("\r").split(":", 1)

		if line == [""]:
			if cli["method"] == "GET":
				client_forward(cli, serversock)
				this["expect"] = "serverreply"
			else:
				print "Expecting clientdata"
				this["expect"] = "clientdata"
		else:
			if not "headers" in cli:
				cli["headers"] = {}

			cli["headers"][line[0].lower()] = line[1].lstrip(" ")

		if data != "":
			return client(data, connid, serversock)
	else:
		print "Unexpected state when receiving data from client: "+this["expect"]
		pprint(this)

def server_forward(data, clientsock):
	print "Server forward:"
	pprint(data)

def server(data, connid, clientsock):
	connid = str(connid)

	if not connid in info:
		info[connid] = init()

	this = info[connid]

	if this["expect"] == "serverreply":
		line, data = data.split("\n", 1)
		line = line.rstrip("\r").split(" ", 2)

		this["server"] = {}

		this["server"]["ver"] = line[0]
		this["server"]["errcode"] = line[1]
		this["server"]["errstr"] = line[2]

		this["expect"] = "serverheaders"

		if data:
			return server(data,connid,clientsock)
	elif this["expect"] == "serverheaders":
		line, data = data.split("\n", 1)
		line = line.rstrip("\r").split(":", 1)

		if line == [""]:
			# TODO What if there is data to process even if no content-length?
			# TODO what if the 'upgrade: websocket' header is present at the webserver
			if "content-length" in this["server"]["headers"]:
				this["expect"] = "serverdata"
			else:
				server_forward(this["server"], clientsock)
				this["expect"] = "clientstart"
		else:
			if not "headers" in this["server"]:
				this["server"]["headers"] = {}

			this["server"]["headers"][line[0].lower()] = line[1].lstrip(" ")

		if data != "":
			return server(data, connid, clientsock)
	elif this["expect"] == "serverdata":
		if not "remain" in this["server"]:
			this["server"]["remain"] = int(this["server"]["headers"]["content-length"])
			this["server"]["data"] = ""
		rem = this["server"]["remain"]
		if len(data) > rem:
			# TODO implement caching or discard.. you decide
			print "Got served more bytes than we expect"
			sleep(2)
		elif len(data) == rem:
			this["server"]["data"] += data
			requestcomplete(connid, clientsock)
		else:
			this["server"]["data"] += data
			this["server"]["remain"] -= len(data)
	else:
		print "Unexpected state when receiving data from server: "+this["expect"]
		pprint(this)
