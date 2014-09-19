#!/usr/bin/python

import r00ter

logdir = "r00terlog2"

local = ('0.0.0.0', 4003)
remote = ('kahoot.it', 443)
cert = "kahoot.it.crt"
key = "kahoot.it.key"

r00ter.run(local, remote, cert, key, logdir)
