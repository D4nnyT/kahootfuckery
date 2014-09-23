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
		# print "  "+k+": "+request["headers"][k]
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
				# print "Expecting clientdata"
				this["expect"] = "clientdata"
		else:
			if not "headers" in cli:
				cli["headers"] = {}

			cli["headers"][line[0].lower()] = line[1].lstrip(" ")

		if data != "":
			return client(data, connid, serversock)
	else:
		# TODO: Clientdata
		pprint(this)
		pprint(data)
		raise BaseException("Unexpected state when receiving data from client: "+this["expect"]+", see dump above")

def server_forward_header(data, csock):
	print "Server header: "+data["errcode"]+" "+data["errstr"]

	line = data["ver"]+" "+data["errcode"]+" "+data["errstr"]+"\r\n"
	for h in data["headers"]:
		c = data["headers"][h]
		line += h+": "+c+"\r\n"
	line += "\r\n"
	csock.send(line)

def server_forward_data(data, csock):
	print "Server forward data with length "+str(len(data))
	csock.send(data)

def server_forward_chunk(chunk, csock):
	# print "Server forward chunk len="+str(len(chunk))
	l =  hex(len(chunk))[2:]
	csock.send(str(l)+"\r\n")
	csock.send(chunk+"\r\n")

def server_forward_ws(wsdata, clientsock):
	print "server forward ws: "
	pprint(wsdata)
	raise BaseException('Websockets from server not implemented')

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
				server_forward_header(srv, clientsock)
			elif "transfer-encoding" in srv["headers"] and srv["headers"]["transfer-encoding"] == "chunked":
				this["expect"] = "server-chunkstart"
				srv["cnr"] = 0
				srv["chunks"] = {}
				server_forward_header(srv, clientsock)
			elif "upgrade" in srv["headers"] and srv["headers"]["upgrade"] == "WebSocket":
				this["expect"] = "websockets"
				server_forward_header(srv, clientsock)
			else:
				server_forward_header(srv, clientsock)
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
			raise BaseException('server->serverdata: Got more bytes than expected, TODO to handle this')
		elif len(data) == rem:
			srv["data"] += data
			server_forward_data(srv["data"], clientsock)
			this["expect"] = "clientstart"
		else:
			srv["data"] += data
			srv["remain"] -= len(data)
	elif this["expect"] == "server-chunkstart":
		# srv["cnr"] = chunk id counter
		srv["chunks"][srv["cnr"]] = ""
		if not "\n" in data:
			this["sbuf"] += data
			return
		line, data = data.split("\n", 1)
		line = line.rstrip("\r")
		srv["clen"] = int(line, 16)
		# print "server-chunkstart, got chunk length = "+str(srv["clen"])

		this["expect"] = "server-chunkdata"
		if len(data):
			return server(data, connid, clientsock)
	elif this["expect"] == "server-chunkdata":
		if srv["clen"] <= 0:
			if not "\n" in data:
				this["sbuf"] += data
				return
			line, data = data.split("\n", 1)

			# print "Last chunk.. going back to clientstart"
			server_forward_chunk("", clientsock)
			this["expect"] = "clientstart"
			srv["cnr"] = srv["cnr"]+1

			if len(data):
				return server(data, connid, clientsock)
		else:

			# chunk data
			newdata = data[:srv["clen"]]
			# remaining
			data = data[srv["clen"]:]

			srv["chunks"][srv["cnr"]] += newdata
			srv["clen"] -= len(newdata)
			# print "chunk body, got "+str(len(newdata))+" bytes, expecting "+str(srv["clen"])+" more"

			if srv["clen"] <= 0:
				# We do expect \r\n here before the next chunk
				if len(data) < 2:
					raise BaseException("Expecting \r\n in chunk>0, after data scenario, but seems we must let it go.. this leads to errors")
				else:
					data = data[2:]
				# signify that we expect another chunk
				server_forward_chunk(srv["chunks"][srv["cnr"]], clientsock)
				srv["cnr"] = srv["cnr"]+1
				this["expect"] = "server-chunkstart"
			# Finally, if we have leftover data
			if len(data):
				return server(data, connid, clientsock)

	else:
		pprint(this)
		pprint(data)
		raise BaseException("Unexpected state when receiving data from server: "+this["expect"]+", see dump above")
