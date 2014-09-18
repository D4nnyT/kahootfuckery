! function(e, t) {
	function n(e) {
		var t, n, r = D[e] = {};
		e = e.split(/\s+/);
		t = 0;
		for (n = e.length; n > t; t++) {
			r[e[t]] = true;
		}
		return r;
	}

	function r(e, n, r) {
		if (r === t && 1 === e.nodeType) {
			var i = "data-" + n.replace(F, "-$1").toLowerCase();
			if (r = e.getAttribute(i), "string" == typeof r) {
				try {
					if ("true" === r) {
						r = true;
					} else if ("false" === r) {
						r = false;
					} else if ("null" === r) {
						r = null;
					} else if (I.isNumeric(r)) {
						r = +r;
					} else if (P.test(r)) {
						r = I.parseJSON(r);
					} else {
						r = r;
					}
				} catch (o) {}
				I.data(e, n, r)
			} else {
				r = t;
			}
		}
		return r;
	}

	function i(e) {
		for (var t in e)
			if (("data" !== t || !I.isEmptyObject(e[t])) && "toJSON" !== t) {
				return false;
			}
		return true;
	}

	function o(e, t, n) {
		var r = t + "defer",
			i = t + "queue",
			o = t + "mark",
			a = I._data(e, r);
		if (!(!a || "queue" !== n && I._data(e, i) || "mark" !== n && I._data(e, o))) {
			setTimeout(function() {
				if (!(I._data(e, i) || I._data(e, o))) {
					I.removeData(e, r, true);
					a.fire();
				}
			}, 0)
		}
	}

	function a() {
		return false;
	}

	function s() {
		return true;
	}

	function c(e) {
		return !e || !e.parentNode || 11 === e.parentNode.nodeType
	}

	function l(e, t, n) {
		t = t || 0;
		if (I.isFunction(t)) {
			return I.grep(e, function(e, r) {
				var i = !!t.call(e, r, e);
				return i === n
			});
		}
		if (t.nodeType) {
			return I.grep(e, function(e) {
				return e === t === n
			});
		}
		if ("string" == typeof t) {
			var r = I.grep(e, function(e) {
				return 1 === e.nodeType
			});
			if (ut.test(t)) {
				return I.filter(t, r, !n);
			}
			t = I.filter(t, r)
		}
		return I.grep(e, function(e) {
			return I.inArray(e, t) >= 0 === n
		})
	}

	function u(e) {
		var t = ht.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement) {
			for (; t.length;) {
				n.createElement(t.pop());
			}
		}
		return n
	}

	function f(e) {
		if (I.nodeName(e, "table")) {
			return e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody"));
		} else {
			return e;
		}
	}

	function d(e, t) {
		if (1 === t.nodeType && I.hasData(e)) {
			var n, r, i, o = I._data(e),
				a = I._data(t, o),
				s = o.events;
			if (s) {
				delete a.handle, a.events = {};
				for (n in s) {
					r = 0;
					for (i = s[n].length; i > r; r++) {
						I.event.add(t, n, s[n][r]);
					}
				}
			}
			if (a.data) {
				(a.data = I.extend({}, a.data));
			}
		}
	}

	function p(e, t) {
		var n;
		if (1 === t.nodeType) {
			if (t.clearAttributes) {
				t.clearAttributes();
			}
			if (t.mergeAttributes) {
				t.mergeAttributes(e);
			}
			n = t.nodeName.toLowerCase();
			if ("object" === n) {
				t.outerHTML = e.outerHTML;
			} else if ("input" !== n || "checkbox" !== e.type && "radio" !== e.type) {
				if ("option" === n) {
					t.selected = e.defaultSelected;
				} else if ("input" === n || "textarea" === n) {
					t.defaultValue = e.defaultValue;
				} else if ("script" === n && t.text !== e.text) {
					t.text = e.text;
				}
			} else {
				if (e.checked) {
					t.defaultChecked = t.checked = e.checked;
				}
				if (t.value !== e.value) {
					t.value = e.value;
				}
			}
			t.removeAttribute(I.expando);
			t.removeAttribute("_submit_attached");
			t.removeAttribute("_change_attached");
		}
	}

	function h(e) {
		if ("undefined" != typeof e.getElementsByTagName) {
			return e.getElementsByTagName("*");
		} else if ("undefined" != typeof e.querySelectorAll) {
			return e.querySelectorAll("*");
		} else {
			return [];
		}
	}

	function g(e) {
		if (("checkbox" === e.type || "radio" === e.type)) {
			e.defaultChecked = e.checked;
		}
	}

	function m(e) {
		var t = (e.nodeName || "").toLowerCase();
		if ("input" === t) {
			g(e);
		} else if ("script" !== t && "undefined" != typeof e.getElementsByTagName) {
			I.grep(e.getElementsByTagName("input"), g)
		}
	}

	function v(e) {
		var t = q.createElement("div");
		Et.appendChild(t);
		t.innerHTML = e.outerHTML;
		return t.firstChild;
	}

	function y(e, t, n) {
		var r = "width" === t ? e.offsetWidth : e.offsetHeight,
			i = "width" === t ? 1 : 0,
			o = 4;
		if (r > 0) {
			if ("border" !== n) {
				for (; o > i; i += 2) {
					if (!(n)) {
						(r -= parseFloat(I.css(e, "padding" + zt[i])) || 0)
					}
					if ("margin" === n) {
						r += parseFloat(I.css(e, n + zt[i])) || 0;
					} else {
						r -= parseFloat(I.css(e, "border" + zt[i] + "Width")) || 0;
					}
				}
			}
			return r + "px";
		}
		r = Nt(e, t);
		if ((0 > r || r == null)) {
			r = e.style[t];
		}
		if (Dt.test(r)) {
			return r;
		}
		if (r = parseFloat(r) || 0, n) {
			for (; o > i; i += 2) {
				r += parseFloat(I.css(e, "padding" + zt[i])) || 0;
				if ("padding" !== n) {
					(r += parseFloat(I.css(e, "border" + zt[i] + "Width")) || 0);
				}
				if ("margin" === n) {
					(r += parseFloat(I.css(e, n + zt[i])) || 0);
				}
			}
		}
		return r + "px";
	}

	function b(e) {
		return function(t, n) {
			if ("string" != typeof t) {
				n = t;
				t = "*";
			}
			if (I.isFunction(n)) {
				for (var r, i, o, a = t.toLowerCase().split(tn), s = 0, c = a.length; c > s; s++) {
					r = a[s];
					o = /^\+/.test(r);
					if (o) {
						(r = r.substr(1) || "*")
					}
					i = e[r] = e[r] || [];
					i[o ? "unshift" : "push"](n);
				}
			}
		}
	}

	function $(e, n, r, i, o, a) {
		o = o || n.dataTypes[0];
		a = a || {};
		a[o] = true;
		var s, c = e[o],
			l = 0,
			u = c ? c.length : 0;
		for (var f = (e === an); u > l && (f || !s); l++) {
			s = c[l](n, r, i);
			if ("string" == typeof s) {
				if (!f || a[s]) {
					s = t;
				} else {
					n.dataTypes.unshift(s);
					s = $(e, n, r, i, s, a);
				}
			}
		}
		if (!(!f && s || a["*"])) {
			(s = $(e, n, r, i, "*", a))
		}
		return s;
	}

	function w(e, n) {
		var r, i, o = I.ajaxSettings.flatOptions || {};
		for (r in n)
			if (n[r] !== t) {
				((o[r] ? e : i || (i = {}))[r] = n[r]);
			}
		if (i) {
			I.extend(true, e, i);
		}
	}

	function k(e, t, n, r) {
		if (I.isArray(t)) I.each(t, function(t, i) {
			if (n || Ut.test(e)) {
				r(e, i);
			} else {
				k(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
			}
		});
		else if (n || "object" !== I.type(t)) r(e, t);
		else {
			for (var i in t) {
				k(e + "[" + i + "]", t[i], n, r)
			}
		}
	}

	function x(e, n, r) {
		var i, o, a, s, c = e.contents,
			l = e.dataTypes,
			u = e.responseFields;
		for (o in u)
			if (o in r) {
				n[u[o]] = r[o];
			}
		for (;
			"*" === l[0];) {
			l.shift();
			if (i === t) {
				(i = e.mimeType || n.getResponseHeader("content-type"));
			}
		}
		if (i) {
			for (o in c) {
				if (c[o] && c[o].test(i)) {
					l.unshift(o);
					break
				}
			}
		}
		if (l[0] in r) {
			a = l[0];
		} else {
			for (o in r) {
				if (!l[0] || e.converters[o + " " + l[0]]) {
					a = o;
					break
				}
				if (!(s)) {
					(s = o)
				}
			}
			a = a || s;
		}
		if (a) {
			return (a !== l[0] && l.unshift(a), r[a]);
		} else {
			return void 0;
		}
	}

	function T(e, n) {
		if (e.dataFilter) {
			(n = e.dataFilter(n, e.dataType));
		}
		var r, i, o, a, s, c, l, u, f = e.dataTypes,
			d = {},
			p = f.length,
			h = f[0];
		for (r = 1; p > r; r++) {
			if (1 === r) {
				for (i in e.converters) {
					if ("string" == typeof i) {
						(d[i.toLowerCase()] = e.converters[i]);
					}
				}
			}
			if (a = h, h = f[r], "*" === h) {
				h = a;
			} else if ("*" !== a && a !== h) {
				s = a + " " + h;
				c = d[s] || d["* " + h];
				if (!c) {
					u = t;
					for (l in d)
						if (o = l.split(" "), (o[0] === a || "*" === o[0]) && (u = d[o[1] + " " + h])) {
							l = d[l], l === true ? c = u : u === true && (c = l);
							break
						}
				}
				c || u || I.error("No conversion from " + s.replace(" ", " to ")), c !== true && (n = c ? c(n) : u(l(n)))
			}
		}
		return n
	}

	function C() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}

	function S() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}

	function A() {
		setTimeout(E, 0);
		return yn = I.now();
	}

	function E() {
		yn = t
	}

	function N(e, t) {
		var n = {};
		I.each(kn.concat.apply([], kn.slice(0, t)), function() {
			n[this] = e
		});
		return n;
	}

	function j(e) {
		if (!bn[e]) {
			var t = q.body,
				n = I("<" + e + ">").appendTo(t),
				r = n.css("display");
			n.remove();
			if ("none" === r || "" === r) {
				if (!gn) {
					gn = q.createElement("iframe");
					gn.frameBorder = gn.width = gn.height = 0;
				}
				t.appendChild(gn);
				if (mn && !gn.createElement) {
					mn = (gn.contentWindow || gn.contentDocument).document;
					mn.write((I.support.boxModel ? "<!doctype html>" : "") + "<html><body>");
					mn.close();
				}
				n = mn.createElement(e);
				mn.body.appendChild(n);
				r = I.css(n, "display");
				t.removeChild(gn);
			}
			bn[e] = r;
		}
		return bn[e]
	}

	function _(e) {
		if (I.isWindow(e)) {
			return e;
		} else if (9 === e.nodeType) {
			return e.defaultView || e.parentWindow;
		} else {
			return false;
		}
	}
	var q = e.document,
		M = e.navigator,
		O = e.location,
		I = function() {
			function n() {
				if (!s.isReady) {
					try {
						q.documentElement.doScroll("left")
					} catch (e) {
						return void setTimeout(n, 1)
					}
					s.ready()
				}
			}
			var r, i, o, a, s = function(e, t) {
					return new s.fn.init(e, t, r)
				},
				c = e.jQuery,
				l = e.$,
				u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
				f = /\S/,
				d = /^\s+/,
				p = /\s+$/,
				h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
				g = /^[\],:{}\s]*$/,
				m = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				y = /(?:^|:|,)(?:\s*\[)+/g,
				b = /(webkit)[ \/]([\w.]+)/,
				$ = /(opera)(?:.*version)?[ \/]([\w.]+)/,
				w = /(msie) ([\w.]+)/,
				k = /(mozilla)(?:.*? rv:([\w.]+))?/,
				x = /-([a-z]|[0-9])/gi,
				T = /^-ms-/,
				C = function(e, t) {
					return (t + "").toUpperCase()
				},
				S = M.userAgent,
				A = Object.prototype.toString,
				E = Object.prototype.hasOwnProperty,
				N = Array.prototype.push,
				j = Array.prototype.slice,
				_ = String.prototype.trim,
				O = Array.prototype.indexOf,
				I = {};
			s.fn = s.prototype = {
				constructor: s,
				init: function(e, n, r) {
					var i, o, a, c;
					if (!e) {
						return this;
					}
					if (e.nodeType) {
						this.context = this[0] = e;
						this.length = 1;
						return this;
					}
					if ("body" === e && !n && q.body) {
						this.context = q;
						this[0] = q.body;
						this.selector = e;
						this.length = 1;
						return this;
					}
					if ("string" == typeof e) {
						if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : u.exec(e), !i || !i[1] && n) {
							if (!n || n.jquery) {
								return (n || r).find(e);
							} else {
								return this.constructor(n).find(e);
							}
						}

						if (i[1]) {
							if (n instanceof s) {
								n = n[0];
							} else {
								n = n;
							}
							if (n) {
								c = n.ownerDocument || n;
							} else {
								c = q;
							}
							a = h.exec(e);
							if (a) {
								if (s.isPlainObject(n)) {
									e = [q.createElement(a[1])];
									s.fn.attr.call(e, n, true);
								} else {
									e = [c.createElement(a[1])];
								}
							} else {
								a = s.buildFragment([i[1]], [c]);
								e = (a.cacheable ? s.clone(a.fragment) : a.fragment).childNodes;
							}
							return s.merge(this, e);
						}
						if (o = q.getElementById(i[2]), o && o.parentNode) {
							if (o.id !== i[2]) {
								return r.find(e);
							}
							this.length = 1, this[0] = o
						}
						this.context = q;
						this.selector = e;
						return this;
					}
					if (s.isFunction(e)) {
						return r.ready(e);
					} else {
						return (e.selector !== t && (this.selector = e.selector, this.context = e.context), s.makeArray(e, this));
					}
				},
				selector: "",
				jquery: "1.7.2",
				length: 0,
				size: function() {
					return this.length
				},
				toArray: function() {
					return j.call(this, 0)
				},
				get: function(e) {
					if (e == null) {
						return this.toArray();
					} else if (0 > e) {
						return this[this.length + e];
					} else {
						return this[e];
					}
				},
				pushStack: function(e, t, n) {
					var r = this.constructor();
					if (s.isArray(e)) {
						N.apply(r, e);
					} else {
						s.merge(r, e);
					}
					r.prevObject = this;
					r.context = this.context;
					if ("find" === t) {
						r.selector = this.selector + (this.selector ? " " : "") + n;
					} else if (t) {
						(r.selector = this.selector + "." + t + "(" + n + ")");
					}
					return r;
				},
				each: function(e, t) {
					return s.each(this, e, t)
				},
				ready: function(e) {
					s.bindReady();
					o.add(e);
					return this;
				},
				eq: function(e) {
					e = +e;
					if (-1 === e) {
						return this.slice(e);
					} else {
						return this.slice(e, e + 1);
					}
				},
				first: function() {
					return this.eq(0)
				},
				last: function() {
					return this.eq(-1)
				},
				slice: function() {
					return this.pushStack(j.apply(this, arguments), "slice", j.call(arguments).join(","))
				},
				map: function(e) {
					return this.pushStack(s.map(this, function(t, n) {
						return e.call(t, n, t)
					}))
				},
				end: function() {
					return this.prevObject || this.constructor(null)
				},
				push: N,
				sort: [].sort,
				splice: [].splice
			};
			s.fn.init.prototype = s.fn;
			s.extend = s.fn.extend = function() {
				var e, n, r, i, o, a, c = arguments[0] || {},
					l = 1,
					u = arguments.length,
					f = false;
				if ("boolean" == typeof c) {
					f = c;
					c = arguments[1] || {};
					l = 2;
				}
				if (!("object" == typeof c || s.isFunction(c))) {
					(c = {})
				}
				if (u === l) {
					c = this;
					--l;
				}
				for (; u > l; l++) {
					if (null != (e = arguments[l])) {
						for (n in e) {
							r = c[n];
							i = e[n];
							if (c !== i) {
								if (f && i && (s.isPlainObject(i) || (o = s.isArray(i)))) {
									if (o) {
										o = false;
										if (r && s.isArray(r)) {
											a = r;
										} 
										else {
											a = [];
										}
									} else if (r && s.isPlainObject(r)) {
										a = r;
									} else {
										a = {};
									}
									c[n] = s.extend(f, a, i);
								} else if (i !== t) {
									(c[n] = i)
								}
							}
						}
					}
				}
				return c
			};
			s.extend({
				noConflict: function(t) {
					if (e.$ === s) {
						(e.$ = l)
					}
					if (t && e.jQuery === s) {
						(e.jQuery = c)
					}
					return s;
				},
				isReady: false,
				readyWait: 1,
				holdReady: function(e) {
					if (e) {
						s.readyWait++;
					} else {
						s.ready(true);
					}
				},
				ready: function(e) {
					if (e === true && !--s.readyWait || e !== true && !s.isReady) {
						if (!q.body) {
							return setTimeout(s.ready, 1);
						}
						if (s.isReady = true, e !== true && --s.readyWait > 0) {
							return;
						}
						o.fireWith(q, [s]), s.fn.trigger && s(q).trigger("ready").off("ready")
					}
				},
				bindReady: function() {
					if (!o) {
						if (o = s.Callbacks("once memory"), "complete" === q.readyState) {
							return setTimeout(s.ready, 1);
						}
						if (q.addEventListener) {
							q.addEventListener("DOMContentLoaded", a, false);
							e.addEventListener("load", s.ready, false);
						} else if (q.attachEvent) {
							q.attachEvent("onreadystatechange", a), e.attachEvent("onload", s.ready);
							var t = false;
							try {
								t = null == e.frameElement
							} catch (r) {}
							if (q.documentElement.doScroll && t) {
								n();
							}
						}
					}
				},
				isFunction: function(e) {
					return "function" === s.type(e)
				},
				isArray: Array.isArray || function(e) {
					return "array" === s.type(e)
				},
				isWindow: function(e) {
					return null != e && e == e.window
				},
				isNumeric: function(e) {
					return !isNaN(parseFloat(e)) && isFinite(e)
				},
				type: function(e) {
					if (e == null) {
						return String(e);
					} else {
						return I[A.call(e)] || "object";
					}
				},
				isPlainObject: function(e) {
					if (!e || "object" !== s.type(e) || e.nodeType || s.isWindow(e)) {
						return false;
					}
					try {
						if (e.constructor && !E.call(e, "constructor") && !E.call(e.constructor.prototype, "isPrototypeOf")) {
							return false;
						}
					} catch (n) {
						return false;
					}
					var r;
					for (r in e);
					return r === t || E.call(e, r)
				},
				isEmptyObject: function(e) {
					for (var t in e) {
						return false;
					}
					return true
				},
				error: function(e) {
					throw new Error(e)
				},
				parseJSON: function(t) {
					if ("string" == typeof t && t) {
						return (t = s.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : g.test(t.replace(m, "@").replace(v, "]").replace(y, "")) ? new Function("return " + t)() : void s.error("Invalid JSON: " + t));
					} else {
						return null;
					}
				},
				parseXML: function(n) {
					if ("string" != typeof n || !n) {
						return null;
					}
					var r, i;
					try {
						if (e.DOMParser) {
							i = new DOMParser;
							r = i.parseFromString(n, "text/xml");
						} else {
							r = new ActiveXObject("Microsoft.XMLDOM");
							r.async = "false";
							r.loadXML(n);
						}
					} catch (o) {
						r = t
					}
					if (!(r && r.documentElement && !r.getElementsByTagName("parsererror").length)) {
						s.error("Invalid XML: " + n)
					}
					return r;
				},
				noop: function() {},
				globalEval: function(t) {
					if (t && f.test(t)) {
						(e.execScript || function(t) {
							e.eval.call(e, t)
						})(t);
					}
				},
				camelCase: function(e) {
					return e.replace(T, "ms-").replace(x, C)
				},
				nodeName: function(e, t) {
					return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
				},
				each: function(e, n, r) {
					var i, o = 0,
						a = e.length,
						c = a === t || s.isFunction(e);
					if (r) {
						if (c) {
							for (i in e) {
								if (n.apply(e[i], r) === false) {
									break;
								}
							}
						} else {
							for (; a > o && n.apply(e[o++], r) !== false;);
						}
					} else if (c) {
						for (i in e) {
							if (n.call(e[i], i, e[i]) === false) {
								break;
							}
						}
					} else {
						for (; a > o && n.call(e[o], o, e[o++]) !== false;);
					}
					return e;
				},
				trim: _ ? function(e) {
					if (e == null) {
						return "";
					} else {
						return _.call(e);
					}
				} : function(e) {
					if (e == null) {
						return "";
					} else {
						return e.toString().replace(d, "").replace(p, "");
					}
				},
				makeArray: function(e, t) {
					var n = t || [];
					if (null != e) {
						var r = s.type(e);
						if (null == e.length || "string" === r || "function" === r || "regexp" === r || s.isWindow(e)) {
							N.call(n, e);
						} else {
							s.merge(n, e);
						}
					}
					return n
				},
				inArray: function(e, t, n) {
					var r;
					if (t) {
						if (O) {
							return O.call(t, e, n);
						}
						r = t.length;
						for (n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
							if (n in t && t[n] === e) {
								return n;
							}
					}
					return -1
				},
				merge: function(e, n) {
					var r = e.length,
						i = 0;
					if ("number" == typeof n.length) {
						for (var o = n.length; o > i; i++) {
							e[r++] = n[i];
						}
					} else {
						for (; n[i] !== t;) {
							e[r++] = n[i++];
						}
					}
					e.length = r;
					return e;
				},
				grep: function(e, t, n) {
					var r, i = [];
					n = !!n;
					for (var o = 0, a = e.length; a > o; o++) {
						r = !!t(e[o], o);
						if (n !== r) {
							i.push(e[o]);
						}
					}
					return i
				},
				map: function(e, n, r) {
					var i, o, a = [],
						c = 0,
						l = e.length,
						u = e instanceof s || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || s.isArray(e));
					if (u) {
						for (; l > c; c++) {
							i = n(e[c], c, r);
							if (null != i) {
								(a[a.length] = i); 
							}
						}
					} else {
						for (o in e) {
							i = n(e[o], o, r);
							if (null != i) {
								(a[a.length] = i)
							}
						}
					}
					return a.concat.apply([], a)
				},
				guid: 1,
				proxy: function(e, n) {
					if ("string" == typeof n) {
						var r = e[n];
						n = e, e = r
					}
					if (!s.isFunction(e)) {
						return t;
					}
					var i = j.call(arguments, 2),
						o = function() {
							return e.apply(n, i.concat(j.call(arguments)))
						};
					o.guid = e.guid = e.guid || o.guid || s.guid++;
					return o;
				},
				access: function(e, n, r, i, o, a, c) {
					var l, u = r == null,
						f = 0,
						d = e.length;
					if (r && "object" == typeof r) {
						for (f in r) {
							s.access(e, n, f, r[f], 1, a, i);
						}
						o = 1
					} else if (i !== t) {
						l = c === t && s.isFunction(i);
						if (u) {
							if (l) {
								l = n;
								n = function(e, t, n) {
									return l.call(s(e), n);
								};
							} else {
								n.call(e, i);
								n = null;
							}
						}
						if (n) {
							for (; d > f; f++) {
								n(e[f], r, l ? i.call(e[f], f, n(e[f], r)) : i, c);
							}
						}
						o = 1
					}
					if (o) {
						return e;
					} else if (u) {
						return n.call(e);
					} else if (d) {
						return n(e[0], r);
					} else {
						return a;
					}
				},
				now: function() {
					return (new Date).getTime()
				},
				uaMatch: function(e) {
					e = e.toLowerCase();
					var t = b.exec(e) || $.exec(e) || w.exec(e) || e.indexOf("compatible") < 0 && k.exec(e) || [];
					return {
						browser: t[1] || "",
						version: t[2] || "0"
					}
				},
				sub: function() {
					function e(t, n) {
						return new e.fn.init(t, n)
					}
					s.extend(true, e, this);
					e.superclass = this;
					e.fn = e.prototype = this();
					e.fn.constructor = e;
					e.sub = this.sub;
					e.fn.init = function(n, r) {
						if (r && r instanceof s && !(r instanceof e)) {
							(r = e(r))
						}
						return s.fn.init.call(this, n, r, t);
					};
					e.fn.init.prototype = e.fn;
					var t = e(q);
					return e
				},
				browser: {}
			});
			s.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
				I["[object " + t + "]"] = t.toLowerCase()
			});
			i = s.uaMatch(S);
			if (i.browser) {
				s.browser[i.browser] = true;
				s.browser.version = i.version;
			}
			if (s.browser.webkit) {
				s.browser.safari = true;
			}
			if (f.test(" ")) {
				d = /^[\s\xA0]+/;
				p = /[\s\xA0]+$/;
			}
			r = s(q);
			if (q.addEventListener) {
				a = function() {
					q.removeEventListener("DOMContentLoaded", a, false);
					s.ready();
				};
			} else if (q.attachEvent) {
				a = function() {
					if ("complete" === q.readyState) {
						q.detachEvent("onreadystatechange", a);
						s.ready();
					}
				};
			}
			return s;
		}(),
		D = {};
	I.Callbacks = function(e) {
		if (e) {
			e = D[e] || n(e);
		} else {
			e = {};
		}
		var r, i, o, a, s, c, l = [],
			u = [],
			f = function(t) {
				var n, r, i, o;
				n = 0;
				for (r = t.length; r > n; n++) {
					i = t[n];
					o = I.type(i);
					if ("array" === o) {
						f(i);
					} else if ("function" === o) {
						if (!(e.unique && p.has(i))) {
							l.push(i)
						}
					}
				}
			},
			d = function(t, n) {
				for (n = n || [], r = !e.memory || [t, n], i = true, o = true, c = a || 0, a = 0, s = l.length; l && s > c; c++)
					if (l[c].apply(t, n) === false && e.stopOnFalse) {
						r = true;
						break
					}
				o = false, l && (e.once ? r === true ? p.disable() : l = [] : u && u.length && (r = u.shift(), p.fireWith(r[0], r[1])))
			},
			p = {
				add: function() {
					if (l) {
						var e = l.length;
						f(arguments), o ? s = l.length : r && r !== true && (a = e, d(r[0], r[1]))
					}
					return this
				},
				remove: function() {
					if (l) {
						for (var t = arguments, n = 0, r = t.length; r > n; n++) {
							for (var i = 0; i < l.length && (t[n] !== l[i] || (o && s >= i && (s--, c >= i && c--), l.splice(i--, 1), !e.unique)); i++);
						}
					}
					return this
				},
				has: function(e) {
					if (l) {
						for (var t = 0, n = l.length; n > t; t++)
							if (e === l[t]) {
								return true;
							}
					}
					return false
				},
				empty: function() {
					l = [];
					return this;
				},
				disable: function() {
					l = u = r = t;
					return this;
				},
				disabled: function() {
					return !l
				},
				lock: function() {
					u = t;
					if (!(r && r !== true)) {
						p.disable()
					}
					return this;
				},
				locked: function() {
					return !u
				},
				fireWith: function(t, n) {
					if (u) {
						if (o) {
							if (!(e.once)) {
								u.push([t, n]);
							}
						} else if (!(e.once && r)) {
							d(t, n);
						}
					}
					return this;
				},
				fire: function() {
					p.fireWith(this, arguments);
					return this;
				},
				fired: function() {
					return !!i
				}
			};
		return p;
	};
	var L = [].slice;
	I.extend({
		Deferred: function(e) {
			var t, n = I.Callbacks("once memory"),
				r = I.Callbacks("once memory"),
				i = I.Callbacks("memory"),
				o = "pending",
				a = {
					resolve: n,
					reject: r,
					notify: i
				},
				s = {
					done: n.add,
					fail: r.add,
					progress: i.add,
					state: function() {
						return o
					},
					isResolved: n.fired,
					isRejected: r.fired,
					then: function(e, t, n) {
						c.done(e).fail(t).progress(n);
						return this;
					},
					always: function() {
						c.done.apply(c, arguments).fail.apply(c, arguments);
						return this;
					},
					pipe: function(e, t, n) {
						return I.Deferred(function(r) {
							I.each({
								done: [e, "resolve"],
								fail: [t, "reject"],
								progress: [n, "notify"]
							}, function(e, t) {
								var n, i = t[0],
									o = t[1];
								c[e](I.isFunction(i) ? function() {
									n = i.apply(this, arguments);
									if (n && I.isFunction(n.promise)) {
										n.promise().then(r.resolve, r.reject, r.notify);
									} else {
										r[o + "With"](this === c ? r : this, [n]);
									}
								} : r[o])
							})
						}).promise()
					},
					promise: function(e) {
						if (e == null) {
							e = s;
						} else {
							for (var t in s) {
								e[t] = s[t];
							}
						}
						return e
					}
				},
				c = s.promise({});
			for (t in a) {
				c[t] = a[t].fire;
				c[t + "With"] = a[t].fireWith;
			}
			c.done(function() {
				o = "resolved"
			}, r.disable, i.lock).fail(function() {
				o = "rejected"
			}, n.disable, i.lock);
			if (e) {
				e.call(c, c)
			}
			return c;
		},
		when: function(e) {
			function t(e) {
				return function(t) {
					if (arguments.length > 1) {
						r[e] = L.call(arguments, 0);
					} 
					else {
						r[e] = t;
					}
					if (!(--s)) {
						c.resolveWith(c, r); 
					}
				}
			}

			function n(e) {
				return function(t) {
					if (arguments.length > 1) {
						a[e] = L.call(arguments, 0);
					} 
					else {
						a[e] = t;
					}
					c.notifyWith(l, a);
				}
			}
			var r = L.call(arguments, 0),
				i = 0,
				o = r.length,
				a = new Array(o),
				s = o,
				c = 1 >= o && e && I.isFunction(e.promise) ? e : I.Deferred(),
				l = c.promise();
			if (o > 1) {
				for (; o > i; i++)
					if (r[i] && r[i].promise && I.isFunction(r[i].promise)) {
						r[i].promise().then(t(i), c.reject, n(i));
					} else {
						--s;
					}
				if (!(s)) {
					c.resolveWith(c, r)
				}
			} else if (c !== e) {
				c.resolveWith(c, o ? [e] : []);
			}
			return l
		}
	}), I.support = function() {
		{
			var t, n, r, i, o, a, s, c, l, u, f, d = q.createElement("div");
			q.documentElement
		}

		d.setAttribute("className", "t");
		d.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
		n = d.getElementsByTagName("*");
		r = d.getElementsByTagName("a")[0];
		if (!n || !n.length || !r) {
			return {};
		}
		i = q.createElement("select");
		o = i.appendChild(q.createElement("option"));
		a = d.getElementsByTagName("input")[0];
		t = {
			leadingWhitespace: 3 === d.firstChild.nodeType,
			tbody: !d.getElementsByTagName("tbody").length,
			htmlSerialize: !!d.getElementsByTagName("link").length,
			style: /top/.test(r.getAttribute("style")),
			hrefNormalized: "/a" === r.getAttribute("href"),
			opacity: /^0.55/.test(r.style.opacity),
			cssFloat: !!r.style.cssFloat,
			checkOn: "on" === a.value,
			optSelected: o.selected,
			getSetAttribute: "t" !== d.className,
			enctype: !!q.createElement("form").enctype,
			html5Clone: "<:nav></:nav>" !== q.createElement("nav").cloneNode(true).outerHTML,
			submitBubbles: true,
			changeBubbles: true,
			focusinBubbles: false,
			deleteExpando: true,
			noCloneEvent: true,
			inlineBlockNeedsLayout: false,
			shrinkWrapBlocks: false,
			reliableMarginRight: true,
			pixelMargin: true
		};
		I.boxModel = t.boxModel = "CSS1Compat" === q.compatMode;
		a.checked = true;
		t.noCloneChecked = a.cloneNode(true).checked;
		i.disabled = true;
		t.optDisabled = !o.disabled;
		try {
			delete d.test
		} catch (p) {
			t.deleteExpando = false
		}
		if (!d.addEventListener && d.attachEvent && d.fireEvent && (d.attachEvent("onclick", function() {
			t.noCloneEvent = false
		}), d.cloneNode(true).fireEvent("onclick")), a = q.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), d.appendChild(a), s = q.createDocumentFragment(), s.appendChild(d.lastChild), t.checkClone = s.cloneNode(true).cloneNode(true).lastChild.checked, t.appendChecked = a.checked, s.removeChild(a), s.appendChild(d), d.attachEvent) {
			for (u in {
				submit: 1,
				change: 1,
				focusin: 1
			}) {
				l = "on" + u;
				f = l in d;
				if (!(f)) {
					d.setAttribute(l, "return;");
					f = "function" == typeof d[l];
				}
				t[u + "Bubbles"] = f;
				s.removeChild(d);
			}
		}
		s = i = o = d = a = null;
		I(function() {
			var n, r, i, o, a, s, l, u, p, h, g, m, v = q.getElementsByTagName("body")[0];
			if (v) {
				(l = 1, m = "padding:0;margin:0;border:", h = "position:absolute;top:0;left:0;width:1px;height:1px;", g = m + "0;visibility:hidden;", u = "style='" + h + m + "5px solid #000;", p = "<div " + u + "display:block;'><div style='" + m + "0;display:block;overflow:hidden;'></div></div><table " + u + "' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", n = q.createElement("div"), n.style.cssText = g + "width:0;height:0;position:static;top:0;margin-top:" + l + "px", v.insertBefore(n, v.firstChild), d = q.createElement("div"), n.appendChild(d), d.innerHTML = "<table><tr><td style='" + m + "0;display:none'></td><td>t</td></tr></table>", c = d.getElementsByTagName("td"), f = 0 === c[0].offsetHeight, c[0].style.display = "", c[1].style.display = "none", t.reliableHiddenOffsets = f && 0 === c[0].offsetHeight, e.getComputedStyle && (d.innerHTML = "", s = q.createElement("div"), s.style.width = "0", s.style.marginRight = "0", d.style.width = "2px", d.appendChild(s), t.reliableMarginRight = 0 === (parseInt((e.getComputedStyle(s, null) || {
					marginRight: 0
				}).marginRight, 10) || 0)), "undefined" != typeof d.style.zoom && (d.innerHTML = "", d.style.width = d.style.padding = "1px", d.style.border = 0, d.style.overflow = "hidden", d.style.display = "inline", d.style.zoom = 1, t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div style='width:5px;'></div>", t.shrinkWrapBlocks = 3 !== d.offsetWidth), d.style.cssText = h + g, d.innerHTML = p, r = d.firstChild, i = r.firstChild, o = r.nextSibling.firstChild.firstChild, a = {
					doesNotAddBorder: 5 !== i.offsetTop,
					doesAddBorderForTableAndCells: 5 === o.offsetTop
				}, i.style.position = "fixed", i.style.top = "20px", a.fixedPosition = 20 === i.offsetTop || 15 === i.offsetTop, i.style.position = i.style.top = "", r.style.overflow = "hidden", r.style.position = "relative", a.subtractsBorderForOverflowNotVisible = -5 === i.offsetTop, a.doesNotIncludeMarginInBodyOffset = v.offsetTop !== l, e.getComputedStyle && (d.style.marginTop = "1%", t.pixelMargin = "1%" !== (e.getComputedStyle(d, null) || {
					marginTop: 0
				}).marginTop), "undefined" != typeof n.style.zoom && (n.style.zoom = 1), v.removeChild(n), s = d = n = null, I.extend(t, a));
			}
		});
		return t;
	}();
	var P = /^(?:\{.*\}|\[.*\])$/,
		F = /([A-Z])/g;
	I.extend({
		cache: {},
		uuid: 0,
		expando: "jQuery" + (I.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: true,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: true
		},
		hasData: function(e) {
			if (e.nodeType) {
				e = I.cache[e[I.expando]];
			} else {
				e = e[I.expando];
			}
			return !!e && !i(e);
		},
		data: function(e, n, r, i) {
			if (I.acceptData(e)) {
				var o, a, s, c = I.expando,
					l = "string" == typeof n,
					u = e.nodeType,
					f = u ? I.cache : e,
					d = u ? e[c] : e[c] && c,
					p = "events" === n;
				if (d && f[d] && (p || i || f[d].data) || !l || r !== t) {
					if (!(d)) {
						if (u) {
							e[c] = d = ++I.uuid;
						} else {
							d = c;
						}
					}
					if (!(f[d])) {
						f[d] = {};
						if (!(u)) {
							(f[d].toJSON = I.noop); 
						}
					}
					if (("object" == typeof n || "function" == typeof n)) {
						if (i) {
							f[d] = I.extend(f[d], n);
						} else {
							f[d].data = I.extend(f[d].data, n);
						}
					}
					o = a = f[d];
					if (!(i)) {
						if (!(a.data)) {
							(a.data = {}); 
						}
						a = a.data;
					}
					if (r !== t) {
						(a[I.camelCase(n)] = r)
					}
					if (p && !a[n]) {
						return o.events;
					} else {
						return (l ? (s = a[n], s == null && (s = a[I.camelCase(n)])) : s = a, s);
					}
				}
			}
		},
		removeData: function(e, t, n) {
			if (I.acceptData(e)) {
				var r, o, a, s = I.expando,
					c = e.nodeType,
					l = c ? I.cache : e,
					u = c ? e[s] : s;
				if (l[u]) {
					if (t && (r = n ? l[u] : l[u].data)) {
						if (!(I.isArray(t))) {
							if (t in r) {
								t = [t];
							} else {
								t = I.camelCase(t);
								if (t in r) {
									t = [t];
								} 
								else {
									t = t.split(" ");
								}
							}
						}
						o = 0;
						for (a = t.length; a > o; o++) {
							delete r[t[o]];
						}
						if (!(n ? i : I.isEmptyObject)(r)) {
							return;
						}
					}
					if ((n || (delete l[u].data, i(l[u])))) {
						if (I.support.deleteExpando || !l.setInterval) {
							delete l[u];
						} else {
							l[u] = null;
						}
						if (c) {
							if (I.support.deleteExpando) {
								delete e[s];
							} else if (e.removeAttribute) {
								e.removeAttribute(s);
							} else {
								e[s] = null;
							}
						}
					}
				}
			}
		},
		_data: function(e, t, n) {
			return I.data(e, t, n, true)
		},
		acceptData: function(e) {
			if (e.nodeName) {
				var t = I.noData[e.nodeName.toLowerCase()];
				if (t) {
					return !(t === true || e.getAttribute("classid") !== t);
				}
			}
			return true
		}
	});
	I.fn.extend({
		data: function(e, n) {
			var i, o, a, s, c, l = this[0],
				u = 0,
				f = null;
			if (e === t) {
				if (this.length && (f = I.data(l), 1 === l.nodeType && !I._data(l, "parsedAttrs"))) {
					a = l.attributes;
					for (c = a.length; c > u; u++) {
						s = a[u].name;
						if (0 === s.indexOf("data-")) {
							s = I.camelCase(s.substring(5));
							r(l, s, f[s]);
						}
					}
					I._data(l, "parsedAttrs", true)
				}
				return f
			}
			if ("object" == typeof e) {
				return this.each(function() {
					I.data(this, e)
				});
			} else {
				return (i = e.split(".", 2), i[1] = i[1] ? "." + i[1] : "", o = i[1] + "!", I.access(this, function(n) {
					if (n === t) {
						return (f = this.triggerHandler("getData" + o, [i[0]]), f === t && l && (f = I.data(l, e), f = r(l, e, f)), f === t && i[1] ? this.data(i[0]) : f);
					} else {
						return (i[1] = n, void this.each(function() {
							var t = I(this);
							t.triggerHandler("setData" + o, i);
							I.data(this, e, n);
							t.triggerHandler("changeData" + o, i);
						}));
					}
				}, null, n, arguments.length > 1, null, false));
			}
		},
		removeData: function(e) {
			return this.each(function() {
				I.removeData(this, e)
			})
		}
	});
	I.extend({
		_mark: function(e, t) {
			if (e) {
				t = (t || "fx") + "mark";
				I._data(e, t, (I._data(e, t) || 0) + 1);
			}
		},
		_unmark: function(e, t, n) {
			if (e !== true) {
				n = t;
				t = e;
				e = false;
			}
			if (t) {
				n = n || "fx";
				var r = n + "mark",
					i = e ? 0 : (I._data(t, r) || 1) - 1;
				if (i) {
					I._data(t, r, i);
				} else {
					I.removeData(t, r, true);
					o(t, n, "mark");
				}
			}
		},
		queue: function(e, t, n) {
			var r;
			if (e) {
				return (t = (t || "fx") + "queue", r = I._data(e, t), n && (!r || I.isArray(n) ? r = I._data(e, t, I.makeArray(n)) : r.push(n)), r || []);
			} else {
				return void 0;
			}
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = I.queue(e, t),
				r = n.shift(),
				i = {};
			if ("inprogress" === r) {
				(r = n.shift());
			}
			if (r) {
				if ("fx" === t) {
					n.unshift("inprogress");
				}
				I._data(e, t + ".run", i);
				r.call(e, function() {
					I.dequeue(e, t)
				}, i);
			}
			if (!(n.length)) {
				I.removeData(e, t + "queue " + t + ".run", true);
				o(e, t, "queue");
			}
		}
	});
	I.fn.extend({
		queue: function(e, n) {
			var r = 2;
			if ("string" != typeof e) {
				n = e;
				e = "fx";
				r--;
			}
			if (arguments.length < r) {
				return I.queue(this[0], e);
			} else if (n === t) {
				return this;
			} else {
				return this.each(function() {
					var t = I.queue(this, e, n);
					if ("fx" === e && "inprogress" !== t[0]) {
						I.dequeue(this, e);
					}
				});
			}
		},
		dequeue: function(e) {
			return this.each(function() {
				I.dequeue(this, e)
			})
		},
		delay: function(e, t) {
			if (I.fx) {
				e = I.fx.speeds[e] || e;
			} else {
				e = e;
			}
			t = t || "fx";
			return this.queue(t, function(t, n) {
				var r = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(r)
				}
			});
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, n) {
			function r() {
				if (!(--c)) {
					o.resolveWith(a, [a])
				}
			}
			"string" != typeof e && (n = e, e = t), e = e || "fx";
			for (var i, o = I.Deferred(), a = this, s = a.length, c = 1, l = e + "defer", u = e + "queue", f = e + "mark"; s--;)
				if ((i = I.data(a[s], l, t, true) || (I.data(a[s], u, t, true) || I.data(a[s], f, t, true)) && I.data(a[s], l, I.Callbacks("once memory"), true))) {
					c++;
					i.add(r);
				}
			r();
			return o.promise(n);
		}
	});
	var z, R, H, B = /[\n\t\r]/g,
		U = /\s+/,
		W = /\r/g,
		V = /^(?:button|input)$/i,
		J = /^(?:button|input|object|select|textarea)$/i,
		X = /^a(?:rea)?$/i,
		G = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		K = I.support.getSetAttribute;
	I.fn.extend({
		attr: function(e, t) {
			return I.access(this, I.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				I.removeAttr(this, e)
			})
		},
		prop: function(e, t) {
			return I.access(this, I.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			e = I.propFix[e] || e;
			return this.each(function() {
				try {
					this[e] = t;
					delete this[e];
				} catch (n) {}
			});
		},
		addClass: function(e) {
			var t, n, r, i, o, a, s;
			if (I.isFunction(e)) {
				return this.each(function(t) {
					I(this).addClass(e.call(this, t, this.className))
				});
			}
			if (e && "string" == typeof e) {
				t = e.split(U);
				n = 0;
				for (r = this.length; r > n; n++)
					if (i = this[n], 1 === i.nodeType)
						if (i.className || 1 !== t.length) {
							for (o = " " + i.className + " ", a = 0, s = t.length; s > a; a++)
								if (!(~o.indexOf(" " + t[a] + " "))) {
									(o += t[a] + " ")
								}
							i.className = I.trim(o)
						} else {
							i.className = e;
						}
			}
			return this
		},
		removeClass: function(e) {
			var n, r, i, o, a, s, c;
			if (I.isFunction(e)) {
				return this.each(function(t) {
					I(this).removeClass(e.call(this, t, this.className))
				});
			}
			if (e && "string" == typeof e || e === t) {
				n = (e || "").split(U);
				r = 0;
				for (i = this.length; i > r; r++)
					if (o = this[r], 1 === o.nodeType && o.className)
						if (e) {
							for (a = (" " + o.className + " ").replace(B, " "), s = 0, c = n.length; c > s; s++) {
								a = a.replace(" " + n[s] + " ", " ");
							}
							o.className = I.trim(a)
						} else {
							o.className = "";
						}
			}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e,
				r = "boolean" == typeof t;
			return this.each(I.isFunction(e) ? function(n) {
				I(this).toggleClass(e.call(this, n, this.className, t), t)
			} : function() {
				if ("string" === n) {
					for (var i, o = 0, a = I(this), s = t, c = e.split(U); i = c[o++];) {
						if (r) {
							s = s;
						} 
						else {
							s = !a.hasClass(i);
						}
						a[s ? "addClass" : "removeClass"](i);
					}
				} else if (("undefined" === n || "boolean" === n)) {
					if (this.className) {
						I._data(this, "__className__", this.className)
					}
					if (this.className || e === false) {
						this.className = "";
					} else {
						this.className = I._data(this, "__className__") || "";
					}
				}
			})
		},
		hasClass: function(e) {
			for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
				if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(B, " ").indexOf(t) > -1) {
					return true;
				}
			return false
		},
		val: function(e) {
			var n, r, i, o = this[0]; {
				if (arguments.length) {
					i = I.isFunction(e);
					return this.each(function(r) {
						var o, a = I(this);
						if (1 === this.nodeType) {
							if (i) {
								o = e.call(this, r, a.val());
							} else {
								o = e;
							}
							if (o == null) {
								o = "";
							} else if ("number" == typeof o) {
								o += "";
							} else {
								if (I.isArray(o)) {
									(o = I.map(o, function(e) {
										if (e == null) {
											return "";
										} else {
											return e + "";
										}
									}))
								};
							}
							n = I.valHooks[this.type] || I.valHooks[this.nodeName.toLowerCase()];
							if (!(n && "set" in n && n.set(this, o, "value") !== t)) {
								(this.value = o)
							}
						}
					});
				}
				if (o) {
					n = I.valHooks[o.type] || I.valHooks[o.nodeName.toLowerCase()];
					if (n && "get" in n && (r = n.get(o, "value")) !== t) {
						return r;
					} else {
						return (r = o.value, "string" == typeof r ? r.replace(W, "") : r == null ? "" : r);
					}
				}
			}
		}
	});
	I.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = e.attributes.value;
					if (!t || t.specified) {
						return e.value;
					} else {
						return e.text;
					}
				}
			},
			select: {
				get: function(e) {
					var t, n, r, i, o = e.selectedIndex,
						a = [],
						s = e.options,
						c = "select-one" === e.type;
					if (0 > o) {
						return null;
					}
					if (c) {
						n = o;
					} else {
						n = 0;
					}
					for (r = c ? o + 1 : s.length; r > n; n++)
						if (i = s[n], !(!i.selected || (I.support.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && I.nodeName(i.parentNode, "optgroup"))) {
							if (t = I(i).val(), c) {
								return t;
							}
							a.push(t)
						}
					if (c && !a.length && s.length) {
						return I(s[o]).val();
					} else {
						return a;
					}
				},
				set: function(e, t) {
					var n = I.makeArray(t);
					I(e).find("option").each(function() {
						this.selected = I.inArray(I(this).val(), n) >= 0
					});
					if (!(n.length)) {
						(e.selectedIndex = -1)
					}
					return n;
				}
			}
		},
		attrFn: {
			val: true,
			css: true,
			html: true,
			text: true,
			data: true,
			width: true,
			height: true,
			offset: true
		},
		attr: function(e, n, r, i) {
			var o, a, s, c = e.nodeType;
			if (e && 3 !== c && 8 !== c && 2 !== c) {
				if (i && n in I.attrFn) {
					return I(e)[n](r);
				} else if ("undefined" == typeof e.getAttribute) {
					return I.prop(e, n, r);
				} else {
					return (s = 1 !== c || !I.isXMLDoc(e), s && (n = n.toLowerCase(), a = I.attrHooks[n] || (G.test(n) ? R : z)), r !== t ? null === r ? void I.removeAttr(e, n) : a && "set" in a && s && (o = a.set(e, r, n)) !== t ? o : (e.setAttribute(n, "" + r), r) : a && "get" in a && s && null !== (o = a.get(e, n)) ? o : (o = e.getAttribute(n), null === o ? t : o));
				}
			}
		},
		removeAttr: function(e, t) {
			var n, r, i, o, a, s = 0;
			if (t && 1 === e.nodeType) {
				r = t.toLowerCase().split(U);
				for (o = r.length; o > s; s++) {
					i = r[s];
					if (i) {
						n = I.propFix[i] || i;
						a = G.test(i);
						if (!(a)) {
							I.attr(e, i, "");
						}
						e.removeAttribute(K ? i : n);
						if (a && n in e) {
							(e[n] = false);
						}
					}
				}
			}
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (V.test(e.nodeName) && e.parentNode) I.error("type property can't be changed");
					else if (!I.support.radioValue && "radio" === t && I.nodeName(e, "input")) {
						var n = e.value;
						e.setAttribute("type", t);
						if (n) {
							(e.value = n)
						}
						return t;
					}
				}
			},
			value: {
				get: function(e, t) {
					if (z && I.nodeName(e, "button")) {
						return z.get(e, t);
					} else if (t in e) {
						return e.value;
					} else {
						return null;
					}
				},
				set: function(e, t, n) {
					if (z && I.nodeName(e, "button")) {
						return z.set(e, t, n);
					} else {
						return void(e.value = t);
					}
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(e, n, r) {
			var i, o, a, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) {
				a = 1 !== s || !I.isXMLDoc(e);
				if (a) {
					n = I.propFix[n] || n;
					o = I.propHooks[n];
				}
				if (r !== t) {
					if (o && "set" in o && (i = o.set(e, r, n)) !== t) {
						return i;
					} else {
						return e[n] = r;
					}
				} else if (o && "get" in o && null !== (i = o.get(e, n))) {
					return i;
				} else {
					return e[n];
				}
			}
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var n = e.getAttributeNode("tabindex");
					if (n && n.specified) {
						return parseInt(n.value, 10);
					} else if (J.test(e.nodeName) || X.test(e.nodeName) && e.href) {
						return 0;
					} else {
						return t;
					}
				}
			}
		}
	});
	I.attrHooks.tabindex = I.propHooks.tabIndex;
	R = {
		get: function(e, n) {
			var r, i = I.prop(e, n);
			if (i === true || "boolean" != typeof i && (r = e.getAttributeNode(n)) && r.nodeValue !== false) {
				return n.toLowerCase();
			} else {
				return t;
			}
		},
		set: function(e, t, n) {
			var r;
			if (t === false) {
				I.removeAttr(e, n);
			} else {
				r = I.propFix[n] || n;
				if (r in e) {
					e[r] = true;
				}
				e.setAttribute(n, n.toLowerCase());
			}
			return n;
		}
	};
	if (!(K)) {
		H = {
			name: true,
			id: true,
			coords: true
		};
		z = I.valHooks.button = {
			get: function(e, n) {
				var r;
				r = e.getAttributeNode(n);
				if (r && (H[n] ? "" !== r.nodeValue : r.specified)) {
					return r.nodeValue;
				} else {
					return t;
				}
			},
			set: function(e, t, n) {
				var r = e.getAttributeNode(n);
				if (!(r)) {
					r = q.createAttribute(n);
					e.setAttributeNode(r);
				}
				return r.nodeValue = t + "";
			}
		};
		I.attrHooks.tabindex.set = z.set;
		I.each(["width", "height"], function(e, t) {
			I.attrHooks[t] = I.extend(I.attrHooks[t], {
				set: function(e, n) {
					if ("" === n) {
						return (e.setAttribute(t, "auto"), n);
					} else {
						return void 0;
					}
				}
			})
		});
		I.attrHooks.contenteditable = {
			get: z.get,
			set: function(e, t, n) {
				if ("" === t) {
					(t = "false"); 
				}
				z.set(e, t, n);
			}
		};
	}
	if (!(I.support.hrefNormalized)) {
		I.each(["href", "src", "width", "height"], function(e, n) {
			I.attrHooks[n] = I.extend(I.attrHooks[n], {
				get: function(e) {
					var r = e.getAttribute(n, 2);
					if (null === r) {
						return t;
					} else {
						return r;
					}
				}
			})
		});
	}
	if (!(I.support.style)) {
		(I.attrHooks.style = {
			get: function(e) {
				return e.style.cssText.toLowerCase() || t
			},
			set: function(e, t) {
				return e.style.cssText = "" + t
			}
		});
	}
	if (!(I.support.optSelected)) {
		(I.propHooks.selected = I.extend(I.propHooks.selected, {
			get: function(e) {
				var t = e.parentNode;
				if (t) {
					t.selectedIndex;
					if (t.parentNode) {
						t.parentNode.selectedIndex; 
					}
				}
				return null;
			}
		}));
	}
	if (!(I.support.enctype)) {
		I.propFix.enctype = "encoding";
	}
	if (!(I.support.checkOn)) {
		I.each(["radio", "checkbox"], function() {
			I.valHooks[this] = {
				get: function(e) {
					if (null === e.getAttribute("value")) {
						return "on";
					} else {
						return e.value;
					}
				}
			}
		});
	}
	I.each(["radio", "checkbox"], function() {
		I.valHooks[this] = I.extend(I.valHooks[this], {
			set: function(e, t) {
				if (I.isArray(t)) {
					return e.checked = I.inArray(I(e).val(), t) >= 0;
				} else {
					return void 0;
				}
			}
		})
	});
	var Q = /^(?:textarea|input|select)$/i,
		Y = /^([^\.]*)?(?:\.(.+))?$/,
		Z = /(?:^|\s)hover(\.\S+)?\b/,
		et = /^key/,
		tt = /^(?:mouse|contextmenu)|click/,
		nt = /^(?:focusinfocus|focusoutblur)$/,
		rt = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
		it = function(e) {
			var t = rt.exec(e);
			if (t) {
				t[1] = (t[1] || "").toLowerCase();
				t[3] = t[3] && new RegExp("(?:^|\\s)" + t[3] + "(?:\\s|$)");
			}
			return t;
		},
		ot = function(e, t) {
			var n = e.attributes || {};
			return !(t[1] && e.nodeName.toLowerCase() !== t[1] || t[2] && (n.id || {}).value !== t[2] || t[3] && !t[3].test((n["class"] || {}).value))
		},
		at = function(e) {
			if (I.event.special.hover) {
				return e;
			} else {
				return e.replace(Z, "mouseenter$1 mouseleave$1");
			}
		};
	I.event = {
		add: function(e, n, r, i, o) {
			var a, s, c, l, u, f, d, p, h, g, m;
			if (3 !== e.nodeType && 8 !== e.nodeType && n && r && (a = I._data(e))) {
				for (r.handler && (h = r, r = h.handler, o = h.selector), r.guid || (r.guid = I.guid++), c = a.events, c || (a.events = c = {}), s = a.handle, s || (a.handle = s = function(e) {
					if ("undefined" == typeof I || e && I.event.triggered === e.type) {
						return t;
					} else {
						return I.event.dispatch.apply(s.elem, arguments);
					}
				}, s.elem = e), n = I.trim(at(n)).split(" "), l = 0; l < n.length; l++) {
					u = Y.exec(n[l]) || [];
					f = u[1];
					d = (u[2] || "").split(".").sort();
					m = I.event.special[f] || {};
					f = (o ? m.delegateType : m.bindType) || f;
					m = I.event.special[f] || {};
					p = I.extend({
						type: f,
						origType: u[1],
						data: i,
						handler: r,
						guid: r.guid,
						selector: o,
						quick: o && it(o),
						namespace: d.join(".")
					}, h);
					g = c[f];
					if (!(g)) {
						g = c[f] = [];
						g.delegateCount = 0;
						if (!(m.setup && m.setup.call(e, i, d, s) !== false)) {
							if (e.addEventListener) {
								e.addEventListener(f, s, false);
							} else if (e.attachEvent) {
								e.attachEvent("on" + f, s); 
							} 
						}
					}
					if (m.add) {
						m.add.call(e, p);
						if (!(p.handler.guid)) {
							(p.handler.guid = r.guid); 
						}
					}
					if (o) {
						g.splice(g.delegateCount++, 0, p);
					} else {
						g.push(p);
					}
					I.event.global[f] = true;
				}
				e = null
			}
		},
		global: {},
		remove: function(e, t, n, r, i) {
			var o, a, s, c, l, u, f, d, p, h, g, m, v = I.hasData(e) && I._data(e);
			if (v && (d = v.events)) {
				t = I.trim(at(t || "")).split(" ");
				for (o = 0; o < t.length; o++)
					if (a = Y.exec(t[o]) || [], s = c = a[1], l = a[2], s) {
						for (p = I.event.special[s] || {}, s = (r ? p.delegateType : p.bindType) || s, g = d[s] || [], u = g.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null, f = 0; f < g.length; f++) {
							m = g[f];
							if (!(!i && c !== m.origType || n && n.guid !== m.guid || l && !l.test(m.namespace) || r && r !== m.selector && ("**" !== r || !m.selector))) {
								g.splice(f--, 1);
								if (m.selector) {
									g.delegateCount--; 
								}
								if (p.remove) {
									p.remove.call(e, m); 
								}
							}
						}
						if (0 === g.length && u !== g.length) {
							if (!(p.teardown && p.teardown.call(e, l) !== false)) {
								I.removeEvent(e, s, v.handle)
							}
							delete d[s];
						}
					} else {
						for (s in d) {
							I.event.remove(e, s + t[o], n, r, true);
						}
					}
				if (I.isEmptyObject(d)) {
					h = v.handle;
					if (h) {
						h.elem = null;
					}
					I.removeData(e, ["events", "handle"], true);
				}
			}
		},
		customEvent: {
			getData: true,
			setData: true,
			changeData: true
		},
		trigger: function(n, r, i, o) {
			if (!i || 3 !== i.nodeType && 8 !== i.nodeType) {
				var a, s, c, l, u, f, d, p, h, g, m = n.type || n,
					v = [];
				if (!nt.test(m + I.event.triggered) && (m.indexOf("!") >= 0 && (m = m.slice(0, -1), s = true), m.indexOf(".") >= 0 && (v = m.split("."), m = v.shift(), v.sort()), i && !I.event.customEvent[m] || I.event.global[m]))
					if (n = "object" == typeof n ? n[I.expando] ? n : new I.Event(m, n) : new I.Event(m), n.type = m, n.isTrigger = true, n.exclusive = s, n.namespace = v.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, f = m.indexOf(":") < 0 ? "on" + m : "", i) {
						n.result = t;
						if (!(n.target)) {
							(n.target = i)
						}
						if (null != r) {
							r = I.makeArray(r);
						} else {
							r = [];
						}
						r.unshift(n);
						d = I.event.special[m] || {};
						if (!d.trigger || d.trigger.apply(i, r) !== false) {
							if (h = [
								[i, d.bindType || m]
							], !o && !d.noBubble && !I.isWindow(i)) {
								g = d.delegateType || m;
								if (nt.test(g + m)) {
									l = i;
								} else {
									l = i.parentNode;
								}
								for (u = null; l; l = l.parentNode) {
									h.push([l, g]);
									u = l;
								}
								if (u && u === i.ownerDocument) {
									h.push([u.defaultView || u.parentWindow || e, g]);
								}
							}
							for (c = 0; c < h.length && !n.isPropagationStopped(); c++) {
								l = h[c][0];
								n.type = h[c][1];
								p = (I._data(l, "events") || {})[n.type] && I._data(l, "handle");
								if (p) {
									p.apply(l, r);
								}
								p = f && l[f];
								if (p && I.acceptData(l) && p.apply(l, r) === false) {
									n.preventDefault();
								}
							}
							n.type = m;
							if (!(o || n.isDefaultPrevented() || d._default && d._default.apply(i.ownerDocument, r) !== false || "click" === m && I.nodeName(i, "a") || !I.acceptData(i))) {
								if (f && i[m] && ("focus" !== m && "blur" !== m || 0 !== n.target.offsetWidth) && !I.isWindow(i)) {
									u = i[f];
									if (u) {
										i[f] = null;
									}
									I.event.triggered = m;
									i[m]();
									I.event.triggered = t;
									if (u) {
										i[f] = u;
									}
								}
							}
							return n.result;
						}
					} else {
						a = I.cache;
						for (c in a)
							if (a[c].events && a[c].events[m]) {
								I.event.trigger(n, r, a[c].handle.elem, true);
							}
					}
			}
		},
		dispatch: function(n) {
			n = I.event.fix(n || e.event);
			var r, i, o, a, s, c, l, u, f, d, p = (I._data(this, "events") || {})[n.type] || [],
				h = p.delegateCount,
				g = [].slice.call(arguments, 0),
				m = !n.exclusive && !n.namespace,
				v = I.event.special[n.type] || {},
				y = [];
			g[0] = n;
			n.delegateTarget = this;
			if (!v.preDispatch || v.preDispatch.call(this, n) !== false) {
				if (h && (!n.button || "click" !== n.type)) {
					a = I(this);
					a.context = this.ownerDocument || this;
					for (o = n.target; o != this; o = o.parentNode || this) {
						if (o.disabled !== true) {
							c = {};
							u = [];
							a[0] = o;
							for (r = 0; h > r; r++) {
								f = p[r];
								d = f.selector;
								if (c[d] === t) {
									if (f.quick) {
										c[d] = ot(o, f.quick);
									} 
									else {
										c[d] = a.is(d);
									}
								}
								if (c[d]) {
									u.push(f);
								}
							}
							if (u.length) {
								y.push({
									elem: o,
									matches: u
								});
							}
						}
					}
				}
				if (p.length > h) {
					y.push({
						elem: this,
						matches: p.slice(h)
					})
				}
				for (r = 0; r < y.length && !n.isPropagationStopped(); r++) {
					l = y[r];
					n.currentTarget = l.elem;
					for (i = 0; i < l.matches.length && !n.isImmediatePropagationStopped(); i++) {
						f = l.matches[i];
						if ((m || !n.namespace && !f.namespace || n.namespace_re && n.namespace_re.test(f.namespace))) {
							n.data = f.data;
							n.handleObj = f;
							s = ((I.event.special[f.origType] || {}).handle || f.handler).apply(l.elem, g);
							if (s !== t) {
								n.result = s;
								if (s === false) {
									(n.preventDefault(), n.stopPropagation());
								}
							}
						}
					}
				}
				if (v.postDispatch) {
					v.postDispatch.call(this, n)
				}
				return n.result;
			}
		},
		props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				if (null == e.which) {
					if (null != t.charCode) {
						e.which = t.charCode;
					} else {
						e.which = t.keyCode;
					}
				}
				return e;
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, n) {
				var r, i, o, a = n.button,
					s = n.fromElement;
				if (null == e.pageX && null != n.clientX) {
					r = e.target.ownerDocument || q;
					i = r.documentElement;
					o = r.body;
					e.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0);
					e.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0);
				}
				if (!e.relatedTarget && s) {
					if (s === e.target) {
						e.relatedTarget = n.toElement;
					} else {
						e.relatedTarget = s;
					}
				}
				if (!(e.which || a === t)) {
					if (1 & a) {
						e.which = 1;
					} else if (2 & a) {
						e.which = 3;
					} else if (4 & a) {
						e.which = 2;
					} else {
						e.which = 0;
					}
				}
				return e;
			}
		},
		fix: function(e) {
			if (e[I.expando]) {
				return e;
			}
			var n, r, i = e,
				o = I.event.fixHooks[e.type] || {},
				a = o.props ? this.props.concat(o.props) : this.props;
			for (e = I.Event(i), n = a.length; n;) {
				r = a[--n];
				e[r] = i[r];
			}
			if (!(e.target)) {
				(e.target = i.srcElement || q)
			}
			if (3 === e.target.nodeType) {
				(e.target = e.target.parentNode)
			}
			if (e.metaKey === t) {
				(e.metaKey = e.ctrlKey)
			}
			if (o.filter) {
				return o.filter(e, i);
			} else {
				return e;
			}
		},
		special: {
			ready: {
				setup: I.bindReady
			},
			load: {
				noBubble: true
			},
			focus: {
				delegateType: "focusin"
			},
			blur: {
				delegateType: "focusout"
			},
			beforeunload: {
				setup: function(e, t, n) {
					if (I.isWindow(this)) {
						this.onbeforeunload = n;
					}
				},
				teardown: function(e, t) {
					if (this.onbeforeunload === t) {
						this.onbeforeunload = null;
					}
				}
			}
		},
		simulate: function(e, t, n, r) {
			var i = I.extend(new I.Event, n, {
				type: e,
				isSimulated: true,
				originalEvent: {}
			});
			r ? I.event.trigger(i, null, t) : I.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
		}
	};
	I.event.handle = I.event.dispatch;
	if (q.removeEventListener) {
		I.removeEvent = function(e, t, n) {
			if (e.removeEventListener) {
				e.removeEventListener(t, n, false);
			}
		};
	} else {
		I.removeEvent = function(e, t, n) {
			if (e.detachEvent) {
				e.detachEvent("on" + t, n);
			}
		};
	}
	I.Event = function(e, t) {
		if (this instanceof I.Event) {
			return (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === false || e.getPreventDefault && e.getPreventDefault() ? s : a) : this.type = e, t && I.extend(this, t), this.timeStamp = e && e.timeStamp || I.now(), void(this[I.expando] = true));
		} else {
			return new I.Event(e, t);
		}
	};
	I.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = s;
			var e = this.originalEvent;
			if (e) {
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
			}
		},
		stopPropagation: function() {
			this.isPropagationStopped = s;
			var e = this.originalEvent;
			if (e) {
				if (e.stopPropagation) {
					e.stopPropagation()
				}
				e.cancelBubble = true;
			}
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = s;
			this.stopPropagation();
		},
		isDefaultPrevented: a,
		isPropagationStopped: a,
		isImmediatePropagationStopped: a
	};
	I.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(e, t) {
		I.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				{
					var n, r = this,
						i = e.relatedTarget,
						o = e.handleObj;
					o.selector
				}
				if ((!i || i !== r && !I.contains(r, i))) {
					e.type = o.origType;
					n = o.handler.apply(this, arguments);
					e.type = t;
				}
				return n;
			}
		}
	});
	if (!(I.support.submitBubbles)) {
		(I.event.special.submit = {
			setup: function() {
				if (I.nodeName(this, "form")) {
					return false;
				} else {
					return void I.event.add(this, "click._submit keypress._submit", function(e) {
						var n = e.target,
							r = I.nodeName(n, "input") || I.nodeName(n, "button") ? n.form : t;
						if (r && !r._submit_attached) {
							I.event.add(r, "submit._submit", function(e) {
								e._submit_bubble = true
							});
							r._submit_attached = true;
						}
					});
				}
			},
			postDispatch: function(e) {
				if (e._submit_bubble) {
					delete e._submit_bubble;
					if (this.parentNode && !e.isTrigger) {
						I.event.simulate("submit", this.parentNode, e, true)
					}
				}
			},
			teardown: function() {
				if (I.nodeName(this, "form")) {
					return false;
				} else {
					return void I.event.remove(this, "._submit");
				}
			}
		});
	}
	if (!(I.support.changeBubbles)) {
		(I.event.special.change = {
			setup: function() {
				if (Q.test(this.nodeName)) {
					return (("checkbox" === this.type || "radio" === this.type) && (I.event.add(this, "propertychange._change", function(e) {
						if ("checked" === e.originalEvent.propertyName) {
							this._just_changed = true;
						}
					}), I.event.add(this, "click._change", function(e) {
						if (this._just_changed && !e.isTrigger) {
							this._just_changed = false;
							I.event.simulate("change", this, e, true);
						}
					})), false);
				} else {
					return void I.event.add(this, "beforeactivate._change", function(e) {
						var t = e.target;
						if (Q.test(t.nodeName) && !t._change_attached) {
							I.event.add(t, "change._change", function(e) {
								if (!(!this.parentNode || e.isSimulated || e.isTrigger)) {
									I.event.simulate("change", this.parentNode, e, true)
								}
							});
							t._change_attached = true;
						}
					});
				}
			},
			handle: function(e) {
				var t = e.target;
				if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) {
					return e.handleObj.handler.apply(this, arguments);
				} else {
					return void 0;
				}
			},
			teardown: function() {
				I.event.remove(this, "._change");
				return Q.test(this.nodeName);
			}
		});
	}
	if (!(I.support.focusinBubbles)) {
		I.each({
			focus: "focusin",
			blur: "focusout"
		}, function(e, t) {
			var n = 0,
				r = function(e) {
					I.event.simulate(t, e.target, I.event.fix(e), true)
				};
			I.event.special[t] = {
				setup: function() {
					if (0 === n++) {
						q.addEventListener(e, r, true);
					}
				},
				teardown: function() {
					if (0 === --n) {
						q.removeEventListener(e, r, true);
					}
				}
			}
		});
	}
	I.fn.extend({
		on: function(e, n, r, i, o) {
			var s, c;
			if ("object" == typeof e) {
				if ("string" != typeof n) {
					r = r || n;
					n = t;
				}
				for (c in e) {
					this.on(c, n, r, e[c], o);
				}
				return this
			}
			if (r == null && i == null ? (i = n, r = n = t) : i == null && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === false) i = a;
			else if (!i) {
				return this;
			}
			if (1 === o) {
				s = i;
				i = function(e) {
					I().off(e);
					return s.apply(this, arguments);
				};
				i.guid = s.guid || (s.guid = I.guid++);
			}
			return this.each(function() {
				I.event.add(this, e, i, r, n)
			});
		},
		one: function(e, t, n, r) {
			return this.on(e, t, n, r, 1)
		},
		off: function(e, n, r) {
			if (e && e.preventDefault && e.handleObj) {
				var i = e.handleObj;
				I(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
				return this;
			}
			if ("object" == typeof e) {
				for (var o in e) {
					this.off(o, n, e[o]);
				}
				return this
			}
			if ((n === false || "function" == typeof n)) {
				r = n;
				n = t;
			}
			if (r === false) {
				(r = a)
			}
			return this.each(function() {
				I.event.remove(this, e, r, n)
			});
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		live: function(e, t, n) {
			I(this.context).on(e, this.selector, t, n);
			return this;
		},
		die: function(e, t) {
			I(this.context).off(e, this.selector || "**", t);
			return this;
		},
		delegate: function(e, t, n, r) {
			return this.on(t, e, n, r)
		},
		undelegate: function(e, t, n) {
			if (1 == arguments.length) {
				return this.off(e, "**");
			} else {
				return this.off(t, e, n);
			}
		},
		trigger: function(e, t) {
			return this.each(function() {
				I.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			if (this[0]) {
				return I.event.trigger(e, t, this[0], true);
			} else {
				return void 0;
			}
		},
		toggle: function(e) {
			var t = arguments,
				n = e.guid || I.guid++,
				r = 0,
				i = function(n) {
					var i = (I._data(this, "lastToggle" + e.guid) || 0) % r;
					I._data(this, "lastToggle" + e.guid, i + 1);
					n.preventDefault();
					return t[i].apply(this, arguments) || false;
				};
			for (i.guid = n; r < t.length;) {
				t[r++].guid = n;
			}
			return this.click(i)
		},
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		}
	});
	I.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		I.fn[t] = function(e, n) {
			if (n == null) {
				n = e;
				e = null;
			}
			if (arguments.length > 0) {
				return this.on(t, null, e, n);
			} else {
				return this.trigger(t);
			}
		};
		if (I.attrFn) {
			I.attrFn[t] = true;
		}
		if (et.test(t)) {
			I.event.fixHooks[t] = I.event.keyHooks;
		}
		if (tt.test(t)) {
			I.event.fixHooks[t] = I.event.mouseHooks;
		}
	});

	! function() {
		function e(e, t, n, r, o, a) {
			for (var s = 0, c = r.length; c > s; s++) {
				var l = r[s];
				if (l) {
					var u = false;
					for (l = l[e]; l;) {
						if (l[i] === n) {
							u = r[l.sizset];
							break
						}
						if (1 !== l.nodeType || a || (l[i] = n, l.sizset = s), l.nodeName.toLowerCase() === t) {
							u = l;
							break
						}
						l = l[e]
					}
					r[s] = u
				}
			}
		}

		function n(e, t, n, r, o, a) {
			for (var s = 0, c = r.length; c > s; s++) {
				var l = r[s];
				if (l) {
					var u = false;
					for (l = l[e]; l;) {
						if (l[i] === n) {
							u = r[l.sizset];
							break
						}
						if (1 === l.nodeType)
							if (a || (l[i] = n, l.sizset = s), "string" != typeof t) {
								if (l === t) {
									u = true;
									break
								}
							} else if (d.filter(t, [l]).length > 0) {
							u = l;
							break
						}
						l = l[e]
					}
					r[s] = u
				}
			}
		}
		var r = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
			i = "sizcache" + (Math.random() + "").replace(".", ""),
			o = 0,
			a = Object.prototype.toString,
			s = false,
			c = true,
			l = /\\/g,
			u = /\r\n/g,
			f = /\W/;
		[0, 0].sort(function() {
			c = false;
			return 0;
		});
		var d = function(e, t, n, i) {
			n = n || [], t = t || q;
			var o = t;
			if (1 !== t.nodeType && 9 !== t.nodeType) {
				return [];
			}
			if (!e || "string" != typeof e) {
				return n;
			}
			var s, c, l, u, f, p, m, v, b = true,
				$ = d.isXML(t),
				w = [],
				x = e;
			do {
				r.exec("");
				s = r.exec(x);
				if (s && (x = s[3], w.push(s[1]), s[2])) {
					u = s[3];
					break
				}
			}
			while (s);
			if (w.length > 1 && g.exec(e)) {
				if (2 === w.length && h.relative[w[0]]) {
					c = k(w[0] + w[1], t, i);
				} else {
					for (c = h.relative[w[0]] ? [t] : d(w.shift(), t); w.length;) {
						e = w.shift();
						if (h.relative[e]) {
							(e += w.shift()); 
						}
						c = k(e, c, i);
					}
				}
			} else if (!i && w.length > 1 && 9 === t.nodeType && !$ && h.match.ID.test(w[0]) && !h.match.ID.test(w[w.length - 1]) && (f = d.find(w.shift(), t, $), t = f.expr ? d.filter(f.expr, f.set)[0] : f.set[0]), t) {
				for (f = i ? {
					expr: w.pop(),
					set: y(i)
				} : d.find(w.pop(), 1 !== w.length || "~" !== w[0] && "+" !== w[0] || !t.parentNode ? t : t.parentNode, $), c = f.expr ? d.filter(f.expr, f.set) : f.set, w.length > 0 ? l = y(c) : b = false; w.length;) {
					p = w.pop();
					m = p;
					if (h.relative[p]) {
						m = w.pop();
					} else {
						p = "";
					}
					if (m == null) {
						m = t;
					}
					h.relative[p](l, m, $);
				}
			} else {
				l = w = [];
			}
			if (!(l)) {
				(l = c)
			}
			if (!(l)) {
				d.error(p || e)
			}
			if ("[object Array]" === a.call(l)) {
				if (b) {
					if (t && 1 === t.nodeType) {
						for (v = 0; null != l[v]; v++) {
							if (l[v] && (l[v] === true || 1 === l[v].nodeType && d.contains(t, l[v]))) {
								n.push(c[v]);
							} else {
								for (v = 0; null != l[v]; v++) {
									if (l[v] && 1 === l[v].nodeType) {
										n.push(c[v]);
									} else {
										n.push.apply(n, l);
									}
								}
							}
						}
					}
				}
			} else {
				y(l, n);
			}
			if (u) {
				d(u, o, n, i);
				d.uniqueSort(n);
			}
			return n;
		};
		d.uniqueSort = function(e) {
			if ($ && (s = c, e.sort($), s)) {
				for (var t = 1; t < e.length; t++)
					if (e[t] === e[t - 1]) {
						e.splice(t--, 1);
					}
			}
			return e
		};
		d.matches = function(e, t) {
			return d(e, null, null, t)
		};
		d.matchesSelector = function(e, t) {
			return d(t, null, null, [e]).length > 0
		};
		d.find = function(e, t, n) {
			var r, i, o, a, s, c;
			if (!e) {
				return [];
			}
			i = 0;
			for (o = h.order.length; o > i; i++)
				if (s = h.order[i], (a = h.leftMatch[s].exec(e)) && (c = a[1], a.splice(1, 1), "\\" !== c.substr(c.length - 1) && (a[1] = (a[1] || "").replace(l, ""), r = h.find[s](a, t, n), null != r))) {
					e = e.replace(h.match[s], "");
					break
				}
			if (!(r)) {
				if ("undefined" != typeof t.getElementsByTagName) {
					r = t.getElementsByTagName("*");
				} else {
					r = [];
				}
			}
			return {
				set: r,
				expr: e
			};
		};
		d.filter = function(e, n, r, i) {
			for (var o, a, s, c, l, u, f, p, g, m = e, v = [], y = n, b = n && n[0] && d.isXML(n[0]); e && n.length;) {
				for (s in h.filter)
					if (null != (o = h.leftMatch[s].exec(e)) && o[2]) {
						u = h.filter[s];
						f = o[1];
						a = false;
						o.splice(1, 1);
						if ("\\" === f.substr(f.length - 1)) continue;
						if (y === v && (v = []), h.preFilter[s])
							if (o = h.preFilter[s](o, y, r, v, i, b)) {
								if (o === true) continue
							} else {
								a = c = true;
							}
						if (o) {
							for (p = 0; null != (l = y[p]); p++)
								if (l) {
									c = u(l, o, p, y);
									g = i ^ c;
									if (r && null != c) {
										if (g) {
											a = true;
										} else {
											y[p] = false;
										}
									} else if (g) {
										v.push(l);
										a = true;
									}
								}
						}
						if (c !== t) {
							if (!(r)) {
								(y = v)
							}
							e = e.replace(h.match[s], "");
							if (!a) {
								return [];
							}
							break
						}
					}
				if (e === m) {
					if (null != a) break;
					d.error(e)
				}
				m = e
			}
			return y
		};
		d.error = function(e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		};
		var p = d.getText = function(e) {
				var t, n, r = e.nodeType,
					i = "";
				if (r) {
					if (1 === r || 9 === r || 11 === r) {
						if ("string" == typeof e.textContent) {
							return e.textContent;
						}
						if ("string" == typeof e.innerText) {
							return e.innerText.replace(u, "");
						}
						for (e = e.firstChild; e; e = e.nextSibling) i += p(e)
					} else if (3 === r || 4 === r) {
						return e.nodeValue;
					}
				} else {
					for (t = 0; n = e[t]; t++) {
						if (8 !== n.nodeType) {
							(i += p(n));
						}
					}
				}
				return i
			},
			h = d.selectors = {
				order: ["ID", "NAME", "TAG"],
				match: {
					ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
					ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
					TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
					CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
					POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
					PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
				},
				leftMatch: {},
				attrMap: {
					"class": "className",
					"for": "htmlFor"
				},
				attrHandle: {
					href: function(e) {
						return e.getAttribute("href")
					},
					type: function(e) {
						return e.getAttribute("type")
					}
				},
				relative: {
					"+": function(e, t) {
						var n = "string" == typeof t,
							r = n && !f.test(t),
							i = n && !r;
						if (r) {
							(t = t.toLowerCase());
						}
						for (var o, a = 0, s = e.length; s > a; a++) {
							if (o = e[a]) {
								for (; o = o.previousSibling && 1 !== o.nodeType;) {
									if (i || o && o.nodeName.toLowerCase() === t) {
										e[a] = o || false;
									} else {
										e[a] = o === t;
									}
								}
							}
						}
						if (i) {
							d.filter(t, e, true);
						}
					},
					">": function(e, t) {
						var n, r = "string" == typeof t,
							i = 0,
							o = e.length;
						if (r && !f.test(t)) {
							for (t = t.toLowerCase(); o > i; i++) {
								if (n = e[i]) {
									var a = n.parentNode;
									if (a.nodeName.toLowerCase() === t) {
										e[i] = a;
									} else {
										e[i] = false;
									}
								}
							}
						} else {
							for (; o > i; i++) {
								n = e[i];
								if (n) {
									if (r) {
										e[i] = n.parentNode;
									} 
									else {
										e[i] = n.parentNode === t;
									} 
								}
							}
							if (r) {
								d.filter(t, e, true);
							}
						}
					},
					"": function(t, r, i) {
						var a, s = o++,
							c = n;
						"string" != typeof r || f.test(r) || (r = r.toLowerCase(), a = r, c = e), c("parentNode", r, s, t, a, i)
					},
					"~": function(t, r, i) {
						var a, s = o++,
							c = n;
						"string" != typeof r || f.test(r) || (r = r.toLowerCase(), a = r, c = e), c("previousSibling", r, s, t, a, i)
					}
				},
				find: {
					ID: function(e, t, n) {
						if ("undefined" != typeof t.getElementById && !n) {
							var r = t.getElementById(e[1]);
							if (r && r.parentNode) {
								return [r];
							} else {
								return [];
							}
						}
					},
					NAME: function(e, t) {
						if ("undefined" != typeof t.getElementsByName) {
							for (var n = [], r = t.getElementsByName(e[1]), i = 0, o = r.length; o > i; i++)
								if (r[i].getAttribute("name") === e[1]) {
									n.push(r[i]);
								}
							if (0 === n.length) {
								return null;
							} else {
								return n;
							}
						}
					},
					TAG: function(e, t) {
						if ("undefined" != typeof t.getElementsByTagName) {
							return t.getElementsByTagName(e[1]);
						} else {
							return void 0;
						}
					}
				},
				preFilter: {
					CLASS: function(e, t, n, r, i, o) {
						if (e = " " + e[1].replace(l, "") + " ", o) {
							return e;
						}
						for (var a, s = 0; null != (a = t[s]); s++)
							if (a) {
								if (i ^ (a.className && (" " + a.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0)) {
									if (!(n)) {
										r.push(a)
									}
								} else if (n) {
									(t[s] = false)
								}
							}
						return false
					},
					ID: function(e) {
						return e[1].replace(l, "")
					},
					TAG: function(e) {
						return e[1].replace(l, "").toLowerCase()
					},
					CHILD: function(e) {
						if ("nth" === e[1]) {
							e[2] || d.error(e[0]), e[2] = e[2].replace(/^\+|\s*/g, "");
							var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === e[2] && "2n" || "odd" === e[2] && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
							e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
						} else if (e[2]) {
							d.error(e[0]);
						}
						e[0] = o++;
						return e;
					},
					ATTR: function(e, t, n, r, i, o) {
						var a = e[1] = e[1].replace(l, "");
						if (!o && h.attrMap[a]) {
							(e[1] = h.attrMap[a])
						}
						e[4] = (e[4] || e[5] || "").replace(l, "");
						if ("~=" === e[2]) {
							(e[4] = " " + e[4] + " ")
						}
						return e;
					},
					PSEUDO: function(e, t, n, i, o) {
						if ("not" === e[1]) {
							if (!((r.exec(e[3]) || "").length > 1 || /^\w/.test(e[3]))) {
								var a = d.filter(e[3], t, n, true ^ o);
								if (!(n)) {
									i.push.apply(i, a)
								}
								return false;
							}
							e[3] = d(e[3], null, null, t)
						} else if (h.match.POS.test(e[0]) || h.match.CHILD.test(e[0])) {
							return true;
						}
						return e
					},
					POS: function(e) {
						e.unshift(true);
						return e;
					}
				},
				filters: {
					enabled: function(e) {
						return e.disabled === false && "hidden" !== e.type
					},
					disabled: function(e) {
						return e.disabled === true
					},
					checked: function(e) {
						return e.checked === true
					},
					selected: function(e) {
						if (e.parentNode) {
							e.parentNode.selectedIndex
						}
						return e.selected === true;
					},
					parent: function(e) {
						return !!e.firstChild
					},
					empty: function(e) {
						return !e.firstChild
					},
					has: function(e, t, n) {
						return !!d(n[3], e).length
					},
					header: function(e) {
						return /h\d/i.test(e.nodeName)
					},
					text: function(e) {
						var t = e.getAttribute("type"),
							n = e.type;
						return "input" === e.nodeName.toLowerCase() && "text" === n && (t === n || null === t)
					},
					radio: function(e) {
						return "input" === e.nodeName.toLowerCase() && "radio" === e.type
					},
					checkbox: function(e) {
						return "input" === e.nodeName.toLowerCase() && "checkbox" === e.type
					},
					file: function(e) {
						return "input" === e.nodeName.toLowerCase() && "file" === e.type
					},
					password: function(e) {
						return "input" === e.nodeName.toLowerCase() && "password" === e.type
					},
					submit: function(e) {
						var t = e.nodeName.toLowerCase();
						return ("input" === t || "button" === t) && "submit" === e.type
					},
					image: function(e) {
						return "input" === e.nodeName.toLowerCase() && "image" === e.type
					},
					reset: function(e) {
						var t = e.nodeName.toLowerCase();
						return ("input" === t || "button" === t) && "reset" === e.type
					},
					button: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					input: function(e) {
						return /input|select|textarea|button/i.test(e.nodeName)
					},
					focus: function(e) {
						return e === e.ownerDocument.activeElement
					}
				},
				setFilters: {
					first: function(e, t) {
						return 0 === t
					},
					last: function(e, t, n, r) {
						return t === r.length - 1
					},
					even: function(e, t) {
						return t % 2 === 0
					},
					odd: function(e, t) {
						return t % 2 === 1
					},
					lt: function(e, t, n) {
						return t < n[3] - 0
					},
					gt: function(e, t, n) {
						return t > n[3] - 0
					},
					nth: function(e, t, n) {
						return n[3] - 0 === t
					},
					eq: function(e, t, n) {
						return n[3] - 0 === t
					}
				},
				filter: {
					PSEUDO: function(e, t, n, r) {
						var i = t[1],
							o = h.filters[i];
						if (o) {
							return o(e, n, t, r);
						}
						if ("contains" === i) {
							return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0;
						}
						if ("not" === i) {
							for (var a = t[3], s = 0, c = a.length; c > s; s++)
								if (a[s] === e) {
									return false;
								}
							return true
						}
						d.error(i)
					},
					CHILD: function(e, t) {
						var n, r, o, a, s, c, l = t[1],
							u = e;
						switch (l) {
							case "only":
							case "first":
								for (; u = u.previousSibling;)
									if (1 === u.nodeType) {
										return false;
									}
								if ("first" === l) {
									return true;
								}
								u = e;
							case "last":
								for (; u = u.nextSibling;)
									if (1 === u.nodeType) {
										return false;
									}
								return true;
							case "nth":
								n = t[2];
								r = t[3];
								if (1 === n && 0 === r) {
									return true;
								}
								o = t[0];
								a = e.parentNode;
								if (a && (a[i] !== o || !e.nodeIndex)) {
									s = 0;
									for (u = a.firstChild; u; u = u.nextSibling)
										if (1 === u.nodeType) {
											u.nodeIndex = ++s;
										}
									a[i] = o
								}
								c = e.nodeIndex - r;
								if (0 === n) {
									return 0 === c;
								} else {
									return c % n === 0 && c / n >= 0;
								}
						}
					},
					ID: function(e, t) {
						return 1 === e.nodeType && e.getAttribute("id") === t
					},
					TAG: function(e, t) {
						return "*" === t && 1 === e.nodeType || !!e.nodeName && e.nodeName.toLowerCase() === t
					},
					CLASS: function(e, t) {
						return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
					},
					ATTR: function(e, t) {
						var n = t[1],
							r = d.attr ? d.attr(e, n) : h.attrHandle[n] ? h.attrHandle[n](e) : null != e[n] ? e[n] : e.getAttribute(n),
							i = r + "",
							o = t[2],
							a = t[4];
						if (r == null) {
							return "!=" === o;
						} else if (!o && d.attr) {
							return null != r;
						} else if ("=" === o) {
							return i === a;
						} else if ("*=" === o) {
							return i.indexOf(a) >= 0;
						} else if ("~=" === o) {
							return (" " + i + " ").indexOf(a) >= 0;
						} else if (a) {
							if ("!=" === o) {
								return i !== a;
							} else if ("^=" === o) {
								return 0 === i.indexOf(a);
							} else if ("$=" === o) {
								return i.substr(i.length - a.length) === a;
							} else if ("|=" === o) {
								return i === a || i.substr(0, a.length + 1) === a + "-";
							} else {
								return false;
							}
						} else {
							return i && r !== false;
						}
					},
					POS: function(e, t, n, r) {
						var i = t[2],
							o = h.setFilters[i];
						if (o) {
							return o(e, n, t, r);
						} else {
							return void 0;
						}
					}
				}
			},
			g = h.match.POS,
			m = function(e, t) {
				return "\\" + (t - 0 + 1)
			};
		for (var v in h.match) {
			h.match[v] = new RegExp(h.match[v].source + /(?![^\[]*\])(?![^\(]*\))/.source);
			h.leftMatch[v] = new RegExp(/(^(?:.|\r|\n)*?)/.source + h.match[v].source.replace(/\\(\d+)/g, m));
		}
		h.match.globalPOS = g;
		var y = function(e, t) {
			e = Array.prototype.slice.call(e, 0);
			if (t) {
				return (t.push.apply(t, e), t);
			} else {
				return e;
			}
		};
		try {
			Array.prototype.slice.call(q.documentElement.childNodes, 0)[0].nodeType
		} catch (b) {
			y = function(e, t) {
				var n = 0,
					r = t || [];
				if ("[object Array]" === a.call(e)) Array.prototype.push.apply(r, e);
				else if ("number" == typeof e.length)
					for (var i = e.length; i > n; n++) {
						r.push(e[n]);
					} else {
						for (; e[n]; n++) {
							r.push(e[n]);
						}
					}
				return r
			}
		}
		var $, w;
		if (q.documentElement.compareDocumentPosition) {
			$ = function(e, t) {
				if (e === t) {
					return (s = true, 0);
				} else if (e.compareDocumentPosition && t.compareDocumentPosition) {
					if (4 & e.compareDocumentPosition(t)) {
						return -1;
					} else {
						return 1;
					}
				} else if (e.compareDocumentPosition) {
					return -1;
				} else {
					return 1;
				}
			};
		} else {
			$ = function(e, t) {
				if (e === t) {
					s = true;
					return 0;
				}
				if (e.sourceIndex && t.sourceIndex) {
					return e.sourceIndex - t.sourceIndex;
				}
				var n, r, i = [],
					o = [],
					a = e.parentNode,
					c = t.parentNode,
					l = a;
				if (a === c) {
					return w(e, t);
				}
				if (!a) {
					return -1;
				}
				if (!c) {
					return 1;
				}
				for (; l;) {
					i.unshift(l);
					l = l.parentNode;
				}
				for (l = c; l;) {
					o.unshift(l);
					l = l.parentNode;
				}
				n = i.length, r = o.length;
				for (var u = 0; n > u && r > u; u++)
					if (i[u] !== o[u]) {
						return w(i[u], o[u]);
					}
				if (u === n) {
					return w(e, o[u], -1);
				} else {
					return w(i[u], t, 1);
				}
			};
			w = function(e, t, n) {
				if (e === t) {
					return n;
				}
				for (var r = e.nextSibling; r;) {
					if (r === t) {
						return -1;
					}
					r = r.nextSibling
				}
				return 1
			};
		}

		! function() {
			var e = q.createElement("div"),
				n = "script" + (new Date).getTime(),
				r = q.documentElement;
			e.innerHTML = "<a name='" + n + "'/>";
			r.insertBefore(e, r.firstChild);
			if (q.getElementById(n)) {
				h.find.ID = function(e, n, r) {
					if ("undefined" != typeof n.getElementById && !r) {
						var i = n.getElementById(e[1]);
						if (i) {
							if (i.id === e[1] || "undefined" != typeof i.getAttributeNode && i.getAttributeNode("id").nodeValue === e[1]) {
								return [i];
							} else {
								return t;
							}
						} else {
							return [];
						}
					}
				};
				h.filter.ID = function(e, t) {
					var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
					return 1 === e.nodeType && n && n.nodeValue === t
				};
			}
			r.removeChild(e);
			r = e = null;
		}();

		! function() {
			var e = q.createElement("div");
			e.appendChild(q.createComment(""));
			if (e.getElementsByTagName("*").length > 0) {
				(h.find.TAG = function(e, t) {
					var n = t.getElementsByTagName(e[1]);
					if ("*" === e[1]) {
						for (var r = [], i = 0; n[i]; i++)
							if (1 === n[i].nodeType) {
								r.push(n[i]);
							}
						n = r
					}
					return n
				});
			}
			e.innerHTML = "<a href='#'></a>";
			if (e.firstChild && "undefined" != typeof e.firstChild.getAttribute && "#" !== e.firstChild.getAttribute("href")) {
				(h.attrHandle.href = function(e) {
					return e.getAttribute("href", 2)
				});
			}
			e = null;
		}();
		if (q.querySelectorAll) {
			! function() {
				var e = d,
					t = q.createElement("div"),
					n = "__sizzle__";
				if (t.innerHTML = "<p class='TEST'></p>", !t.querySelectorAll || 0 !== t.querySelectorAll(".TEST").length) {
					d = function(t, r, i, o) {
						if (r = r || q, !o && !d.isXML(r)) {
							var a = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
							if (a && (1 === r.nodeType || 9 === r.nodeType)) {
								if (a[1]) {
									return y(r.getElementsByTagName(t), i);
								}
								if (a[2] && h.find.CLASS && r.getElementsByClassName) {
									return y(r.getElementsByClassName(a[2]), i);
								}
							}
							if (9 === r.nodeType) {
								if ("body" === t && r.body) {
									return y([r.body], i);
								}
								if (a && a[3]) {
									var s = r.getElementById(a[3]);
									if (!s || !s.parentNode) {
										return y([], i);
									}
									if (s.id === a[3]) {
										return y([s], i);
									}
								}
								try {
									return y(r.querySelectorAll(t), i)
								} catch (c) {}
							} else if (1 === r.nodeType && "object" !== r.nodeName.toLowerCase()) {
								var l = r,
									u = r.getAttribute("id"),
									f = u || n,
									p = r.parentNode,
									g = /^\s*[+~]/.test(t);
								u ? f = f.replace(/'/g, "\\$&") : r.setAttribute("id", f), g && p && (r = r.parentNode);
								try {
									if (!g || p) {
										return y(r.querySelectorAll("[id='" + f + "'] " + t), i);
									}
								} catch (m) {} finally {
									if (!(u)) {
										l.removeAttribute("id")
									}
								}
							}
						}
						return e(t, r, i, o)
					};
					for (var r in e) {
						d[r] = e[r];
					}
					t = null
				}
			}();
		}

		! function() {
			var e = q.documentElement,
				t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
			if (t) {
				var n = !t.call(q.createElement("div"), "div"),
					r = false;
				try {
					t.call(q.documentElement, "[test!='']:sizzle")
				} catch (i) {
					r = true
				}
				d.matchesSelector = function(e, i) {
					if (i = i.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"), !d.isXML(e)) try {
						if (r || !h.match.PSEUDO.test(i) && !/!=/.test(i)) {
							var o = t.call(e, i);
							if (o || !n || e.document && 11 !== e.document.nodeType) {
								return o;
							}
						}
					} catch (a) {}
					return d(i, null, null, [e]).length > 0
				}
			}
		}();

		! function() {
			var e = q.createElement("div");
			e.innerHTML = "<div class='test e'></div><div class='test'></div>", e.getElementsByClassName && 0 !== e.getElementsByClassName("e").length && (e.lastChild.className = "e", 1 !== e.getElementsByClassName("e").length && (h.order.splice(1, 0, "CLASS"), h.find.CLASS = function(e, t, n) {
				if ("undefined" == typeof t.getElementsByClassName || n) {
					return void 0;
				} else {
					return t.getElementsByClassName(e[1]);
				}
			}, e = null))
		}();
		if (q.documentElement.contains) {
			d.contains = function(e, t) {
				return e !== t && (e.contains ? e.contains(t) : true)
			};
		} else if (q.documentElement.compareDocumentPosition) {
			d.contains = function(e, t) {
				return !!(16 & e.compareDocumentPosition(t))
			};
		} else {
			d.contains = function() {
				return false
			};
		}
		d.isXML = function(e) {
			var t = (e ? e.ownerDocument || e : 0).documentElement;
			if (t) {
				return "HTML" !== t.nodeName;
			} else {
				return false;
			}
		};
		var k = function(e, t, n) {
			for (var r, i = [], o = "", a = t.nodeType ? [t] : t; r = h.match.PSEUDO.exec(e);) {
				o += r[0];
				e = e.replace(h.match.PSEUDO, "");
			}
			if (h.relative[e]) {
				e = e + "*";
			} else {
				e = e;
			}
			for (var s = 0, c = a.length; c > s; s++) d(e, a[s], i, n);
			return d.filter(o, i)
		};
		d.attr = I.attr;
		d.selectors.attrMap = {};
		I.find = d;
		I.expr = d.selectors;
		I.expr[":"] = I.expr.filters;
		I.unique = d.uniqueSort;
		I.text = d.getText;
		I.isXMLDoc = d.isXML;
		I.contains = d.contains;
	}();
	var st = /Until$/,
		ct = /^(?:parents|prevUntil|prevAll)/,
		lt = /,/,
		ut = /^.[^:#\[\.,]*$/,
		ft = Array.prototype.slice,
		dt = I.expr.match.globalPOS,
		pt = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	I.fn.extend({
		find: function(e) {
			var t, n, r = this;
			if ("string" != typeof e) {
				return I(e).filter(function() {
					t = 0;
					for (n = r.length; n > t; t++) {
						if (I.contains(r[t], this)) {
							return true
						}
					}
				});
			}
			var i, o, a, s = this.pushStack("", "find", e);
			t = 0;
			for (n = this.length; n > t; t++) {
				i = s.length;
				I.find(e, this[t], s);
				if (t > 0) {
					for (o = i; o < s.length; o++)
						for (a = 0; i > a; a++)
							if (s[a] === s[o]) {
								s.splice(o--, 1);
								break
							}
				}
			}
			return s
		},
		has: function(e) {
			var t = I(e);
			return this.filter(function() {
				for (var e = 0, n = t.length; n > e; e++)
					if (I.contains(this, t[e])) {
						return true;
					}
			})
		},
		not: function(e) {
			return this.pushStack(l(this, e, false), "not", e)
		},
		filter: function(e) {
			return this.pushStack(l(this, e, true), "filter", e)
		},
		is: function(e) {
			return !!e && ("string" == typeof e ? dt.test(e) ? I(e, this.context).index(this[0]) >= 0 : I.filter(e, this).length > 0 : this.filter(e).length > 0)
		},
		closest: function(e, t) {
			var n, r, i = [],
				o = this[0];
			if (I.isArray(e)) {
				for (var a = 1; o && o.ownerDocument && o !== t;) {
					for (n = 0; n < e.length; n++)
						if (I(o).is(e[n])) {
							i.push({
								selector: e[n],
								elem: o,
								level: a
							});
						}
					o = o.parentNode, a++
				}
				return i
			}
			var s = dt.test(e) || "string" != typeof e ? I(e, t || this.context) : 0;
			n = 0;
			for (r = this.length; r > n; n++)
				for (o = this[n]; o;) {
					if (s ? s.index(o) > -1 : I.find.matchesSelector(o, e)) {
						i.push(o);
						break
					}
					if (o = o.parentNode, !o || !o.ownerDocument || o === t || 11 === o.nodeType) break
				}
			if (i.length > 1) {
				i = I.unique(i);
			} else {
				i = i;
			}
			return this.pushStack(i, "closest", e);
		},
		index: function(e) {
			if (e) {
				if ("string" == typeof e) {
					return I.inArray(this[0], I(e));
				} else {
					return I.inArray(e.jquery ? e[0] : e, this);
				}
			} else if (this[0] && this[0].parentNode) {
				return this.prevAll().length;
			} else {
				return -1;
			}
		},
		add: function(e, t) {
			var n = "string" == typeof e ? I(e, t) : I.makeArray(e && e.nodeType ? [e] : e),
				r = I.merge(this.get(), n);
			return this.pushStack(c(n[0]) || c(r[0]) ? r : I.unique(r))
		},
		andSelf: function() {
			return this.add(this.prevObject)
		}
	});
	I.each({
		parent: function(e) {
			var t = e.parentNode;
			if (t && 11 !== t.nodeType) {
				return t;
			} else {
				return null;
			}
		},
		parents: function(e) {
			return I.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return I.dir(e, "parentNode", n)
		},
		next: function(e) {
			return I.nth(e, 2, "nextSibling")
		},
		prev: function(e) {
			return I.nth(e, 2, "previousSibling")
		},
		nextAll: function(e) {
			return I.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return I.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return I.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return I.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return I.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return I.sibling(e.firstChild)
		},
		contents: function(e) {
			if (I.nodeName(e, "iframe")) {
				return e.contentDocument || e.contentWindow.document;
			} else {
				return I.makeArray(e.childNodes);
			}
		}
	}, function(e, t) {
		I.fn[e] = function(n, r) {
			var i = I.map(this, t, n);
			if (!(st.test(e))) {
				(r = n)
			}
			if (r && "string" == typeof r) {
				(i = I.filter(r, i))
			}
			if (this.length > 1 && !pt[e]) {
				i = I.unique(i);
			} else {
				i = i;
			}
			if ((this.length > 1 || lt.test(r)) && ct.test(e)) {
				(i = i.reverse())
			}
			return this.pushStack(i, e, ft.call(arguments).join(","));
		}
	});
	I.extend({
		filter: function(e, t, n) {
			if (n) {
				(e = ":not(" + e + ")")
			}
			if (1 === t.length) {
				if (I.find.matchesSelector(t[0], e)) {
					return [t[0]];
				} else {
					return [];
				}
			} else {
				return I.find.matches(e, t);
			}
		},
		dir: function(e, n, r) {
			for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !I(o).is(r));) {
				if (1 === o.nodeType) {
					i.push(o);
				}
				o = o[n];
			}
			return i
		},
		nth: function(e, t, n) {
			t = t || 1;
			for (var r = 0; e && (1 !== e.nodeType || ++r !== t); e = e[n]);
			return e
		},
		sibling: function(e, t) {
			for (var n = []; e; e = e.nextSibling)
				if (1 === e.nodeType && e !== t) {
					n.push(e);
				}
			return n
		}
	});
	var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		gt = / jQuery\d+="(?:\d+|null)"/g,
		mt = /^\s+/,
		vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		yt = /<([\w:]+)/,
		bt = /<tbody/i,
		$t = /<|&#?\w+;/,
		wt = /<(?:script|style)/i,
		kt = /<(?:script|object|embed|option|style)/i,
		xt = new RegExp("<(?:" + ht + ")[\\s/>]", "i"),
		Tt = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Ct = /\/(java|ecma)script/i,
		St = /^\s*<!(?:\[CDATA\[|\-\-)/,
		At = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		},
		Et = u(q);
	At.optgroup = At.option;
	At.tbody = At.tfoot = At.colgroup = At.caption = At.thead;
	At.th = At.td;
	if (!(I.support.htmlSerialize)) {
		At._default = [1, "div<div>", "</div>"];
	}
	I.fn.extend({
		text: function(e) {
			return I.access(this, function(e) {
				if (e === t) {
					return I.text(this);
				} else {
					return this.empty().append((this[0] && this[0].ownerDocument || q).createTextNode(e));
				}
			}, null, e, arguments.length)
		},
		wrapAll: function(e) {
			if (I.isFunction(e)) {
				return this.each(function(t) {
					I(this).wrapAll(e.call(this, t))
				});
			}
			if (this[0]) {
				var t = I(e, this[0].ownerDocument).eq(0).clone(true);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			return this.each(I.isFunction(e) ? function(t) {
				I(this).wrapInner(e.call(this, t))
			} : function() {
				var t = I(this),
					n = t.contents();
				if (n.length) {
					n.wrapAll(e);
				} else {
					t.append(e);
				}
			})
		},
		wrap: function(e) {
			var t = I.isFunction(e);
			return this.each(function(n) {
				I(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				if (!(I.nodeName(this, "body"))) {
					I(this).replaceWith(this.childNodes)
				}
			}).end()
		},
		append: function() {
			return this.domManip(arguments, true, function(e) {
				if (1 === this.nodeType) {
					this.appendChild(e);
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, true, function(e) {
				if (1 === this.nodeType) {
					this.insertBefore(e, this.firstChild);
				}
			})
		},
		before: function() {
			if (this[0] && this[0].parentNode) {
				return this.domManip(arguments, false, function(e) {
					this.parentNode.insertBefore(e, this)
				});
			}
			if (arguments.length) {
				var e = I.clean(arguments);
				e.push.apply(e, this.toArray());
				return this.pushStack(e, "before", arguments);
			}
		},
		after: function() {
			if (this[0] && this[0].parentNode) {
				return this.domManip(arguments, false, function(e) {
					this.parentNode.insertBefore(e, this.nextSibling)
				});
			}
			if (arguments.length) {
				var e = this.pushStack(this, "after", arguments);
				e.push.apply(e, I.clean(arguments));
				return e;
			}
		},
		remove: function(e, t) {
			for (var n, r = 0; null != (n = this[r]); r++)
				if ((!e || I.filter(e, [n]).length)) {
					if (!(t || 1 !== n.nodeType)) {
						I.cleanData(n.getElementsByTagName("*"));
						I.cleanData([n]);
					}
					if (n.parentNode) {
						n.parentNode.removeChild(n)
					}
				}
			return this
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++)
				for (1 === e.nodeType && I.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
			return this
		},
		clone: function(e, t) {
			if (e == null) {
				e = false;
			} else {
				e = e;
			}
			if (t == null) {
				t = e;
			} else {
				t = t;
			}
			return this.map(function() {
				return I.clone(this, e, t)
			});
		},
		html: function(e) {
			return I.access(this, function(e) {
				var n = this[0] || {},
					r = 0,
					i = this.length;
				if (e === t) {
					if (1 === n.nodeType) {
						return n.innerHTML.replace(gt, "");
					} else {
						return null;
					}
				}
				if (!("string" != typeof e || wt.test(e) || !I.support.leadingWhitespace && mt.test(e) || At[(yt.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(vt, "<$1></$2>");
					try {
						for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (I.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
						n = 0
					} catch (o) {}
				}
				if (n) {
					this.empty().append(e);
				}
			}, null, e, arguments.length)
		},
		replaceWith: function(e) {
			if (this[0] && this[0].parentNode) {
				if (I.isFunction(e)) {
					return this.each(function(t) {
						var n = I(this),
							r = n.html();
						n.replaceWith(e.call(this, t, r))
					});
				} else {
					return ("string" != typeof e && (e = I(e).detach()), this.each(function() {
						var t = this.nextSibling,
							n = this.parentNode;
						I(this).remove(), t ? I(t).before(e) : I(n).append(e)
					}));
				}
			} else if (this.length) {
				return this.pushStack(I(I.isFunction(e) ? e() : e), "replaceWith", e);
			} else {
				return this;
			}
		},
		detach: function(e) {
			return this.remove(e, true)
		},
		domManip: function(e, n, r) {
			var i, o, a, s, c = e[0],
				l = [];
			if (!I.support.checkClone && 3 === arguments.length && "string" == typeof c && Tt.test(c)) {
				return this.each(function() {
					I(this).domManip(e, n, r, true)
				});
			}
			if (I.isFunction(c)) {
				return this.each(function(i) {
					var o = I(this);
					e[0] = c.call(this, i, n ? o.html() : t), o.domManip(e, n, r)
				});
			}
			if (this[0]) {
				s = c && c.parentNode;
				if (I.support.parentNode && s && 11 === s.nodeType && s.childNodes.length === this.length) {
					i = {
						fragment: s
					};
				} else {
					i = I.buildFragment(e, this, l);
				}
				a = i.fragment;
				if (o = 1 === a.childNodes.length ? a = a.firstChild : a.firstChild) {
					n = n && I.nodeName(o, "tr");
					for (var u = 0, d = this.length, p = d - 1; d > u; u++) {
						r.call(n ? f(this[u], o) : this[u], i.cacheable || d > 1 && p > u ? I.clone(a, true, true) : a);
					}
				}
				if (l.length) {
					I.each(l, function(e, t) {
						if (t.src) {
							I.ajax({
								type: "GET",
								global: false,
								url: t.src,
								async: false,
								dataType: "script"
							});
						} else {
							I.globalEval((t.text || t.textContent || t.innerHTML || "").replace(St, "/*$0*/"));
						}
						if (t.parentNode) {
							t.parentNode.removeChild(t); 
						}
					});
				}
			}
			return this
		}
	});
	I.buildFragment = function(e, t, n) {
		var r, i, o, a, s = e[0];
		if (t && t[0]) {
			(a = t[0].ownerDocument || t[0])
		}
		if (!(a.createDocumentFragment)) {
			(a = q)
		}
		if (!(!(1 === e.length && "string" == typeof s && s.length < 512 && a === q && "<" === s.charAt(0)) || kt.test(s) || !I.support.checkClone && Tt.test(s) || !I.support.html5Clone && xt.test(s))) {
			i = true;
			o = I.fragments[s];
			if (o && 1 !== o) {
				r = o;
			}
		}
		if (!(r)) {
			r = a.createDocumentFragment();
			I.clean(e, a, r, n);
		}
		if (i) {
			if (o) {
				I.fragments[s] = r;
			} else {
				I.fragments[s] = 1;
			}
		}
		return {
			fragment: r,
			cacheable: i
		};
	};
	I.fragments = {};
	I.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		I.fn[e] = function(n) {
			var r = [],
				i = I(n),
				o = 1 === this.length && this[0].parentNode;
			if (o && 11 === o.nodeType && 1 === o.childNodes.length && 1 === i.length) {
				i[t](this[0]);
				return this;
			}
			for (var a = 0, s = i.length; s > a; a++) {
				var c = (a > 0 ? this.clone(true) : this).get();
				I(i[a])[t](c), r = r.concat(c)
			}
			return this.pushStack(r, e, i.selector)
		}
	});
	I.extend({
		clone: function(e, t, n) {
			var r, i, o, a = I.support.html5Clone || I.isXMLDoc(e) || !xt.test("<" + e.nodeName + ">") ? e.cloneNode(true) : v(e);
			if (!(I.support.noCloneEvent && I.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || I.isXMLDoc(e))) {
				p(e, a);
				r = h(e);
				i = h(a);
				for (o = 0; r[o]; ++o)
					if (i[o]) {
						p(r[o], i[o]);
					}
			}
			if (t && (d(e, a), n)) {
				r = h(e);
				i = h(a);
				for (o = 0; r[o]; ++o) {
					d(r[o], i[o]);
				}
			}
			r = i = null;
			return a;
		},
		clean: function(e, t, n, r) {
			var i, o, a, s = [];
			t = t || q, "undefined" == typeof t.createElement && (t = t.ownerDocument || t[0] && t[0].ownerDocument || q);
			for (var c, l = 0; null != (c = e[l]); l++)
				if ("number" == typeof c && (c += ""), c) {
					if ("string" == typeof c)
						if ($t.test(c)) {
							c = c.replace(vt, "<$1></$2>");
							var f, d = (yt.exec(c) || ["", ""])[1].toLowerCase(),
								p = At[d] || At._default,
								h = p[0],
								g = t.createElement("div"),
								v = Et.childNodes;
							for (t === q ? Et.appendChild(g) : u(t).appendChild(g), g.innerHTML = p[1] + c + p[2]; h--;) g = g.lastChild;
							if (!I.support.tbody) {
								var y = bt.test(c),
									b = "table" !== d || y ? "<table>" !== p[1] || y ? [] : g.childNodes : g.firstChild && g.firstChild.childNodes;
								for (a = b.length - 1; a >= 0; --a)
									if (I.nodeName(b[a], "tbody") && !b[a].childNodes.length) {
										b[a].parentNode.removeChild(b[a]);
									}
							}
							if (!I.support.leadingWhitespace && mt.test(c)) {
								g.insertBefore(t.createTextNode(mt.exec(c)[0]), g.firstChild);
							}
							c = g.childNodes;
							if (g) {
								g.parentNode.removeChild(g);
								if (v.length > 0) {
									(f = v[v.length - 1], f && f.parentNode && f.parentNode.removeChild(f));
								}
							}
						} else {
							c = t.createTextNode(c);
						}
					var $;
					if (!I.support.appendChecked)
						if (c[0] && "number" == typeof($ = c.length))
							for (a = 0; $ > a; a++) {
								m(c[a]);
							} else {
								m(c);
							}
					if (c.nodeType) {
						s.push(c);
					} else {
						s = I.merge(s, c);
					}
				}
			if (n) {
				i = function(e) {
					return !e.type || Ct.test(e.type)
				};
				for (l = 0; s[l]; l++)
					if (o = s[l], r && I.nodeName(o, "script") && (!o.type || Ct.test(o.type))) r.push(o.parentNode ? o.parentNode.removeChild(o) : o);
					else {
						if (1 === o.nodeType) {
							var w = I.grep(o.getElementsByTagName("script"), i);
							s.splice.apply(s, [l + 1, 0].concat(w))
						}
						n.appendChild(o)
					}
			}
			return s
		},
		cleanData: function(e) {
			for (var t, n, r, i = I.cache, o = I.event.special, a = I.support.deleteExpando, s = 0; null != (r = e[s]); s++)
				if ((!r.nodeName || !I.noData[r.nodeName.toLowerCase()]) && (n = r[I.expando])) {
					if (t = i[n], t && t.events) {
						for (var c in t.events)
							if (o[c]) {
								I.event.remove(r, c);
							} else {
								I.removeEvent(r, c, t.handle);
							}
						if (t.handle) {
							t.handle.elem = null;
						}
					}
					a ? delete r[I.expando] : r.removeAttribute && r.removeAttribute(I.expando), delete i[n]
				}
		}
	});
	var Nt, jt, _t, qt = /alpha\([^)]*\)/i,
		Mt = /opacity=([^)]*)/,
		Ot = /([A-Z]|^ms)/g,
		It = /^[\-+]?(?:\d*\.)?\d+$/i,
		Dt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
		Lt = /^([\-+])=([\-+.\de]+)/,
		Pt = /^margin/,
		Ft = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		zt = ["Top", "Right", "Bottom", "Left"];
	I.fn.css = function(e, n) {
		return I.access(this, function(e, n, r) {
			if (r !== t) {
				return I.style(e, n, r);
			} else {
				return I.css(e, n);
			}
		}, e, n, arguments.length > 1)
	};
	I.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = Nt(e, "opacity");
						if ("" === n) {
							return "1";
						} else {
							return n;
						}
					}
					return e.style.opacity
				}
			}
		},
		cssNumber: {
			fillOpacity: true,
			fontWeight: true,
			lineHeight: true,
			opacity: true,
			orphans: true,
			widows: true,
			zIndex: true,
			zoom: true
		},
		cssProps: {
			"float": I.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, n, r, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, a, s = I.camelCase(n),
					c = e.style,
					l = I.cssHooks[s];
				if (n = I.cssProps[s] || s, r === t) {
					if (l && "get" in l && (o = l.get(e, false, i)) !== t) {
						return o;
					} else {
						return c[n];
					}
				}
				a = typeof r;
				if ("string" === a && (o = Lt.exec(r))) {
					r = +(o[1] + 1) * +o[2] + parseFloat(I.css(e, n));
					a = "number";
				}
				if (!(r == null || "number" === a && isNaN(r) || ("number" !== a || I.cssNumber[s] || (r += "px"), l && "set" in l && (r = l.set(e, r)) === t))) try {
					c[n] = r
				} catch (u) {}
			}
		},
		css: function(e, n, r) {
			var i, o;
			n = I.camelCase(n);
			o = I.cssHooks[n];
			n = I.cssProps[n] || n;
			if ("cssFloat" === n) {
				(n = "float")
			}
			if (o && "get" in o && (i = o.get(e, true, r)) !== t) {
				return i;
			} else if (Nt) {
				return Nt(e, n);
			} else {
				return void 0;
			}
		},
		swap: function(e, t, n) {
			var r, i, o = {};
			for (i in t) {
				o[i] = e.style[i];
				e.style[i] = t[i];
			}
			r = n.call(e);
			for (i in t) {
				e.style[i] = o[i];
			}
			return r
		}
	});
	I.curCSS = I.css;
	if (q.defaultView && q.defaultView.getComputedStyle) {
		(jt = function(e, t) {
			var n, r, i, o, a = e.style;
			t = t.replace(Ot, "-$1").toLowerCase();
			if ((r = e.ownerDocument.defaultView) && (i = r.getComputedStyle(e, null))) {
				n = i.getPropertyValue(t);
				if (!("" !== n || I.contains(e.ownerDocument.documentElement, e))) {
					(n = I.style(e, t)); 
				}
			}
			if (!I.support.pixelMargin && i && Pt.test(t) && Dt.test(n)) {
				o = a.width;
				a.width = n;
				n = i.width;
				a.width = o;
			}
			return n;
		});
	}
	if (q.documentElement.currentStyle) {
		(_t = function(e, t) {
			var n, r, i, o = e.currentStyle && e.currentStyle[t],
				a = e.style;
			if (o == null && a && (i = a[t])) {
				(o = i)
			}
			if (Dt.test(o)) {
				n = a.left;
				r = e.runtimeStyle && e.runtimeStyle.left;
				if (r) {
					e.runtimeStyle.left = e.currentStyle.left;
				}
				if ("fontSize" === t) {
					a.left = "1em";
				} else {
					a.left = o;
				}
				o = a.pixelLeft + "px";
				a.left = n;
				if (r) {
					e.runtimeStyle.left = r;
				}
			}
			if ("" === o) {
				return "auto";
			} else {
				return o;
			}
		});
	}
	Nt = jt || _t;
	I.each(["height", "width"], function(e, t) {
		I.cssHooks[t] = {
			get: function(e, n, r) {
				if (n) {
					if (0 !== e.offsetWidth) {
						return y(e, t, r);
					} else {
						return I.swap(e, Ft, function() {
							return y(e, t, r)
						});
					}
				} else {
					return void 0;
				}
			},
			set: function(e, t) {
				if (It.test(t)) {
					return t + "px";
				} else {
					return t;
				}
			}
		}
	});
	if (!(I.support.opacity)) {
		(I.cssHooks.opacity = {
			get: function(e, t) {
				if (Mt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "")) {
					return parseFloat(RegExp.$1) / 100 + "";
				} else if (t) {
					return "1";
				} else {
					return "";
				}
			},
			set: function(e, t) {
				var n = e.style,
					r = e.currentStyle,
					i = I.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
					o = r && r.filter || n.filter || "";
				n.zoom = 1, t >= 1 && "" === I.trim(o.replace(qt, "")) && (n.removeAttribute("filter"), r && !r.filter) || (n.filter = qt.test(o) ? o.replace(qt, i) : o + " " + i)
			}
		});
	}
	I(function() {
		if (!(I.support.reliableMarginRight)) {
			(I.cssHooks.marginRight = {
				get: function(e, t) {
					return I.swap(e, {
						display: "inline-block"
					}, function() {
						if (t) {
							return Nt(e, "margin-right");
						} else {
							return e.style.marginRight;
						}
					})
				}
			})
		}
	});
	if (I.expr && I.expr.filters) {
		I.expr.filters.hidden = function(e) {
			var t = e.offsetWidth,
				n = e.offsetHeight;
			return 0 === t && 0 === n || !I.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || I.css(e, "display"))
		};
		I.expr.filters.visible = function(e) {
			return !I.expr.filters.hidden(e)
		};
	}
	I.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		I.cssHooks[e + t] = {
			expand: function(n) {
				var r, i = "string" == typeof n ? n.split(" ") : [n],
					o = {};
				for (r = 0; 4 > r; r++) {
					o[e + zt[r] + t] = i[r] || i[r - 2] || i[0];
				}
				return o
			}
		}
	});
	var Rt, Ht, Bt = /%20/g,
		Ut = /\[\]$/,
		Wt = /\r?\n/g,
		Vt = /#.*$/,
		Jt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Xt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		Gt = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		Kt = /^(?:GET|HEAD)$/,
		Qt = /^\/\//,
		Yt = /\?/,
		Zt = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		en = /^(?:select|textarea)/i,
		tn = /\s+/,
		nn = /([?&])_=[^&]*/,
		rn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
		on = I.fn.load,
		an = {},
		sn = {},
		cn = ["*/"] + ["*"];
	try {
		Rt = O.href
	} catch (ln) {
		Rt = q.createElement("a");
		Rt.href = "";
		Rt = Rt.href;
	}
	Ht = rn.exec(Rt.toLowerCase()) || [];
	I.fn.extend({
		load: function(e, n, r) {
			if ("string" != typeof e && on) {
				return on.apply(this, arguments);
			}
			if (!this.length) {
				return this;
			}
			var i = e.indexOf(" ");
			if (i >= 0) {
				var o = e.slice(i, e.length);
				e = e.slice(0, i)
			}
			var a = "GET";
			if (n) {
				if (I.isFunction(n)) {
					r = n;
					n = t;
				} else if ("object" == typeof n) {
					n = I.param(n, I.ajaxSettings.traditional);
					a = "POST";
				}
			}
			var s = this;
			I.ajax({
				url: e,
				type: a,
				dataType: "html",
				data: n,
				complete: function(e, t, n) {
					n = e.responseText;
					if (e.isResolved()) {
						e.done(function(e) {
							n = e
						});
						s.html(o ? I("<div>").append(n.replace(Zt, "")).find(o) : n);
					}
					if (r) {
						s.each(r, [n, t, e]);
					}
				}
			});
			return this;
		},
		serialize: function() {
			return I.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				if (this.elements) {
					return I.makeArray(this.elements);
				} else {
					return this;
				}
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || en.test(this.nodeName) || Xt.test(this.type))
			}).map(function(e, t) {
				var n = I(this).val();
				if (n == null) {
					return null;
				} else if (I.isArray(n)) {
					return I.map(n, function(e) {
						return {
							name: t.name,
							value: e.replace(Wt, "\r\n")
						}
					});
				} else {
					return {
						name: t.name,
						value: n.replace(Wt, "\r\n")
					};
				}
			}).get()
		}
	});
	I.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
		I.fn[t] = function(e) {
			return this.on(t, e)
		}
	});
	I.each(["get", "post"], function(e, n) {
		I[n] = function(e, r, i, o) {
			if (I.isFunction(r)) {
				o = o || i;
				i = r;
				r = t;
			}
			return I.ajax({
				type: n,
				url: e,
				data: r,
				success: i,
				dataType: o
			});
		}
	});
	I.extend({
		getScript: function(e, n) {
			return I.get(e, t, n, "script")
		},
		getJSON: function(e, t, n) {
			return I.get(e, t, n, "json")
		},
		ajaxSetup: function(e, t) {
			if (t) {
				w(e, I.ajaxSettings);
			} else {
				t = e;
				e = I.ajaxSettings;
			}
			w(e, t);
			return e;
		},
		ajaxSettings: {
			url: Rt,
			isLocal: Gt.test(Ht[1]),
			global: true,
			type: "GET",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			processData: true,
			async: true,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": cn
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": e.String,
				"text html": true,
				"text json": I.parseJSON,
				"text xml": I.parseXML
			},
			flatOptions: {
				context: true,
				url: true
			}
		},
		ajaxPrefilter: b(an),
		ajaxTransport: b(sn),
		ajax: function(e, n) {
			function r(e, n, r, a) {
				if (2 !== w) {
					w = 2;
					if (c) {
						clearTimeout(c);
					}
					s = t;
					o = a || "";
					if (e > 0) {
						k.readyState = 4;
					} else {
						k.readyState = 0;
					}
					var l, f, y, b, $, C = n,
						S = r ? x(d, k, r) : t;
					if (e >= 200 && 300 > e || 304 === e) {
						if (d.ifModified && ((b = k.getResponseHeader("Last-Modified")) && (I.lastModified[i] = b), ($ = k.getResponseHeader("Etag")) && (I.etag[i] = $)), 304 === e) {
							C = "notmodified";
							l = true;
						} else {
							try {
								f = T(d, S);
								C = "success";
								l = true;
							} catch (A) {
								C = "parsererror";
								y = A;
							}
						}
					} else {
						y = C;
						if ((!C || e)) {
							C = "error";
							if (0 > e) {
								(e = 0)
							}
						}
					}
					k.status = e;
					k.statusText = "" + (n || C);
					if (l) {
						g.resolveWith(p, [f, C, k]);
					} else {
						g.rejectWith(p, [k, C, y]);
					}
					k.statusCode(v);
					v = t;
					if (u) {
						h.trigger("ajax" + (l ? "Success" : "Error"), [k, d, l ? f : y]);
					}
					m.fireWith(p, [k, C]);
					if (u) {
						h.trigger("ajaxComplete", [k, d]);
						if (!(--I.active)) {
							I.event.trigger("ajaxStop")
						}
					}
				}
			}
			"object" == typeof e && (n = e, e = t), n = n || {};
			var i, o, a, s, c, l, u, f, d = I.ajaxSetup({}, n),
				p = d.context || d,
				h = p !== d && (p.nodeType || p instanceof I) ? I(p) : I.event,
				g = I.Deferred(),
				m = I.Callbacks("once memory"),
				v = d.statusCode || {},
				y = {},
				b = {},
				w = 0,
				k = {
					readyState: 0,
					setRequestHeader: function(e, t) {
						if (!w) {
							var n = e.toLowerCase();
							e = b[n] = b[n] || e;
							y[e] = t;
						}
						return this;
					},
					getAllResponseHeaders: function() {
						if (2 === w) {
							return o;
						} else {
							return null;
						}
					},
					getResponseHeader: function(e) {
						var n;
						if (2 === w) {
							if (!a)
								for (a = {}; n = Jt.exec(o);) a[n[1].toLowerCase()] = n[2];
							n = a[e.toLowerCase()]
						}
						if (n === t) {
							return null;
						} else {
							return n;
						}
					},
					overrideMimeType: function(e) {
						if (!(w)) {
							(d.mimeType = e)
						}
						return this;
					},
					abort: function(e) {
						e = e || "abort";
						if (s) {
							s.abort(e)
						}
						r(0, e);
						return this;
					}
				};
			g.promise(k);
			k.success = k.done;
			k.error = k.fail;
			k.complete = m.add;
			k.statusCode = function(e) {
				if (e) {
					var t;
					if (2 > w)
						for (t in e) {
							v[t] = [v[t], e[t]];
						} else {
							t = e[k.status];
							k.then(t, t);
						}
				}
				return this
			};
			d.url = ((e || d.url) + "").replace(Vt, "").replace(Qt, Ht[1] + "//");
			d.dataTypes = I.trim(d.dataType || "*").toLowerCase().split(tn);
			if (null == d.crossDomain) {
				l = rn.exec(d.url.toLowerCase());
				d.crossDomain = !(!l || l[1] == Ht[1] && l[2] == Ht[2] && (l[3] || ("http:" === l[1] ? 80 : 443)) == (Ht[3] || ("http:" === Ht[1] ? 80 : 443)));
			}
			if (d.data && d.processData && "string" != typeof d.data) {
				(d.data = I.param(d.data, d.traditional));
			}
			$(an, d, n, k);

			if (2 === w) {
				return false;
			}

			u = d.global;
			d.type = d.type.toUpperCase();
			d.hasContent = !Kt.test(d.type);
			if (u && 0 === I.active++) {
				I.event.trigger("ajaxStart");
			}
			if (!d.hasContent && (d.data && (d.url += (Yt.test(d.url) ? "&" : "?") + d.data, delete d.data), i = d.url, d.cache === false)) {
				var C = I.now(),
					S = d.url.replace(nn, "$1_=" + C);
				d.url = S + (S === d.url ? (Yt.test(d.url) ? "&" : "?") + "_=" + C : "");
			}
			if (d.data && d.hasContent && d.contentType !== false || n.contentType)
				k.setRequestHeader("Content-Type", d.contentType);

			if (d.ifModified) {
				i = i || d.url;
				if (I.lastModified[i]) {
					k.setRequestHeader("If-Modified-Since", I.lastModified[i]);
				}
				if (I.etag[i]) {
					k.setRequestHeader("If-None-Match", I.etag[i]);
				}
			}
			k.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + cn + "; q=0.01" : "") : d.accepts["*"]);

			for (f in d.headers) {
				k.setRequestHeader(f, d.headers[f]);
			}
			if (d.beforeSend && (d.beforeSend.call(p, k, d) === false || 2 === w)) {
				k.abort();
				return false;
			}
			for (f in {
				success: 1,
				error: 1,
				complete: 1
			}) {
				k[f](d[f]);
			}
			if (s = $(sn, d, n, k)) {
				k.readyState = 1;
				if (u) {
					h.trigger("ajaxSend", [k, d]);
				}
				if (d.async && d.timeout > 0) {
					(c = setTimeout(function() {
						k.abort("timeout")
					}, d.timeout));
				}
				try {
					w = 1;
					s.send(y, r);
				} catch (A) {
					if (!(2 > w)) {
						throw A;
					}
					r(-1, A)
				}
			} else {
				r(-1, "No Transport");
			}
			return k
		},
		param: function(e, n) {
			var r = [],
				i = function(e, t) {
					if (I.isFunction(t)) {
						t = t();
					} 
					else {
						t = t;
					}
					r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
				};
			if (n === t && (n = I.ajaxSettings.traditional), I.isArray(e) || e.jquery && !I.isPlainObject(e)) I.each(e, function() {
				i(this.name, this.value)
			});
			else {
				for (var o in e) {
					k(o, e[o], n, i);
				}
			}
			return r.join("&").replace(Bt, "+")
		}
	});
	I.extend({
		active: 0,
		lastModified: {},
		etag: {}
	});
	var un = I.now(),
		fn = /(\=)\?(&|$)|\?\?/i;
	I.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			return I.expando + "_" + un++
		}
	});
	I.ajaxPrefilter("json jsonp", function(t, n, r) {
		var i = "string" == typeof t.data && /^application\/x\-www\-form\-urlencoded/.test(t.contentType);
		if ("jsonp" === t.dataTypes[0] || t.jsonp !== false && (fn.test(t.url) || i && fn.test(t.data))) {
			var o, a = t.jsonpCallback = I.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
				s = e[a],
				c = t.url,
				l = t.data,
				u = "$1" + a + "$2";
			if (t.jsonp !== false) {
				c = c.replace(fn, u);
				if (t.url === c) {
					if (i) {
						(l = l.replace(fn, u)); 
					}
					if (t.data === l) {
						(c += (/\?/.test(c) ? "&" : "?") + t.jsonp + "=" + a); 
					}
				}
			}
			t.url = c;
			t.data = l;
			e[a] = function(e) {
				o = [e]
			};
			r.always(function() {
				e[a] = s;
				if (o && I.isFunction(s)) {
					e[a](o[0]); 
				}
			});
			t.converters["script json"] = function() {
				if (!(o)) {
					I.error(a + " was not called")
				}
				return o[0];
			};
			t.dataTypes[0] = "json";
			return "script";
		}
	});
	I.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function(e) {
				I.globalEval(e);
				return e;
			}
		}
	});
	I.ajaxPrefilter("script", function(e) {
		if (e.cache === t) {
			(e.cache = false); 
		}
		if (e.crossDomain) {
			e.type = "GET";
			e.global = false;
		}
	});
	I.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var n, r = q.head || q.getElementsByTagName("head")[0] || q.documentElement;
			return {
				send: function(i, o) {
					n = q.createElement("script");
					n.async = "async";
					if (e.scriptCharset) {
						n.charset = e.scriptCharset;
					}
					n.src = e.url;
					n.onload = n.onreadystatechange = function(e, i) {
						if ((i || !n.readyState || /loaded|complete/.test(n.readyState))) {
							n.onload = n.onreadystatechange = null;
							if (r && n.parentNode) {
								r.removeChild(n)
							}
							n = t;
							if (!(i)) {
								o(200, "success")
							}
						}
					};
					r.insertBefore(n, r.firstChild);
				},
				abort: function() {
					if (n) {
						n.onload(0, 1);
					}
				}
			}
		}
	});
	var dn, pn = e.ActiveXObject ? function() {
			for (var e in dn) {
				dn[e](0, 1);
			}
		} : false,
		hn = 0;
	if (e.ActiveXObject) {
		I.ajaxSettings.xhr = function() {
			return !this.isLocal && C() || S()
		};
	} else {
		I.ajaxSettings.xhr = C;
	}

	! function(e) {
		I.extend(I.support, {
			ajax: !!e,
			cors: !!e && "withCredentials" in e
		})
	}(I.ajaxSettings.xhr());
	if (I.support.ajax) {
		I.ajaxTransport(function(n) {
			if (!n.crossDomain || I.support.cors) {
				var r;
				return {
					send: function(i, o) {
						var a, s, c = n.xhr();
						if (n.username ? c.open(n.type, n.url, n.async, n.username, n.password) : c.open(n.type, n.url, n.async), n.xhrFields)
							for (s in n.xhrFields) {
								c[s] = n.xhrFields[s];
							}
						n.mimeType && c.overrideMimeType && c.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
						try {
							for (s in i) {
								c.setRequestHeader(s, i[s]);
							}
						} catch (l) {}
						c.send(n.hasContent && n.data || null);
						r = function(e, i) {
							var s, l, u, f, d;
							try {
								if (r && (i || 4 === c.readyState)) {
									r = t;
									if (a) {
										c.onreadystatechange = I.noop;
										if (pn) {
											delete dn[a]; 
										}
									}
									if (i)
										if (4 !== c.readyState) {
											c.abort();
										} else {
											s = c.status;
											u = c.getAllResponseHeaders();
											f = {};
											d = c.responseXML;
											if (d && d.documentElement) {
												f.xml = d;
											}
											try {
												f.text = c.responseText
											} catch (e) {}
											try {
												l = c.statusText
											} catch (p) {
												l = ""
											}
											if (s || !n.isLocal || n.crossDomain) {
												if (1223 === s) {
													(s = 204)
												}
											} else if (f.text) {
												s = 200;
											} else {
												s = 404;
											}
										}
								}
							} catch (h) {
								if (!(i)) {
									o(-1, h)
								}
							}
							if (f) {
								o(s, l, f, u);
							}
						};
						if (n.async && 4 !== c.readyState) {
							a = ++hn;
							if (pn) {
								(dn || (dn = {}, I(e).unload(pn)), dn[a] = r);
							}
							c.onreadystatechange = r;
						} else {
							r();
						}
					},
					abort: function() {
						if (r) {
							r(0, 1);
						}
					}
				}
			}
		});
	}
	var gn, mn, vn, yn, bn = {},
		$n = /^(?:toggle|show|hide)$/,
		wn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
		kn = [
			["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
			["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
			["opacity"]
		];
	I.fn.extend({
		show: function(e, t, n) {
			var r, i;
			if (e || 0 === e) {
				return this.animate(N("show", 3), e, t, n);
			}
			for (var o = 0, a = this.length; a > o; o++) {
				r = this[o];
				if (r.style) {
					i = r.style.display;
					if (!(I._data(r, "olddisplay") || "none" !== i)) {
						(i = r.style.display = ""); 
					}
					if (("" === i && "none" === I.css(r, "display") || !I.contains(r.ownerDocument.documentElement, r))) {
						I._data(r, "olddisplay", j(r.nodeName)); 
					}
				}
			}
			for (o = 0; a > o; o++) {
				r = this[o];
				if (r.style) {
					i = r.style.display;
					if (("" === i || "none" === i)) {
						(r.style.display = I._data(r, "olddisplay") || ""); 
					}
				}
			}
			return this
		},
		hide: function(e, t, n) {
			if (e || 0 === e) {
				return this.animate(N("hide", 3), e, t, n);
			}
			for (var r, i, o = 0, a = this.length; a > o; o++) {
				r = this[o];
				if (r.style) {
					i = I.css(r, "display");
					if (!("none" === i || I._data(r, "olddisplay"))) {
						I._data(r, "olddisplay", i); 
					}
				}
			}
			for (o = 0; a > o; o++)
				if (this[o].style) {
					this[o].style.display = "none";
				}
			return this
		},
		_toggle: I.fn.toggle,
		toggle: function(e, t, n) {
			var r = "boolean" == typeof e;
			if (I.isFunction(e) && I.isFunction(t)) {
				this._toggle.apply(this, arguments);
			} else if (e == null || r) {
				this.each(function() {
					var t = r ? e : I(this).is(":hidden");
					I(this)[t ? "show" : "hide"]()
				});
			} else {
				this.animate(N("toggle", 3), e, t, n);
			}
			return this;
		},
		fadeTo: function(e, t, n, r) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function(e, t, n, r) {
			function i() {
				if (o.queue === false) {
					I._mark(this);
				}
				var t, n, r, i, a, s, c, l, u, f, d, p = I.extend({}, o),
					h = 1 === this.nodeType,
					g = h && I(this).is(":hidden");
				p.animatedProperties = {};
				for (r in e) {
					t = I.camelCase(r);
					if (r !== t) {
						e[t] = e[r];
						delete e[r];
					}
					if ((a = I.cssHooks[t]) && "expand" in a) {
						s = a.expand(e[t]), delete e[t];
						for (r in s)
							if (!(r in e)) {
								(e[r] = s[r])
							}
					}
				}
				for (t in e) {
					n = e[t];
					if (I.isArray(n)) {
						p.animatedProperties[t] = n[1];
						n = e[t] = n[0];
					} else {
						p.animatedProperties[t] = p.specialEasing && p.specialEasing[t] || p.easing || "swing";
					}
					if ("hide" === n && g || "show" === n && !g) {
						return p.complete.call(this);
					}
					if (!(!h || "height" !== t && "width" !== t)) {
						p.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
						if ("inline" === I.css(this, "display") && "none" === I.css(this, "float")) {
							if (I.support.inlineBlockNeedsLayout && "inline" !== j(this.nodeName)) {
								this.style.zoom = 1;
							} else {
								this.style.display = "inline-block";
							} 
						}
					}
				}
				if (null != p.overflow) {
					this.style.overflow = "hidden";
				}
				for (r in e) {
					i = new I.fx(this, p, r);
					n = e[r];
					if ($n.test(n)) {
						d = I._data(this, "toggle" + r) || ("toggle" === n ? g ? "show" : "hide" : 0);
						if (d) {
							I._data(this, "toggle" + r, "show" === d ? "hide" : "show");
							i[d]();
						} else {
							i[n]();
						}
					} else {
						c = wn.exec(n);
						l = i.cur();
						if (c) {
							u = parseFloat(c[2]);
							f = c[3] || (I.cssNumber[r] ? "" : "px");
							if ("px" !== f) {
								I.style(this, r, (u || 1) + f);
								l = (u || 1) / i.cur() * l;
								I.style(this, r, l + f);
							}
							if (c[1]) {
								(u = ("-=" === c[1] ? -1 : 1) * u + l);
							}
							i.custom(l, u, f);
						} else {
							i.custom(l, n, "");
						}
					}
				}
				return true
			}
			var o = I.speed(t, n, r);
			if (I.isEmptyObject(e)) {
				return this.each(o.complete, [false]);
			} else {
				return (e = I.extend({}, e), o.queue === false ? this.each(i) : this.queue(o.queue, i));
			}
		},
		stop: function(e, n, r) {
			if ("string" != typeof e) {
				r = n;
				n = e;
				e = t;
			}
			if (n && e !== false) {
				this.queue(e || "fx", [])
			}
			return this.each(function() {
				function t(e, t, n) {
					var i = t[n];
					I.removeData(e, n, true), i.stop(r)
				}
				var n, i = false,
					o = I.timers,
					a = I._data(this);
				if (r || I._unmark(true, this), e == null)
					for (n in a)
						if (a[n] && a[n].stop && n.indexOf(".run") === n.length - 4) {
							t(this, a, n);
						} else if (a[n = e + ".run"] && a[n].stop) {
					t(this, a, n);
				}
				for (n = o.length; n--;)
					if (!(o[n].elem !== this || null != e && o[n].queue !== e)) {
						if (r) {
							o[n](true);
						} else {
							o[n].saveState();
						}
						i = true;
						o.splice(n, 1);
					}
				if (!(r && i)) {
					I.dequeue(this, e)
				}
			});
		}
	});
	I.each({
		slideDown: N("show", 1),
		slideUp: N("hide", 1),
		slideToggle: N("toggle", 1),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		I.fn[e] = function(e, n, r) {
			return this.animate(t, e, n, r)
		}
	});
	I.extend({
		speed: function(e, t, n) {
			var r = e && "object" == typeof e ? I.extend({}, e) : {
				complete: n || !n && t || I.isFunction(e) && e,
				duration: e,
				easing: n && t || t && !I.isFunction(t) && t
			};
			if (I.fx.off) {
				r.duration = 0;
			} else if ("number" == typeof r.duration) {
				r.duration = r.duration;
			} else if (r.duration in I.fx.speeds) {
				r.duration = I.fx.speeds[r.duration];
			} else {
				r.duration = I.fx.speeds._default;
			}
			if ((null == r.queue || r.queue === true)) {
				(r.queue = "fx")
			}
			r.old = r.complete;
			r.complete = function(e) {
				if (I.isFunction(r.old)) {
					r.old.call(this); 
				}
				if (r.queue) {
					I.dequeue(this, r.queue);
				} else if (e !== false) {
					I._unmark(this); 
				}
			};
			return r;
		},
		easing: {
			linear: function(e) {
				return e
			},
			swing: function(e) {
				return -Math.cos(e * Math.PI) / 2 + .5
			}
		},
		timers: [],
		fx: function(e, t, n) {
			this.options = t;
			this.elem = e;
			this.prop = n;
			t.orig = t.orig || {};
		}
	});
	I.fx.prototype = {
		update: function() {
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this); 
			}
			(I.fx.step[this.prop] || I.fx.step._default)(this);
		},
		cur: function() {
			if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) {
				return this.elem[this.prop];
			}
			var e, t = I.css(this.elem, this.prop);
			if (isNaN(e = parseFloat(t))) {
				if (t && "auto" !== t) {
					return t;
				} else {
					return 0;
				}
			} else {
				return e;
			}
		},
		custom: function(e, n, r) {
			function i(e) {
				return o.step(e)
			}
			var o = this,
				a = I.fx;
			this.startTime = yn || A();
			this.end = n;
			this.now = this.start = e;
			this.pos = this.state = 0;
			this.unit = r || this.unit || (I.cssNumber[this.prop] ? "" : "px");
			i.queue = this.options.queue;
			i.elem = this.elem;
			i.saveState = function() {
				if (I._data(o.elem, "fxshow" + o.prop) === t) {
					if (o.options.hide) {
						I._data(o.elem, "fxshow" + o.prop, o.start);
					} else if (o.options.show) {
						I._data(o.elem, "fxshow" + o.prop, o.end)
					}
				}
			};
			if (i() && I.timers.push(i) && !vn) {
				(vn = setInterval(a.tick, a.interval));
			}
		},
		show: function() {
			var e = I._data(this.elem, "fxshow" + this.prop);
			this.options.orig[this.prop] = e || I.style(this.elem, this.prop);
			this.options.show = true;
			if (e !== t) {
				this.custom(this.cur(), e);
			} else {
				this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur());
			}
			I(this.elem).show();
		},
		hide: function() {
			this.options.orig[this.prop] = I._data(this.elem, "fxshow" + this.prop) || I.style(this.elem, this.prop);
			this.options.hide = true;
			this.custom(this.cur(), 0);
		},
		step: function(e) {
			var t, n, r, i = yn || A(),
				o = true,
				a = this.elem,
				s = this.options;
			if (e || i >= s.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
				s.animatedProperties[this.prop] = true;
				for (t in s.animatedProperties)
					if (s.animatedProperties[t] !== true) {
						o = false;
					}
				if (o) {
					if (!(null == s.overflow || I.support.shrinkWrapBlocks)) {
						I.each(["", "X", "Y"], function(e, t) {
							a.style["overflow" + t] = s.overflow[e]
						})
					}
					if (s.hide) {
						I(a).hide()
					}
					if (s.hide || s.show)
						for (t in s.animatedProperties) {
							I.style(a, t, s.orig[t]);
							I.removeData(a, "fxshow" + t, true);
							I.removeData(a, "toggle" + t, true);
						}
					r = s.complete, r && (s.complete = false, r.call(a))
				}
				return false
			}
			if (1 / 0 == s.duration) {
				this.now = i;
			} else {
				n = i - this.startTime;
				this.state = n / s.duration;
				this.pos = I.easing[s.animatedProperties[this.prop]](this.state, n, 0, 1, s.duration);
				this.now = this.start + (this.end - this.start) * this.pos;
			}
			this.update();
			return true;
		}
	};
	I.extend(I.fx, {
		tick: function() {
			for (var e, t = I.timers, n = 0; n < t.length; n++) {
				e = t[n];
				if (!(e() || t[n] !== e)) {
					t.splice(n--, 1);
				}
			}
			if (!(t.length)) {
				I.fx.stop()
			}
		},
		interval: 13,
		stop: function() {
			clearInterval(vn);
			vn = null;
		},
		speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		},
		step: {
			opacity: function(e) {
				I.style(e.elem, "opacity", e.now)
			},
			_default: function(e) {
				if (e.elem.style && null != e.elem.style[e.prop]) {
					e.elem.style[e.prop] = e.now + e.unit;
				} else {
					e.elem[e.prop] = e.now;
				}
			}
		}
	});
	I.each(kn.concat.apply([], kn), function(e, t) {
		if (t.indexOf("margin")) {
			(I.fx.step[t] = function(e) {
				I.style(e.elem, t, Math.max(0, e.now) + e.unit)
			});
		}
	});
	if (I.expr && I.expr.filters) {
		(I.expr.filters.animated = function(e) {
			return I.grep(I.timers, function(t) {
				return e === t.elem
			}).length
		});
	}
	var xn, Tn = /^t(?:able|d|h)$/i,
		Cn = /^(?:body|html)$/i;
	if ("getBoundingClientRect" in q.documentElement) {
		xn = function(e, t, n, r) {
			try {
				r = e.getBoundingClientRect()
			} catch (i) {}
			if (!r || !I.contains(n, e)) {
				if (r) {
					return {
						top: r.top,
						left: r.left
					};
				} else {
					return {
						top: 0,
						left: 0
					};
				}
			}
			var o = t.body,
				a = _(t),
				s = n.clientTop || o.clientTop || 0,
				c = n.clientLeft || o.clientLeft || 0,
				l = a.pageYOffset || I.support.boxModel && n.scrollTop || o.scrollTop,
				u = a.pageXOffset || I.support.boxModel && n.scrollLeft || o.scrollLeft,
				f = r.top + l - s,
				d = r.left + u - c;
			return {
				top: f,
				left: d
			}
		};
	} else {
		xn = function(e, t, n) {
			for (var r, i = e.offsetParent, o = e, a = t.body, s = t.defaultView, c = s ? s.getComputedStyle(e, null) : e.currentStyle, l = e.offsetTop, u = e.offsetLeft;
				(e = e.parentNode) && e !== a && e !== n && (!I.support.fixedPosition || "fixed" !== c.position);) {
				if (s) {
					r = s.getComputedStyle(e, null);
				} else {
					r = e.currentStyle;
				}
				l -= e.scrollTop;
				u -= e.scrollLeft;
				if (e === i) {
					l += e.offsetTop;
					u += e.offsetLeft;
					if (!(!I.support.doesNotAddBorder || I.support.doesAddBorderForTableAndCells && Tn.test(e.nodeName))) {
						l += parseFloat(r.borderTopWidth) || 0;
						u += parseFloat(r.borderLeftWidth) || 0;
					}
					o = i;
					i = e.offsetParent;
				}
				if (I.support.subtractsBorderForOverflowNotVisible && "visible" !== r.overflow) {
					l += parseFloat(r.borderTopWidth) || 0;
					u += parseFloat(r.borderLeftWidth) || 0;
				}
				c = r;
			}
			if (("relative" === c.position || "static" === c.position)) {
				l += a.offsetTop;
				u += a.offsetLeft;
			}
			if (I.support.fixedPosition && "fixed" === c.position) {
				l += Math.max(n.scrollTop, a.scrollTop);
				u += Math.max(n.scrollLeft, a.scrollLeft);
			}
			return {
				top: l,
				left: u
			};
		};
	}
	I.fn.offset = function(e) {
		if (arguments.length) {
			if (e === t) {
				return this;
			} else {
				return this.each(function(t) {
					I.offset.setOffset(this, e, t)
				});
			}
		}
		var n = this[0],
			r = n && n.ownerDocument;
		if (r) {
			if (n === r.body) {
				return I.offset.bodyOffset(n);
			} else {
				return xn(n, r, r.documentElement);
			}
		} else {
			return null;
		}
	};
	I.offset = {
		bodyOffset: function(e) {
			var t = e.offsetTop,
				n = e.offsetLeft;
			if (I.support.doesNotIncludeMarginInBodyOffset) {
				t += parseFloat(I.css(e, "marginTop")) || 0;
				n += parseFloat(I.css(e, "marginLeft")) || 0;
			}
			return {
				top: t,
				left: n
			};
		},
		setOffset: function(e, t, n) {
			var r = I.css(e, "position");
			if ("static" === r) {
				e.style.position = "relative";
			}
			var i, o, a = I(e),
				s = a.offset(),
				c = I.css(e, "top"),
				l = I.css(e, "left"),
				u = ("absolute" === r || "fixed" === r) && I.inArray("auto", [c, l]) > -1,
				f = {},
				d = {};
			if (u) {
				d = a.position();
				i = d.top;
				o = d.left;
			} else {
				i = parseFloat(c) || 0;
				o = parseFloat(l) || 0;
			}
			if (I.isFunction(t)) {
				(t = t.call(e, n, s));
			}
			if (null != t.top) {
				f.top = t.top - s.top + i;
			}
			if (null != t.left) {
				f.left = t.left - s.left + o;
			}
			if ("using" in t) {
				t.using.call(e, f);
			} else {
				a.css(f);
			}
		}
	};
	I.fn.extend({
		position: function() {
			if (!this[0]) {
				return null;
			}
			var e = this[0],
				t = this.offsetParent(),
				n = this.offset(),
				r = Cn.test(t[0].nodeName) ? {
					top: 0,
					left: 0
				} : t.offset();
			n.top -= parseFloat(I.css(e, "marginTop")) || 0;
			n.left -= parseFloat(I.css(e, "marginLeft")) || 0;
			r.top += parseFloat(I.css(t[0], "borderTopWidth")) || 0;
			r.left += parseFloat(I.css(t[0], "borderLeftWidth")) || 0;
			return {
				top: n.top - r.top,
				left: n.left - r.left
			};
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || q.body; e && !Cn.test(e.nodeName) && "static" === I.css(e, "position");) e = e.offsetParent;
				return e
			})
		}
	});
	I.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, n) {
		var r = /Y/.test(n);
		I.fn[e] = function(i) {
			return I.access(this, function(e, i, o) {
				var a = _(e);
				if (o === t) {
					if (a) {
						if (n in a) {
							return a[n];
						} else {
							return I.support.boxModel && a.document.documentElement[i] || a.document.body[i];
						}
					} else {
						return e[i];
					}
				} else {
					return void(a ? a.scrollTo(r ? I(a).scrollLeft() : o, r ? o : I(a).scrollTop()) : e[i] = o);
				}
			}, e, i, arguments.length, null)
		}
	});
	I.each({
		Height: "height",
		Width: "width"
	}, function(e, n) {
		var r = "client" + e,
			i = "scroll" + e,
			o = "offset" + e;
		I.fn["inner" + e] = function() {
			var e = this[0];
			if (e) {
				if (e.style) {
					return parseFloat(I.css(e, n, "padding"));
				} else {
					return this[n]();
				}
			} else {
				return null;
			}
		};
		I.fn["outer" + e] = function(e) {
			var t = this[0];
			if (t) {
				if (t.style) {
					return parseFloat(I.css(t, n, e ? "margin" : "border"));
				} else {
					return this[n]();
				}
			} else {
				return null;
			}
		};
		I.fn[n] = function(e) {
			return I.access(this, function(e, n, a) {
				var s, c, l, u;
				if (I.isWindow(e)) {
					return (s = e.document, c = s.documentElement[r], I.support.boxModel && c || s.body && s.body[r] || c);
				} else if (9 === e.nodeType) {
					return (s = e.documentElement, s[r] >= s[i] ? s[r] : Math.max(e.body[i], s[i], e.body[o], s[o]));
				} else if (a === t) {
					return (l = I.css(e, n), u = parseFloat(l), I.isNumeric(u) ? u : l);
				} else {
					return void I(e).css(n, a);
				}
			}, n, e, arguments.length, null)
		};
	});
	e.jQuery = e.$ = I;
	if ("function" == typeof define && define.amd && define.amd.jQuery) {
		define("jquery", [], function() {
			return I
		});
	}
}(window);
