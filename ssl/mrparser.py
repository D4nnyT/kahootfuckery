#!/usr/bin/python

from pprint import pprint
from time import sleep


info = {}

def ws_reconstruct(wsdata):
	data = []

	pllen = len(wsdata["payload"])

	byte1 = 0
	if "fin" in wsdata:
		byte1 |= 128
	if "rsv1" in wsdata:
		byte1 |= 64
	if "rsv2" in wsdata:
		byte1 |= 32
	if "rsv3" in wsdata:
		byte1 |= 16
	byte1 |= wsdata["opcode"] & 0xf
	data.append(byte1)

	byte2 = 0
	if "mask" in wsdata:
		byte2 |= 128

	if pllen < 126:
		# no extra
		byte2 |= pllen
		data.append(byte2)
	elif pllen < 65536:
		# 16 bit
		byte2 |= 126
		data.append(byte2)
		data.append((pllen>>8) & 0xff)
		data.append((pllen   ) & 0xff)
	else:
		# 64 bit
		byte2 |= 127
		data.append(byte2)
		data.append((pllen>>56) & 0xff)
		data.append((pllen>>48) & 0xff)
		data.append((pllen>>40) & 0xff)
		data.append((pllen>>32) & 0xff)
		data.append((pllen>>24) & 0xff)
		data.append((pllen>>16) & 0xff)
		data.append((pllen>> 8) & 0xff)
		data.append((pllen    ) & 0xff)

	if "mask" in wsdata:
		data.extend(wsdata["maskkey"])

	payload = [ord(n) for n in wsdata["payload"]]

	if "mask" in wsdata:
		for i in range(0,len(payload)):
			payload[i] = payload[i] ^ (wsdata["maskkey"][i%4])
	data.extend(payload)

	return "".join([chr(n) for n in data])

def ws_packetize(data, dest):
	# Policy:
	# 1: Check that offset+<n> bytes are available
	# 2: Spend <n> bytes
	# 3: add <n> to offset
	data = [ord(n) for n in data]

	offset = 0
	if len(data) < 2:
		return 2
	# We have 2 bytes
	byte1 = data[0]
	if byte1 & 128:
		dest["fin"] = True
	if byte1 & 64:
		dest["rsv1"] = True
	if byte1 & 32:
		dest["rsv2"] = True
	if byte1 & 16:
		dest["rsv3"] = True
	dest["opcode"] = byte1 & 0xf
	byte2 = data[1]
	if byte2 & 128:
		dest["mask"] = True
	pllen = byte2 & 0x7f
	offset = 2
	if pllen == 126:
		# 2 bytes
		if len(data) < (offset+2):
			return offset+2
		pllen = (data[offset]<<8) | data[offset+1]
		offset += 2
	elif pllen == 127:
		# 8 bytes
		if len(data) < (offset+8):
			return offset+8

		print data[offset:offset+8]
		pllen = (data[offset+0]<<56) | (data[offset+1]<<48) | (data[offset+2]<<40) | (data[offset+3]<<32) | (data[offset+4]<<24) | (data[offset+5]<<16) | (data[offset+6]<<8) | data[offset+7]
		offset += 8
	dest["pllen"] = pllen

	if "mask" in dest:
		if len(data) < offset+4:
			return offset+4
		dest["maskkey"] = data[offset:offset+4]
		offset += 4

	if len(data) < offset+dest["pllen"]:
		return offset+dest["pllen"]

	dest["payload"] = data[offset:offset+dest["pllen"]]

	if "mask" in dest:
		for i in range(0,len(dest["payload"])):
			dest["payload"][i] = dest["payload"][i] ^ (dest["maskkey"][i%4])

	dest["payload"] = "".join([chr(n) for n in dest["payload"]])

	offset += dest["pllen"]
	return offset

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

def client_forward_ws(wsdata, ssock):
	print "client->server forward ws: "+str(wsdata["payload"])
	data = ws_reconstruct(wsdata)
	ssock.send(data)


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

			k = line[0].lower()
			v = line[1].lstrip(" ")

			cli["headers"][k] = v

		if data != "":
			return client(data, connid, serversock)
	elif this["expect"] == "websockets":
		new = {}
		lenreq = ws_packetize(data, new)
		if lenreq > len(data):
			this["cbuf"] += data
			return
		data = data[lenreq:]
		client_forward_ws(new, serversock)
		if len(data):
			return client(data, connid, serversock)
	else:
		# TODO: Clientdata
		pprint(this)
		pprint(data)
		raise BaseException("Unexpected state when receiving data from client: "+this["expect"]+", see dump above")

def server_forward_header(data, csock):
	print "server -> client: "+data["errcode"]+" "+data["errstr"]

	line = data["ver"]+" "+data["errcode"]+" "+data["errstr"]+"\r\n"
	for h in data["headers"]:
		c = data["headers"][h]
		line += h+": "+c+"\r\n"
	line += "\r\n"
	csock.send(line)

def server_forward_data(data, csock):
	print "server -> client: content with length "+str(len(data))
	csock.send(data)

def server_forward_chunk(chunk, csock):
	print "server -> client: chunk with length "+str(len(chunk))
	l =  hex(len(chunk))[2:]
	csock.send(str(l)+"\r\n")
	csock.send(chunk+"\r\n")

def server_forward_ws(wsdata, csock):
	print "server->client forward ws: "+str(wsdata["payload"])
	data = ws_reconstruct(wsdata)
	csock.send(data)

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
				# Bodyless request
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
	elif this["expect"] == "websockets":
		new = {}
		lenreq = ws_packetize(data, new)
		if lenreq > len(data):
			this["sbuf"] += data
			return
		server_forward_ws(new, clientsock)
		data = data[lenreq:]
		if len(data):
			return server(data, connid, clientsock)
	else:
		pprint(this)
		pprint(data)
		raise BaseException("Unexpected state when receiving data from server: "+this["expect"]+", see dump above")
