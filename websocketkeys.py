#!/usr/bin/python

import os
from base64 import b64encode, b64decode
from hashlib import sha1

def wskey():
    return b64encode(os.urandom(16))

def wsaccept(challenge):
    m = sha1()
    m.update(challenge)
    m.update("258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
    return b64encode(m.digest())
    

# Required header: host
# Required: request-uri
# Websocket key: just 16 random bytes

k=wskey()
print k
a = wsaccept(k)
print a

