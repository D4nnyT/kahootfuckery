#!/usr/bin/python

import ssl, socket, select, sys, threading, time, mrparser

def logit(text, connid, direction, logdir=False):
	if not logdir:
		return
	with open(logdir+"/log."+str(connid)+".txt", "a") as myfile:
		myfile.write(text)
		t = time.time()


def handle_conn(nssl, client_addr, connid, remote, logdir=False):
	rsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	rssl = ssl.wrap_socket(rsock)
	rssl.connect(remote)
	ins = [rssl, nssl]
	outs = []
	while ins:
		# print "Waiting for select"
		read, write, exc = select.select(ins, outs, ins)
		for s in read:
			if s == rssl:
				data = rssl.read(1024**3)
				#print "server -> client ("+str(connid)+"): "+str(len(data))+": '"+data+"'"
				if len(data) == 0:
					ins = []
				else:
					#nssl.send(data)
					mrparser.server(data, connid, nssl)
					logit(data, connid, "server->client", logdir)
			elif s == nssl:
				data = nssl.read(1024**3)
				#print "client -> server ("+str(connid)+"): "+str(len(data))+": '"+data+"'"
				if len(data) == 0:
					ins = []
				else:
					#rssl.send(data)
					mrparser.client(data, connid, rssl)
					logit(data, connid, "client->server", logdir)
	rssl.close()
	nssl.close()


def run(local, remote, cert, key, logdir=False):
	lsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

	lsock.bind(local)
	lsock.listen(5)

	connid = 0

	while True:
		print "Waiting for clients to connect to my",local
		nsock, addr = lsock.accept()
		try :
			nssl = ssl.wrap_socket(nsock, keyfile=key, certfile=cert, server_side=True)
			t = threading.Thread(target=handle_conn, args=(nssl, addr, connid, remote, logdir))
			t.daemon = True
			t.start()
			connid = connid+1
		except ssl.SSLError, e:
			print "SSL problems caught: "+str(e)
