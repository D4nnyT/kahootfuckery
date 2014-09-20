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

	if (not "server" in this) or (this["expect"] == 'serverreply'):
		this["server"] = {}

	srv = this["server"]

	if "sbuf" in this:
		data = this["sbuf"]+data
		this["sbuf"] = ""
	else:
		this["sbuf"] = ""

	if this["expect"] == "serverreply":
		if not "\n" in data:
			this["sbuf"] += data
			return

		line, data = data.split("\n", 1)
		line = line.rstrip("\r").split(" ", 2)

		srv["ver"] = line[0]
		srv["errcode"] = line[1]
		srv["errstr"] = line[2]

		this["expect"] = "serverheaders"

		if data:
			return server(data,connid,clientsock)
	elif this["expect"] == "serverheaders":
		if not "\n" in data:
			this["sbuf"] += data
			return

		line, data = data.split("\n", 1)
		line = line.rstrip("\r").split(":", 1)

		if line == [""]:
			# TODO What if there is data to process even if no content-length?
			# TODO what if the 'upgrade: websocket' header is present at the webserver
			if "content-length" in srv["headers"]:
				this["expect"] = "serverdata"
			elif "transfer-encoding" in srv["headers"] and srv["headers"]["transfer-encoding"] == "chunked":
				this["expect"] = "serverdata-chunked"
			elif "upgrade" in srv["headers"] and srv["headers"]["upgrade"] == "WebSocket":
				this["expect"] = "websockets"
			else:
				server_forward(srv, clientsock)
				this["expect"] = "clientstart"
		else:
			if not "headers" in srv:
				srv["headers"] = {}

			srv["headers"][line[0].lower()] = line[1].lstrip(" ")

		if data != "":
			return server(data, connid, clientsock)
	elif this["expect"] == "serverdata":
		if not "remain" in srv:
			srv["remain"] = int(srv["headers"]["content-length"])
			srv["data"] = ""
		rem = srv["remain"]
		if len(data) > rem:
			# TODO implement caching or discard.. you decide
			print "Got served more bytes than we expect"
			sleep(2)
		elif len(data) == rem:
			srv["data"] += data
			requestcomplete(connid, clientsock)
		else:
			srv["data"] += data
			srv["remain"] -= len(data)
	#elif this["expect"] == "serverdata-chunked":
	else:
		print "Unexpected state when receiving data from server: "+this["expect"]
		pprint(this)
