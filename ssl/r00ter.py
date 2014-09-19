#!/usr/bin/python

import ssl, socket, select, sys, threading, time


def logit(text, connid, logdir):
	with open(logdir+"/log."+str(connid)+".txt", "a") as myfile:
		myfile.write(text)
		t = time.time()
		sys.stdout.write("cid "+str(connid)+" at "+str(t)+": "+text)
		sys.stdout.flush()


def handle_conn(nssl, client_addr, connid, remote, logdir):
	rsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	rssl = ssl.wrap_socket(rsock)
	rssl.connect(remote)
	ins = [rssl, nssl]
	outs = []
	while ins:
		print "Waiting for select"
		read, write, exc = select.select(ins, outs, ins)
		for s in read:
			if s == rssl:
				data = rssl.recv()
				print "server -> client ("+str(connid)+"): "+str(len(data))
				if len(data) == 0:
					ins = []
				else:
					nssl.send(data)
					logit(data, connid, logdir)
			elif s == nssl:
				data = nssl.recv()
				print "client -> server ("+str(connid)+"): "+str(len(data))
				if len(data) == 0:
					ins = []
				else:
					rssl.send(data)
					logit(data, connid, logdir)
	rssl.close()
	nssl.close()


def run(local, remote, cert, key, logdir):
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
		except:
			print "Problems caught :("
