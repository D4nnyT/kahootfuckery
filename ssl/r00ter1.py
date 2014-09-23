#!/usr/bin/python

import r00ter

logdir = "r00terlog1"

local = ('0.0.0.0', 4002)
remote = ('kahoot.it', 443)
cert = "bundle.crt"
key = "kahoot.it.key"

r00ter.run(local,remote,cert,key,logdir)
