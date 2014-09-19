#!/usr/bin/python

import r00ter

logdir = "r00terlog1"

local = ('0.0.0.0', 4002)
remote = ('www.kahoot.it', 443)
cert = "www.kahoot.it.crt"
key = "www.kahoot.it.key"

r00ter.run(local,remote,cert,key,logdir)
