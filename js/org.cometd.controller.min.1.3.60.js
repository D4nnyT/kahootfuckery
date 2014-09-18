org.cometd.Utils = {};
org.cometd.Utils.isString = function(e) {
	if (void 0 === e || null === e) {
		return false;
	} else {
		return "string" == typeof e || e instanceof String;
	}
};
org.cometd.Utils.isArray = function(e) {
	if (void 0 === e || null === e) {
		return false;
	} else {
		return e instanceof Array;
	}
};
org.cometd.Utils.inArray = function(e, t) {
	for (var n = 0; n < t.length; ++n)
		if (e === t[n]) {
			return n;
		}
	return -1
};
org.cometd.Utils.setTimeout = function(e, t, n) {
	return window.setTimeout(function() {
		try {
			t()
		} catch (n) {
			e._debug("Exception invoking timed function", t, n)
		}
	}, n)
};
org.cometd.Utils.clearTimeout = function(e) {
	window.clearTimeout(e)
};
org.cometd.LongPollingTransport = function() {
	var e = new org.cometd.RequestTransport,
		t = org.cometd.Transport.derive(e),
		n = true;
	t.accept = function(e, t) {
		return n || !t
	};
	t.xhrSend = function() {
		throw "Abstract"
	};
	t.transportSend = function(e, t) {
		this._debug("Transport", this.getType(), "sending request", t.id, "envelope", e);
		var r = this;
		try {
			var i = true;
			t.xhr = this.xhrSend({
				transport: this,
				url: e.url,
				sync: e.sync,
				headers: this.getConfiguration().requestHeaders,
				body: org.cometd.JSON.toJSON(e.messages),
				onSuccess: function(i) {
					r._debug("Transport", r.getType(), "received response", i);
					var o = false;
					try {
						var a = r.convertToMessages(i);
						if (0 === a.length) {
							n = false;
							r.transportFailure(e, t, "no response", null);
						} else {
							o = true;
							r.transportSuccess(e, t, a);
						}
					} catch (s) {
						r._debug(s);
						if (!(o)) {
							n = false;
							r.transportFailure(e, t, "bad response", s);
						}
					}
				},
				onError: function(o, a) {
					n = false;
					if (i) {
						r.setTimeout(function() {
							r.transportFailure(e, t, o, a)
						}, 0);
					} else {
						r.transportFailure(e, t, o, a);
					}
				}
			}), i = false
		} catch (o) {
			n = false;
			this.setTimeout(function() {
				r.transportFailure(e, t, "error", o)
			}, 0);
		}
	};
	t.reset = function() {
		e.reset();
		n = true;
	};
	return t;
};
org.cometd.WebSocketTransport = function() {
	function e() {
		var e = r.getURL().replace(/^http/, "ws");
		this._debug("Transport", this.getType(), "connecting to URL", e);
		var t = this,
			n = null,
			i = r.getConfiguration().connectTimeout;
		if (i > 0) {
			(n = this.setTimeout(function() {
				n = null;
				if (!(d)) {
					t._debug("Transport", t.getType(), "timed out while connecting to URL", e, ":", i, "ms");
					t.onClose(1002, "Connect Timeout");
				}
			}, i));
		}
		var o = new org.cometd.WebSocket(e),
			a = function() {
				t._debug("WebSocket opened", o);
				if (n) {
					t.clearTimeout(n);
					n = null;
				}
				if (o !== f) {
					return void t._debug("Ignoring open event, WebSocket", f);
				} else {
					return void t.onOpen();
				}
			},
			s = function(e) {
				var r = e ? e.code : 1e3,
					i = e ? e.reason : void 0;
				t._debug("WebSocket closed", r, "/", i, o);
				if (n) {
					t.clearTimeout(n);
					n = null;
				}
				if (o !== f) {
					return void t._debug("Ignoring close event, WebSocket", f);
				} else {
					return void t.onClose(r, i);
				}
			},
			c = function(e) {
				t._debug("WebSocket message", e, o);
				if (o !== f) {
					return void t._debug("Ignoring message event, WebSocket", f);
				} else {
					return void t.onMessage(e);
				}
			};
		o.onopen = a;
		o.onclose = s;
		o.onerror = function() {
			s({
				code: 1002
			})
		};
		o.onmessage = c;
		f = o;
		this._debug("Transport", this.getType(), "configured callbacks on", o);
	}

	function t(e, t) {
		var n = org.cometd.JSON.toJSON(e.messages);
		f.send(n), this._debug("Transport", this.getType(), "sent", e, "metaConnect =", t);
		var r = this.getConfiguration().maxNetworkDelay,
			i = r;
		if (t) {
			i += this.getAdvice().timeout;
			p = true;
		}
		for (var o = [], a = 0; a < e.messages.length; ++a) {
			var s = e.messages[a];
			if (s.id) {
				o.push(s.id);
				var c = f;
				u[s.id] = this.setTimeout(function() {
					if (c) {
						c.close(1e3, "Timeout");
					}
				}, i)
			}
		}
		this._debug("Transport", this.getType(), "waiting at most", i, "ms for messages", o, "maxNetworkDelay", r, ", timeouts:", u)
	}

	function n(n, r) {
		try {
			if (null === f) {
				e.call(this);
			} else if (d) {
				t.call(this, n, r)
			}
		} catch (i) {
			var o = f;
			this.setTimeout(function() {
				n.onFailure(o, n.messages, "error", i)
			}, 0)
		}
	}
	var r, i, o = new org.cometd.Transport,
		a = org.cometd.Transport.derive(o),
		s = true,
		c = false,
		l = {},
		u = {},
		f = null,
		d = false,
		p = false;
	a.onOpen = function() {
		this._debug("Transport", this.getType(), "opened", f);
		d = true;
		c = true;
		this._debug("Sending pending messages", l);
		for (var e in l) {
			var n = l[e],
				r = n[0],
				o = n[1];
			i = r.onSuccess, t.call(this, r, o)
		}
	};
	a.onMessage = function(e) {
		this._debug("Transport", this.getType(), "received websocket message", e, f);
		for (var t = false, n = this.convertToMessages(e.data), r = [], o = 0; o < n.length; ++o) {
			var a = n[o];
			if ((/^\/meta\//.test(a.channel) || void 0 === a.data) && a.id) {
				r.push(a.id);
				var s = u[a.id];
				if (s) {
					this.clearTimeout(s);
					delete u[a.id];
					this._debug("Transport", this.getType(), "removed timeout for message", a.id, ", timeouts", u);
				}
			}
			"/meta/connect" === a.channel && (p = false), "/meta/disconnect" !== a.channel || p || (t = true)
		}
		for (var c = false, d = 0; d < r.length; ++d) {
			var h = r[d];
			for (var g in l) {
				var m = g.split(","),
					v = org.cometd.Utils.inArray(h, m);
				if (v >= 0) {
					c = true, m.splice(v, 1);
					var y = l[g][0],
						b = l[g][1];
					delete l[g], m.length > 0 && (l[m.join(",")] = [y, b]);
					break
				}
			}
		}
		if (c) {
			this._debug("Transport", this.getType(), "removed envelope, envelopes", l);
		}
		i.call(this, n);
		if (t) {
			f.close(1e3, "Disconnect");
		}
	};
	a.onClose = function(e, t) {
		this._debug("Transport", this.getType(), "closed", e, t, f), s = c;
		for (var n in u) {
			this.clearTimeout(u[n]);
		}
		u = {};
		for (var r in l) {
			var i = l[r][0],
				o = l[r][1];
			o && (p = false), i.onFailure(f, i.messages, "closed " + e + "/" + t)
		}
		l = {};
		if (null !== f && d) {
			f.close(1e3, "Close");
		}
		d = false;
		f = null;
	};
	a.registered = function(e, t) {
		o.registered(e, t);
		r = t;
	};
	a.accept = function() {
		return s && !!org.cometd.WebSocket && r.websocketEnabled !== false
	};
	a.send = function(e, t) {
		this._debug("Transport", this.getType(), "sending", e, "metaConnect =", t);
		for (var r = [], i = 0; i < e.messages.length; ++i) {
			var o = e.messages[i];
			if (o.id) {
				r.push(o.id);
			}
		}
		l[r.join(",")] = [e, t];
		this._debug("Transport", this.getType(), "stored envelope, envelopes", l);
		n.call(this, e, t);
	};
	a.abort = function() {
		if (o.abort(), null !== f) try {
			f.close(1001)
		} catch (e) {
			this._debug(e)
		}
		this.reset()
	};
	a.reset = function() {
		o.reset();
		if (null !== f && d) {
			f.close(1e3, "Reset");
		}
		s = true;
		c = false;
		u = {};
		l = {};
		f = null;
		d = false;
		i = null;
	};
	return a;
};
org.cometd.CallbackPollingTransport = function() {
	var e = new org.cometd.RequestTransport,
		t = org.cometd.Transport.derive(e),
		n = 2e3;
	t.accept = function() {
		return true
	};
	t.jsonpSend = function() {
		throw "Abstract"
	};
	t.transportSend = function(e, t) {
		for (var r = this, i = 0, o = e.messages.length, a = []; o > 0;) {
			var s = org.cometd.JSON.toJSON(e.messages.slice(i, i + o)),
				c = e.url.length + encodeURI(s).length;
			if (c > n) {
				if (1 === o) {
					var l = "Bayeux message too big (" + c + " bytes, max is " + n + ") for transport " + this.getType();
					return void this.setTimeout(function() {
						r.transportFailure(e, t, "error", l)
					}, 0)
				}--o
			} else {
				a.push(o);
				i += o;
				o = e.messages.length - i;
			}
		}
		var u = e;
		if (a.length > 1) {
			var f = 0,
				d = a[0];
			this._debug("Transport", this.getType(), "split", e.messages.length, "messages into", a.join(" + "));
			u = this._mixin(false, {}, e);
			u.messages = e.messages.slice(f, d);
			u.onSuccess = e.onSuccess;
			u.onFailure = e.onFailure;
			for (var p = 1; p < a.length; ++p) {
				var h = this._mixin(false, {}, e);
				f = d;
				d += a[p];
				h.messages = e.messages.slice(f, d);
				h.onSuccess = e.onSuccess;
				h.onFailure = e.onFailure;
				this.send(h, t.metaConnect);
			}
		}
		this._debug("Transport", this.getType(), "sending request", t.id, "envelope", u);
		try {
			var g = true;
			this.jsonpSend({
				transport: this,
				url: u.url,
				sync: u.sync,
				headers: this.getConfiguration().requestHeaders,
				body: org.cometd.JSON.toJSON(u.messages),
				onSuccess: function(e) {
					var n = false;
					try {
						var i = r.convertToMessages(e);
						if (0 === i.length) {
							r.transportFailure(u, t, "no response");
						} else {
							n = true;
							r.transportSuccess(u, t, i);
						}
					} catch (o) {
						r._debug(o);
						if (!(n)) {
							r.transportFailure(u, t, "bad response", o); 
						}
					}
				},
				onError: function(e, n) {
					if (g) {
						r.setTimeout(function() {
							r.transportFailure(u, t, e, n)
						}, 0);
					} else {
						r.transportFailure(u, t, e, n);
					}
				}
			}), g = false
		} catch (m) {
			this.setTimeout(function() {
				r.transportFailure(u, t, "error", m)
			}, 0)
		}
	};
	return t;
};
org.cometd.RequestTransport = function() {
	function e(e) {
		for (; f.length > 0;) {
			var t = f[0],
				n = t[0],
				r = t[1];
			if (n.url !== e.url || n.sync !== e.sync) break;
			f.shift();
			e.messages = e.messages.concat(n.messages);
			this._debug("Coalesced", n.messages.length, "messages from request", r.id);
		}
	}

	function t(e, t) {
		this.transportSend(e, t);
		t.expired = false;
		if (!e.sync) {
			var n = this.getConfiguration().maxNetworkDelay,
				r = n;
			t.metaConnect === true && (r += this.getAdvice().timeout), this._debug("Transport", this.getType(), "waiting at most", r, "ms for the response, maxNetworkDelay", n);
			var i = this;
			t.timeout = this.setTimeout(function() {
				t.expired = true, t.xhr && t.xhr.abort();
				var n = "Request " + t.id + " of transport " + i.getType() + " exceeded " + r + " ms max network delay";
				i._debug(n);
				i.complete(t, false, t.metaConnect);
				e.onFailure(t.xhr, e.messages, "timeout", n);
			}, r)
		}
	}

	function n(e) {
		var n = ++c,
			r = {
				id: n,
				metaConnect: false
			};
		if (u.length < this.getConfiguration().maxConnections - 1) {
			u.push(r);
			t.call(this, e, r);
		} else {
			this._debug("Transport", this.getType(), "queueing request", n, "envelope", e);
			f.push([e, r]);
		}
	}

	function r(e) {
		var t = e.id;
		if (this._debug("Transport", this.getType(), "metaConnect complete, request", t), null !== l && l.id !== t) {
			throw "Longpoll request mismatch, completing request " + t;
		}
		l = null
	}

	function i(t, r) {
		var i = org.cometd.Utils.inArray(t, u);
		if (i >= 0 && u.splice(i, 1), f.length > 0) {
			var o = f.shift(),
				a = o[0],
				s = o[1];
			if (this._debug("Transport dequeued request", s.id), r) {
				if (this.getConfiguration().autoBatch) {
					e.call(this, a);
				}
				n.call(this, a);
				this._debug("Transport completed request", t.id, a);
			} else {
				var c = this;
				this.setTimeout(function() {
					c.complete(s, false, s.metaConnect);
					a.onFailure(s.xhr, a.messages, "error", "Previous request failed");
				}, 0)
			}
		}
	}

	function o(e) {
		if (null !== l) {
			throw "Concurrent metaConnect requests not allowed, request id=" + l.id + " not yet completed";
		}
		var n = ++c;
		this._debug("Transport", this.getType(), "metaConnect send, request", n, "envelope", e);
		var r = {
			id: n,
			metaConnect: true
		};
		t.call(this, e, r), l = r
	}
	var a = new org.cometd.Transport,
		s = org.cometd.Transport.derive(a),
		c = 0,
		l = null,
		u = [],
		f = [];
	s.complete = function(e, t, n) {
		if (n) {
			r.call(this, e);
		} else {
			i.call(this, e, t);
		}
	};
	s.transportSend = function() {
		throw "Abstract"
	};
	s.transportSuccess = function(e, t, n) {
		if (!(t.expired)) {
			this.clearTimeout(t.timeout);
			this.complete(t, true, t.metaConnect);
			if (n && n.length > 0) {
				e.onSuccess(n);
			} else {
				e.onFailure(t.xhr, e.messages, "Empty HTTP response");
			}
		}
	};
	s.transportFailure = function(e, t, n, r) {
		if (!(t.expired)) {
			this.clearTimeout(t.timeout);
			this.complete(t, false, t.metaConnect);
			e.onFailure(t.xhr, e.messages, n, r);
		}
	};
	s.send = function(e, t) {
		if (t) {
			o.call(this, e);
		} else {
			n.call(this, e);
		}
	};
	s.abort = function() {
		a.abort();
		for (var e = 0; e < u.length; ++e) {
			var t = u[e];
			this._debug("Aborting request", t), t.xhr && t.xhr.abort()
		}
		l && (this._debug("Aborting metaConnect request", l), l.xhr && l.xhr.abort()), this.reset()
	};
	s.reset = function() {
		a.reset();
		l = null;
		u = [];
		f = [];
	};
	return s;
};
org.cometd.TransportRegistry = function() {
	var e = [],
		t = {};
	this.getTransportTypes = function() {
		return e.slice(0)
	};
	this.findTransportTypes = function(n, r, i) {
		for (var o = [], a = 0; a < e.length; ++a) {
			var s = e[a];
			if (t[s].accept(n, r, i) === true) {
				o.push(s);
			}
		}
		return o
	};
	this.negotiateTransport = function(n, r, i, o) {
		for (var a = 0; a < e.length; ++a)
			for (var s = e[a], c = 0; c < n.length; ++c)
				if (s === n[c]) {
					var l = t[s];
					if (l.accept(r, i, o) === true) {
						return l;
					}
				}
		return null
	};
	this.add = function(n, r, i) {
		for (var o = false, a = 0; a < e.length; ++a)
			if (e[a] === n) {
				o = true;
				break
			}
		if (!(o)) {
			if ("number" != typeof i) {
				e.push(n);
			} else {
				e.splice(i, 0, n);
			}
			t[n] = r;
		}
		return !o;
	};
	this.find = function(n) {
		for (var r = 0; r < e.length; ++r)
			if (e[r] === n) {
				return t[n];
			}
		return null
	};
	this.remove = function(n) {
		for (var r = 0; r < e.length; ++r)
			if (e[r] === n) {
				e.splice(r, 1);
				var i = t[n];
				delete t[n];
				return i;
			}
		return null
	};
	this.clear = function() {
		e = [];
		t = {};
	};
	this.reset = function() {
		for (var n = 0; n < e.length; ++n) t[e[n]].reset()
	};
};
org.cometd.Transport = function() {
	var e, t;
	this.registered = function(n, r) {
		e = n;
		t = r;
	};
	this.unregistered = function() {
		e = null;
		t = null;
	};
	this._debug = function() {
		t._debug.apply(t, arguments);
	};
	this._mixin = function() {
		return t._mixin.apply(t, arguments);
	};
	this.getConfiguration = function() {
		return t.getConfiguration();
	};
	this.getAdvice = function() {
		return t.getAdvice();
	};
	this.setTimeout = function(e, n) {
		return org.cometd.Utils.setTimeout(t, e, n);
	};
	this.clearTimeout = function(e) {
		org.cometd.Utils.clearTimeout(e);
	};
	this.convertToMessages = function(e) {
		if (org.cometd.Utils.isString(e)) try {
			return org.cometd.JSON.fromJSON(e);
		} catch (t) {
			throw this._debug("Could not convert to JSON the following string", '"' + e + '"'), t;
		}
		if (org.cometd.Utils.isArray(e)) {
			return e;
		}
		if (void 0 === e || null === e) {
			return [];
		}
		if (e instanceof Object) {
			return [e];
		}
		throw "Conversion Error " + e + ", typeof " + typeof e;
	};
	this.accept = function() {
		throw "Abstract";
	};
	this.getType = function() {
		return e;
	};
	this.send = function() {
		throw "Abstract";
	};
	this.reset = function() {
		this._debug("Transport", e, "reset");
	};
	this.abort = function() {
		this._debug("Transport", e, "aborted");
	};
	this.toString = function() {
		return this.getType();
	}
};
org.cometd.Transport.derive = function(e) {
	function t() {}
	t.prototype = e;
	return new t;
};
org.cometd.Cometd = function(e) {
	function t(e) {
		return org.cometd.Utils.isString(e)
	}

	function n(e) {
		if (void 0 === e || null === e) {
			return false;
		} else {
			return "function" == typeof e;
		}
	}

	function r(e, t) {
		if (window.console) {
			var r = window.console[e];
			if (n(r)) {
				r.apply(window.console, t);
			}
		}
	}

	function i(e) {
		tt._debug("Configuring cometd object with", e);
		if (t(e)) {
			(e = {
				url: e
			})
		}
		if (!(e)) {
			(e = {})
		}
		bt = tt._mixin(false, bt, e);
		if (!bt.url) {
			throw "Missing required configuration parameter 'url' specifying the Bayeux server URL";
		}
		var n = /(^https?:\/\/)?(((\[[^\]]+\])|([^:\/\?#]+))(:(\d+))?)?([^\?#]*)(.*)?/.exec(bt.url),
			r = n[2],
			i = n[8],
			o = n[9];
		if (rt = tt._isCrossDomain(r), bt.appendMessageTypeToURL)
			if (void 0 !== o && o.length > 0) {
				tt._info("Appending message type to URI " + i + o + " is not supported, disabling 'appendMessageTypeToURL' configuration");
				bt.appendMessageTypeToURL = false;
			} else {
				var a = i.split("/"),
					s = a.length - 1;
				i.match(/\/$/) && (s -= 1), a[s].indexOf(".") >= 0 && (tt._info("Appending message type to URI " + i + " is not supported, disabling 'appendMessageTypeToURL' configuration"), bt.appendMessageTypeToURL = false)
			}
	}

	function o() {
		for (var e in ft)
			for (var t = ft[e], n = 0; n < t.length; ++n) {
				var r = t[n];
				if (r && !r.listener) {
					delete t[n];
					tt._debug("Removed subscription", r, "for channel", e);
				}
			}
	}

	function a(e) {
		if (ot !== e) {
			tt._debug("Status", ot, "->", e);
			ot = e;
		}
	}

	function s() {
		return "disconnecting" === ot || "disconnected" === ot
	}

	function c() {
		return ++at
	}

	function l(e, t, r, i, o) {
		try {
			return t.call(e, i)
		} catch (a) {
			tt._debug("Exception during execution of extension", r, a);
			var s = tt.onExtensionException;
			if (n(s)) {
				tt._debug("Invoking extension exception callback", r, a);
				try {
					s.call(tt, a, r, o, i)
				} catch (c) {
					tt._info("Exception during execution of exception callback in extension", r, c)
				}
			}
			return i
		}
	}

	function u(e) {
		for (var t = 0; t < ht.length && (void 0 !== e && null !== e); ++t) {
			var r = bt.reverseIncomingExtensions ? ht.length - 1 - t : t,
				i = ht[r],
				o = i.extension.incoming;
			if (n(o)) {
				var a = l(i.extension, o, i.name, e, false);
				if (void 0 === a) {
					e = e;
				} else {
					e = a;
				}
			}
		}
		return e
	}

	function f(e) {
		for (var t = 0; t < ht.length && (void 0 !== e && null !== e); ++t) {
			var r = ht[t],
				i = r.extension.outgoing;
			if (n(i)) {
				var o = l(r.extension, i, r.name, e, true);
				if (void 0 === o) {
					e = e;
				} else {
					e = o;
				}
			}
		}
		return e
	}

	function d(e, t) {
		var r = ft[e];
		if (r && r.length > 0) {
			for (var i = 0; i < r.length; ++i) {
				var o = r[i];
				if (o) try {
					o.callback.call(o.scope, t)
				} catch (a) {
					tt._debug("Exception during notification", o, t, a);
					var s = tt.onListenerException;
					if (n(s)) {
						tt._debug("Invoking listener exception callback", o, a);
						try {
							s.call(tt, a, o.handle, o.listener, t)
						} catch (c) {
							tt._info("Exception during execution of listener callback", o, c)
						}
					}
				}
			}
		}
	}

	function p(e, t) {
		d(e, t);
		for (var n = e.split("/"), r = n.length - 1, i = r; i > 0; --i) {
			var o = n.slice(0, i).join("/") + "/*";
			if (i === r) {
				d(o, t);
			}
			o += "*";
			d(o, t);
		}
	}

	function h() {
		if (null !== pt) {
			org.cometd.Utils.clearTimeout(pt); 
		}
		pt = null;
	}

	function g(e) {
		h();
		var t = gt.interval + dt;
		tt._debug("Function scheduled in", t, "ms, interval =", gt.interval, "backoff =", dt, e), pt = org.cometd.Utils.setTimeout(tt, e, t)
	}

	function m(e, t, r, i) {
		for (var o = 0; o < t.length; ++o) {
			var a = t[o];
			a.id = "" + c(), st && (a.clientId = st);
			var s = void 0;
			if (n(a._callback)) {
				s = a._callback;
				delete a._callback;
			}
			a = f(a);
			if (void 0 !== a && null !== a) {
				t[o] = a;
				if (s) {
					(mt[a.id] = s);
				}
			} else {
				t.splice(o--, 1);
			}
		}
		if (0 !== t.length) {
			var l = bt.url;
			if (bt.appendMessageTypeToURL) {
				if (!(l.match(/\/$/))) {
					(l += "/")
				}
				if (i) {
					(l += i)
				}
			}
			var u = {
				url: l,
				sync: e,
				messages: t,
				onSuccess: function(e) {
					try {
						$t.call(tt, e)
					} catch (t) {
						tt._debug("Exception during handling of messages", t)
					}
				},
				onFailure: function(e, t, n, r) {
					try {
						wt.call(tt, e, t, n, r)
					} catch (i) {
						tt._debug("Exception during handling of failure", i)
					}
				}
			};
			tt._debug("Send", u), Z.send(u, r)
		}
	}

	function v(e) {
		if (ct > 0 || ut === true) {
			lt.push(e);
		} else {
			m(false, [e], false);
		}
	}

	function y() {
		dt = 0
	}

	function b() {
		if (dt < bt.maxBackoff) {
			dt += bt.backoffIncrement;
		}
	}

	function $() {
		++ct
	}

	function w() {
		var e = lt;
		lt = [], e.length > 0 && m(false, e, false)
	}

	function k() {
		if (--ct, 0 > ct) {
			throw "Calls to startBatch() and endBatch() are not paired";
		}
		if (!(0 !== ct || s() || ut)) {
			w()
		}
	}

	function x() {
		if (!s()) {
			var e = {
				channel: "/meta/connect",
				connectionType: Z.getType()
			};
			if (!(yt)) {
				(e.advice = {
					timeout: 0
				});
			}
			a("connecting");
			tt._debug("Connect sent", e);
			m(false, [e], true, "connect");
			a("connected");
		}
	}

	function T() {
		a("connecting");
		g(function() {
			x()
		});
	}

	function C(e) {
		if (e) {
			gt = tt._mixin(false, {}, bt.advice, e);
			tt._debug("New advice", gt);
		}
	}

	function S(e) {
		h();
		if (e) {
			Z.abort();
		}
		st = null;
		a("disconnected");
		ct = 0;
		y();
		if (lt.length > 0) {
			wt.call(tt, void 0, lt, "error", "Disconnected");
			lt = [];
		}
	}

	function A(e) {
		st = null;
		o();
		if (s()) {
			it.reset();
			C(bt.advice);
		} else {
			C(tt._mixin(false, gt, {
				reconnect: "retry"
			}));
		}
		ct = 0;
		ut = true;
		et = e;
		var t = "1.0",
			n = it.findTransportTypes(t, rt, bt.url),
			r = {
				version: t,
				minimumVersion: "0.9",
				channel: "/meta/handshake",
				supportedConnectionTypes: n,
				advice: {
					timeout: gt.timeout,
					interval: gt.interval
				}
			},
			i = tt._mixin(false, {}, et, r);
		Z = it.negotiateTransport(n, t, rt, bt.url);
		tt._debug("Initial transport is", Z.getType());
		a("handshaking");
		tt._debug("Handshake sent", i);
		m(false, [i], false, "handshake");
	}

	function E() {
		a("handshaking");
		ut = true;
		g(function() {
			A(et)
		});
	}

	function N(e) {
		p("/meta/handshake", e), p("/meta/unsuccessful", e);
		var t = !s() && "none" !== gt.reconnect;
		if (t) {
			b();
			E();
		} else {
			S(false);
		}
	}

	function j(e) {
		if (e.successful) {
			st = e.clientId;
			var t = it.negotiateTransport(e.supportedConnectionTypes, e.version, rt, bt.url);
			if (null === t) {
				throw "Could not negotiate transport with server; client " + it.findTransportTypes(e.version, rt, bt.url) + ", server " + e.supportedConnectionTypes;
			}
			if (Z !== t) {
				tt._debug("Transport", Z, "->", t);
				Z = t;
			}
			ut = false;
			w();
			e.reestablish = vt;
			vt = true;
			p("/meta/handshake", e);
			var n = s() ? "none" : gt.reconnect;
			switch (n) {
				case "retry":
					y(), T();
					break;
				case "none":
					S(false);
					break;
				default:
					throw "Unrecognized advice action " + n
			}
		} else {
			N(e);
		}
	}

	function _(e, t) {
		N({
			successful: false,
			failure: true,
			channel: "/meta/handshake",
			request: t,
			xhr: e,
			advice: {
				reconnect: "retry",
				interval: dt
			}
		})
	}

	function q(e) {
		p("/meta/connect", e), p("/meta/unsuccessful", e);
		var t = s() ? "none" : gt.reconnect;
		switch (t) {
			case "retry":
				T(), b();
				break;
			case "handshake":
				it.reset();
				y();
				E();
				break;
			case "none":
				S(false);
				break;
			default:
				throw "Unrecognized advice action" + t
		}
	}

	function M(e) {
		if (yt = e.successful) {
			p("/meta/connect", e);
			var t = s() ? "none" : gt.reconnect;
			switch (t) {
				case "retry":
					y(), T();
					break;
				case "none":
					S(false);
					break;
				default:
					throw "Unrecognized advice action " + t
			}
		} else {
			q(e);
		}
	}

	function O(e, t) {
		yt = false;
		q({
			successful: false,
			failure: true,
			channel: "/meta/connect",
			request: t,
			xhr: e,
			advice: {
				reconnect: "retry",
				interval: dt
			}
		});
	}

	function I(e) {
		S(true);
		p("/meta/disconnect", e);
		p("/meta/unsuccessful", e);
	}

	function D(e) {
		if (e.successful) {
			S(false);
			p("/meta/disconnect", e);
		} else {
			I(e);
		}
	}

	function L(e, t) {
		I({
			successful: false,
			failure: true,
			channel: "/meta/disconnect",
			request: t,
			xhr: e,
			advice: {
				reconnect: "none",
				interval: 0
			}
		})
	}

	function P(e) {
		p("/meta/subscribe", e);
		p("/meta/unsuccessful", e);
	}

	function F(e) {
		if (e.successful) {
			p("/meta/subscribe", e);
		} else {
			P(e);
		}
	}

	function z(e, t) {
		P({
			successful: false,
			failure: true,
			channel: "/meta/subscribe",
			request: t,
			xhr: e,
			advice: {
				reconnect: "none",
				interval: 0
			}
		})
	}

	function R(e) {
		p("/meta/unsubscribe", e);
		p("/meta/unsuccessful", e);
	}

	function H(e) {
		if (e.successful) {
			p("/meta/unsubscribe", e);
		} else {
			R(e);
		}
	}

	function B(e, t) {
		R({
			successful: false,
			failure: true,
			channel: "/meta/unsubscribe",
			request: t,
			xhr: e,
			advice: {
				reconnect: "none",
				interval: 0
			}
		})
	}

	function U(e) {
		var t = mt[e.id];
		if (n(t)) {
			delete mt[e.id];
			t.call(tt, e);
		}
	}

	function W(e) {
		U(e);
		p("/meta/publish", e);
		p("/meta/unsuccessful", e);
	}

	function V(e) {
		if (void 0 === e.successful) {
			if (e.data) {
				p(e.channel, e);
			} else {
				tt._debug("Unknown message", e);
			};
		} else if (e.successful) {
			U(e);
			p("/meta/publish", e);
		} else {
			W(e);
		}
	}

	function J(e, t) {
		W({
			successful: false,
			failure: true,
			channel: t.channel,
			request: t,
			xhr: e,
			advice: {
				reconnect: "none",
				interval: 0
			}
		})
	}

	function X(e) {
		e = u(e);
		if (void 0 !== e && null !== e) {
			C(e.advice);
			var t = e.channel;
			switch (t) {
				case "/meta/handshake":
					j(e);
					break;
				case "/meta/connect":
					M(e);
					break;
				case "/meta/disconnect":
					D(e);
					break;
				case "/meta/subscribe":
					F(e);
					break;
				case "/meta/unsubscribe":
					H(e);
					break;
				default:
					V(e)
			}
		}
	}

	function G(e) {
		var t = ft[e];
		if (t) {
			for (var n = 0; n < t.length; ++n)
				if (t[n]) {
					return true;
				}
		}
		return false
	}

	function K(e, r) {
		var i = {
			scope: e,
			method: r
		};
		if (n(e)) {
			i.scope = void 0;
			i.method = e;
		} else if (t(r)) {
			if (!e) {
				throw "Invalid scope " + e;
			}
			if (i.method = e[r], !n(i.method)) {
				throw "Invalid callback " + r + " for scope " + e;
			}
		} else if (!n(r)) {
			throw "Invalid callback " + r;
		}
		return i
	}

	function Q(e, t, n, r) {
		var i = K(t, n);
		tt._debug("Adding listener on", e, "with scope", i.scope, "and callback", i.method);
		var o = {
				channel: e,
				scope: i.scope,
				callback: i.method,
				listener: r
			},
			a = ft[e];
		if (!(a)) {
			a = [];
			ft[e] = a;
		}
		var s = a.push(o) - 1;
		o.id = s;
		o.handle = [e, s];
		tt._debug("Added listener", o, "for channel", e, "having id =", s);
		return o.handle;
	}

	function Y(e) {
		var t = ft[e[0]];
		if (t) {
			delete t[e[1]];
			tt._debug("Removed listener", e);
		}
	}
	var Z, et, tt = this,
		nt = e || "default",
		rt = false,
		it = new org.cometd.TransportRegistry,
		ot = "disconnected",
		at = 0,
		st = null,
		ct = 0,
		lt = [],
		ut = false,
		ft = {},
		dt = 0,
		pt = null,
		ht = [],
		gt = {},
		mt = {},
		vt = false,
		yt = false,
		bt = {
			connectTimeout: 0,
			maxConnections: 2,
			backoffIncrement: 1e3,
			maxBackoff: 6e4,
			logLevel: "info",
			reverseIncomingExtensions: true,
			maxNetworkDelay: 1e4,
			requestHeaders: {},
			appendMessageTypeToURL: true,
			autoBatch: false,
			advice: {
				timeout: 6e4,
				interval: 0,
				reconnect: "retry"
			}
		};
	this._mixin = function(e, t) {
		for (var n = t || {}, r = 2; r < arguments.length; ++r) {
			var i = arguments[r];
			if (void 0 !== i && null !== i)
				for (var o in i) {
					var a = i[o],
						s = n[o];
					if (a !== t && void 0 !== a) {
						if (e && "object" == typeof a && null !== a) {
							if (a instanceof Array) {
								n[o] = this._mixin(e, s instanceof Array ? s : [], a);
							} else {
								var c = "object" != typeof s || s instanceof Array ? {} : s;
								n[o] = this._mixin(e, c, a)
							}
						} else {
							n[o] = a;
						}
					}
				}
		}
		return n;
	};
	this._warn = function() {
		r("warn", arguments)
	};
	this._info = function() {
		if ("warn" !== bt.logLevel) {
			r("info", arguments);
		}
	};
	this._debug = function() {
		if ("debug" === bt.logLevel) {
			r("debug", arguments);
		}
	};
	this._isCrossDomain = function(e) {
		return e && e !== window.location.host
	};
	var $t, wt;
	this.send = v, this.receive = X, $t = function(e) {
		tt._debug("Received", e);
		for (var t = 0; t < e.length; ++t) {
			var n = e[t];
			X(n)
		}
	}, wt = function(e, t, n, r) {
		tt._debug("handleFailure", e, t, n, r);
		for (var i = 0; i < t.length; ++i) {
			var o = t[i],
				a = o.channel;
			switch (a) {
				case "/meta/handshake":
					_(e, o);
					break;
				case "/meta/connect":
					O(e, o);
					break;
				case "/meta/disconnect":
					L(e, o);
					break;
				case "/meta/subscribe":
					z(e, o);
					break;
				case "/meta/unsubscribe":
					B(e, o);
					break;
				default:
					J(e, o)
			}
		}
	}, this.registerTransport = function(e, t, r) {
		var i = it.add(e, t, r);
		if (i) {
			this._debug("Registered transport", e);
			if (n(t.registered)) {
				t.registered(e, this); 
			}
		}
		return i;
	}, this.getTransportTypes = function() {
		return it.getTransportTypes()
	}, this.unregisterTransport = function(e) {
		var t = it.remove(e);
		if (null !== t) {
			this._debug("Unregistered transport", e);
			if (n(t.unregistered)) {
				t.unregistered(); 
			}
		}
		return t;
	}, this.unregisterTransports = function() {
		it.clear()
	}, this.findTransport = function(e) {
		return it.find(e)
	}, this.configure = function(e) {
		i.call(this, e)
	}, this.init = function(e, t) {
		this.configure(e);
		this.handshake(t);
	}, this.handshake = function(e) {
		a("disconnected");
		vt = false;
		A(e);
	}, this.disconnect = function(e, t) {
		if (!s()) {
			if (void 0 === t && "boolean" != typeof e) {
				t = e;
				e = false;
			}
			var n = {
					channel: "/meta/disconnect"
				},
				r = this._mixin(false, {}, t, n);
			a("disconnecting"), m(e === true, [r], false, "disconnect")
		}
	}, this.startBatch = function() {
		$()
	}, this.endBatch = function() {
		k()
	}, this.batch = function(e, t) {
		var n = K(e, t);
		this.startBatch();
		try {
			n.method.call(n.scope);
			this.endBatch();
		} catch (r) {
			throw this._debug("Exception during execution of batch", r), this.endBatch(), r
		}
	}, this.addListener = function(e, n, r) {
		if (arguments.length < 2) {
			throw "Illegal arguments number: required 2, got " + arguments.length;
		}
		if (!t(e)) {
			throw "Illegal argument type: channel must be a string";
		}
		return Q(e, n, r, true)
	}, this.removeListener = function(e) {
		if (!org.cometd.Utils.isArray(e)) {
			throw "Invalid argument: expected subscription, not " + e;
		}
		Y(e)
	}, this.clearListeners = function() {
		ft = {}
	}, this.subscribe = function(e, r, i, o) {
		if (arguments.length < 2) {
			throw "Illegal arguments number: required 2, got " + arguments.length;
		}
		if (!t(e)) {
			throw "Illegal argument type: channel must be a string";
		}
		if (s()) {
			throw "Illegal state: already disconnected";
		}
		if (n(r)) {
			o = i;
			i = r;
			r = void 0;
		}
		var a = !G(e),
			c = Q(e, r, i, false);
		if (a) {
			var l = {
					channel: "/meta/subscribe",
					subscription: e
				},
				u = this._mixin(false, {}, o, l);
			v(u)
		}
		return c
	}, this.unsubscribe = function(e, t) {
		if (arguments.length < 1) {
			throw "Illegal arguments number: required 1, got " + arguments.length;
		}
		if (s()) {
			throw "Illegal state: already disconnected";
		}
		this.removeListener(e);
		var n = e[0];
		if (!G(n)) {
			var r = {
					channel: "/meta/unsubscribe",
					subscription: n
				},
				i = this._mixin(false, {}, t, r);
			v(i)
		}
	}, this.clearSubscriptions = function() {
		o()
	}, this.publish = function(e, r, i, o) {
		if (arguments.length < 1) {
			throw "Illegal arguments number: required 1, got " + arguments.length;
		}
		if (!t(e)) {
			throw "Illegal argument type: channel must be a string";
		}
		if (s()) {
			throw "Illegal state: already disconnected";
		}
		if (n(r)) {
			o = r;
			r = i = {};
		} else if (n(i)) {
			o = i;
			i = {};
		}
		var a = {
				channel: e,
				data: r,
				_callback: o
			},
			c = this._mixin(false, {}, i, a);
		v(c)
	}, this.getStatus = function() {
		return ot
	}, this.isDisconnected = s, this.setBackoffIncrement = function(e) {
		bt.backoffIncrement = e
	}, this.getBackoffIncrement = function() {
		return bt.backoffIncrement
	}, this.getBackoffPeriod = function() {
		return dt
	}, this.setLogLevel = function(e) {
		bt.logLevel = e
	}, this.registerExtension = function(e, r) {
		if (arguments.length < 2) {
			throw "Illegal arguments number: required 2, got " + arguments.length;
		}
		if (!t(e)) {
			throw "Illegal argument type: extension name must be a string";
		}
		for (var i = false, o = 0; o < ht.length; ++o) {
			var a = ht[o];
			if (a.name === e) {
				i = true;
				break
			}
		}
		if (i) {
			return (this._info("Could not register extension with name", e, "since another extension with the same name already exists"), false);
		} else {
			return (ht.push({
				name: e,
				extension: r
			}), this._debug("Registered extension", e), n(r.registered) && r.registered(e, this), true);
		}
	}, this.unregisterExtension = function(e) {
		if (!t(e)) {
			throw "Illegal argument type: extension name must be a string";
		}
		for (var r = false, i = 0; i < ht.length; ++i) {
			var o = ht[i];
			if (o.name === e) {
				ht.splice(i, 1);
				r = true;
				this._debug("Unregistered extension", e);
				var a = o.extension;
				if (n(a.unregistered)) {
					a.unregistered();
				}
				break
			}
		}
		return r
	}, this.getExtension = function(e) {
		for (var t = 0; t < ht.length; ++t) {
			var n = ht[t];
			if (n.name === e) {
				return n.extension;
			}
		}
		return null
	}, this.getName = function() {
		return nt
	}, this.getClientId = function() {
		return st
	}, this.getURL = function() {
		return bt.url
	}, this.getTransport = function() {
		return Z
	}, this.getConfiguration = function() {
		return this._mixin(true, {}, bt)
	}, this.getAdvice = function() {
		return this._mixin(true, {}, gt)
	}, org.cometd.WebSocket = window.WebSocket, org.cometd.WebSocket || (org.cometd.WebSocket = window.MozWebSocket)
};
