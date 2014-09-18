! function(e, t, n) {
	"use strict";

	function r(e) {
		return function() {
			var t, n, r = arguments[0],
				i = "[" + (e ? e + ":" : "") + r + "] ",
				o = arguments[1],
				a = arguments,
				s = function(e) {
					if ("function" == typeof e) {
						return e.toString().replace(/ \{[\s\S]*$/, "");
					} else if ("undefined" == typeof e) {
						return "undefined";
					} else if ("string" != typeof e) {
						return JSON.stringify(e);
					} else {
						return e;
					}
				};
			t = i + o.replace(/\{\d+\}/g, function(e) {
				var t, n = +e.slice(1, -1);
				if (n + 2 < a.length) {
					return (t = a[n + 2], "function" == typeof t ? t.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof t ? "undefined" : "string" != typeof t ? B(t) : t);
				} else {
					return e;
				}
			});
			t = t + "\nhttp://errors.angularjs.org/1.2.16/" + (e ? e + "/" : "") + r;
			for (n = 2; n < arguments.length; n++) {
				t = t + (n == 2 ? "?" : "&") + "p" + (n - 2) + "=" + encodeURIComponent(s(arguments[n]));
			}
			return new Error(t)
		}
	}

	function i(e) {
		if (e == null || S(e)) {
			return false;
		}
		var t = e.length;
		if (1 === e.nodeType && t) {
			return true;
		} else {
			return $(e) || x(e) || 0 === t || "number" == typeof t && t > 0 && t - 1 in e;
		}
	}

	function o(e, t, n) {
		var r;
		if (e)
			if (T(e))
				for (r in e)
					if (!(r == "prototype" || r == "length" || r == "name" || e.hasOwnProperty && !e.hasOwnProperty(r))) {
						t.call(n, e[r], r)
					} else if (e.forEach && e.forEach !== o) e.forEach(t, n);
		else if (i(e)) {
			for (r = 0; r < e.length; r++) {
				t.call(n, e[r], r);
			}
		} else {
			for (r in e) {
				if (e.hasOwnProperty(r)) {
					t.call(n, e[r], r);
				}
			}
		}
		return e
	}

	function a(e) {
		var t = [];
		for (var n in e)
			if (e.hasOwnProperty(n)) {
				t.push(n);
			}
		return t.sort()
	}

	function s(e, t, n) {
		for (var r = a(e), i = 0; i < r.length; i++) {
			t.call(n, e[r[i]], r[i]);
		}
		return r
	}

	function c(e) {
		return function(t, n) {
			e(n, t)
		}
	}

	function l() {
		for (var e, t = Er.length; t;) {
			t--;
			e = Er[t].charCodeAt(0);
			if (e == 57) {
				Er[t] = "A";
				return Er.join("");
			}
			if (90 != e) {
				Er[t] = String.fromCharCode(e + 1);
				return Er.join("");
			}
			Er[t] = "0"
		}
		Er.unshift("0");
		return Er.join("");
	}

	function u(e, t) {
		if (t) {
			e.$$hashKey = t;
		} else {
			delete e.$$hashKey;
		}
	}

	function f(e) {
		var t = e.$$hashKey;
		o(arguments, function(t) {
			if (t !== e) {
				o(t, function(t, n) {
					e[n] = t
				});
			}
		});
		u(e, t);
		return e;
	}

	function d(e) {
		return parseInt(e, 10)
	}

	function p(e, t) {
		return f(new(f(function() {}, {
			prototype: e
		})), t)
	}

	function h() {}

	function g(e) {
		return e
	}

	function m(e) {
		return function() {
			return e
		}
	}

	function v(e) {
		return "undefined" == typeof e
	}

	function y(e) {
		return "undefined" != typeof e
	}

	function b(e) {
		return null != e && "object" == typeof e
	}

	function $(e) {
		return "string" == typeof e
	}

	function w(e) {
		return "number" == typeof e
	}

	function k(e) {
		return "[object Date]" === Cr.call(e)
	}

	function x(e) {
		return "[object Array]" === Cr.call(e)
	}

	function T(e) {
		return "function" == typeof e
	}

	function C(e) {
		return "[object RegExp]" === Cr.call(e)
	}

	function S(e) {
		return e && e.document && e.location && e.alert && e.setInterval
	}

	function A(e) {
		return e && e.$evalAsync && e.$watch
	}

	function E(e) {
		return "[object File]" === Cr.call(e)
	}

	function N(e) {
		return "[object Blob]" === Cr.call(e)
	}

	function j(e) {
		return !(!e || !(e.nodeName || e.prop && e.attr && e.find))
	}

	function _(e, t, n) {
		var r = [];
		o(e, function(e, i, o) {
			r.push(t.call(n, e, i, o))
		});
		return r;
	}

	function q(e, t) {
		return -1 != M(e, t)
	}

	function M(e, t) {
		if (e.indexOf) {
			return e.indexOf(t);
		}
		for (var n = 0; n < e.length; n++)
			if (t === e[n]) {
				return n;
			}
		return -1
	}

	function O(e, t) {
		var n = M(e, t);
		if (n >= 0) {
			e.splice(n, 1)
		}
		return t;
	}

	function I(e, t) {
		if (S(e) || A(e)) {
			throw Sr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
		}
		if (t) {
			if (e === t) {
				throw Sr("cpi", "Can't copy! Source and destination are identical.");
			}
			if (x(e)) {
				t.length = 0;
				for (var n = 0; n < e.length; n++) {
					t.push(I(e[n]));
				}
			} else {
				var r = t.$$hashKey;
				o(t, function(e, n) {
					delete t[n]
				});
				for (var i in e) {
					t[i] = I(e[i]);
				}
				u(t, r)
			}
		} else {
			t = e;
			if (e) {
				if (x(e)) {
					t = I(e, []);
				} else if (k(e)) {
					t = new Date(e.getTime());
				} else if (C(e)) {
					t = new RegExp(e.source);
				} else if (b(e)) {
					(t = I(e, {})); 
				}
			}
		}
		return t
	}

	function D(e, t) {
		t = t || {};
		for (var n in e)
			if (!(!e.hasOwnProperty(n) || "$" === n.charAt(0) && "$" === n.charAt(1))) {
				(t[n] = e[n])
			}
		return t
	}

	function L(e, t) {
		if (e === t) {
			return true;
		}
		if (null === e || null === t) {
			return false;
		}
		if (e !== e && t !== t) {
			return true;
		}
		var r, i, o, a = typeof e,
			s = typeof t;
		if (s == a && a == "object") {
			if (!x(e)) {
				if (k(e)) {
					return k(t) && e.getTime() == t.getTime();
				}
				if (C(e) && C(t)) {
					return e.toString() == t.toString();
				}
				if (A(e) || A(t) || S(e) || S(t) || x(t)) {
					return false;
				}
				o = {};
				for (i in e)
					if ("$" !== i.charAt(0) && !T(e[i])) {
						if (!L(e[i], t[i])) {
							return false;
						}
						o[i] = true
					}
				for (i in t)
					if (!o.hasOwnProperty(i) && "$" !== i.charAt(0) && t[i] !== n && !T(t[i])) {
						return false;
					}
				return true
			}
			if (!x(t)) {
				return false;
			}
			if ((r = e.length) == t.length) {
				for (i = 0; r > i; i++)
					if (!L(e[i], t[i])) {
						return false;
					}
				return true
			}
		}
		return false
	}

	function P() {
		return t.securityPolicy && t.securityPolicy.isActive || t.querySelector && !(!t.querySelector("[ng-csp]") && !t.querySelector("[data-ng-csp]"))
	}

	function F(e, t, n) {
		return e.concat(xr.call(t, n))
	}

	function z(e, t) {
		return xr.call(e, t || 0)
	}

	function R(e, t) {
		var n = arguments.length > 2 ? z(arguments, 2) : [];
		if (!T(t) || t instanceof RegExp) {
			return t;
		} else if (n.length) {
			return function() {
				if (arguments.length) {
					return t.apply(e, n.concat(xr.call(arguments, 0)));
				} else {
					return t.apply(e, n);
				}
			};
		} else {
			return function() {
				if (arguments.length) {
					return t.apply(e, arguments);
				} else {
					return t.call(e);
				}
			};
		}
	}

	function H(e, r) {
		var i = r;
		if ("string" == typeof e && "$" === e.charAt(0)) {
			i = n;
		} else if (S(r)) {
			i = "$WINDOW";
		} else {
			if (r && t === r) {
				i = "$DOCUMENT";
			} else if (A(r)) {
				i = "$SCOPE";
			};
		}
		return i;
	}

	function B(e, t) {
		if ("undefined" == typeof e) {
			return n;
		} else {
			return JSON.stringify(e, H, t ? "  " : null);
		}
	}

	function U(e) {
		if ($(e)) {
			return JSON.parse(e);
		} else {
			return e;
		}
	}

	function W(e) {
		if ("function" == typeof e) e = true;
		else if (e && 0 !== e.length) {
			var t = pr("" + e);
			e = !(t == "f" || t == "0" || t == "false" || t == "no" || t == "n" || t == "[]")
		} else {
			e = false;
		}
		return e
	}

	function V(e) {
		e = br(e).clone();
		try {
			e.empty()
		} catch (t) {}
		var n = 3,
			r = br("<div>").append(e).html();
		try {
			if (e[0].nodeType === n) {
				return pr(r);
			} else {
				return r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(e, t) {
					return "<" + pr(t)
				});
			}
		} catch (t) {
			return pr(r)
		}
	}

	function J(e) {
		try {
			return decodeURIComponent(e)
		} catch (t) {}
	}

	function X(e) {
		var t, n, r = {};
		o((e || "").split("&"), function(e) {
			if (e && (t = e.split("="), n = J(t[0]), y(n))) {
				var i = y(t[1]) ? J(t[1]) : true;
				if (r[n]) {
					if (x(r[n])) {
						r[n].push(i);
					} else {
						r[n] = [r[n], i];
					}
				} else {
					r[n] = i;
				}
			}
		});
		return r;
	}

	function G(e) {
		var t = [];
		o(e, function(e, n) {
			if (x(e)) {
				o(e, function(e) {
					t.push(Q(n, true) + (e === true ? "" : "=" + Q(e, true)))
				});
			} else {
				t.push(Q(n, true) + (e === true ? "" : "=" + Q(e, true)));
			}
		});
		if (t.length) {
			return t.join("&");
		} else {
			return "";
		}
	}

	function K(e) {
		return Q(e, true).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
	}

	function Q(e, t) {
		return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
	}

	function Y(e, n) {
		function r(e) {
			if (e) {
				s.push(e);
			}
		}
		var i, a, s = [e],
			c = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
			l = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
		o(c, function(n) {
			c[n] = true;
			r(t.getElementById(n));
			n = n.replace(":", "\\:");
			if (e.querySelectorAll) {
				o(e.querySelectorAll("." + n), r);
				o(e.querySelectorAll("." + n + "\\:"), r);
				o(e.querySelectorAll("[" + n + "]"), r);
			}
		});
		o(s, function(e) {
			if (!i) {
				var t = " " + e.className + " ",
					n = l.exec(t);
				if (n) {
					i = e;
					a = (n[2] || "").replace(/\s+/g, ",");
				} else {
					o(e.attributes, function(t) {
						if (!i && c[t.name]) {
							i = e;
							a = t.value;
						}
					});
				}
			}
		});
		if (i) {
			n(i, a ? [a] : []);
		}
	}

	function Z(n, r) {
		var i = function() {
				if (n = br(n), n.injector()) {
					var e = n[0] === t ? "document" : V(n);
					throw Sr("btstrpd", "App Already Bootstrapped with this Element '{0}'", e)
				}
				r = r || [];
				r.unshift(["$provide",
					function(e) {
						e.value("$rootElement", n)
					}
				]);
				r.unshift("ng");
				var i = Ot(r);
				i.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate",
					function(e, t, n, r) {
						e.$apply(function() {
							t.data("$injector", r);
							n(t)(e);
						})
					}
				]);
				return i;
			},
			a = /^NG_DEFER_BOOTSTRAP!/;
		if (e && !a.test(e.name)) {
			return i();
		} else {
			return (e.name = e.name.replace(a, ""), void(Ar.resumeBootstrap = function(e) {
				o(e, function(e) {
					r.push(e)
				});
				i();
			}));
		}
	}

	function et(e, t) {
		t = t || "_";
		return e.replace(jr, function(e, n) {
			return (n ? t : "") + e.toLowerCase()
		});
	}

	function tt() {
		$r = e.jQuery;
		if ($r) {
			br = $r;
			f($r.fn, {
				scope: Wr.scope,
				isolateScope: Wr.isolateScope,
				controller: Wr.controller,
				injector: Wr.injector,
				inheritedData: Wr.inheritedData
			});
			ft("remove", true, true, false);
			ft("empty", false, false, false);
			ft("html", false, false, true);
		} else {
			br = gt;
		}
		Ar.element = br;
	}

	function nt(e, t, n) {
		if (!e) {
			throw Sr("areq", "Argument '{0}' is {1}", t || "?", n || "required");
		}
		return e
	}

	function rt(e, t, n) {
		if (n && x(e)) {
			(e = e[e.length - 1])
		}
		nt(T(e), t, "not a function, got " + (e && "object" == typeof e ? e.constructor.name || "Object" : typeof e));
		return e;
	}

	function it(e, t) {
		if ("hasOwnProperty" === e) {
			throw Sr("badname", "hasOwnProperty is not a valid {0} name", t);
		}
	}

	function ot(e, t, n) {
		if (!t) {
			return e;
		}
		for (var r, i = t.split("."), o = e, a = i.length, s = 0; a > s; s++) {
			r = i[s];
			if (e) {
				(e = (o = e)[r]);
			}
		}
		if (!n && T(e)) {
			return R(o, e);
		} else {
			return e;
		}
	}

	function at(e) {
		var t = e[0],
			n = e[e.length - 1];
		if (t === n) {
			return br(t);
		}
		var r = t,
			i = [r];
		do {
			if (r = r.nextSibling, !r) break;
			i.push(r)
		} while (r !== n);
		return br(i)
	}

	function st(e) {
		function t(e, t, n) {
			return e[t] || (e[t] = n())
		}
		var n = r("$injector"),
			i = r("ng"),
			o = t(e, "angular", Object);
		o.$$minErr = o.$$minErr || r;
		return t(o, "module", function() {
			var e = {};
			return function(r, o, a) {
				var s = function(e, t) {
					if ("hasOwnProperty" === e) {
						throw i("badname", "hasOwnProperty is not a valid {0} name", t);
					}
				};
				s(r, "module");
				if (o && e.hasOwnProperty(r)) {
					(e[r] = null)
				}
				return t(e, r, function() {
					function e(e, n, r) {
						return function() {
							t[r || "push"]([e, n, arguments]);
							return c;
						}
					}
					if (!o) {
						throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
					}
					var t = [],
						i = [],
						s = e("$injector", "invoke"),
						c = {
							_invokeQueue: t,
							_runBlocks: i,
							requires: o,
							name: r,
							provider: e("$provide", "provider"),
							factory: e("$provide", "factory"),
							service: e("$provide", "service"),
							value: e("$provide", "value"),
							constant: e("$provide", "constant", "unshift"),
							animation: e("$animateProvider", "register"),
							filter: e("$filterProvider", "register"),
							controller: e("$controllerProvider", "register"),
							directive: e("$compileProvider", "directive"),
							config: s,
							run: function(e) {
								i.push(e);
								return this;
							}
						};
					if (a) {
						s(a)
					}
					return c;
				});
			}
		});
	}

	function ct(t) {
		f(t, {
			bootstrap: Z,
			copy: I,
			extend: f,
			equals: L,
			element: br,
			forEach: o,
			injector: Ot,
			noop: h,
			bind: R,
			toJson: B,
			fromJson: U,
			identity: g,
			isUndefined: v,
			isDefined: y,
			isString: $,
			isFunction: T,
			isObject: b,
			isNumber: w,
			isElement: j,
			isArray: x,
			version: _r,
			isDate: k,
			lowercase: pr,
			uppercase: gr,
			callbacks: {
				counter: 0
			},
			$$minErr: r,
			$$csp: P
		}), wr = st(e);
		try {
			wr("ngLocale")
		} catch (n) {
			wr("ngLocale", []).provider("$locale", rn)
		}
		wr("ng", ["ngLocale"], ["$provide",
			function(e) {
				e.provider({
					$$sanitizeUri: _n
				});
				e.provider("$compile", Rt).directive({
					a: Ci,
					input: Ii,
					textarea: Ii,
					form: Ni,
					script: vo,
					select: $o,
					style: ko,
					option: wo,
					ngBind: Ji,
					ngBindHtml: Gi,
					ngBindTemplate: Xi,
					ngClass: Ki,
					ngClassEven: Yi,
					ngClassOdd: Qi,
					ngCloak: Zi,
					ngController: eo,
					ngForm: ji,
					ngHide: uo,
					ngIf: no,
					ngInclude: ro,
					ngInit: oo,
					ngNonBindable: ao,
					ngPluralize: so,
					ngRepeat: co,
					ngShow: lo,
					ngStyle: fo,
					ngSwitch: po,
					ngSwitchWhen: ho,
					ngSwitchDefault: go,
					ngOptions: bo,
					ngTransclude: mo,
					ngModel: Ri,
					ngList: Ui,
					ngChange: Hi,
					required: Bi,
					ngRequired: Bi,
					ngValue: Vi
				}).directive({
					ngInclude: io
				}).directive(Si).directive(to);
				e.provider({
					$anchorScroll: It,
					$animate: ei,
					$browser: Pt,
					$cacheFactory: Ft,
					$controller: Ut,
					$document: Wt,
					$exceptionHandler: Vt,
					$filter: Hn,
					$interpolate: tn,
					$interval: nn,
					$http: Qt,
					$httpBackend: Zt,
					$location: vn,
					$log: yn,
					$parse: Sn,
					$rootScope: jn,
					$q: An,
					$sce: Dn,
					$sceDelegate: In,
					$sniffer: Ln,
					$templateCache: zt,
					$timeout: Pn,
					$window: Rn,
					$$rAF: Nn,
					$$asyncCallback: Dt
				});
			}
		])
	}

	function lt() {
		return ++Or
	}

	function ut(e) {
		return e.replace(Lr, function(e, t, n, r) {
			if (r) {
				return n.toUpperCase();
			} else {
				return n;
			}
		}).replace(Pr, "Moz$1")
	}

	function ft(e, t, n, r) {
		function i(e) {
			var i, a, s, c, l, u, f, d = n && e ? [this.filter(e)] : [this],
				p = t;
			if (!r || null != e) {
				for (; d.length;) {
					i = d.shift();
					a = 0;
					for (s = i.length; s > a; a++) {
						c = br(i[a]);
						if (p) {
							c.triggerHandler("$destroy");
						} else {
							p = !p;
						}
						l = 0;
						for (u = (f = c.children()).length; u > l; l++) {
							d.push($r(f[l]));
						}
					}
				}
			}
			return o.apply(this, arguments)
		}
		var o = $r.fn[e];
		o = o.$original || o;
		i.$original = o;
		$r.fn[e] = i;
	}

	function dt(e) {
		return !Rr.test(e)
	}

	function pt(e, t) {
		var n, r, i, o, a, s, c = t.createDocumentFragment(),
			l = [];
		if (dt(e)) l.push(t.createTextNode(e));
		else {
			for (n = c.appendChild(t.createElement("div")), r = (Hr.exec(e) || ["", ""])[1].toLowerCase(), i = Ur[r] || Ur._default, n.innerHTML = "<div>&#160;</div>" + i[1] + e.replace(Br, "<$1></$2>") + i[2], n.removeChild(n.firstChild), o = i[0]; o--;) {
				n = n.lastChild;
			}
			a = 0;
			for (s = n.childNodes.length; s > a; ++a) {
				l.push(n.childNodes[a]);
			}
			n = c.firstChild, n.textContent = ""
		}
		c.textContent = "";
		c.innerHTML = "";
		return l;
	}

	function ht(e, n) {
		n = n || t;
		var r;
		if (r = zr.exec(e)) {
			return [n.createElement(r[1])];
		} else {
			return pt(e, n);
		}
	}

	function gt(e) {
		if (e instanceof gt) {
			return e;
		}
		if ($(e) && (e = Nr(e)), !(this instanceof gt)) {
			if ($(e) && "<" != e.charAt(0)) {
				throw Fr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
			}
			return new gt(e)
		}
		if ($(e)) {
			Ct(this, ht(e));
			var n = br(t.createDocumentFragment());
			n.append(this)
		} else {
			Ct(this, e);
		}
	}

	function mt(e) {
		return e.cloneNode(true)
	}

	function vt(e) {
		bt(e);
		for (var t = 0, n = e.childNodes || []; t < n.length; t++) {
			vt(n[t]);
		}
	}

	function yt(e, t, n, r) {
		if (y(r)) {
			throw Fr("offargs", "jqLite#off() does not support the `selector` argument");
		}
		var i = $t(e, "events"),
			a = $t(e, "handle");
		if (a) {
			if (v(t)) {
				o(i, function(t, n) {
					Dr(e, n, t);
					delete i[n];
				});
			} else {
				o(t.split(" "), function(t) {
					if (v(n)) {
						Dr(e, t, i[t]);
						delete i[t];
					} else {
						O(i[t] || [], n);
					}
				});
			}
		}
	}

	function bt(e, t) {
		var r = e[Mr],
			i = qr[r];
		if (i) {
			if (t) {
				return void delete qr[r].data[t];
			}
			if (i.handle) {
				if (i.events.$destroy) {
					i.handle({}, "$destroy");
				}
				yt(e);
			}
			delete qr[r];
			e[Mr] = n;
		}
	}

	function $t(e, t, n) {
		var r = e[Mr],
			i = qr[r || -1];
		if (y(n)) {
			return (i || (e[Mr] = r = lt(), i = qr[r] = {}), void(i[t] = n));
		} else {
			return i && i[t];
		}
	}

	function wt(e, t, n) {
		var r = $t(e, "data"),
			i = y(n),
			o = !i && y(t),
			a = o && !b(t);
		if (r || a || $t(e, "data", r = {}), i) r[t] = n;
		else {
			if (!o) {
				return r;
			}
			if (a) {
				return r && r[t];
			}
			f(r, t)
		}
	}

	function kt(e, t) {
		if (e.getAttribute) {
			return (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1;
		} else {
			return false;
		}
	}

	function xt(e, t) {
		if (t && e.setAttribute) {
			o(t.split(" "), function(t) {
				e.setAttribute("class", Nr((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Nr(t) + " ", " ")))
			});
		}
	}

	function Tt(e, t) {
		if (t && e.setAttribute) {
			var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
			o(t.split(" "), function(e) {
				e = Nr(e);
				if (-1 === n.indexOf(" " + e + " ")) {
					n += e + " ";
				}
			});
			e.setAttribute("class", Nr(n));
		}
	}

	function Ct(e, t) {
		if (t) {
			if (t.nodeName || !y(t.length) || S(t)) {
				t = [t];
			} else {
				t = t;
			}
			for (var n = 0; n < t.length; n++) {
				e.push(t[n]);
			}
		}
	}

	function St(e, t) {
		return At(e, "$" + (t || "ngController") + "Controller")
	}

	function At(e, t, r) {
		e = br(e), 9 == e[0].nodeType && (e = e.find("html"));
		for (var i = x(t) ? t : [t]; e.length;) {
			for (var o = e[0], a = 0, s = i.length; s > a; a++)
				if ((r = e.data(i[a])) !== n) {
					return r;
				}
			e = br(o.parentNode || 11 === o.nodeType && o.host)
		}
	}

	function Et(e) {
		for (var t = 0, n = e.childNodes; t < n.length; t++) {
			vt(n[t]);
		}
		for (; e.firstChild;) e.removeChild(e.firstChild)
	}

	function Nt(e, t) {
		var n = Vr[t.toLowerCase()];
		return n && Jr[e.nodeName] && n
	}

	function jt(e, n) {
		var r = function(r, i) {
			if (!(r.preventDefault)) {
				(r.preventDefault = function() {
					r.returnValue = false
				})
			}
			if (!(r.stopPropagation)) {
				(r.stopPropagation = function() {
					r.cancelBubble = true
				})
			}
			if (!(r.target)) {
				(r.target = r.srcElement || t)
			}
			if (v(r.defaultPrevented)) {
				var a = r.preventDefault;
				r.preventDefault = function() {
					r.defaultPrevented = true;
					a.call(r);
				}, r.defaultPrevented = false
			}
			r.isDefaultPrevented = function() {
				return r.defaultPrevented || r.returnValue === false
			};
			var s = D(n[i || r.type] || []);
			o(s, function(t) {
				t.call(e, r)
			}), 8 >= yr ? (r.preventDefault = null, r.stopPropagation = null, r.isDefaultPrevented = null) : (delete r.preventDefault, delete r.stopPropagation, delete r.isDefaultPrevented)
		};
		r.elem = e;
		return r;
	}

	function _t(e) {
		var t, r = typeof e;
		if (r == "object" && null !== e) {
			if ("function" == typeof(t = e.$$hashKey)) {
				t = e.$$hashKey();
			} else if (t === n) {
				(t = e.$$hashKey = l());
			}
		} else {
			t = e;
		}
		return r + ":" + t;
	}

	function qt(e) {
		o(e, this.put, this)
	}

	function Mt(e) {
		var t, n, r, i;
		if ("function" == typeof e) {
			if (!((t = e.$inject))) {
				t = [];
				if (e.length) {
					n = e.toString().replace(Qr, "");
					r = n.match(Xr);
					o(r[1].split(Gr), function(e) {
						e.replace(Kr, function(e, n, r) {
							t.push(r)
						})
					});
				}
				e.$inject = t;
			}
		} else if (x(e)) {
			i = e.length - 1;
			rt(e[i], "fn");
			t = e.slice(0, i);
		} else {
			rt(e, "fn", true);
		}
		return t;
	}

	function Ot(e) {
		function t(e) {
			return function(t, n) {
				if (b(t)) {
					return void o(t, c(e));
				} else {
					return e(t, n);
				}
			}
		}

		function n(e, t) {
			it(e, "service");
			if ((T(t) || x(t))) {
				(t = w.instantiate(t))
			}
			if (!t.$get) {
				throw Yr("pget", "Provider '{0}' must define $get factory method.", e);
			}
			return y[e + p] = t
		}

		function r(e, t) {
			return n(e, {
				$get: t
			})
		}

		function i(e, t) {
			return r(e, ["$injector",
				function(e) {
					return e.instantiate(t)
				}
			])
		}

		function a(e, t) {
			return r(e, m(t))
		}

		function s(e, t) {
			it(e, "constant");
			y[e] = t;
			k[e] = t;
		}

		function l(e, t) {
			var n = w.get(e + p),
				r = n.$get;
			n.$get = function() {
				var e = C.invoke(r, n);
				return C.invoke(t, null, {
					$delegate: e
				})
			}
		}

		function u(e) {
			var t, n, r, i, a = [];
			o(e, function(e) {
				if (!v.get(e)) {
					v.put(e, true);
					try {
						if ($(e))
							for (t = wr(e), a = a.concat(u(t.requires)).concat(t._runBlocks), n = t._invokeQueue, r = 0, i = n.length; i > r; r++) {
								var o = n[r],
									s = w.get(o[0]);
								s[o[1]].apply(s, o[2])
							} else if (T(e)) {
								a.push(w.invoke(e));
							} else if (x(e)) {
							a.push(w.invoke(e));
						} else {
							rt(e, "module");
						}
					} catch (c) {
						throw x(e) && (e = e[e.length - 1]), c.message && c.stack && -1 == c.stack.indexOf(c.message) && (c = c.message + "\n" + c.stack), Yr("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, c.stack || c.message || c)
					}
				}
			});
			return a;
		}

		function f(e, t) {
			function n(n) {
				if (e.hasOwnProperty(n)) {
					if (e[n] === d) {
						throw Yr("cdep", "Circular dependency found: {0}", g.join(" <- "));
					}
					return e[n]
				}
				try {
					g.unshift(n);
					e[n] = d;
					return e[n] = t(n);
				} catch (r) {
					throw e[n] === d && delete e[n], r
				} finally {
					g.shift()
				}
			}

			function r(e, t, r) {
				var i, o, a, s = [],
					c = Mt(e);
				o = 0;
				for (i = c.length; i > o; o++) {
					if (a = c[o], "string" != typeof a) {
						throw Yr("itkn", "Incorrect injection token! Expected service name as string, got {0}", a);
					}
					s.push(r && r.hasOwnProperty(a) ? r[a] : n(a))
				}
				if (!(e.$inject)) {
					(e = e[i])
				}
				return e.apply(t, s);
			}

			function i(e, t) {
				var n, i, o = function() {};
				o.prototype = (x(e) ? e[e.length - 1] : e).prototype;
				n = new o;
				i = r(e, n, t);
				if (b(i) || T(i)) {
					return i;
				} else {
					return n;
				}
			}
			return {
				invoke: r,
				instantiate: i,
				get: n,
				annotate: Mt,
				has: function(t) {
					return y.hasOwnProperty(t + p) || e.hasOwnProperty(t)
				}
			}
		}
		var d = {},
			p = "Provider",
			g = [],
			v = new qt,
			y = {
				$provide: {
					provider: t(n),
					factory: t(r),
					service: t(i),
					value: t(a),
					constant: t(s),
					decorator: l
				}
			},
			w = y.$injector = f(y, function() {
				throw Yr("unpr", "Unknown provider: {0}", g.join(" <- "))
			}),
			k = {},
			C = k.$injector = f(k, function(e) {
				var t = w.get(e + p);
				return C.invoke(t.$get, t)
			});
		o(u(e), function(e) {
			C.invoke(e || h)
		});
		return C;
	}

	function It() {
		var e = true;
		this.disableAutoScrolling = function() {
			e = false
		}, this.$get = ["$window", "$location", "$rootScope",
			function(t, n, r) {
				function i(e) {
					var t = null;
					o(e, function(e) {
						if (!(t || "a" !== pr(e.nodeName))) {
							(t = e)
						}
					});
					return t;
				}

				function a() {
					var e, r = n.hash();
					if (r) {
						if ((e = s.getElementById(r))) {
							e.scrollIntoView();
						} else if ((e = i(s.getElementsByName(r)))) {
							e.scrollIntoView();
						} else {
							if ("top" === r) {
								t.scrollTo(0, 0)
							};
						}
					} else {
						t.scrollTo(0, 0);
					}
				}
				var s = t.document;
				if (e) {
					r.$watch(function() {
						return n.hash()
					}, function() {
						r.$evalAsync(a)
					})
				}
				return a;
			}
		]
	}

	function Dt() {
		this.$get = ["$$rAF", "$timeout",
			function(e, t) {
				if (e.supported) {
					return function(t) {
						return e(t)
					};
				} else {
					return function(e) {
						return t(e, 0, false)
					};
				}
			}
		]
	}

	function Lt(e, t, r, i) {
		function a(e) {
			try {
				e.apply(null, z(arguments, 1))
			} finally {
				y--;
				if (0 === y)
					for (; b.length;) try {
						b.pop()()
					} catch (t) {
						r.error(t)
					}
			}
		}

		function s(e, t) {
			! function n() {
				o(k, function(e) {
					e()
				});
				w = t(n, e);
			}()
		}

		function c() {
			C = null;
			if (x != l.url()) {
				x = l.url();
				o(S, function(e) {
					e(l.url())
				});
			}
		}
		var l = this,
			u = t[0],
			f = e.location,
			d = e.history,
			p = e.setTimeout,
			g = e.clearTimeout,
			m = {};
		l.isMock = false;
		var y = 0,
			b = [];
		l.$$completeOutstandingRequest = a;
		l.$$incOutstandingRequestCount = function() {
			y++
		};
		l.notifyWhenNoOutstandingRequests = function(e) {
			o(k, function(e) {
				e()
			});
			if (0 === y) {
				e();
			} else {
				b.push(e);
			}
		};
		var w, k = [];
		l.addPollFn = function(e) {
			if (v(w)) {
				s(100, p)
			}
			k.push(e);
			return e;
		};
		var x = f.href,
			T = t.find("base"),
			C = null;
		l.url = function(t, n) {
			if (f !== e.location) {
				(f = e.location)
			}
			if (d !== e.history) {
				(d = e.history)
			}
			if (t) {
				if (t == x) {
					return;
				}
				x = t;
				if (i.history) {
					if (n) {
						d.replaceState(null, "", t);
					} else {
						d.pushState(null, "", t);
						T.attr("href", T.attr("href"));
					}
				} else {
					C = t;
					if (n) {
						f.replace(t);
					} else {
						f.href = t;
					}
				}
				return l;
			}
			return C || f.href.replace(/%27/g, "'")
		};
		var S = [],
			A = false;
		l.onUrlChange = function(t) {
			if (!(A)) {
				if (i.history) {
					br(e).on("popstate", c);
				}
				if (i.hashchange) {
					br(e).on("hashchange", c);
				} else {
					l.addPollFn(c);
				}
				A = true;
			}
			S.push(t);
			return t;
		}, l.baseHref = function() {
			var e = T.attr("href");
			if (e) {
				return e.replace(/^(https?\:)?\/\/[^\/]*/, "");
			} else {
				return "";
			}
		};
		var E = {},
			N = "",
			j = l.baseHref();
		l.cookies = function(e, t) {
			var i, o, a, s, c;
			if (!e) {
				if (u.cookie !== N) {
					N = u.cookie;
					o = N.split("; ");
					E = {};
					for (s = 0; s < o.length; s++) {
						a = o[s];
						c = a.indexOf("=");
						if (c > 0) {
							e = unescape(a.substring(0, c));
							if (E[e] === n) {
								(E[e] = unescape(a.substring(c + 1))); 
							}
						}
					}
				}
				return E
			}
			if (t === n) {
				u.cookie = escape(e) + "=;path=" + j + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
			} else if ($(t)) {
				i = (u.cookie = escape(e) + "=" + escape(t) + ";path=" + j).length + 1;
				if (i > 4096) {
					r.warn("Cookie '" + e + "' possibly not set or overflowed because it was too large (" + i + " > 4096 bytes)!"); 
				}
			}
		};
		l.defer = function(e, t) {
			var n;
			y++;
			n = p(function() {
				delete m[n];
				a(e);
			}, t || 0);
			m[n] = true;
			return n;
		};
		l.defer.cancel = function(e) {
			if (m[e]) {
				return (delete m[e], g(e), a(h), true);
			} else {
				return false;
			}
		};
	}

	function Pt() {
		this.$get = ["$window", "$log", "$sniffer", "$document",
			function(e, t, n, r) {
				return new Lt(e, r, t, n)
			}
		]
	}

	function Ft() {
		this.$get = function() {
			function e(e, n) {
				function i(e) {
					if (e != d) {
						if (p) {
							if (e == p) {
								(p = e.n)
							}
						} else {
							p = e;
						}
						o(e.n, e.p);
						o(e, d);
						d = e;
						d.n = null;
					}
				}

				function o(e, t) {
					if (e != t) {
						if (e) {
							(e.p = t)
						}
						if (t) {
							(t.n = e)
						}
					}
				}
				if (e in t) {
					throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", e);
				}
				var a = 0,
					s = f({}, n, {
						id: e
					}),
					c = {},
					l = n && n.capacity || Number.MAX_VALUE,
					u = {},
					d = null,
					p = null;
				return t[e] = {
					put: function(e, t) {
						if (l < Number.MAX_VALUE) {
							var n = u[e] || (u[e] = {
								key: e
							});
							i(n)
						}
						if (!v(t)) {
							if (!(e in c)) {
								a++
							}
							c[e] = t;
							if (a > l) {
								this.remove(p.key)
							}
							return t;
						}
					},
					get: function(e) {
						if (l < Number.MAX_VALUE) {
							var t = u[e];
							if (!t) {
								return;
							}
							i(t)
						}
						return c[e]
					},
					remove: function(e) {
						if (l < Number.MAX_VALUE) {
							var t = u[e];
							if (!t) {
								return;
							}
							if (d == t) {
								d = t.p;
							}
							if (p == t) {
								p = t.n;
							}
							o(t.n, t.p);
							delete u[e];
						}
						delete c[e], a--
					},
					removeAll: function() {
						c = {};
						a = 0;
						u = {};
						d = p = null;
					},
					destroy: function() {
						c = null;
						s = null;
						u = null;
						delete t[e];
					},
					info: function() {
						return f({}, s, {
							size: a
						})
					}
				}
			}
			var t = {};
			e.info = function() {
				var e = {};
				o(t, function(t, n) {
					e[n] = t.info()
				});
				return e;
			};
			e.get = function(e) {
				return t[e]
			};
			return e;
		}
	}

	function zt() {
		this.$get = ["$cacheFactory",
			function(e) {
				return e("templates")
			}
		]
	}

	function Rt(e, r) {
		var i = {},
			a = "Directive",
			s = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
			l = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
			u = /^(on[a-z]+|formaction)$/;
		this.directive = function d(t, n) {
			it(t, "directive");
			if ($(t)) {
				nt(n, "directiveFactory");
				if (!(i.hasOwnProperty(t))) {
					i[t] = [];
					e.factory(t + a, ["$injector", "$exceptionHandler",
						function(e, n) {
							var r = [];
							o(i[t], function(i, o) {
								try {
									var a = e.invoke(i);
									if (T(a)) {
										a = {
											compile: m(a)
										};
									} else if (!a.compile && a.link) {
										(a.compile = m(a.link));
									}
									a.priority = a.priority || 0;
									a.index = o;
									a.name = a.name || t;
									a.require = a.require || a.controller && a.name;
									a.restrict = a.restrict || "A";
									r.push(a);
								} catch (s) {
									n(s)
								}
							});
							return r;
						}
					]);
				}
				i[t].push(n);
			} else {
				o(t, c(d));
			}
			return this;
		};
		this.aHrefSanitizationWhitelist = function(e) {
			if (y(e)) {
				return (r.aHrefSanitizationWhitelist(e), this);
			} else {
				return r.aHrefSanitizationWhitelist();
			}
		};
		this.imgSrcSanitizationWhitelist = function(e) {
			if (y(e)) {
				return (r.imgSrcSanitizationWhitelist(e), this);
			} else {
				return r.imgSrcSanitizationWhitelist();
			}
		};
		this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri",
			function(e, r, c, d, h, v, y, w, k, C, S, A) {
				function E(e, t, n, r, i) {
					e instanceof br || (e = br(e)), o(e, function(t, n) {
						if (3 == t.nodeType && t.nodeValue.match(/\S+/)) {
							(e[n] = t = br(t).wrap("<span></span>").parent()[0]);
						}
					});
					var a = j(e, t, e, n, r, i);
					N(e, "ng-scope");
					return function(t, n, r) {
						nt(t, "scope");
						var i = n ? Wr.clone.call(e) : e;
						o(r, function(e, t) {
							i.data("$" + t + "Controller", e)
						});
						for (var s = 0, c = i.length; c > s; s++) {
							var l = i[s],
								u = l.nodeType;
							if ((1 === u || 9 === u)) {
								i.eq(s).data("$scope", t);
							}
						}
						if (n) {
							n(i, t)
						}
						if (a) {
							a(t, i, i)
						}
						return i;
					};
				}

				function N(e, t) {
					try {
						e.addClass(t)
					} catch (n) {}
				}

				function j(e, t, r, i, o, a) {
					function s(e, r, i, o) {
						var a, s, c, l, u, f, d, p, g, m = r.length,
							v = new Array(m);
						for (d = 0; m > d; d++) {
							v[d] = r[d];
						}
						d = 0;
						g = 0;
						for (p = h.length; p > d; g++) {
							c = v[g];
							a = h[d++];
							s = h[d++];
							l = br(c);
							if (a) {
								if (a.scope) {
									u = e.$new();
									l.data("$scope", u);
								} else {
									u = e;
								}
								f = a.transclude;
								if (f || !o && t) {
									a(s, u, c, i, _(e, f || t));
								} else {
									a(s, u, c, i, o);
								}
							} else if (s) {
								s(e, c.childNodes, n, o);
							}
						}
					}
					for (var c, l, u, f, d, p, h = [], g = 0; g < e.length; g++) {
						c = new Y;
						l = q(e[g], [], c, 0 === g ? i : n, o);
						if (l.length) {
							u = I(l, e[g], c, t, r, null, [], [], a);
						} else {
							u = null;
						}
						if (u && u.scope) {
							N(br(e[g]), "ng-scope");
						}
						if (u && u.terminal || !(f = e[g].childNodes) || !f.length) {
							d = null;
						} else {
							d = j(f, u ? u.transclude : t);
						}
						h.push(u, d);
						p = p || u || d;
						a = null;
					}
					if (p) {
						return s;
					} else {
						return null;
					}
				}

				function _(e, t) {
					return function(n, r, i) {
						var o = false;
						if (!(n)) {
							n = e.$new();
							n.$$transcluded = true;
							o = true;
						}
						var a = t(n, r, i);
						if (o) {
							a.on("$destroy", R(n, n.$destroy))
						}
						return a;
					}
				}

				function q(e, t, n, r, i) {
					var o, a, c = e.nodeType,
						u = n.$attr;
					switch (c) {
						case 1:
							F(t, Ht(kr(e).toLowerCase()), "E", r, i);
							for (var f, d, p, h, g, m = e.attributes, v = 0, y = m && m.length; y > v; v++) {
								var b = false,
									w = false;
								if (f = m[v], !yr || yr >= 8 || f.specified) {
									d = f.name;
									h = Ht(d);
									if (it.test(h)) {
										(d = et(h.substr(6), "-"));
									}
									var k = h.replace(/(Start|End)$/, "");
									if (h === k + "Start") {
										b = d;
										w = d.substr(0, d.length - 5) + "end";
										d = d.substr(0, d.length - 6);
									}
									p = Ht(d.toLowerCase());
									u[p] = d;
									n[p] = g = Nr(f.value);
									if (Nt(e, p)) {
										n[p] = true;
									}
									G(e, t, g, p);
									F(t, p, "A", r, i, b, w);
								}
							}
							if (a = e.className, $(a) && "" !== a) {
								for (; o = l.exec(a);) {
									p = Ht(o[2]);
									if (F(t, p, "C", r, i)) {
										(n[p] = Nr(o[3]));
									}
									a = a.substr(o.index + o[0].length);
								}
							}
							break;
						case 3:
							J(t, e.nodeValue);
							break;
						case 8:
							try {
								o = s.exec(e.nodeValue);
								if (o) {
									p = Ht(o[1]);
									if (F(t, p, "M", r, i)) {
										(n[p] = Nr(o[2])); 
									}
								}
							} catch (x) {}
					}
					t.sort(U);
					return t;
				}

				function M(e, t, n) {
					var r = [],
						i = 0;
					if (t && e.hasAttribute && e.hasAttribute(t)) {
						do {
							if (!e) {
								throw ti("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
							}
							if (1 == e.nodeType) {
								if (e.hasAttribute(t)) {
									i++;
								}
								if (e.hasAttribute(n)) {
									i--;
								}
							}
							r.push(e);
							e = e.nextSibling;
						} while (i > 0)
					} else {
						r.push(e);
					}
					return br(r)
				}

				function O(e, t, n) {
					return function(r, i, o, a, s) {
						i = M(i[0], t, n);
						return e(r, i, o, a, s);
					}
				}

				function I(e, i, a, s, l, u, f, d, p) {
					function h(e, t, n, r) {
						if (e) {
							if (n) {
								(e = O(e, n, r));
							}
							e.require = k.require;
							if ((F === k || k.$$isolateScope)) {
								(e = Q(e, {
									isolateScope: true
								}));
							}
							f.push(e);
						}
						if (t) {
							if (n) {
								(t = O(t, n, r));
							}
							t.require = k.require;
							if ((F === k || k.$$isolateScope)) {
								(t = Q(t, {
									isolateScope: true
								}));
							}
							d.push(t);
						}
					}

					function g(e, t, n) {
						var r, i = "data",
							a = false;
						if ($(e)) {
							for (;
								"^" == (r = e.charAt(0)) || r == "?";) {
								e = e.substr(1);
								if (r == "^") {
									(i = "inheritedData");
								}
								a = a || r == "?";
							}
							r = null;
							if (n && "data" === i) {
								(r = n[e])
							}
							r = r || t[i]("$" + e + "Controller");
							if (!r && !a) {
								throw ti("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", e, C);
							}
							return r
						}
						if (x(e)) {
							r = [];
							o(e, function(e) {
								r.push(g(e, t, n))
							});
						}
						return r;
					}

					function m(e, t, s, l, u) {
						function p(e, t) {
							var r;
							if (arguments.length < 2) {
								t = e;
								e = n;
							}
							if (X) {
								(r = C)
							}
							return u(e, t, r);
						}
						var h, m, b, $, w, k, x, T, C = {};
						if (i === s) {
							h = a;
						} else {
							h = D(a, new Y(br(s), a.$attr));
						}
						m = h.$$element;
						if (F) {
							var S = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
								A = br(s);
							x = t.$new(true);
							if (R && R === F.$$originalDirective) {
								A.data("$isolateScope", x);
							} else {
								A.data("$isolateScopeNoTemplate", x);
							}
							N(A, "ng-isolate-scope");
							o(F.scope, function(e, n) {
								var i, o, a, s, c = e.match(S) || [],
									l = c[3] || n,
									u = "?" == c[2],
									f = c[1];
								switch (x.$$isolateBindings[n] = f + l, f) {
									case "@":
										h.$observe(l, function(e) {
											x[n] = e
										});
										h.$$observers[l].$$scope = t;
										if (h[l]) {
											(x[n] = r(h[l])(t));
										}
										break;
									case "=":
										if (u && !h[l]) {
											return;
										}
										o = v(h[l]);
										if (o.literal) {
											s = L;
										} else {
											s = function(e, t) {
												return e === t
											};
										}
										a = o.assign || function() {
											throw i = x[n] = o(t), ti("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", h[l], F.name)
										};
										i = x[n] = o(t);
										x.$watch(function() {
											var e = o(t);
											if (!(s(e, x[n]))) {
												if (s(e, i)) {
													a(t, e = x[n]);
												} else {
													x[n] = e;
												}
											}
											return i = e;
										}, null, o.literal);
										break;
									case "&":
										o = v(h[l]), x[n] = function(e) {
											return o(t, e)
										};
										break;
									default:
										throw ti("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", F.name, n, e)
								}
							});
						}
						T = u && p;
						if (I) {
							o(I, function(e) {
								var n, r = {
									$scope: e === F || e.$$isolateScope ? x : t,
									$element: m,
									$attrs: h,
									$transclude: T
								};
								k = e.controller;
								if (k == "@") {
									k = h[e.name];
								}
								n = y(k, r);
								C[e.name] = n;
								if (!(X)) {
									m.data("$" + e.name + "Controller", n);
								}
								if (e.controllerAs) {
									r.$scope[e.controllerAs] = n;
								}
							});
						}
						b = 0;
						for ($ = f.length; $ > b; b++) try {
							w = f[b];
							w(w.isolateScope ? x : t, m, h, w.require && g(w.require, m, C), T);
						} catch (E) {
							c(E, V(m))
						}
						var j = t;
						if (F && (F.template || null === F.templateUrl)) {
							j = x;
						}
						if (e) {
							e(j, s.childNodes, n, u);
						}
						for (b = d.length - 1; b >= 0; b--) try {
							w = d[b];
							w(w.isolateScope ? x : t, m, h, w.require && g(w.require, m, C), T);
						} catch (E) {
							c(E, V(m))
						}
					}
					p = p || {};
					var w, k, C, S, A, j,
						_ = -Number.MAX_VALUE,
						I = p.controllerDirectives,
						F = p.newIsolateScopeDirective,
						R = p.templateDirective,
						U = p.nonTlbTranscludeDirective,
						J = false,
						X = p.hasElementTranscludeDirective,
						G = a.$$element = br(i),
						Z = u,
						et = s;
					for (var tt = 0, nt = e.length; nt > tt; tt++) {
						k = e[tt];
						var it = k.$$start,
							ot = k.$$end;
						if (it) {
							(G = M(i, it, ot))
						}
						S = n;
						if (_ > k.priority) break;

						if (j = k.scope) {
							w = w || k;
							if (!(k.templateUrl)) {
								W("new/isolated scope", F, k, G);
								if (b(j)) {
									(F = k); 
								}
							}
						}
						C = k.name;
						if (!k.templateUrl && k.controller) {
							j = k.controller;
							I = I || {};
							W("'" + C + "' controller", I[C], k, G);
							I[C] = k;
						}
						if (j = k.transclude) {
							J = true;
							if (!(k.$$tlb)) {
								W("transclusion", U, k, G);
								U = k;
							}
							if (j == "element") {
								X = true;
								_ = k.priority;
								S = M(i, it, ot);
								G = a.$$element = br(t.createComment(" " + C + ": " + a[C] + " "));
								i = G[0];
								K(l, br(z(S)), i);
								et = E(S, s, _, Z && Z.name, {
									nonTlbTranscludeDirective: U
								});
							} else {
								S = br(mt(i)).contents();
								G.empty();
								et = E(S, s);
							}
						}

						if (k.template)
							if (W("template", R, k, G), R = k, j = T(k.template) ? k.template(G, a) : k.template, j = rt(j), k.replace) {
								Z = k;
								if (dt(j)) {
									S = [];
								} else {
									S = br(j);
								}
								i = S[0];
								if (1 != S.length || 1 !== i.nodeType) {
									throw ti("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", C, "");
								}
								K(l, G, i);
								var at = {
										$attr: {}
									},
									st = q(i, [], at),
									ct = e.splice(tt + 1, e.length - (tt + 1));
								if (F) {
									P(st);
								}
								e = e.concat(st).concat(ct);
								H(a, at);
								nt = e.length;
							} else {
								G.html(j);
							}
						if (k.templateUrl) {
							W("template", R, k, G);
							R = k;
							if (k.replace) {
								Z = k;
							}
							m = B(e.splice(tt, e.length - tt), G, a, l, et, f, d, {
								controllerDirectives: I,
								newIsolateScopeDirective: F,
								templateDirective: R,
								nonTlbTranscludeDirective: U
							});
							nt = e.length;
						} else if (k.compile) try {
							A = k.compile(G, a, et);
							if (T(A)) {
								h(null, A, it, ot);
							} else if (A) {
								h(A.pre, A.post, it, ot); 
							}
						} catch (lt) {
							c(lt, V(G))
						}
						if (k.terminal) {
							m.terminal = true;
							_ = Math.max(_, k.priority);
						}
					}
					m.scope = w && w.scope === true;
					m.transclude = J && et;
					p.hasElementTranscludeDirective = X;
					return m;
				}

				function P(e) {
					for (var t = 0, n = e.length; n > t; t++) {
						e[t] = p(e[t], {
							$$isolateScope: true
						});
					}
				}

				function F(t, r, o, s, l, u, f) {
					if (r === l) {
						return null;
					}
					var d = null;
					if (i.hasOwnProperty(r)) {
						for (var h, g = e.get(r + a), m = 0, v = g.length; v > m; m++) try {
							h = g[m];
							if ((s === n || s > h.priority) && -1 != h.restrict.indexOf(o)) {
								if (u) {
									(h = p(h, {
										$$start: u,
										$$end: f
									})); 
								}
								t.push(h);
								d = h;
							}
						} catch (y) {
							c(y)
						}
					}
					return d
				}

				function H(e, t) {
					var n = t.$attr,
						r = e.$attr,
						i = e.$$element;
					o(e, function(r, i) {
						if ("$" != i.charAt(0)) {
							if (t[i]) {
								(r += ("style" === i ? ";" : " ") + t[i])
							}
							e.$set(i, r, true, n[i]);
						}
					});
					o(t, function(t, o) {
						if (o == "class") {
							N(i, t);
							e["class"] = (e["class"] ? e["class"] + " " : "") + t;
						} else if (o == "style") {
							i.attr("style", i.attr("style") + ";" + t);
							e.style = (e.style ? e.style + ";" : "") + t;
						} else {
							if (!("$" == o.charAt(0) || e.hasOwnProperty(o))) {
								e[o] = t;
								r[o] = n[o];
							};
						}
					});
				}

				function B(e, t, n, r, i, a, s, c) {
					var l, u, p = [],
						g = t[0],
						m = e.shift(),
						v = f({}, m, {
							templateUrl: null,
							transclude: null,
							replace: null,
							$$originalDirective: m
						}),
						y = T(m.templateUrl) ? m.templateUrl(t, n) : m.templateUrl;
					t.empty();
					d.get(C.getTrustedResourceUrl(y), {
						cache: h
					}).success(function(f) {
						var d, h, $, w;
						if (f = rt(f), m.replace) {
							if (dt(f)) {
								$ = [];
							} else {
								$ = br(f);
							}
							d = $[0];
							if (1 != $.length || 1 !== d.nodeType) {
								throw ti("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", m.name, y);
							}
							h = {
								$attr: {}
							}, K(r, t, d);
							var k = q(d, [], h);
							if (b(m.scope)) {
								P(k);
							}
							e = k.concat(e);
							H(n, h);
						} else {
							d = g;
							t.html(f);
						}
						for (e.unshift(v), l = I(e, d, n, i, t, m, a, s, c), o(r, function(e, n) {
							if (d == e) {
								r[n] = t[0];
							}
						}), u = j(t[0].childNodes, i); p.length;) {
							var x = p.shift(),
								T = p.shift(),
								C = p.shift(),
								S = p.shift(),
								A = t[0];
							if (T !== g) {
								var E = T.className;
								if (!(c.hasElementTranscludeDirective && m.replace)) {
									(A = mt(d));
								}
								K(C, br(T), A);
								N(br(A), E);
							}
							w = l.transclude ? _(x, l.transclude) : S, l(u, x, A, r, w)
						}
						p = null
					}).error(function(e, t, n, r) {
						throw ti("tpload", "Failed to load template: {0}", r.url)
					});
					return function(e, t, n, r, i) {
						if (p) {
							p.push(t);
							p.push(n);
							p.push(r);
							p.push(i);
						} else {
							l(u, t, n, r, i);
						}
					};
				}

				function U(e, t) {
					var n = t.priority - e.priority;
					if (0 !== n) {
						return n;
					} else if (e.name !== t.name) {
						if (e.name < t.name) {
							return -1;
						} else {
							return 1;
						}
					} else {
						return e.index - t.index;
					}
				}

				function W(e, t, n, r) {
					if (t) {
						throw ti("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", t.name, n.name, e, V(r));
					}
				}

				function J(e, t) {
					var n = r(t, true);
					if (n) {
						e.push({
							priority: 0,
							compile: m(function(e, t) {
								var r = t.parent(),
									i = r.data("$binding") || [];
								i.push(n);
								N(r.data("$binding", i), "ng-binding");
								e.$watch(n, function(e) {
									t[0].nodeValue = e
								});
							})
						});
					}
				}

				function X(e, t) {
					if (t == "srcdoc") {
						return C.HTML;
					}
					var n = kr(e);
					if (t == "xlinkHref" || n == "FORM" && t == "action" || "IMG" != n && (t == "src" || t == "ngSrc")) {
						return C.RESOURCE_URL;
					} else {
						return void 0;
					}
				}

				function G(e, t, n, i) {
					var o = r(n, true);
					if (o) {
						if ("multiple" === i && "SELECT" === kr(e)) {
							throw ti("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", V(e));
						}
						t.push({
							priority: 100,
							compile: function() {
								return {
									pre: function(t, n, a) {
										var s = a.$$observers || (a.$$observers = {});
										if (u.test(i)) {
											throw ti("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
										}
										o = r(a[i], true, X(e, i));
										if (o) {
											a[i] = o(t);
											(s[i] || (s[i] = [])).$$inter = true;
											(a.$$observers && a.$$observers[i].$$scope || t).$watch(o, function(e, t) {
												if ("class" === i && e != t) {
													a.$updateClass(e, t);
												} else {
													a.$set(i, e);
												}
											});
										}
									}
								}
							}
						});
					}
				}

				function K(e, n, r) {
					var i, o, a = n[0],
						s = n.length,
						c = a.parentNode;
					if (e) {
						i = 0;
						for (o = e.length; o > i; i++)
							if (a == e[i]) {
								e[i++] = r;
								for (var l = i, u = l + s - 1, f = e.length; f > l; l++, u++)
									if (f > u) {
										e[l] = e[u];
									} else {
										delete e[l];
									}
								e.length -= s - 1;
								break
							}
					}
					if (c) {
						c.replaceChild(r, a);
					}
					var d = t.createDocumentFragment();
					d.appendChild(a), r[br.expando] = a[br.expando];
					for (var p = 1, h = n.length; h > p; p++) {
						var g = n[p];
						br(g).remove();
						d.appendChild(g);
						delete n[p];
					}
					n[0] = r, n.length = 1
				}

				function Q(e, t) {
					return f(function() {
						return e.apply(null, arguments)
					}, e, t)
				}
				var Y = function(e, t) {
					this.$$element = e;
					this.$attr = t || {};
				};
				Y.prototype = {
					$normalize: Ht,
					$addClass: function(e) {
						if (e && e.length > 0) {
							S.addClass(this.$$element, e);
						}
					},
					$removeClass: function(e) {
						if (e && e.length > 0) {
							S.removeClass(this.$$element, e);
						}
					},
					$updateClass: function(e, t) {
						var n = Bt(e, t),
							r = Bt(t, e);
						if (0 === n.length) {
							S.removeClass(this.$$element, r);
						} else if (0 === r.length) {
							S.addClass(this.$$element, n);
						} else {
							S.setClass(this.$$element, n, r);
						}
					},
					$set: function(e, t, r, i) {
						var a, s = Nt(this.$$element[0], e);
						if (s) {
							this.$$element.prop(e, t);
							i = s;
						}
						this[e] = t;
						if (i) {
							this.$attr[e] = i;
						} else {
							i = this.$attr[e];
							if (!i) {
								this.$attr[e] = i = et(e, "-");
							}
						}
						a = kr(this.$$element);
						if ("A" === a && "href" === e || "IMG" === a && "src" === e) {
							this[e] = t = A(t, "src" === e);
						}

						if (r !== false) {
							if (null === t || t === n) {
								this.$$element.removeAttr(i);
							} else {
								this.$$element.attr(i, t);
							}
						}
						var l = this.$$observers;
						if (l) {
							o(l[e], function(e) {
								try {
									e(t)
								} catch (n) {
									c(n)
								}
							});
						}
					},
					$observe: function(e, t) {
						var n = this,
							r = n.$$observers || (n.$$observers = {}),
							i = r[e] || (r[e] = []);
						i.push(t);
						w.$evalAsync(function() {
							if (!(i.$$inter)) {
								t(n[e])
							}
						});
						return t;
					}
				};
				var Z = r.startSymbol(),
					tt = r.endSymbol(),
					rt = Z == "{{" || tt == "}}" ? g : function(e) {
						return e.replace(/\{\{/g, Z).replace(/}}/g, tt)
					},
					it = /^ngAttr[A-Z]/;
				return E
			}
		];
	}

	function Ht(e) {
		return ut(e.replace(ni, ""))
	}

	function Bt(e, t) {
		var n = "",
			r = e.split(/\s+/),
			i = t.split(/\s+/);
		e: for (var o = 0; o < r.length; o++) {
			for (var a = r[o], s = 0; s < i.length; s++)
				if (a == i[s]) continue e;
			n += (n.length > 0 ? " " : "") + a
		}
		return n
	}

	function Ut() {
		var e = {},
			t = /^(\S+)(\s+as\s+(\w+))?$/;
		this.register = function(t, n) {
			it(t, "controller");
			if (b(t)) {
				f(e, t);
			} else {
				e[t] = n;
			}
		}, this.$get = ["$injector", "$window",
			function(n, i) {
				return function(o, a) {
					var s, c, l, u;
					if ($(o)) {
						c = o.match(t);
						l = c[1];
						u = c[3];
						if (e.hasOwnProperty(l)) {
							o = e[l];
						} else {
							o = ot(a.$scope, l, true) || ot(i, l, true);
						}
						rt(o, l, true);
					}
					s = n.instantiate(o, a);
					if (u) {
						if (!a || "object" != typeof a.$scope) {
							throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", l || o.name, u);
						}
						a.$scope[u] = s
					}
					return s;
				}
			}
		]
	}

	function Wt() {
		this.$get = ["$window",
			function(e) {
				return br(e.document)
			}
		]
	}

	function Vt() {
		this.$get = ["$log",
			function(e) {
				return function() {
					e.error.apply(e, arguments)
				}
			}
		]
	}

	function Jt(e) {
		var t, n, r, i = {};
		if (e) {
			return (o(e.split("\n"), function(e) {
				r = e.indexOf(":");
				t = pr(Nr(e.substr(0, r)));
				n = Nr(e.substr(r + 1));
				if (t) {
					if (i[t]) {
						i[t] += ", " + n;
					} else {
						i[t] = n;
					}
				}
			}), i);
		} else {
			return i;
		}
	}

	function Xt(e) {
		var t = b(e) ? e : n;
		return function(n) {
			if (!(t)) {
				(t = Jt(e))
			}
			if (n) {
				return t[pr(n)] || null;
			} else {
				return t;
			}
		}
	}

	function Gt(e, t, n) {
		if (T(n)) {
			return n(e, t);
		} else {
			return (o(n, function(n) {
				e = n(e, t)
			}), e);
		}
	}

	function Kt(e) {
		return e >= 200 && 300 > e
	}

	function Qt() {
		var e = /^\s*(\[|\{[^\{])/,
			t = /[\}\]]\s*$/,
			r = /^\)\]\}',?\n/,
			i = {
				"Content-Type": "application/json;charset=utf-8"
			},
			a = this.defaults = {
				transformResponse: [

					function(n) {
						if ($(n)) {
							n = n.replace(r, "");
							if (e.test(n) && t.test(n)) {
								(n = U(n)); 
							}
						}
						return n;
					}
				],
				transformRequest: [

					function(e) {
						if (!b(e) || E(e) || N(e)) {
							return e;
						} else {
							return B(e);
						}
					}
				],
				headers: {
					common: {
						Accept: "application/json, text/plain, */*"
					},
					post: I(i),
					put: I(i),
					patch: I(i)
				},
				xsrfCookieName: "XSRF-TOKEN",
				xsrfHeaderName: "X-XSRF-TOKEN"
			},
			c = this.interceptors = [],
			l = this.responseInterceptors = [];
		this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector",
			function(e, t, r, i, u, d) {
				function p(e) {
					function r(e) {
						var t = f({}, e, {
							data: Gt(e.data, e.headers, s.transformResponse)
						});
						if (Kt(e.status)) {
							return t;
						} else {
							return u.reject(t);
						}
					}

					function i(e) {
						function t(e) {
							var t;
							o(e, function(n, r) {
								if (T(n)) {
									t = n();
									if (null != t) {
										e[r] = t;
									} else {
										delete e[r];
									}
								}
							})
						}
						var n, r, i, s = a.headers,
							c = f({}, e.headers);
						s = f({}, s.common, s[pr(e.method)]);
						t(s);
						t(c);
						e: for (n in s) {
							r = pr(n);
							for (i in c)
								if (pr(i) === r) continue e;
							c[n] = s[n]
						}
						return c
					}
					var s = {
							method: "get",
							transformRequest: a.transformRequest,
							transformResponse: a.transformResponse
						},
						c = i(e);
					f(s, e);
					s.headers = c;
					s.method = gr(s.method);
					var l = zn(s.url) ? t.cookies()[s.xsrfCookieName || a.xsrfCookieName] : n;
					if (l) {
						c[s.xsrfHeaderName || a.xsrfHeaderName] = l;
					}
					var d = function(e) {
							c = e.headers;
							var t = Gt(e.data, Xt(c), e.transformRequest);
							if (v(e.data)) {
								o(c, function(e, t) {
									if ("content-type" === pr(t)) {
										delete c[t];
									}
								})
							}
							if (v(e.withCredentials) && !v(a.withCredentials)) {
								(e.withCredentials = a.withCredentials)
							}
							return m(e, t, c).then(r, r);
						},
						p = [d, n],
						h = u.when(s);
					for (o(C, function(e) {
						if ((e.request || e.requestError)) {
							p.unshift(e.request, e.requestError); 
						}
						if ((e.response || e.responseError)) {
							p.push(e.response, e.responseError); 
						}
					}); p.length;) {
						var g = p.shift(),
							y = p.shift();
						h = h.then(g, y)
					}
					h.success = function(e) {
						h.then(function(t) {
							e(t.data, t.status, t.headers, s)
						});
						return h;
					};
					h.error = function(e) {
						h.then(null, function(t) {
							e(t.data, t.status, t.headers, s)
						});
						return h;
					};
					return h;
				}

				function h() {
					o(arguments, function(e) {
						p[e] = function(t, n) {
							return p(f(n || {}, {
								method: e,
								url: t
							}))
						}
					})
				}

				function g() {
					o(arguments, function(e) {
						p[e] = function(t, n, r) {
							return p(f(r || {}, {
								method: e,
								url: t,
								data: n
							}))
						}
					})
				}

				function m(t, n, r) {
					function o(e, t, n, r) {
						if (l) {
							if (Kt(e)) {
								l.put(g, [e, t, Jt(n), r]);
							} else {
								l.remove(g);
							}
						}
						s(t, e, n, r);
						if (!(i.$$phase)) {
							i.$apply();
						}
					}

					function s(e, n, r, i) {
						n = Math.max(n, 0);
						(Kt(n) ? d.resolve : d.reject)({
							data: e,
							status: n,
							headers: Xt(r),
							config: t,
							statusText: i
						});
					}

					function c() {
						var e = M(p.pendingRequests, t);
						if (-1 !== e) {
							p.pendingRequests.splice(e, 1);
						}
					}
					var l, f, d = u.defer(),
						h = d.promise,
						g = w(t.url, t.params);
					p.pendingRequests.push(t);
					h.then(c, c);
					if ((t.cache || a.cache) && t.cache !== false && "GET" == t.method) {
						if (b(t.cache)) {
							l = t.cache;
						} else if (b(a.cache)) {
							l = a.cache;
						} else {
							l = k;
						}
					}
					if (l)
						if (f = l.get(g), y(f)) {
							if (f.then) {
								f.then(c, c);
								return f;
							}
							if (x(f)) {
								s(f[1], f[0], I(f[2]), f[3]);
							} else {
								s(f, 200, {}, "OK");
							}
						} else {
							l.put(g, h);
						}
					if (v(f)) {
						e(t.method, g, n, o, r, t.timeout, t.withCredentials, t.responseType)
					}
					return h;
				}

				function w(e, t) {
					if (!t) {
						return e;
					}
					var n = [];
					s(t, function(e, t) {
						if (!(null === e || v(e))) {
							if (!(x(e))) {
								(e = [e]); 
							}
							o(e, function(e) {
								if (b(e)) {
									(e = B(e)); 
								}
								n.push(Q(t) + "=" + Q(e));
							});
						}
					});
					if (n.length > 0) {
						(e += (-1 == e.indexOf("?") ? "?" : "&") + n.join("&"))
					}
					return e;
				}
				var k = r("$http"),
					C = [];
				o(c, function(e) {
					C.unshift($(e) ? d.get(e) : d.invoke(e))
				});
				o(l, function(e, t) {
					var n = $(e) ? d.get(e) : d.invoke(e);
					C.splice(t, 0, {
						response: function(e) {
							return n(u.when(e))
						},
						responseError: function(e) {
							return n(u.reject(e))
						}
					})
				});
				p.pendingRequests = [];
				h("get", "delete", "head", "jsonp");
				g("post", "put");
				p.defaults = a;
				return p;
			}
		]
	}

	function Yt(t) {
		if (8 >= yr && (!t.match(/^(get|post|head|put|delete|options)$/i) || !e.XMLHttpRequest)) {
			return new e.ActiveXObject("Microsoft.XMLHTTP");
		}
		if (e.XMLHttpRequest) {
			return new e.XMLHttpRequest;
		}
		throw r("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
	}

	function Zt() {
		this.$get = ["$browser", "$window", "$document",
			function(e, t, n) {
				return en(e, Yt, e.defer, t.angular.callbacks, n[0])
			}
		]
	}

	function en(e, t, n, r, i) {
		function a(e, t) {
			var n = i.createElement("script"),
				r = function() {
					n.onreadystatechange = n.onload = n.onerror = null;
					i.body.removeChild(n);
					if (t) {
						t();
					}
				};
			n.type = "text/javascript";
			n.src = e;
			if (yr && 8 >= yr) {
				n.onreadystatechange = function() {
					if (/loaded|complete/.test(n.readyState)) {
						r();
					}
				};
			} else {
				n.onload = n.onerror = function() {
					r()
				};
			}
			i.body.appendChild(n);
			return r;
		}
		var s = -1;
		return function(i, c, l, u, f, d, p, g) {
			function m() {
				b = s;
				if (w) {
					w();
				}
				if (k) {
					k.abort();
				}
			}

			function v(t, r, i, o, a) {
				if (T) {
					n.cancel(T);
				}
				w = k = null;
				if (0 === r) {
					if (i) {
						r = 200;
					} else if ("file" == Fn(c).protocol) {
						r = 404;
					} else {
						r = 0;
					}
				}
				if (1223 === r) {
					r = 204;
				} else {
					r = r;
				}
				a = a || "";
				t(r, i, o, a);
				e.$$completeOutstandingRequest(h);
			}
			var b;
			if (e.$$incOutstandingRequestCount(), c = c || e.url(), "jsonp" == pr(i)) {
				var $ = "_" + (r.counter++).toString(36);
				r[$] = function(e) {
					r[$].data = e
				};
				var w = a(c.replace("JSON_CALLBACK", "angular.callbacks." + $), function() {
					if (r[$].data) {
						v(u, 200, r[$].data);
					} else {
						v(u, b || -2);
					}
					r[$] = Ar.noop;
				})
			} else {
				var k = t(i);
				k.open(i, c, true);
				o(f, function(e, t) {
					if (y(e)) {
						k.setRequestHeader(t, e);
					}
				});
				k.onreadystatechange = function() {
					if (k && 4 == k.readyState) {
						var e = null,
							t = null;
						b !== s && (e = k.getAllResponseHeaders(), t = "response" in k ? k.response : k.responseText), v(u, b || k.status, t, e, k.statusText || "")
					}
				};
				if (p) {
					(k.withCredentials = true)
				}
				if (g) try {
					k.responseType = g
				} catch (x) {
					if ("json" !== g) {
						throw x;
					}
				}
				k.send(l || null)
			} if (d > 0) var T = n(m, d);
			else if (d && d.then) {
				d.then(m);
			}
		}
	}

	function tn() {
		var e = "{{",
			t = "}}";
		this.startSymbol = function(t) {
			if (t) {
				return (e = t, this);
			} else {
				return e;
			}
		};
		this.endSymbol = function(e) {
			if (e) {
				return (t = e, this);
			} else {
				return t;
			}
		};
		this.$get = ["$parse", "$exceptionHandler", "$sce",
			function(n, r, i) {
				function o(o, c, l) {
					var u, f, d, p, h = 0,
						g = [],
						m = o.length,
						y = false;
					for (var b = []; m > h;) {
						if (-1 != (u = o.indexOf(e, h)) && -1 != (f = o.indexOf(t, u + a))) {
							if (h != u) {
								g.push(o.substring(h, u));
							}
							g.push(d = n(p = o.substring(u + a, f)));
							d.exp = p;
							h = f + s;
							y = true;
						} else {
							if (h != m) {
								g.push(o.substring(h));
							}
							h = m;
						}
					}
					if ((m = g.length) || (g.push(""), m = 1), l && g.length > 1) {
						throw ri("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", o);
					}
					if (!c || y) {
						b.length = m;
						d = function(e) {
							try {
								var t, a = m;
								for (var n = 0; a > n; n++) {
									if ("function" == typeof(t = g[n])) {
										t = t(e);
										if (l) {
											t = i.getTrusted(l, t);
										} else {
											t = i.valueOf(t);
										}
										if (null === t || v(t)) {
											t = "";
										} else if ("string" != typeof t) {
											(t = B(t))
										}
									}
									b[n] = t;
								}
								return b.join("");
							} catch (s) {
								var c = ri("interr", "Can't interpolate: {0}\n{1}", o, s.toString());
								r(c)
							}
						};
						d.exp = o;
						d.parts = g;
						return d;
					} else {
						return void 0;
					}
				}
				var a = e.length,
					s = t.length;
				o.startSymbol = function() {
					return e;
				};
				o.endSymbol = function() {
					return t;
				};
				return o;
			}
		];
	}

	function nn() {
		this.$get = ["$rootScope", "$window", "$q",
			function(e, t, n) {
				function r(r, o, a, s) {
					var c = t.setInterval,
						l = t.clearInterval,
						u = n.defer(),
						f = u.promise,
						d = 0,
						p = y(s) && !s;
					if (y(a)) {
						a = a;
					} else {
						a = 0;
					}
					f.then(null, null, r);
					f.$$intervalId = c(function() {
						u.notify(d++);
						if (a > 0 && d >= a) {
							u.resolve(d);
							l(f.$$intervalId);
							delete i[f.$$intervalId];
						}
						if (!(p)) {
							e.$apply();
						}
					}, o);
					i[f.$$intervalId] = u;
					return f;
				}
				var i = {};
				r.cancel = function(e) {
					if (e && e.$$intervalId in i) {
						return (i[e.$$intervalId].reject("canceled"), clearInterval(e.$$intervalId), delete i[e.$$intervalId], true);
					} else {
						return false;
					}
				};
				return r;
			}
		]
	}

	function rn() {
		this.$get = function() {
			return {
				id: "en-us",
				NUMBER_FORMATS: {
					DECIMAL_SEP: ".",
					GROUP_SEP: ",",
					PATTERNS: [{
						minInt: 1,
						minFrac: 0,
						maxFrac: 3,
						posPre: "",
						posSuf: "",
						negPre: "-",
						negSuf: "",
						gSize: 3,
						lgSize: 3
					}, {
						minInt: 1,
						minFrac: 2,
						maxFrac: 2,
						posPre: "¤",
						posSuf: "",
						negPre: "(¤",
						negSuf: ")",
						gSize: 3,
						lgSize: 3
					}],
					CURRENCY_SYM: "$"
				},
				DATETIME_FORMATS: {
					MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
					SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
					DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
					SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
					AMPMS: ["AM", "PM"],
					medium: "MMM d, y h:mm:ss a",
					"short": "M/d/yy h:mm a",
					fullDate: "EEEE, MMMM d, y",
					longDate: "MMMM d, y",
					mediumDate: "MMM d, y",
					shortDate: "M/d/yy",
					mediumTime: "h:mm:ss a",
					shortTime: "h:mm a"
				},
				pluralCat: function(e) {
					if (1 === e) {
						return "one";
					} else {
						return "other";
					}
				}
			}
		}
	}

	function on(e) {
		for (var t = e.split("/"), n = t.length; n--;) t[n] = K(t[n]);
		return t.join("/")
	}

	function an(e, t, n) {
		var r = Fn(e, n);
		t.$$protocol = r.protocol;
		t.$$host = r.hostname;
		t.$$port = d(r.port) || oi[r.protocol] || null;
	}

	function sn(e, t, n) {
		var r = "/" !== e.charAt(0);
		if (r) {
			e = "/" + e;
		}
		var i = Fn(e, n);
		t.$$path = decodeURIComponent(r && "/" === i.pathname.charAt(0) ? i.pathname.substring(1) : i.pathname);
		t.$$search = X(i.search);
		t.$$hash = decodeURIComponent(i.hash);
		if (t.$$path && "/" != t.$$path.charAt(0)) {
			t.$$path = "/" + t.$$path;
		}
	}

	function cn(e, t) {
		if (0 === t.indexOf(e)) {
			return t.substr(e.length);
		} else {
			return void 0;
		}
	}

	function ln(e) {
		var t = e.indexOf("#");
		if (t == -1) {
			return e;
		} else {
			return e.substr(0, t);
		}
	}

	function un(e) {
		return e.substr(0, ln(e).lastIndexOf("/") + 1)
	}

	function fn(e) {
		return e.substring(0, e.indexOf("/", e.indexOf("//") + 2))
	}

	function dn(e, t) {
		this.$$html5 = true, t = t || "";
		var r = un(e);
		an(e, this, e);
		this.$$parse = function(t) {
			var n = cn(r, t);
			if (!$(n)) {
				throw ai("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, r);
			}
			sn(n, this, e);
			if (!(this.$$path)) {
				(this.$$path = "/");
			}
			this.$$compose();
		};
		this.$$compose = function() {
			var e = G(this.$$search),
				t = this.$$hash ? "#" + K(this.$$hash) : "";
			this.$$url = on(this.$$path) + (e ? "?" + e : "") + t, this.$$absUrl = r + this.$$url.substr(1)
		};
		this.$$rewrite = function(i) {
			var o, a;
			if ((o = cn(e, i)) !== n) {
				return (a = o, (o = cn(t, o)) !== n ? r + (cn("/", o) || o) : e + a);
			} else if ((o = cn(r, i)) !== n) {
				return r + o;
			} else if (r == i + "/") {
				return r;
			} else {
				return void 0;
			}
		};
	}

	function pn(e, t) {
		var n = un(e);
		an(e, this, e);
		this.$$parse = function(r) {
			function i(e, t, n) {
				var r, i = /^\/?.*?:(\/.*)/;
				if (0 === t.indexOf(n)) {
					(t = t.replace(n, ""))
				}
				if (i.exec(t)) {
					return e;
				} else {
					return (r = i.exec(e), r ? r[1] : e);
				}
			}
			var o = cn(e, r) || cn(n, r),
				a = "#" == o.charAt(0) ? cn(t, o) : this.$$html5 ? o : "";
			if (!$(a)) {
				throw ai("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', r, t);
			}
			sn(a, this, e);
			this.$$path = i(this.$$path, a, e);
			this.$$compose();
		};
		this.$$compose = function() {
			var n = G(this.$$search),
				r = this.$$hash ? "#" + K(this.$$hash) : "";
			this.$$url = on(this.$$path) + (n ? "?" + n : "") + r, this.$$absUrl = e + (this.$$url ? t + this.$$url : "")
		};
		this.$$rewrite = function(t) {
			if (ln(e) == ln(t)) {
				return t;
			} else {
				return void 0;
			}
		};
	}

	function hn(e, t) {
		this.$$html5 = true, pn.apply(this, arguments);
		var n = un(e);
		this.$$rewrite = function(r) {
			var i;
			if (e == ln(r)) {
				return r;
			} else if ((i = cn(n, r))) {
				return e + t + i;
			} else if (n === r + "/") {
				return n;
			} else {
				return void 0;
			}
		}
	}

	function gn(e) {
		return function() {
			return this[e]
		}
	}

	function mn(e, t) {
		return function(n) {
			if (v(n)) {
				return this[e];
			} else {
				return (this[e] = t(n), this.$$compose(), this);
			}
		}
	}

	function vn() {
		var t = "",
			n = false;
		this.hashPrefix = function(e) {
			if (y(e)) {
				return (t = e, this);
			} else {
				return t;
			}
		};
		this.html5Mode = function(e) {
			if (y(e)) {
				return (n = e, this);
			} else {
				return n;
			}
		};
		this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement",
			function(r, i, o, a) {
				function s(e) {
					r.$broadcast("$locationChangeSuccess", c.absUrl(), e)
				}
				var c, l, u, f = i.baseHref(),
					d = i.url();
				if (n) {
					u = fn(d) + (f || "/");
					if (o.history) {
						l = dn;
					} 
					else {
						l = hn;
					}
				} else {
					u = ln(d);
					l = pn;
				}
				c = new l(u, "#" + t);
				c.$$parse(c.$$rewrite(d));
				a.on("click", function(t) {
					if (!t.ctrlKey && !t.metaKey && 2 != t.which) {
						for (var n = br(t.target);
							"a" !== pr(n[0].nodeName);)
							if (n[0] === a[0] || !(n = n.parent())[0]) {
								return;
							}
						var o = n.prop("href");
						if (b(o) && "[object SVGAnimatedString]" === o.toString()) {
							(o = Fn(o.animVal).href);
						}
						var s = c.$$rewrite(o);
						if (o && !n.attr("target") && s && !t.isDefaultPrevented()) {
							t.preventDefault();
							if (s != i.url()) {
								c.$$parse(s);
								r.$apply();
								e.angular["ff-684208-preventDefault"] = true;
							}
						}
					}
				});
				if (c.absUrl() != d) {
					i.url(c.absUrl(), true);
				}
				i.onUrlChange(function(e) {
					if (c.absUrl() != e) {
						r.$evalAsync(function() {
							var t = c.absUrl();
							c.$$parse(e), r.$broadcast("$locationChangeStart", e, t).defaultPrevented ? (c.$$parse(t), i.url(t)) : s(t)
						});
						if (!(r.$$phase)) {
							r.$digest()
						}
					}
				});
				var p = 0;
				r.$watch(function() {
					var e = i.url(),
						t = c.$$replace;
					if (!(p && e == c.absUrl())) {
						p++;
						r.$evalAsync(function() {
							if (r.$broadcast("$locationChangeStart", c.absUrl(), e).defaultPrevented) {
								c.$$parse(e);
							} else {
								i.url(c.absUrl(), t);
								s(e);
							}
						});
					}
					c.$$replace = false;
					return p;
				});
				return c;
			}
		];
	}

	function yn() {
		var e = true,
			t = this;
		this.debugEnabled = function(t) {
			if (y(t)) {
				return (e = t, this);
			} else {
				return e;
			}
		}, this.$get = ["$window",
			function(n) {
				function r(e) {
					if (e instanceof Error) {
						if (e.stack) {
							if (e.message && -1 === e.stack.indexOf(e.message)) {
								e = "Error: " + e.message + "\n" + e.stack;
							} else {
								e = e.stack;
							}
						} else if (e.sourceURL) {
							e = e.message + "\n" + e.sourceURL + ":" + e.line;
						}
					}
					return e;
				}

				function i(e) {
					var t = n.console || {},
						i = t[e] || t.log || h,
						a = false;
					try {
						a = !!i.apply
					} catch (s) {}
					if (a) {
						return function() {
							var e = [];
							o(arguments, function(t) {
								e.push(r(t))
							});
							return i.apply(t, e);
						};
					} else {
						return function(e, t) {
							i(e, t == null ? "" : t)
						};
					}
				}
				return {
					log: i("log"),
					info: i("info"),
					warn: i("warn"),
					error: i("error"),
					debug: function() {
						var n = i("debug");
						return function() {
							if (e) {
								n.apply(t, arguments);
							}
						}
					}()
				}
			}
		]
	}

	function bn(e, t) {
		if ("constructor" === e) {
			throw ci("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', t);
		}
		return e;
	}

	function $n(e, t) {
		if (e) {
			if (e.constructor === e) {
				throw ci("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
			}
			if (e.document && e.location && e.alert && e.setInterval) {
				throw ci("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
			}
			if (e.children && (e.nodeName || e.prop && e.attr && e.find)) {
				throw ci("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t);
			}
		}
		return e;
	}

	function wn(e, t, r, i, o) {
		o = o || {};
		for (var a, s = t.split("."), c = 0; s.length > 1; c++) {
			a = bn(s.shift(), i);
			var l = e[a];
			if (!(l)) {
				l = {};
				e[a] = l;
			}
			e = l;
			if (e.then && o.unwrapPromises) {
				si(i);
				if (!("$$v" in e)) {
					! function(e) {
						e.then(function(t) {
							e.$$v = t
						})
					}(e);
				}
				if (e.$$v === n) {
					(e.$$v = {});
				}
				e = e.$$v;
			}
		}
		a = bn(s.shift(), i);
		e[a] = r;
		return r;
	}

	function kn(e, t, r, i, o, a, s) {
		bn(e, a);
		bn(t, a);
		bn(r, a);
		bn(i, a);
		bn(o, a);
		if (s.unwrapPromises) {
			return function(s, c) {
				var l, u = c && c.hasOwnProperty(e) ? c : s;
				if (u == null) {
					return u;
				} else {
					return (u = u[e], u && u.then && (si(a), "$$v" in u || (l = u, l.$$v = n, l.then(function(e) {
						l.$$v = e
					})), u = u.$$v), t ? u == null ? n : (u = u[t], u && u.then && (si(a), "$$v" in u || (l = u, l.$$v = n, l.then(function(e) {
						l.$$v = e
					})), u = u.$$v), r ? u == null ? n : (u = u[r], u && u.then && (si(a), "$$v" in u || (l = u, l.$$v = n, l.then(function(e) {
						l.$$v = e
					})), u = u.$$v), i ? u == null ? n : (u = u[i], u && u.then && (si(a), "$$v" in u || (l = u, l.$$v = n, l.then(function(e) {
						l.$$v = e
					})), u = u.$$v), o ? u == null ? n : (u = u[o], u && u.then && (si(a), "$$v" in u || (l = u, l.$$v = n, l.then(function(e) {
						l.$$v = e
					})), u = u.$$v), u) : u) : u) : u) : u);
				}
			};
		} else {
			return function(a, s) {
				var c = s && s.hasOwnProperty(e) ? s : a;
				if (c == null) {
					return c;
				} else {
					return (c = c[e], t ? c == null ? n : (c = c[t], r ? c == null ? n : (c = c[r], i ? c == null ? n : (c = c[i], o ? c == null ? n : c = c[o] : c) : c) : c) : c);
				}
			};
		}
	}

	function xn(e, t) {
		bn(e, t);
		return function(t, r) {
			if (t == null) {
				return n;
			} else {
				return (r && r.hasOwnProperty(e) ? r : t)[e];
			}
		};
	}

	function Tn(e, t, r) {
		bn(e, r);
		bn(t, r);
		return function(r, i) {
			if (r == null) {
				return n;
			} else {
				return (r = (i && i.hasOwnProperty(e) ? i : r)[e], r == null ? n : r[t]);
			}
		};
	}

	function Cn(e, t, r) {
		if (hi.hasOwnProperty(e)) {
			return hi[e];
		}
		var i, a = e.split("."),
			s = a.length;
		if (t.unwrapPromises || 1 !== s) {
			if (t.unwrapPromises || 2 !== s) {
				if (t.csp) {
					if (6 > s) {
						i = kn(a[0], a[1], a[2], a[3], a[4], r, t);
					} else {
						i = function(e, i) {
							var o, c = 0;
							do {
								o = kn(a[c++], a[c++], a[c++], a[c++], a[c++], r, t)(e, i);
								i = n;
								e = o;
							} while (s > c);
							return o
						};
					}
				} else {
					var c = "var p;\n";
					o(a, function(e, n) {
						bn(e, r);
						c += "if(s == null) return undefined;\ns=" + (n ? "s" : '((k&&k.hasOwnProperty("' + e + '"))?k:s)') + '["' + e + '"];\n' + (
							t.unwrapPromises ?
							'if (s && s.then) {\n pw("' + r.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : ""
						);
					}), c += "return s;";
					var l = new Function("s", "k", "pw", c);
					l.toString = m(c), i = t.unwrapPromises ? function(e, t) {
						return l(e, t, si)
					} : l
				}
			} else {
				i = Tn(a[0], a[1], r);
			}
		} else {
			i = xn(a[0], r);
		}
		if ("hasOwnProperty" !== e) {
			(hi[e] = i)
		}
		return i;
	}

	function Sn() {
		var e = {},
			t = {
				csp: false,
				unwrapPromises: false,
				logPromiseWarnings: true
			};
		this.unwrapPromises = function(e) {
			if (y(e)) {
				return (t.unwrapPromises = !!e, this);
			} else {
				return t.unwrapPromises;
			}
		};
		this.logPromiseWarnings = function(e) {
			if (y(e)) {
				return (t.logPromiseWarnings = e, this);
			} else {
				return t.logPromiseWarnings;
			}
		};
		this.$get = ["$filter", "$sniffer", "$log",
			function(n, r, i) {
				t.csp = r.csp;
				si = function(e) {
					if (t.logPromiseWarnings && !li.hasOwnProperty(e)) {
						li[e] = true;
						i.warn("[$parse] Promise found in the expression `" + e + "`. Automatic unwrapping of promises in Angular expressions is deprecated.");
					}
				};
				return function(r) {
					var i;
					switch (typeof r) {
						case "string":
							if (e.hasOwnProperty(r)) {
								return e[r];
							}
							var o = new di(t),
								a = new pi(o, n, t);
							i = a.parse(r, false);
							if ("hasOwnProperty" !== r) {
								(e[r] = i)
							}
							return i;
						case "function":
							return r;
						default:
							return h
					}
				};
			}
		];
	}

	function An() {
		this.$get = ["$rootScope", "$exceptionHandler",
			function(e, t) {
				return En(function(t) {
					e.$evalAsync(t)
				}, t)
			}
		]
	}

	function En(e, t) {
		function r(e) {
			return e
		}

		function i(e) {
			return l(e)
		}

		function a(e) {
			var t = s(),
				n = 0,
				r = x(e) ? [] : {};
			o(e, function(e, i) {
				n++;
				c(e).then(function(e) {
					if (!(r.hasOwnProperty(i))) {
						r[i] = e;
						if (!(--n)) {
							t.resolve(r); 
						}
					}
				}, function(e) {
					if (!(r.hasOwnProperty(i))) {
						t.reject(e)
					}
				});
			});
			if (0 === n) {
				t.resolve(r)
			}
			return t.promise;
		}
		var s = function() {
				var o, a, l = [];
				return a = {
					resolve: function(t) {
						if (l) {
							var r = l;
							l = n;
							o = c(t);
							if (r.length) {
								e(function() {
									for (var e, t = 0, n = r.length; n > t; t++) {
										e = r[t];
										o.then(e[0], e[1], e[2]);
									}
								});
							}
						}
					},
					reject: function(e) {
						a.resolve(u(e))
					},
					notify: function(t) {
						if (l) {
							var n = l;
							if (l.length) {
								e(function() {
									for (var e, r = 0, i = n.length; i > r; r++) {
										e = n[r];
										e[2](t);
									}
								});
							}
						}
					},
					promise: {
						then: function(e, n, a) {
							var c = s(),
								u = function(n) {
									try {
										c.resolve((T(e) ? e : r)(n))
									} catch (i) {
										c.reject(i);
										t(i);
									}
								},
								f = function(e) {
									try {
										c.resolve((T(n) ? n : i)(e))
									} catch (r) {
										c.reject(r);
										t(r);
									}
								},
								d = function(e) {
									try {
										c.notify((T(a) ? a : r)(e))
									} catch (n) {
										t(n)
									}
								};
							if (l) {
								l.push([u, f, d]);
							} else {
								o.then(u, f, d);
							}
							return c.promise;
						},
						"catch": function(e) {
							return this.then(null, e)
						},
						"finally": function(e) {
							function t(e, t) {
								var n = s();
								if (t) {
									n.resolve(e);
								} else {
									n.reject(e);
								}
								return n.promise;
							}

							function n(n, i) {
								var o = null;
								try {
									o = (e || r)()
								} catch (a) {
									return t(a, false)
								}
								if (o && T(o.then)) {
									return o.then(function() {
										return t(n, i)
									}, function(e) {
										return t(e, false)
									});
								} else {
									return t(n, i);
								}
							}
							return this.then(function(e) {
								return n(e, true)
							}, function(e) {
								return n(e, false)
							})
						}
					}
				}
			},
			c = function(t) {
				if (t && T(t.then)) {
					return t;
				} else {
					return {
						then: function(n) {
							var r = s();
							e(function() {
								r.resolve(n(t))
							});
							return r.promise;
						}
					};
				}
			},
			l = function(e) {
				var t = s();
				t.reject(e);
				return t.promise;
			},
			u = function(n) {
				return {
					then: function(r, o) {
						var a = s();
						e(function() {
							try {
								a.resolve((T(o) ? o : i)(n))
							} catch (e) {
								a.reject(e);
								t(e);
							}
						});
						return a.promise;
					}
				}
			},
			f = function(n, o, a, u) {
				var f, d = s(),
					p = function(e) {
						try {
							return (T(o) ? o : r)(e)
						} catch (n) {
							t(n);
							return l(n);
						}
					},
					h = function(e) {
						try {
							return (T(a) ? a : i)(e)
						} catch (n) {
							t(n);
							return l(n);
						}
					},
					g = function(e) {
						try {
							return (T(u) ? u : r)(e)
						} catch (n) {
							t(n)
						}
					};
				e(function() {
					c(n).then(function(e) {
						if (!(f)) {
							f = true;
							d.resolve(c(e).then(p, h, g));
						}
					}, function(e) {
						if (!(f)) {
							f = true;
							d.resolve(h(e));
						}
					}, function(e) {
						if (!(f)) {
							d.notify(g(e))
						}
					})
				});
				return d.promise;
			};
		return {
			defer: s,
			reject: l,
			when: f,
			all: a
		}
	}

	function Nn() {
		this.$get = ["$window", "$timeout",
			function(e, t) {
				var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame,
					r = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelRequestAnimationFrame,
					i = !!n,
					o = i ? function(e) {
						var t = n(e);
						return function() {
							r(t)
						}
					} : function(e) {
						var n = t(e, 16.66, false);
						return function() {
							t.cancel(n)
						}
					};
				o.supported = i;
				return o;
			}
		]
	}

	function jn() {
		var e = 10,
			t = r("$rootScope"),
			n = null;
		this.digestTtl = function(t) {
			if (arguments.length) {
				(e = t)
			}
			return e;
		}, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser",
			function(r, a, s, c) {
				function u() {
					this.$id = l();
					this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
					this["this"] = this.$root = this;
					this.$$destroyed = false;
					this.$$asyncQueue = [];
					this.$$postDigestQueue = [];
					this.$$listeners = {};
					this.$$listenerCount = {};
					this.$$isolateBindings = {};
				}

				function f(e) {
					if (v.$$phase) {
						throw t("inprog", "{0} already in progress", v.$$phase);
					}
					v.$$phase = e
				}

				function d() {
					v.$$phase = null
				}

				function p(e, t) {
					var n = s(e);
					rt(n, t);
					return n;
				}

				function g(e, t, n) {
					do e.$$listenerCount[n] -= t, 0 === e.$$listenerCount[n] && delete e.$$listenerCount[n]; while (e = e.$parent)
				}

				function m() {}
				u.prototype = {
					constructor: u,
					$new: function(e) {
						var t, n;
						if (e) {
							n = new u;
							n.$root = this.$root;
							n.$$asyncQueue = this.$$asyncQueue;
							n.$$postDigestQueue = this.$$postDigestQueue;
						} else {
							t = function() {};
							t.prototype = this;
							n = new t;
							n.$id = l();
						}
						n["this"] = n;
						n.$$listeners = {};
						n.$$listenerCount = {};
						n.$parent = this;
						n.$$watchers = n.$$nextSibling = n.$$childHead = n.$$childTail = null;
						n.$$prevSibling = this.$$childTail;
						if (this.$$childHead) {
							this.$$childTail.$$nextSibling = n;
							this.$$childTail = n;
						} else {
							this.$$childHead = this.$$childTail = n;
						}
						return n;
					},
					$watch: function(e, t, r) {
						var i = this,
							o = p(e, "watch"),
							a = i.$$watchers,
							s = {
								fn: t,
								last: m,
								get: o,
								exp: e,
								eq: !!r
							};
						if (n = null, !T(t)) {
							var c = p(t || h, "listener");
							s.fn = function(e, t, n) {
								c(n)
							}
						}
						if ("string" == typeof e && o.constant) {
							var l = s.fn;
							s.fn = function(e, t, n) {
								l.call(this, e, t, n);
								O(a, s);
							}
						}
						if (!(a)) {
							(a = i.$$watchers = [])
						}
						a.unshift(s);
						return function() {
							O(a, s);
							n = null;
						};
					},
					$watchCollection: function(e, t) {
						function n() {
							o = d(l);
							var e, t;
							if (b(o))
								if (i(o)) {
									if (a !== p) {
										a = p;
										m = a.length = 0;
										f++;
									}
									e = o.length;
									if (m !== e) {
										f++;
										a.length = m = e;
									}
									for (var n = 0; e > n; n++) {
										var r = a[n] !== a[n] && o[n] !== o[n];
										if (!(r || a[n] === o[n])) {
											f++;
											a[n] = o[n];
										}
									}
								} else {
									if (a !== h) {
										a = h = {};
										m = 0;
										f++;
									}
									e = 0;
									for (t in o)
										if (o.hasOwnProperty(t)) {
											e++;
											if (a.hasOwnProperty(t)) {
												if (a[t] !== o[t]) {
													f++;
													a[t] = o[t];
												}
											} else {
												m++;
												a[t] = o[t];
												f++;
											}
										}
									if (m > e) {
										f++;
										for (t in a)
											if (a.hasOwnProperty(t) && !o.hasOwnProperty(t)) {
												m--;
												delete a[t];
											}
									}
								} else if (a !== o) {
								a = o;
								f++;
							}
							return f
						}

						function r() {
							if (g) {
								g = false;
								t(o, o, l);
							} else {
								t(o, c, l);
							}
							if (u) {
								if (b(o)) {
									if (i(o)) {
										c = new Array(o.length);
										for (var e = 0; e < o.length; e++) {
											c[e] = o[e];
										}
									} else {
										c = {};
										for (var n in o) {
											if (hr.call(o, n)) {
												c[n] = o[n];
											}
										}
									}
								} else {
									c = o;
								}
							}
						}
						var o, a, c, l = this,
							u = t.length > 1,
							f = 0,
							d = s(e),
							p = [],
							h = {},
							g = true,
							m = 0;
						return this.$watch(n, r)
					},
					$digest: function() {
						var r, i, o, s, c, l, u, p, h, g, v, y = this.$$asyncQueue,
							b = this.$$postDigestQueue,
							$ = e,
							w = this,
							k = [];
						f("$digest"), n = null;
						do {
							for (l = false, p = w; y.length;) {
								try {
									v = y.shift();
									v.scope.$eval(v.expression);
								} catch (x) {
									d();
									a(x);
								}
								n = null
							}
							e: do {
								if (s = p.$$watchers)
									for (c = s.length; c--;) try {
										if (r = s[c])
											if ((i = r.get(p)) === (o = r.last) || (r.eq ? L(i, o) : "number" == typeof i && "number" == typeof o && isNaN(i) && isNaN(o))) {
												if (r === n) {
													l = false;
													break e
												}
											} else {
												l = true;
												n = r;
												if (r.eq) {
													r.last = I(i);
												} else {
													r.last = i;
												}
												r.fn(i, o === m ? i : o, p);
												if (5 > $) {
													h = 4 - $;
													if (!(k[h])) {
														(k[h] = [])
													}
													if (T(r.exp)) {
														g = "fn: " + (r.exp.name || r.exp.toString());
													} else {
														g = r.exp;
													}
													g += "; newVal: " + B(i) + "; oldVal: " + B(o);
													k[h].push(g);
												}
											}
									} catch (x) {
										d();
										a(x);
									}
								if (!(u = p.$$childHead || p !== w && p.$$nextSibling))
									for (; p !== w && !(u = p.$$nextSibling);) p = p.$parent
							} while (p = u);
							if ((l || y.length) && !$--) {
								throw d(), t("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, B(k));
							}
						} while (l || y.length);
						for (d(); b.length;) try {
							b.shift()()
						} catch (x) {
							a(x)
						}
					},
					$destroy: function() {
						if (!this.$$destroyed) {
							var e = this.$parent;
							this.$broadcast("$destroy");
							this.$$destroyed = true;
							if (this !== v) {
								o(this.$$listenerCount, R(null, g, this));
								if (e.$$childHead == this) {
									e.$$childHead = this.$$nextSibling;
								}
								if (e.$$childTail == this) {
									e.$$childTail = this.$$prevSibling;
								}
								if (this.$$prevSibling) {
									this.$$prevSibling.$$nextSibling = this.$$nextSibling;
								}
								if (this.$$nextSibling) {
									this.$$nextSibling.$$prevSibling = this.$$prevSibling;
								}
								this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null;
								this.$$listeners = {};
								this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [];
								this.$destroy = this.$digest = this.$apply = h;
								this.$on = this.$watch = function() {
									return h;
								}
							}
						}
					},
					$eval: function(e, t) {
						return s(e)(this, t)
					},
					$evalAsync: function(e) {
						if (!(v.$$phase || v.$$asyncQueue.length)) {
							c.defer(function() {
								if (v.$$asyncQueue.length) {
									v.$digest();
								}
							}); 
						}
						this.$$asyncQueue.push({
							scope: this,
							expression: e
						});
					},
					$$postDigest: function(e) {
						this.$$postDigestQueue.push(e)
					},
					$apply: function(e) {
						try {
							f("$apply");
							return this.$eval(e);
						} catch (t) {
							a(t)
						} finally {
							d();
							try {
								v.$digest()
							} catch (t) {
								throw a(t), t
							}
						}
					},
					$on: function(e, t) {
						var n = this.$$listeners[e];
						n || (this.$$listeners[e] = n = []), n.push(t);
						var r = this;
						do r.$$listenerCount[e] || (r.$$listenerCount[e] = 0), r.$$listenerCount[e]++; while (r = r.$parent);
						var i = this;
						return function() {
							n[M(n, t)] = null;
							g(i, 1, e);
						}
					},
					$emit: function(e) {
						var t, n, r, i = [],
							o = this,
							s = false,
							c = {
								name: e,
								targetScope: o,
								stopPropagation: function() {
									s = true
								},
								preventDefault: function() {
									c.defaultPrevented = true
								},
								defaultPrevented: false
							},
							l = F([c], arguments, 1);
						do {
							t = o.$$listeners[e] || i;
							c.currentScope = o;
							n = 0;
							for (r = t.length; r > n; n++)
								if (t[n]) try {
									t[n].apply(null, l)
								} catch (u) {
									a(u)
								} else {
									t.splice(n, 1);
									n--;
									r--;
								}
							if (s) {
								return c;
							}
							o = o.$parent
						} while (o);
						return c
					},
					$broadcast: function(e) {
						for (var t, n, r, i = this, o = i, s = i, c = {
							name: e,
							targetScope: i,
							preventDefault: function() {
								c.defaultPrevented = true
							},
							defaultPrevented: false
						}, l = F([c], arguments, 1); o = s;) {
							c.currentScope = o;
							t = o.$$listeners[e] || [];
							n = 0;
							for (r = t.length; r > n; n++)
								if (t[n]) try {
									t[n].apply(null, l)
								} catch (u) {
									a(u)
								} else {
									t.splice(n, 1);
									n--;
									r--;
								}
							if (!(s = o.$$listenerCount[e] && o.$$childHead || o !== i && o.$$nextSibling))
								for (; o !== i && !(s = o.$$nextSibling);) o = o.$parent
						}
						return c
					}
				};
				var v = new u;
				return v
			}
		]
	}

	function _n() {
		var e = /^\s*(https?|ftp|mailto|tel|file):/,
			t = /^\s*(https?|ftp|file):|data:image\//;
		this.aHrefSanitizationWhitelist = function(t) {
			if (y(t)) {
				return (e = t, this);
			} else {
				return e;
			}
		};
		this.imgSrcSanitizationWhitelist = function(e) {
			if (y(e)) {
				return (t = e, this);
			} else {
				return t;
			}
		};
		this.$get = function() {
			return function(n, r) {
				var i, o = r ? t : e;
				if (yr && !(yr >= 8) || (i = Fn(n).href, "" === i || i.match(o))) {
					return n;
				} else {
					return "unsafe:" + i;
				}
			}
		};
	}

	function qn(e) {
		return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
	}

	function Mn(e) {
		if ("self" === e) {
			return e;
		}
		if ($(e)) {
			if (e.indexOf("***") > -1) {
				throw gi("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
			}
			e = qn(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
			return new RegExp("^" + e + "$");
		}
		if (C(e)) {
			return new RegExp("^" + e.source + "$");
		}
		throw gi("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
	}

	function On(e) {
		var t = [];
		if (y(e)) {
			o(e, function(e) {
				t.push(Mn(e))
			})
		}
		return t;
	}

	function In() {
		this.SCE_CONTEXTS = mi;
		var e = ["self"],
			t = [];
		this.resourceUrlWhitelist = function(t) {
			if (arguments.length) {
				(e = On(t))
			}
			return e;
		};
		this.resourceUrlBlacklist = function(e) {
			if (arguments.length) {
				(t = On(e))
			}
			return t;
		};
		this.$get = ["$injector",
			function(r) {
				function i(e, t) {
					if ("self" === e) {
						return zn(t);
					} else {
						return !!e.exec(t.href);
					}
				}

				function o(n) {
					var r, o, a = Fn(n.toString()),
						s = false;
					r = 0;
					for (o = e.length; o > r; r++)
						if (i(e[r], a)) {
							s = true;
							break
						}
					if (s) {
						r = 0;
						for (o = t.length; o > r; r++)
							if (i(t[r], a)) {
								s = false;
								break
							}
					}
					return s
				}

				function a(e) {
					var t = function(e) {
						this.$$unwrapTrustedValue = function() {
							return e
						}
					};
					if (e) {
						(t.prototype = new e)
					}
					t.prototype.valueOf = function() {
						return this.$$unwrapTrustedValue()
					};
					t.prototype.toString = function() {
						return this.$$unwrapTrustedValue().toString()
					};
					return t;
				}

				function s(e, t) {
					var r = d.hasOwnProperty(e) ? d[e] : null;
					if (!r) {
						throw gi("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
					}
					if (null === t || t === n || "" === t) {
						return t;
					}
					if ("string" != typeof t) {
						throw gi("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
					}
					return new r(t)
				}

				function c(e) {
					if (e instanceof f) {
						return e.$$unwrapTrustedValue();
					} else {
						return e;
					}
				}

				function l(e, t) {
					if (null === t || t === n || "" === t) {
						return t;
					}
					var r = d.hasOwnProperty(e) ? d[e] : null;
					if (r && t instanceof r) {
						return t.$$unwrapTrustedValue();
					}
					if (e === mi.RESOURCE_URL) {
						if (o(t)) {
							return t;
						}
						throw gi("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", t.toString())
					}
					if (e === mi.HTML) {
						return u(t);
					}
					throw gi("unsafe", "Attempting to use an unsafe value in a safe context.")
				}
				var u = function() {
					throw gi("unsafe", "Attempting to use an unsafe value in a safe context.")
				};
				if (r.has("$sanitize")) {
					(u = r.get("$sanitize"));
				}
				var f = a(),
					d = {};
				d[mi.HTML] = a(f);
				d[mi.CSS] = a(f);
				d[mi.URL] = a(f);
				d[mi.JS] = a(f);
				d[mi.RESOURCE_URL] = a(d[mi.URL]);
				return {
					trustAs: s,
					getTrusted: l,
					valueOf: c
				};
			}
		];
	}

	function Dn() {
		var e = true;
		this.enabled = function(t) {
			if (arguments.length) {
				(e = !!t)
			}
			return e;
		}, this.$get = ["$parse", "$sniffer", "$sceDelegate",
			function(t, n, r) {
				if (e && n.msie && n.msieDocumentMode < 8) {
					throw gi("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
				}
				var i = I(mi);
				i.isEnabled = function() {
					return e
				};
				i.trustAs = r.trustAs;
				i.getTrusted = r.getTrusted;
				i.valueOf = r.valueOf;
				if (!(e)) {
					i.trustAs = i.getTrusted = function(e, t) {
						return t
					};
					i.valueOf = g;
				}
				i.parseAs = function(e, n) {
					var r = t(n);
					if (r.literal && r.constant) {
						return r;
					} else {
						return function(t, n) {
							return i.getTrusted(e, r(t, n))
						};
					}
				};
				var a = i.parseAs,
					s = i.getTrusted,
					c = i.trustAs;
				o(mi, function(e, t) {
					var n = pr(t);
					i[ut("parse_as_" + n)] = function(t) {
						return a(e, t)
					};
					i[ut("get_trusted_" + n)] = function(t) {
						return s(e, t)
					};
					i[ut("trust_as_" + n)] = function(t) {
						return c(e, t)
					};
				});
				return i;
			}
		]
	}

	function Ln() {
		this.$get = ["$window", "$document",
			function(e, t) {
				var n, r, i = {},
					o = d((/android (\d+)/.exec(pr((e.navigator || {}).userAgent)) || [])[1]),
					a = /Boxee/i.test((e.navigator || {}).userAgent),
					s = t[0] || {},
					c = s.documentMode,
					l = /^(Moz|webkit|O|ms)(?=[A-Z])/,
					u = s.body && s.body.style,
					f = false,
					p = false;
				if (u) {
					for (var h in u)
						if (r = l.exec(h)) {
							n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
							break
						}
					if (!(n)) {
						(n = "WebkitOpacity" in u && "webkit")
					}
					f = !!("transition" in u || n + "Transition" in u);
					p = !!("animation" in u || n + "Animation" in u);
					if (!(!o || f && p)) {
						f = $(s.body.style.webkitTransition);
						p = $(s.body.style.webkitAnimation);
					}
				}
				return {
					history: !(!e.history || !e.history.pushState || 4 > o || a),
					hashchange: "onhashchange" in e && (!c || c > 7),
					hasEvent: function(e) {
						if (e == "input" && yr == 9) {
							return false;
						}
						if (v(i[e])) {
							var t = s.createElement("div");
							i[e] = "on" + e in t
						}
						return i[e]
					},
					csp: P(),
					vendorPrefix: n,
					transitions: f,
					animations: p,
					android: o,
					msie: yr,
					msieDocumentMode: c
				}
			}
		]
	}

	function Pn() {
		this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler",
			function(e, t, n, r) {
				function i(i, a, s) {
					var c, l = n.defer(),
						u = l.promise,
						f = y(s) && !s;
					c = t.defer(function() {
						try {
							l.resolve(i())
						} catch (t) {
							l.reject(t);
							r(t);
						} finally {
							delete o[u.$$timeoutId]
						}
						if (!(f)) {
							e.$apply()
						}
					}, a);
					u.$$timeoutId = c;
					o[c] = l;
					return u;
				}
				var o = {};
				i.cancel = function(e) {
					if (e && e.$$timeoutId in o) {
						return (o[e.$$timeoutId].reject("canceled"), delete o[e.$$timeoutId], t.defer.cancel(e.$$timeoutId));
					} else {
						return false;
					}
				};
				return i;
			}
		]
	}

	function Fn(e) {
		var t = e;
		if (yr) {
			vi.setAttribute("href", t);
			t = vi.href;
		}
		vi.setAttribute("href", t);
		return {
			href: vi.href,
			protocol: vi.protocol ? vi.protocol.replace(/:$/, "") : "",
			host: vi.host,
			search: vi.search ? vi.search.replace(/^\?/, "") : "",
			hash: vi.hash ? vi.hash.replace(/^#/, "") : "",
			hostname: vi.hostname,
			port: vi.port,
			pathname: "/" === vi.pathname.charAt(0) ? vi.pathname : "/" + vi.pathname
		};
	}

	function zn(e) {
		var t = $(e) ? Fn(e) : e;
		return t.protocol === yi.protocol && t.host === yi.host
	}

	function Rn() {
		this.$get = m(e)
	}

	function Hn(e) {
		function t(r, i) {
			if (b(r)) {
				var a = {};
				o(r, function(e, n) {
					a[n] = t(n, e)
				});
				return a;
			}
			return e.factory(r + n, i)
		}
		var n = "Filter";
		this.register = t;
		this.$get = ["$injector",
			function(e) {
				return function(t) {
					return e.get(t + n)
				}
			}
		];
		t("currency", Un);
		t("date", Yn);
		t("filter", Bn);
		t("json", Zn);
		t("limitTo", er);
		t("lowercase", xi);
		t("number", Wn);
		t("orderBy", tr);
		t("uppercase", Ti);
	}

	function Bn() {
		return function(e, t, n) {
			if (!x(e)) {
				return e;
			}
			var r = typeof n,
				i = [];
			i.check = function(e) {
				for (var t = 0; t < i.length; t++)
					if (!i[t](e)) {
						return false;
					}
				return true
			}, "function" !== r && (n = "boolean" === r && n ? function(e, t) {
				return Ar.equals(e, t)
			} : function(e, t) {
				if (e && t && "object" == typeof e && "object" == typeof t) {
					for (var r in e)
						if ("$" !== r.charAt(0) && hr.call(e, r) && n(e[r], t[r])) {
							return true;
						}
					return false
				}
				t = ("" + t).toLowerCase();
				return ("" + e).toLowerCase().indexOf(t) > -1;
			});
			var o = function(e, t) {
				if ("string" == typeof t && "!" === t.charAt(0)) {
					return !o(e, t.substr(1));
				}
				switch (typeof e) {
					case "boolean":
					case "number":
					case "string":
						return n(e, t);
					case "object":
						switch (typeof t) {
							case "object":
								return n(e, t);
							default:
								for (var r in e)
									if ("$" !== r.charAt(0) && o(e[r], t)) {
										return true;
									}
						}
						return false;
					case "array":
						for (var i = 0; i < e.length; i++)
							if (o(e[i], t)) {
								return true;
							}
						return false;
					default:
						return false
				}
			};
			switch (typeof t) {
				case "boolean":
				case "number":
				case "string":
					t = {
						$: t
					};
				case "object":
					for (var a in t)! function(e) {
						if ("undefined" != typeof t[e]) {
							i.push(function(n) {
								return o(e == "$" ? n : n && n[e], t[e])
							});
						}
					}(a);
					break;
				case "function":
					i.push(t);
					break;
				default:
					return e
			}
			for (var s = [], c = 0; c < e.length; c++) {
				var l = e[c];
				if (i.check(l)) {
					s.push(l);
				}
			}
			return s
		}
	}

	function Un(e) {
		var t = e.NUMBER_FORMATS;
		return function(e, n) {
			if (v(n)) {
				(n = t.CURRENCY_SYM)
			}
			return Vn(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, 2).replace(/\u00A4/g, n);
		}
	}

	function Wn(e) {
		var t = e.NUMBER_FORMATS;
		return function(e, n) {
			return Vn(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
		}
	}

	function Vn(e, t, n, r, i) {
		if (e == null || !isFinite(e) || b(e)) {
			return "";
		}
		var o = 0 > e;
		e = Math.abs(e);
		var a = e + "",
			s = "",
			c = [],
			l = false;
		if (-1 !== a.indexOf("e")) {
			var u = a.match(/([\d\.]+)e(-?)(\d+)/);
			if (u && "-" == u[2] && u[3] > i + 1) {
				a = "0";
			} else {
				s = a;
				l = true;
			}
		}
		if (l)
			if (i > 0 && e > -1 && 1 > e) {
				(s = e.toFixed(i));
			} else {
				var f = (a.split(bi)[1] || "").length;
				if (v(i)) {
					(i = Math.min(Math.max(t.minFrac, f), t.maxFrac));
				}
				var d = Math.pow(10, i);
				e = Math.round(e * d) / d;
				var p = ("" + e).split(bi),
					h = p[0];
				p = p[1] || "";
				var g, m = 0,
					y = t.lgSize,
					$ = t.gSize;
				if (h.length >= y + $) {
					m = h.length - y;
					for (g = 0; m > g; g++) {
						if ((m - g) % $ === 0 && 0 !== g)
							s += n;
						s += h.charAt(g);
					}
				}
				for (g = m; g < h.length; g++) {
					if ((h.length - g) % y === 0 && 0 !== g)
						s += n;
					s += h.charAt(g);
				}
				for (; p.length < i;)
					p += "0";
				if (i && "0" !== i) {
					s += r + p.substr(0, i);
				}
			}
		c.push(o ? t.negPre : t.posPre);
		c.push(s);
		c.push(o ? t.negSuf : t.posSuf);
		return c.join("");
	}

	function Jn(e, t, n) {
		var r = "";
		for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t;) e = "0" + e;
		if (n) {
			(e = e.substr(e.length - t))
		}
		return r + e;
	}

	function Xn(e, t, n, r) {
		n = n || 0;
		return function(i) {
			var o = i["get" + e]();
			if (n > 0 || o > -n)
				o += n;
			if (0 === o && n == -12) {
				o = 12;
			}
			return Jn(o, t, r)
		};
	}

	function Gn(e, t) {
		return function(n, r) {
			var i = n["get" + e](),
				o = gr(t ? "SHORT" + e : e);
			return r[o][i]
		}
	}

	function Kn(e) {
		var t = -1 * e.getTimezoneOffset(),
			n = t >= 0 ? "+" : "";
		return n += Jn(Math[t > 0 ? "floor" : "ceil"](t / 60), 2) + Jn(Math.abs(t % 60), 2)
	}

	function Qn(e, t) {
		if (e.getHours() < 12) {
			return t.AMPMS[0];
		} else {
			return t.AMPMS[1];
		}
	}

	function Yn(e) {
		function t(e) {
			var t;
			if (t = e.match(n)) {
				var r = new Date(0),
					i = 0,
					o = 0,
					a = t[8] ? r.setUTCFullYear : r.setFullYear,
					s = t[8] ? r.setUTCHours : r.setHours;
				t[9] && (i = d(t[9] + t[10]), o = d(t[9] + t[11])), a.call(r, d(t[1]), d(t[2]) - 1, d(t[3]));
				var c = d(t[4] || 0) - i,
					l = d(t[5] || 0) - o,
					u = d(t[6] || 0),
					f = Math.round(1e3 * parseFloat("0." + (t[7] || 0)));
				s.call(r, c, l, u, f);
				return r;
			}
			return e
		}
		var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
		return function(n, r) {
			var i, a, s = "",
				c = [];
			r = r || "mediumDate";
			r = e.DATETIME_FORMATS[r] || r;
			if ($(n)) {
				if (ki.test(n)) {
					n = d(n);
				} else {
					n = t(n);
				}
			}
			if (w(n)) {
				(n = new Date(n))
			}
			if (!k(n)) {
				return n;
			}
			for (; r;) a = wi.exec(r), a ? (c = F(c, a, 1), r = c.pop()) : (c.push(r), r = null);
			o(c, function(t) {
				i = $i[t];
				s += i ? i(n, e.DATETIME_FORMATS) : t.replace(/(^'|'$)/g, "").replace(/''/g, "'");
			});
			return s;
		}
	}

	function Zn() {
		return function(e) {
			return B(e, true)
		}
	}

	function er() {
		return function(e, t) {
			if (!x(e) && !$(e)) {
				return e;
			}
			if (t = d(t), $(e)) {
				if (t) {
					if (t >= 0) {
						return e.slice(0, t);
					} else {
						return e.slice(t, e.length);
					}
				} else {
					return "";
				}
			}
			var n, r, i = [];
			if (t > e.length) {
				t = e.length;
			} else if (t < -e.length) {
				t = -e.length;
			}
			for (t > 0 ? (n = 0, r = t) : (n = e.length + t, r = e.length); r > n; n++) {
				i.push(e[n]);
			}
			return i
		}
	}

	function tr(e) {
		return function(t, n, r) {
			function i(e, t) {
				for (var r = 0; r < n.length; r++) {
					var i = n[r](e, t);
					if (0 !== i) {
						return i;
					}
				}
				return 0
			}

			function o(e, t) {
				if (W(t)) {
					return function(t, n) {
						return e(n, t)
					};
				} else {
					return e;
				}
			}

			function a(e, t) {
				var n = typeof e,
					r = typeof t;
				if (r == n) {
					return (n == "string" && (e = e.toLowerCase(), t = t.toLowerCase()), e === t ? 0 : t > e ? -1 : 1);
				} else if (r > n) {
					return -1;
				} else {
					return 1;
				}
			}
			if (!x(t)) {
				return t;
			}
			if (!n) {
				return t;
			}
			n = x(n) ? n : [n], n = _(n, function(t) {
				var n = false,
					r = t || g;
				if ($(t) && (("+" == t.charAt(0) || "-" == t.charAt(0)) && (n = "-" == t.charAt(0), t = t.substring(1)), r = e(t), r.constant)) {
					var i = r();
					return o(function(e, t) {
						return a(e[i], t[i])
					}, n)
				}
				return o(function(e, t) {
					return a(r(e), r(t))
				}, n)
			});
			for (var s = [], c = 0; c < t.length; c++) {
				s.push(t[c]);
			}
			return s.sort(o(i, r))
		}
	}

	function nr(e) {
		if (T(e)) {
			(e = {
				link: e
			})
		}
		e.restrict = e.restrict || "AC";
		return m(e);
	}

	function rr(e, t, n, r) {
		function i(t, n) {
			if (n) {
				n = "-" + et(n, "-");
			} else {
				n = "";
			}
			r.removeClass(e, (t ? Li : Di) + n);
			r.addClass(e, (t ? Di : Li) + n);
		}
		var a = this,
			s = e.parent().controller("form") || Ai,
			c = 0,
			l = a.$error = {},
			u = [];
		a.$name = t.name || t.ngForm;
		a.$dirty = false;
		a.$pristine = true;
		a.$valid = true;
		a.$invalid = false;
		s.$addControl(a);
		e.addClass(Pi);
		i(true);
		a.$addControl = function(e) {
			it(e.$name, "input");
			u.push(e);
			if (e.$name) {
				a[e.$name] = e;
			}
		};
		a.$removeControl = function(e) {
			if (e.$name && a[e.$name] === e) {
				delete a[e.$name];
			}
			o(l, function(t, n) {
				a.$setValidity(n, true, e)
			});
			O(u, e);
		};
		a.$setValidity = function(e, t, n) {
			var r = l[e];
			if (t && r) {
				O(r, n);
				if (!r.length) {
					c--;
					if (!(c)) {
						i(t);
						a.$valid = true;
						a.$invalid = false;
					}
					l[e] = false;
					i(true, e);
					s.$setValidity(e, true, a);
				}
			} else {
				if (c || i(t), r) {
					if (q(r, n)) {
						return;
					}
				} else {
					l[e] = r = [];
					c++;
					i(false, e);
					s.$setValidity(e, false, a);
				}
				r.push(n);
				a.$valid = false;
				a.$invalid = true;
			}
		};
		a.$setDirty = function() {
			r.removeClass(e, Pi);
			r.addClass(e, Fi);
			a.$dirty = true;
			a.$pristine = false;
			s.$setDirty();
		};
		a.$setPristine = function() {
			r.removeClass(e, Fi);
			r.addClass(e, Pi);
			a.$dirty = false;
			a.$pristine = true;
			o(u, function(e) {
				e.$setPristine()
			});
		};
	}

	function ir(e, t, r, i) {
		e.$setValidity(t, r);
		if (r) {
			return i;
		} else {
			return n;
		}
	}

	function or(e, t, n) {
		var r = n.prop("validity");
		if (b(r)) {
			var i = function(n) {
				if (e.$error[t] || !(r.badInput || r.customError || r.typeMismatch) || r.valueMissing) {
					return n;
				} else {
					return void e.$setValidity(t, false);
				}
			};
			e.$parsers.push(i)
		}
	}

	function ar(e, t, n, i, o, a) {
		var s = t.prop("validity");
		if (!o.android) {
			var c = false;
			t.on("compositionstart", function() {
				c = true;
			});
			t.on("compositionend", function() {
				c = false;
				l();
			})
		}
		var l = function() {
			if (!c) {
				var r = t.val();
				W(n.ngTrim || "T") && (r = Nr(r)), (i.$viewValue !== r || s && "" === r && !s.valueMissing) && (e.$$phase ? i.$setViewValue(r) : e.$apply(function() {
					i.$setViewValue(r)
				}))
			}
		};
		if (o.hasEvent("input")) t.on("input", l);
		else {
			var u, f = function() {
				if (!(u)) {
					(u = a.defer(function() {
						l();
						u = null;
					}))
				}
			};
			t.on("keydown", function(e) {
				var t = e.keyCode;
				if (!(91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t)) {
					f()
				}
			}), o.hasEvent("paste") && t.on("paste cut", f)
		}
		t.on("change", l), i.$render = function() {
			t.val(i.$isEmpty(i.$viewValue) ? "" : i.$viewValue)
		};
		var p, h, g = n.ngPattern;
		if (g) {
			var m = function(e, t) {
				return ir(i, "pattern", i.$isEmpty(t) || e.test(t), t)
			};
			h = g.match(/^\/(.*)\/([gim]*)$/);
			if (h) {
				g = new RegExp(h[1], h[2]);
				p = function(e) {
					return m(g, e)
				};
			} else {
				p = function(n) {
					var i = e.$eval(g);
					if (!i || !i.test) {
						throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", g, i, V(t));
					}
					return m(i, n)
				};
			}
			i.$formatters.push(p);
			i.$parsers.push(p);
		}
		if (n.ngMinlength) {
			var v = d(n.ngMinlength),
				y = function(e) {
					return ir(i, "minlength", i.$isEmpty(e) || e.length >= v, e)
				};
			i.$parsers.push(y);
			i.$formatters.push(y);
		}
		if (n.ngMaxlength) {
			var b = d(n.ngMaxlength),
				$ = function(e) {
					return ir(i, "maxlength", i.$isEmpty(e) || e.length <= b, e)
				};
			i.$parsers.push($), i.$formatters.push($)
		}
	}

	function sr(e, t, r, i, o, a) {
		ar(e, t, r, i, o, a);
		i.$parsers.push(function(e) {
			var t = i.$isEmpty(e);
			if (t || Mi.test(e)) {
				return (i.$setValidity("number", true), "" === e ? null : t ? e : parseFloat(e));
			} else {
				return (i.$setValidity("number", false), n);
			}
		});
		or(i, "number", t);
		i.$formatters.push(function(e) {
			if (i.$isEmpty(e)) {
				return "";
			} else {
				return "" + e;
			}
		});
		if (r.min) {
			var s = function(e) {
				var t = parseFloat(r.min);
				return ir(i, "min", i.$isEmpty(e) || e >= t, e)
			};
			i.$parsers.push(s), i.$formatters.push(s)
		}
		if (r.max) {
			var c = function(e) {
				var t = parseFloat(r.max);
				return ir(i, "max", i.$isEmpty(e) || t >= e, e)
			};
			i.$parsers.push(c), i.$formatters.push(c)
		}
		i.$formatters.push(function(e) {
			return ir(i, "number", i.$isEmpty(e) || w(e), e)
		})
	}

	function cr(e, t, n, r, i, o) {
		ar(e, t, n, r, i, o);
		var a = function(e) {
			return ir(r, "url", r.$isEmpty(e) || _i.test(e), e)
		};
		r.$formatters.push(a), r.$parsers.push(a)
	}

	function lr(e, t, n, r, i, o) {
		ar(e, t, n, r, i, o);
		var a = function(e) {
			return ir(r, "email", r.$isEmpty(e) || qi.test(e), e)
		};
		r.$formatters.push(a), r.$parsers.push(a)
	}

	function ur(e, t, n, r) {
		if (v(n.name)) {
			t.attr("name", l());
		}
		t.on("click", function() {
			if (t[0].checked) {
				e.$apply(function() {
					r.$setViewValue(n.value)
				});
			}
		});
		r.$render = function() {
			var e = n.value;
			t[0].checked = e == r.$viewValue
		};
		n.$observe("value", r.$render);
	}

	function fr(e, t, n, r) {
		var i = n.ngTrueValue,
			o = n.ngFalseValue;
		if (!($(i))) {
			i = true;
		}
		if (!($(o))) {
			o = false;
		}
		t.on("click", function() {
			e.$apply(function() {
				r.$setViewValue(t[0].checked)
			})
		});
		r.$render = function() {
			t[0].checked = r.$viewValue
		};
		r.$isEmpty = function(e) {
			return e !== i
		};
		r.$formatters.push(function(e) {
			return e === i
		});
		r.$parsers.push(function(e) {
			if (e) {
				return i;
			} else {
				return o;
			}
		});
	}

	function dr(e, t) {
		e = "ngClass" + e;
		return ["$animate",
			function(n) {
				function r(e, t) {
					var n = [];
					e: for (var r = 0; r < e.length; r++) {
						for (var i = e[r], o = 0; o < t.length; o++)
							if (i == t[o]) continue e;
						n.push(i)
					}
					return n
				}

				function i(e) {
					if (x(e)) {
						return e;
					}
					if ($(e)) {
						return e.split(" ");
					}
					if (b(e)) {
						var t = [];
						o(e, function(e, n) {
							if (e) {
								t.push(n);
							}
						});
						return t;
					}
					return e
				}
				return {
					restrict: "AC",
					link: function(a, s, c) {
						function l(e) {
							var t = f(e, 1);
							c.$addClass(t)
						}

						function u(e) {
							var t = f(e, -1);
							c.$removeClass(t)
						}

						function f(e, t) {
							var n = s.data("$classCounts") || {},
								r = [];
							o(e, function(e) {
								if ((t > 0 || n[e])) {
									n[e] = (n[e] || 0) + t;
									if (n[e] === +(t > 0)) {
										r.push(e)
									}
								}
							});
							s.data("$classCounts", n);
							return r.join(" ");
						}

						function d(e, t) {
							var i = r(t, e),
								o = r(e, t);
							o = f(o, -1);
							i = f(i, 1);
							if (0 === i.length) {
								n.removeClass(s, o);
							} else {
								if (0 === o.length) {
									n.addClass(s, i);
								} else {
									n.setClass(s, i, o);
								}
							}
						}

						function p(e) {
							if (t === true || a.$index % 2 === t) {
								var n = i(e || []);
								if (h) {
									if (!L(e, h)) {
										var r = i(h);
										d(r, n)
									}
								} else {
									l(n);
								}
							}
							h = I(e)
						}
						var h;
						a.$watch(c[e], p, true);
						c.$observe("class", function() {
							p(a.$eval(c[e]))
						});
						if ("ngClass" !== e) {
							a.$watch("$index", function(n, r) {
								var o = 1 & n;
								if (o !== r & 1) {
									var s = i(a.$eval(c[e]));
									if (o === t) {
										l(s);
									} else {
										u(s);
									}
								}
							});
						}
					}
				}
			}
		];
	}
	var pr = function(e) {
			if ($(e)) {
				return e.toLowerCase();
			} else {
				return e;
			}
		},
		hr = Object.prototype.hasOwnProperty,
		gr = function(e) {
			if ($(e)) {
				return e.toUpperCase();
			} else {
				return e;
			}
		},
		mr = function(e) {
			if ($(e)) {
				return e.replace(/[A-Z]/g, function(e) {
					return String.fromCharCode(32 | e.charCodeAt(0))
				});
			} else {
				return e;
			}
		},
		vr = function(e) {
			if ($(e)) {
				return e.replace(/[a-z]/g, function(e) {
					return String.fromCharCode(-33 & e.charCodeAt(0))
				});
			} else {
				return e;
			}
		};
	if ("i" !== "I".toLowerCase()) {
		pr = mr;
		gr = vr;
	}
	var yr, br, $r, wr, kr, xr = [].slice,
		Tr = [].push,
		Cr = Object.prototype.toString,
		Sr = r("ng"),
		Ar = (e.angular, e.angular || (e.angular = {})),
		Er = ["0", "0", "0"];
	yr = d((/msie (\d+)/.exec(pr(navigator.userAgent)) || [])[1]);
	if (isNaN(yr)) {
		(yr = d((/trident\/.*; rv:(\d+)/.exec(pr(navigator.userAgent)) || [])[1]));
	}
	h.$inject = [];
	g.$inject = [];
	var Nr = function() {
		if (String.prototype.trim) {
			return function(e) {
				if ($(e)) {
					return e.trim();
				} else {
					return e;
				}
			};
		} else {
			return function(e) {
				if ($(e)) {
					return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
				} else {
					return e;
				}
			};
		}
	}();
	if (9 > yr) {
		kr = function(e) {
			if (e.nodeName) {
				e = e;
			} else {
				e = e[0];
			}
			if (e.scopeName && "HTML" != e.scopeName) {
				return gr(e.scopeName + ":" + e.nodeName);
			} else {
				return e.nodeName;
			}
		};
	} else {
		kr = function(e) {
			if (e.nodeName) {
				return e.nodeName;
			} else {
				return e[0].nodeName;
			}
		};
	}
	var jr = /[A-Z]/g,
		_r = {
			full: "1.2.16",
			major: 1,
			minor: 2,
			dot: 16,
			codeName: "badger-enumeration"
		},
		qr = gt.cache = {},
		Mr = gt.expando = "ng-" + (new Date).getTime(),
		Or = 1,
		Ir = e.document.addEventListener ? function(e, t, n) {
			e.addEventListener(t, n, false)
		} : function(e, t, n) {
			e.attachEvent("on" + t, n)
		},
		Dr = e.document.removeEventListener ? function(e, t, n) {
			e.removeEventListener(t, n, false)
		} : function(e, t, n) {
			e.detachEvent("on" + t, n)
		},
		Lr = (gt._data = function(e) {
			return this.cache[e[this.expando]] || {}
		}, /([\:\-\_]+(.))/g),
		Pr = /^moz([A-Z])/,
		Fr = r("jqLite"),
		zr = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		Rr = /<|&#?\w+;/,
		Hr = /<([\w:]+)/,
		Br = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Ur = {
			option: [1, '<select multiple="multiple">', "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	Ur.optgroup = Ur.option;
	Ur.tbody = Ur.tfoot = Ur.colgroup = Ur.caption = Ur.thead;
	Ur.th = Ur.td;
	var Wr = gt.prototype = {
			ready: function(n) {
				function r() {
					if (!(i)) {
						i = true;
						n();
					}
				}
				var i = false;
				if ("complete" === t.readyState) {
					setTimeout(r);
				} else {
					this.on("DOMContentLoaded", r);
					gt(e).on("load", r);
				}
			},
			toString: function() {
				var e = [];
				o(this, function(t) {
					e.push("" + t)
				});
				return "[" + e.join(", ") + "]";
			},
			eq: function(e) {
				return br(e >= 0 ? this[e] : this[this.length + e])
			},
			length: 0,
			push: Tr,
			sort: [].sort,
			splice: [].splice
		},
		Vr = {};
	o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(e) {
		Vr[pr(e)] = e
	});
	var Jr = {};
	o("input,select,option,textarea,button,form,details".split(","), function(e) {
		Jr[gr(e)] = true
	});
	o({
		data: wt,
		inheritedData: At,
		scope: function(e) {
			return br(e).data("$scope") || At(e.parentNode || e, ["$isolateScope", "$scope"])
		},
		isolateScope: function(e) {
			return br(e).data("$isolateScope") || br(e).data("$isolateScopeNoTemplate")
		},
		controller: St,
		injector: function(e) {
			return At(e, "$injector")
		},
		removeAttr: function(e, t) {
			e.removeAttribute(t)
		},
		hasClass: kt,
		css: function(e, t, r) {
			if (t = ut(t), !y(r)) {
				var i;
				if (8 >= yr) {
					i = e.currentStyle && e.currentStyle[t];
					if ("" === i) {
						(i = "auto"); 
					}
				}
				i = i || e.style[t];
				if (8 >= yr) {
					if ("" === i) {
						i = n;
					} else {
						i = i;
					}
				}
				return i;
			}
			e.style[t] = r
		},
		attr: function(e, t, r) {
			var i = pr(t);
			if (Vr[i]) {
				if (!y(r)) {
					if (e[t] || (e.attributes.getNamedItem(t) || h).specified) {
						return i;
					} else {
						return n;
					}
				}
				if (r) {
					e[t] = true;
					e.setAttribute(t, i);
				} else {
					e[t] = false;
					e.removeAttribute(i);
				}
			} else if (y(r)) e.setAttribute(t, r);
			else if (e.getAttribute) {
				var o = e.getAttribute(t, 2);
				if (null === o) {
					return n;
				} else {
					return o;
				}
			}
		},
		prop: function(e, t, n) {
			if (y(n)) {
				return void(e[t] = n);
			} else {
				return e[t];
			}
		},
		text: function() {
			function e(e, n) {
				var r = t[e.nodeType];
				if (v(n)) {
					if (r) {
						return e[r];
					} else {
						return "";
					}
				} else {
					return void(e[r] = n);
				}
			}
			var t = [];
			if (9 > yr) {
				t[1] = "innerText";
				t[3] = "nodeValue";
			} else {
				t[1] = t[3] = "textContent";
			}
			e.$dv = "";
			return e;
		}(),
		val: function(e, t) {
			if (v(t)) {
				if ("SELECT" === kr(e) && e.multiple) {
					var n = [];
					o(e.options, function(e) {
						if (e.selected) {
							n.push(e.value || e.text);
						}
					});
					if (0 === n.length) {
						return null;
					} else {
						return n;
					}
				}
				return e.value
			}
			e.value = t
		},
		html: function(e, t) {
			if (v(t)) {
				return e.innerHTML;
			}
			for (var n = 0, r = e.childNodes; n < r.length; n++) {
				vt(r[n]);
			}
			e.innerHTML = t
		},
		empty: Et
	}, function(e, t) {
		gt.prototype[t] = function(t, r) {
			var i, o;
			if (e !== Et && (2 == e.length && e !== kt && e !== St ? t : r) === n) {
				if (b(t)) {
					for (i = 0; i < this.length; i++)
						if (e === wt) e(this[i], t);
						else {
							for (o in t) {
								e(this[i], o, t[o]);
							}
						}
					return this
				}
				for (var a = e.$dv, s = a === n ? Math.min(this.length, 1) : this.length, c = 0; s > c; c++) {
					var l = e(this[c], t, r);
					if (a) {
						a = a + l;
					} else {
						a = l;
					}
				}
				return a
			}
			for (i = 0; i < this.length; i++) {
				e(this[i], t, r);
			}
			return this
		}
	});
	o({
		removeData: bt,
		dealoc: vt,
		on: function xo(e, n, r, i) {
			if (y(i)) {
				throw Fr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
			}
			var a = $t(e, "events"),
				s = $t(e, "handle");
			if (!(a)) {
				$t(e, "events", a = {});
			}
			if (!(s)) {
				$t(e, "handle", s = jt(e, a));
			}
			o(n.split(" "), function(n) {
				var i = a[n];
				if (!i) {
					if (n == "mouseenter" || n == "mouseleave") {
						var o = t.body.contains || t.body.compareDocumentPosition ? function(e, t) {
							var n = 9 === e.nodeType ? e.documentElement : e,
								r = t && t.parentNode;
							return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
						} : function(e, t) {
							if (t)
								for (; t = t.parentNode;)
									if (t === e) {
										return true;
									}
							return false
						};
						a[n] = [];
						var c = {
							mouseleave: "mouseout",
							mouseenter: "mouseover"
						};
						xo(e, c[n], function(e) {
							var t = this,
								r = e.relatedTarget;
							if ((!r || r !== t && !o(t, r))) {
								s(e, n);
							}
						})
					} else {
						Ir(e, n, s);
						a[n] = [];
					}
					i = a[n]
				}
				i.push(r)
			});
		},
		off: yt,
		one: function(e, t, n) {
			e = br(e);
			e.on(t, function r() {
				e.off(t, n);
				e.off(t, r);
			});
			e.on(t, n);
		},
		replaceWith: function(e, t) {
			var n, r = e.parentNode;
			vt(e), o(new gt(t), function(t) {
				if (n) {
					r.insertBefore(t, n.nextSibling);
				} else {
					r.replaceChild(t, e);
				}
				n = t;
			})
		},
		children: function(e) {
			var t = [];
			o(e.childNodes, function(e) {
				if (1 === e.nodeType) {
					t.push(e);
				}
			});
			return t;
		},
		contents: function(e) {
			return e.contentDocument || e.childNodes || []
		},
		append: function(e, t) {
			o(new gt(t), function(t) {
				if ((1 === e.nodeType || 11 === e.nodeType)) {
					e.appendChild(t);
				}
			})
		},
		prepend: function(e, t) {
			if (1 === e.nodeType) {
				var n = e.firstChild;
				o(new gt(t), function(t) {
					e.insertBefore(t, n)
				})
			}
		},
		wrap: function(e, t) {
			t = br(t)[0];
			var n = e.parentNode;
			n && n.replaceChild(t, e), t.appendChild(e)
		},
		remove: function(e) {
			vt(e);
			var t = e.parentNode;
			if (t) {
				t.removeChild(e);
			}
		},
		after: function(e, t) {
			var n = e,
				r = e.parentNode;
			o(new gt(t), function(e) {
				r.insertBefore(e, n.nextSibling);
				n = e;
			})
		},
		addClass: Tt,
		removeClass: xt,
		toggleClass: function(e, t, n) {
			if (t) {
				o(t.split(" "), function(t) {
					var r = n;
					v(r) && (r = !kt(e, t)), (r ? Tt : xt)(e, t)
				});
			}
		},
		parent: function(e) {
			var t = e.parentNode;
			if (t && 11 !== t.nodeType) {
				return t;
			} else {
				return null;
			}
		},
		next: function(e) {
			if (e.nextElementSibling) {
				return e.nextElementSibling;
			}
			for (var t = e.nextSibling; null != t && 1 !== t.nodeType;) t = t.nextSibling;
			return t
		},
		find: function(e, t) {
			if (e.getElementsByTagName) {
				return e.getElementsByTagName(t);
			} else {
				return [];
			}
		},
		clone: mt,
		triggerHandler: function(e, t, n) {
			var r = ($t(e, "events") || {})[t];
			n = n || [];
			var i = [{
				preventDefault: h,
				stopPropagation: h
			}];
			o(r, function(t) {
				t.apply(e, i.concat(n))
			})
		}
	}, function(e, t) {
		gt.prototype[t] = function(t, n, r) {
			for (var i, o = 0; o < this.length; o++)
				if (v(i)) {
					i = e(this[o], t, n, r);
					if (y(i)) {
						(i = br(i)); 
					}
				} else {
					Ct(i, e(this[o], t, n, r));
				}
			if (y(i)) {
				return i;
			} else {
				return this;
			}
		};
		gt.prototype.bind = gt.prototype.on;
		gt.prototype.unbind = gt.prototype.off;
	});
	qt.prototype = {
		put: function(e, t) {
			this[_t(e)] = t
		},
		get: function(e) {
			return this[_t(e)]
		},
		remove: function(e) {
			var t = this[e = _t(e)];
			delete this[e];
			return t;
		}
	};
	var Xr = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
		Gr = /,/,
		Kr = /^\s*(_?)(\S+?)\1\s*$/,
		Qr = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
		Yr = r("$injector"),
		Zr = r("$animate"),
		ei = ["$provide",
			function(e) {
				this.$$selectors = {};
				this.register = function(t, n) {
					var r = t + "-animation";
					if (t && "." != t.charAt(0)) {
						throw Zr("notcsel", "Expecting class selector starting with '.' got '{0}'.", t);
					}
					this.$$selectors[t.substr(1)] = r, e.factory(r, n)
				};
				this.classNameFilter = function(e) {
					if (1 === arguments.length) {
						if (e instanceof RegExp) {
							this.$$classNameFilter = e;
						} else {
							this.$$classNameFilter = null;
						}
					}
					return this.$$classNameFilter;
				};
				this.$get = ["$timeout", "$$asyncCallback",
					function(e, t) {
						function n(e) {
							if (e) {
								t(e);
							}
						}
						return {
							enter: function(e, t, r, i) {
								if (r) {
									r.after(e);
								} else {
									if (!(t && t[0])) {
										(t = r.parent()); 
									}
									t.append(e);
								}
								n(i);
							},
							leave: function(e, t) {
								e.remove();
								n(t);
							},
							move: function(e, t, n, r) {
								this.enter(e, t, n, r)
							},
							addClass: function(e, t, r) {
								if ($(t)) {
									t = t;
								} else if (x(t)) {
									t = t.join(" ");
								} else {
									t = "";
								}
								o(e, function(e) {
									Tt(e, t)
								});
								n(r);
							},
							removeClass: function(e, t, r) {
								if ($(t)) {
									t = t;
								} else if (x(t)) {
									t = t.join(" ");
								} else {
									t = "";
								}
								o(e, function(e) {
									xt(e, t)
								});
								n(r);
							},
							setClass: function(e, t, r, i) {
								o(e, function(e) {
									Tt(e, t);
									xt(e, r);
								});
								n(i);
							},
							enabled: h
						}
					}
				];
			}
		],
		ti = r("$compile");
	Rt.$inject = ["$provide", "$$sanitizeUriProvider"];
	var ni = /^(x[\:\-_]|data[\:\-_])/i,
		ri = r("$interpolate"),
		ii = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
		oi = {
			http: 80,
			https: 443,
			ftp: 21
		},
		ai = r("$location");
	hn.prototype = pn.prototype = dn.prototype = {
		$$html5: false,
		$$replace: false,
		absUrl: gn("$$absUrl"),
		url: function(e, t) {
			if (v(e)) {
				return this.$$url;
			}
			var n = ii.exec(e);
			if (n[1]) {
				this.path(decodeURIComponent(n[1]))
			}
			if ((n[2] || n[1])) {
				this.search(n[3] || "")
			}
			this.hash(n[5] || "", t);
			return this;
		},
		protocol: gn("$$protocol"),
		host: gn("$$host"),
		port: gn("$$port"),
		path: mn("$$path", function(e) {
			if ("/" == e.charAt(0)) {
				return e;
			} else {
				return "/" + e;
			}
		}),
		search: function(e, t) {
			switch (arguments.length) {
				case 0:
					return this.$$search;
				case 1:
					if ($(e)) this.$$search = X(e);
					else {
						if (!b(e)) {
							throw ai("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
						}
						this.$$search = e
					}
					break;
				default:
					if (v(t) || null === t) {
						delete this.$$search[e];
					} else {
						this.$$search[e] = t;
					}
			}
			this.$$compose();
			return this;
		},
		hash: mn("$$hash", g),
		replace: function() {
			this.$$replace = true;
			return this;
		}
	};
	var si, ci = r("$parse"),
		li = {},
		ui = {
			"null": function() {
				return null
			},
			"true": function() {
				return true
			},
			"false": function() {
				return false
			},
			undefined: h,
			"+": function(e, t, r, i) {
				r = r(e, t);
				i = i(e, t);
				if (y(r)) {
					if (y(i)) {
						return r + i;
					} else {
						return r;
					}
				} else if (y(i)) {
					return i;
				} else {
					return n;
				}
			},
			"-": function(e, t, n, r) {
				n = n(e, t);
				r = r(e, t);
				return (y(n) ? n : 0) - (y(r) ? r : 0);
			},
			"*": function(e, t, n, r) {
				return n(e, t) * r(e, t)
			},
			"/": function(e, t, n, r) {
				return n(e, t) / r(e, t)
			},
			"%": function(e, t, n, r) {
				return n(e, t) % r(e, t)
			},
			"^": function(e, t, n, r) {
				return n(e, t) ^ r(e, t)
			},
			"=": h,
			"===": function(e, t, n, r) {
				return n(e, t) === r(e, t)
			},
			"!==": function(e, t, n, r) {
				return n(e, t) !== r(e, t)
			},
			"==": function(e, t, n, r) {
				return n(e, t) == r(e, t)
			},
			"!=": function(e, t, n, r) {
				return n(e, t) != r(e, t)
			},
			"<": function(e, t, n, r) {
				return n(e, t) < r(e, t)
			},
			">": function(e, t, n, r) {
				return n(e, t) > r(e, t)
			},
			"<=": function(e, t, n, r) {
				return n(e, t) <= r(e, t)
			},
			">=": function(e, t, n, r) {
				return n(e, t) >= r(e, t)
			},
			"&&": function(e, t, n, r) {
				return n(e, t) && r(e, t)
			},
			"||": function(e, t, n, r) {
				return n(e, t) || r(e, t)
			},
			"&": function(e, t, n, r) {
				return n(e, t) & r(e, t)
			},
			"|": function(e, t, n, r) {
				return r(e, t)(e, t, n(e, t))
			},
			"!": function(e, t, n) {
				return !n(e, t)
			}
		},
		fi = {
			n: "\n",
			f: "\f",
			r: "\r",
			t: "	",
			v: "",
			"'": "'",
			'"': '"'
		},
		di = function(e) {
			this.options = e
		};
	di.prototype = {
		constructor: di,
		lex: function(e) {
			this.text = e;
			this.index = 0;
			this.ch = n;
			this.lastCh = ":";
			this.tokens = [];
			for (var t, r = []; this.index < this.text.length;) {
				if (this.ch = this.text.charAt(this.index), this.is("\"'")) {
					this.readString(this.ch);
				} else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) {
					this.readNumber();
				} else if (this.isIdent(this.ch)) {
					this.readIdent();
					if (this.was("{,") && "{" === r[0] && (t = this.tokens[this.tokens.length - 1])) {
						(t.json = -1 === t.text.indexOf(".")); 
					}
				} else if (this.is("(){}[].,;:?")) {
					this.tokens.push({
						index: this.index,
						text: this.ch,
						json: this.was(":[,") && this.is("{[") || this.is("}]:,")
					});
					if (this.is("{[")) {
						r.unshift(this.ch);
					}
					if (this.is("}]")) {
						r.shift();
					}
					this.index++;;
				} else {
					if (this.isWhitespace(this.ch)) {
						this.index++;
						continue;
					}
					var i = this.ch + this.peek(),
						o = i + this.peek(2),
						a = ui[this.ch],
						s = ui[i],
						c = ui[o];
					if (c) {
						this.tokens.push({
							index: this.index,
							text: o,
							fn: c
						});
						this.index += 3;
					} else if (s) {
						this.tokens.push({
							index: this.index,
							text: i,
							fn: s
						});
						this.index += 2;
					} else if (a) {
						this.tokens.push({
							index: this.index,
							text: this.ch,
							fn: a,
							json: this.was("[,:") && this.is("+-")
						});
						this.index += 1;
					} else {
						this.throwError("Unexpected next character ", this.index, this.index + 1);
					}
				}
				this.lastCh = this.ch;
			}
			return this.tokens
		},
		is: function(e) {
			return -1 !== e.indexOf(this.ch)
		},
		was: function(e) {
			return -1 !== e.indexOf(this.lastCh)
		},
		peek: function(e) {
			var t = e || 1;
			if (this.index + t < this.text.length) {
				return this.text.charAt(this.index + t);
			} else {
				return false;
			}
		},
		isNumber: function(e) {
			return e >= "0" && "9" >= e
		},
		isWhitespace: function(e) {
			return " " === e || "\r" === e || "	" === e || "\n" === e || "" === e || " " === e
		},
		isIdent: function(e) {
			return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" === e || "$" === e
		},
		isExpOperator: function(e) {
			return "-" === e || "+" === e || this.isNumber(e)
		},
		throwError: function(e, t, n) {
			n = n || this.index;
			var r = y(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
			throw ci("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, r, this.text)
		},
		readNumber: function() {
			for (var e = "", t = this.index; this.index < this.text.length;) {
				var n = pr(this.text.charAt(this.index));
				if (n == "." || this.isNumber(n)) e += n;
				else {
					var r = this.peek();
					if (n == "e" && this.isExpOperator(r)) e += n;
					else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == e.charAt(e.length - 1)) e += n;
					else {
						if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != e.charAt(e.length - 1)) break;
						this.throwError("Invalid exponent")
					}
				}
				this.index++
			}
			e = 1 * e, this.tokens.push({
				index: t,
				text: e,
				json: true,
				fn: function() {
					return e
				}
			})
		},
		readIdent: function() {
			var e, t, n, r, i = this,
				o = "";
			for (var a = this.index; this.index < this.text.length && (r = this.text.charAt(this.index), "." === r || this.isIdent(r) || this.isNumber(r));) {
				if ("." === r) {
					e = this.index;
				}
				o += r;
				this.index++;
			}
			if (e)
				for (t = this.index; t < this.text.length;) {
					if (r = this.text.charAt(t), "(" === r) {
						n = o.substr(e - a + 1);
						o = o.substr(0, e - a);
						this.index = t;
						break
					}
					if (!this.isWhitespace(r)) break;
					t++
				}
			var s = {
				index: a,
				text: o
			};
			if (ui.hasOwnProperty(o)) {
				s.fn = ui[o];
				s.json = ui[o];
			} else {
				var c = Cn(o, this.options, this.text);
				s.fn = f(function(e, t) {
					return c(e, t)
				}, {
					assign: function(e, t) {
						return wn(e, o, t, i.text, i.options)
					}
				})
			}
			this.tokens.push(s), n && (this.tokens.push({
				index: e,
				text: ".",
				json: false
			}), this.tokens.push({
				index: e + 1,
				text: n,
				json: false
			}))
		},
		readString: function(e) {
			var t = this.index;
			this.index++;
			for (var n = "", r = e, i = false; this.index < this.text.length;) {
				var o = this.text.charAt(this.index);
				if (r += o, i) {
					if ("u" === o) {
						var a = this.text.substring(this.index + 1, this.index + 5);
						if (!(a.match(/[\da-f]{4}/i))) {
							this.throwError("Invalid unicode escape [\\u" + a + "]");
						}
						this.index += 4;
						n += String.fromCharCode(parseInt(a, 16));
					} else {
						var s = fi[o];
						n += s ? s : o
					}
					i = false
				} else if ("\\" === o) i = true;
				else {
					if (o === e) {
						this.index++;
						return void this.tokens.push({
							index: t,
							text: r,
							string: n,
							json: true,
							fn: function() {
								return n
							}
						});
					}
					n += o
				}
				this.index++
			}
			this.throwError("Unterminated quote", t)
		}
	};
	var pi = function(e, t, n) {
		this.lexer = e;
		this.$filter = t;
		this.options = n;
	};
	pi.ZERO = f(function() {
		return 0
	}, {
		constant: true
	}), pi.prototype = {
		constructor: pi,
		parse: function(e, t) {
			this.text = e;
			this.json = t;
			this.tokens = this.lexer.lex(e);
			if (t) {
				this.assignment = this.logicalOR;
				this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function() {
					this.throwError("is not valid json", {
						text: e,
						index: 0
					})
				};
			}
			var n = t ? this.primary() : this.statements();
			if (0 !== this.tokens.length) {
				this.throwError("is an unexpected token", this.tokens[0])
			}
			n.literal = !!n.literal;
			n.constant = !!n.constant;
			return n;
		},
		primary: function() {
			var e;
			if (this.expect("(")) e = this.filterChain(), this.consume(")");
			else if (this.expect("[")) e = this.arrayDeclaration();
			else if (this.expect("{")) e = this.object();
			else {
				var t = this.expect();
				e = t.fn;
				if (!(e)) {
					this.throwError("not a primary expression", t);
				}
				if (t.json) {
					e.constant = true;
					e.literal = true;
				}
			}
			for (var n, r; n = this.expect("(", "[", ".");) {
				if (n.text === "(") {
					e = this.functionCall(e, r);
					r = null;
				} else if (n.text === "[") {
					r = e;
					e = this.objectIndex(e);
				} else if (n.text === ".") {
					r = e;
					e = this.fieldAccess(e);
				} else {
					this.throwError("IMPOSSIBLE");
				}
			}
			return e;
		},
		throwError: function(e, t) {
			throw ci("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
		},
		peekToken: function() {
			if (0 === this.tokens.length) {
				throw ci("ueoe", "Unexpected end of expression: {0}", this.text);
			}
			return this.tokens[0]
		},
		peek: function(e, t, n, r) {
			if (this.tokens.length > 0) {
				var i = this.tokens[0],
					o = i.text;
				if (o === e || o === t || o === n || o === r || !e && !t && !n && !r) {
					return i;
				}
			}
			return false;
		},
		expect: function(e, t, n, r) {
			var i = this.peek(e, t, n, r);
			if (i) {
				return (this.json && !i.json && this.throwError("is not valid json", i), this.tokens.shift(), i);
			} else {
				return false;
			}
		},
		consume: function(e) {
			if (!(this.expect(e))) {
				this.throwError("is unexpected, expecting [" + e + "]", this.peek())
			}
		},
		unaryFn: function(e, t) {
			return f(function(n, r) {
				return e(n, r, t)
			}, {
				constant: t.constant
			})
		},
		ternaryFn: function(e, t, n) {
			return f(function(r, i) {
				if (e(r, i)) {
					return t(r, i);
				} else {
					return n(r, i);
				}
			}, {
				constant: e.constant && t.constant && n.constant
			})
		},
		binaryFn: function(e, t, n) {
			return f(function(r, i) {
				return t(r, i, e, n)
			}, {
				constant: e.constant && n.constant
			})
		},
		statements: function() {
			for (var e = [];;)
				if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.filterChain()), !this.expect(";")) {
					if (1 === e.length) {
						return e[0];
					} else {
						return function(t, n) {
							for (var r, i = 0; i < e.length; i++) {
								var o = e[i];
								if (o) {
									(r = o(t, n));
								}
							}
							return r
						};
					}
				}
		},
		filterChain: function() {
			for (var e, t = this.expression();;) {
				if (!(e = this.expect("|"))) {
					return t;
				}
				t = this.binaryFn(t, e.fn, this.filter())
			}
		},
		filter: function() {
			for (var e = this.expect(), t = this.$filter(e.text), n = [];;) {
				if (!(e = this.expect(":"))) {
					var r = function(e, r, i) {
						for (var o = [i], a = 0; a < n.length; a++) {
							o.push(n[a](e, r));
						}
						return t.apply(e, o)
					};
					return function() {
						return r
					}
				}
				n.push(this.expression())
			}
		},
		expression: function() {
			return this.assignment()
		},
		assignment: function() {
			var e, t, n = this.ternary();
			if ((t = this.expect("="))) {
				return (n.assign || this.throwError("implies assignment but [" + this.text.substring(0, t.index) + "] can not be assigned to", t), e = this.ternary(), function(t, r) {
					return n.assign(t, e(t, r), r)
				});
			} else {
				return n;
			}
		},
		ternary: function() {
			var e, t, n = this.logicalOR();
			if ((t = this.expect("?"))) {
				return (e = this.ternary(), (t = this.expect(":")) ? this.ternaryFn(n, e, this.ternary()) : void this.throwError("expected :", t));
			} else {
				return n;
			}
		},
		logicalOR: function() {
			for (var e, t = this.logicalAND();;) {
				if (!(e = this.expect("||"))) {
					return t;
				}
				t = this.binaryFn(t, e.fn, this.logicalAND())
			}
		},
		logicalAND: function() {
			var e, t = this.equality();
			if ((e = this.expect("&&"))) {
				(t = this.binaryFn(t, e.fn, this.logicalAND()))
			}
			return t;
		},
		equality: function() {
			var e, t = this.relational();
			if ((e = this.expect("==", "!=", "===", "!=="))) {
				(t = this.binaryFn(t, e.fn, this.equality()))
			}
			return t;
		},
		relational: function() {
			var e, t = this.additive();
			if ((e = this.expect("<", ">", "<=", ">="))) {
				(t = this.binaryFn(t, e.fn, this.relational()))
			}
			return t;
		},
		additive: function() {
			for (var e, t = this.multiplicative(); e = this.expect("+", "-");) t = this.binaryFn(t, e.fn, this.multiplicative());
			return t
		},
		multiplicative: function() {
			for (var e, t = this.unary(); e = this.expect("*", "/", "%");) t = this.binaryFn(t, e.fn, this.unary());
			return t
		},
		unary: function() {
			var e;
			if (this.expect("+")) {
				return this.primary();
			} else if ((e = this.expect("-"))) {
				return this.binaryFn(pi.ZERO, e.fn, this.unary());
			} else if ((e = this.expect("!"))) {
				return this.unaryFn(e.fn, this.unary());
			} else {
				return this.primary();
			}
		},
		fieldAccess: function(e) {
			var t = this,
				n = this.expect().text,
				r = Cn(n, this.options, this.text);
			return f(function(t, n, i) {
				return r(i || e(t, n))
			}, {
				assign: function(r, i, o) {
					return wn(e(r, o), n, i, t.text, t.options)
				}
			})
		},
		objectIndex: function(e) {
			var t = this,
				r = this.expression();
			this.consume("]");
			return f(function(i, o) {
				var a, s, c = e(i, o),
					l = r(i, o);
				if (c) {
					return (a = $n(c[l], t.text), a && a.then && t.options.unwrapPromises && (s = a, "$$v" in a || (s.$$v = n, s.then(function(e) {
						s.$$v = e
					})), a = a.$$v), a);
				} else {
					return n;
				}
			}, {
				assign: function(n, i, o) {
					var a = r(n, o),
						s = $n(e(n, o), t.text);
					return s[a] = i
				}
			});
		},
		functionCall: function(e, t) {
			var n = [];
			if (")" !== this.peekToken().text)
				do n.push(this.expression()); while (this.expect(","));
			this.consume(")");
			var r = this;
			return function(i, o) {
				for (var a = [], s = t ? t(i, o) : i, c = 0; c < n.length; c++) {
					a.push(n[c](i, o));
				}
				var l = e(i, o, s) || h;
				$n(s, r.text), $n(l, r.text);
				var u = l.apply ? l.apply(s, a) : l(a[0], a[1], a[2], a[3], a[4]);
				return $n(u, r.text)
			}
		},
		arrayDeclaration: function() {
			var e = [],
				t = true;
			if ("]" !== this.peekToken().text)
				do {
					if (this.peek("]")) break;
					var n = this.expression();
					e.push(n), n.constant || (t = false)
				} while (this.expect(","));
			this.consume("]");
			return f(function(t, n) {
				for (var r = [], i = 0; i < e.length; i++) {
					r.push(e[i](t, n));
				}
				return r
			}, {
				literal: true,
				constant: t
			});
		},
		object: function() {
			var e = [],
				t = true;
			if ("}" !== this.peekToken().text)
				do {
					if (this.peek("}")) break;
					var n = this.expect(),
						r = n.string || n.text;
					this.consume(":");
					var i = this.expression();
					e.push({
						key: r,
						value: i
					}), i.constant || (t = false)
				} while (this.expect(","));
			this.consume("}");
			return f(function(t, n) {
				for (var r = {}, i = 0; i < e.length; i++) {
					var o = e[i];
					r[o.key] = o.value(t, n)
				}
				return r
			}, {
				literal: true,
				constant: t
			});
		}
	};
	var hi = {},
		gi = r("$sce"),
		mi = {
			HTML: "html",
			CSS: "css",
			URL: "url",
			RESOURCE_URL: "resourceUrl",
			JS: "js"
		},
		vi = t.createElement("a"),
		yi = Fn(e.location.href, true);
	Hn.$inject = ["$provide"];
	Un.$inject = ["$locale"];
	Wn.$inject = ["$locale"];
	var bi = ".",
		$i = {
			yyyy: Xn("FullYear", 4),
			yy: Xn("FullYear", 2, 0, true),
			y: Xn("FullYear", 1),
			MMMM: Gn("Month"),
			MMM: Gn("Month", true),
			MM: Xn("Month", 2, 1),
			M: Xn("Month", 1, 1),
			dd: Xn("Date", 2),
			d: Xn("Date", 1),
			HH: Xn("Hours", 2),
			H: Xn("Hours", 1),
			hh: Xn("Hours", 2, -12),
			h: Xn("Hours", 1, -12),
			mm: Xn("Minutes", 2),
			m: Xn("Minutes", 1),
			ss: Xn("Seconds", 2),
			s: Xn("Seconds", 1),
			sss: Xn("Milliseconds", 3),
			EEEE: Gn("Day"),
			EEE: Gn("Day", true),
			a: Qn,
			Z: Kn
		},
		wi = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
		ki = /^\-?\d+$/;
	Yn.$inject = ["$locale"];
	var xi = m(pr),
		Ti = m(gr);
	tr.$inject = ["$parse"];
	var Ci = m({
			restrict: "E",
			compile: function(e, n) {
				if (8 >= yr) {
					if (!(n.href || n.name)) {
						n.$set("href", ""); 
					}
					e.append(t.createComment("IE fix"));
				}
				if (n.href || n.xlinkHref || n.name) {
					return void 0;
				} else {
					return function(e, t) {
						var n = "[object SVGAnimatedString]" === Cr.call(t.prop("href")) ? "xlink:href" : "href";
						t.on("click", function(e) {
							if (!(t.attr(n))) {
								e.preventDefault()
							}
						})
					};
				}
			}
		}),
		Si = {};
	o(Vr, function(e, t) {
		if ("multiple" != e) {
			var n = Ht("ng-" + t);
			Si[n] = function() {
				return {
					priority: 100,
					link: function(e, r, i) {
						e.$watch(i[n], function(e) {
							i.$set(t, !!e)
						})
					}
				}
			}
		}
	});
	o(["src", "srcset", "href"], function(e) {
		var t = Ht("ng-" + e);
		Si[t] = function() {
			return {
				priority: 99,
				link: function(n, r, i) {
					var o = e,
						a = e;
					"href" === e && "[object SVGAnimatedString]" === Cr.call(r.prop("href")) && (a = "xlinkHref", i.$attr[a] = "xlink:href", o = null), i.$observe(t, function(e) {
						if (e) {
							i.$set(a, e);
							if (yr && o) {
								r.prop(o, i[a])
							}
						}
					})
				}
			}
		}
	});
	var Ai = {
		$addControl: h,
		$removeControl: h,
		$setValidity: h,
		$setDirty: h,
		$setPristine: h
	};
	rr.$inject = ["$element", "$attrs", "$scope", "$animate"];
	var Ei = function(e) {
			return ["$timeout",
				function(t) {
					var r = {
						name: "form",
						restrict: e ? "EAC" : "E",
						controller: rr,
						compile: function() {
							return {
								pre: function(e, r, i, o) {
									if (!i.action) {
										var a = function(e) {
											if (e.preventDefault) {
												e.preventDefault();
											} else {
												e.returnValue = false;
											}
										};
										Ir(r[0], "submit", a), r.on("$destroy", function() {
											t(function() {
												Dr(r[0], "submit", a)
											}, 0, false)
										})
									}
									var s = r.parent().controller("form"),
										c = i.name || i.ngForm;
									c && wn(e, c, o, c), s && r.on("$destroy", function() {
										s.$removeControl(o);
										if (c) {
											wn(e, c, n, c);
										}
										f(o, Ai);
									})
								}
							}
						}
					};
					return r
				}
			]
		},
		Ni = Ei(),
		ji = Ei(true),
		_i = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
		qi = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
		Mi = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
		Oi = {
			text: ar,
			number: sr,
			url: cr,
			email: lr,
			radio: ur,
			checkbox: fr,
			hidden: h,
			button: h,
			submit: h,
			reset: h,
			file: h
		},
		Ii = ["$browser", "$sniffer",
			function(e, t) {
				return {
					restrict: "E",
					require: "?ngModel",
					link: function(n, r, i, o) {
						if (o) {
							(Oi[pr(i.type)] || Oi.text)(n, r, i, o, t, e);
						}
					}
				}
			}
		],
		Di = "ng-valid",
		Li = "ng-invalid",
		Pi = "ng-pristine",
		Fi = "ng-dirty",
		zi = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate",
			function(e, t, n, i, a, s) {
				function c(e, t) {
					if (t) {
						t = "-" + et(t, "-");
					} else {
						t = "";
					}
					s.removeClass(i, (e ? Li : Di) + t);
					s.addClass(i, (e ? Di : Li) + t);
				};
				this.$viewValue = Number.NaN;
				this.$modelValue = Number.NaN;
				this.$parsers = [];
				this.$formatters = [];
				this.$viewChangeListeners = [];
				this.$pristine = true;
				this.$dirty = false;
				this.$valid = true;
				this.$invalid = false;
				this.$name = n.name;
				var l = a(n.ngModel),
					u = l.assign;
				if (!u) {
					throw r("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", n.ngModel, V(i));
				}
				this.$render = h, this.$isEmpty = function(e) {
					return v(e) || "" === e || null === e || e !== e
				};
				var f = i.inheritedData("$formController") || Ai,
					d = 0,
					p = this.$error = {};
				i.addClass(Pi);
				c(true);
				this.$setValidity = function(e, t) {
					if (p[e] !== !t) {
						if (t) {
							if (p[e]) {
								d--;
							}
							if (!(d)) {
								c(true);
								this.$valid = true;
								this.$invalid = false;
							}
						} else {
							c(false);
							this.$invalid = true;
							this.$valid = false;
							d++;
						}
						p[e] = !t;
						c(t, e);
						f.$setValidity(e, t, this);
					}
				};
				this.$setPristine = function() {
					this.$dirty = false;
					this.$pristine = true;
					s.removeClass(i, Fi);
					s.addClass(i, Pi);
				};
				this.$setViewValue = function(n) {
					this.$viewValue = n;
					if (this.$pristine) {
						this.$dirty = true;
						this.$pristine = false;
						s.removeClass(i, Pi);
						s.addClass(i, Fi);
						f.$setDirty();
					}
					o(this.$parsers, function(e) {
						n = e(n)
					});
					if (this.$modelValue !== n) {
						this.$modelValue = n;
						u(e, n);
						o(this.$viewChangeListeners, function(e) {
							try {
								e()
							} catch (n) {
								t(n)
							}
						});
					}
				};
				var g = this;
				e.$watch(function() {
					var t = l(e);
					if (g.$modelValue !== t) {
						var n = g.$formatters,
							r = n.length;
						for (g.$modelValue = t; r--;) t = n[r](t);
						if (g.$viewValue !== t) {
							g.$viewValue = t;
							g.$render();
						}
					}
					return t
				})
			}
		],
		Ri = function() {
			return {
				require: ["ngModel", "^?form"],
				controller: zi,
				link: function(e, t, n, r) {
					var i = r[0],
						o = r[1] || Ai;
					o.$addControl(i), e.$on("$destroy", function() {
						o.$removeControl(i)
					})
				}
			}
		},
		Hi = m({
			require: "ngModel",
			link: function(e, t, n, r) {
				r.$viewChangeListeners.push(function() {
					e.$eval(n.ngChange)
				})
			}
		}),
		Bi = function() {
			return {
				require: "?ngModel",
				link: function(e, t, n, r) {
					if (r) {
						n.required = true;
						var i = function(e) {
							if (n.required && r.$isEmpty(e)) {
								return void r.$setValidity("required", false);
							} else {
								return (r.$setValidity("required", true), e);
							}
						};
						r.$formatters.push(i);
						r.$parsers.unshift(i);
						n.$observe("required", function() {
							i(r.$viewValue)
						});
					}
				}
			}
		},
		Ui = function() {
			return {
				require: "ngModel",
				link: function(e, t, r, i) {
					var a = /\/(.*)\//.exec(r.ngList),
						s = a && new RegExp(a[1]) || r.ngList || ",",
						c = function(e) {
							if (!v(e)) {
								var t = [];
								if (e) {
									o(e.split(s), function(e) {
										if (e) {
											t.push(Nr(e));
										}
									})
								}
								return t;
							}
						};
					i.$parsers.push(c);
					i.$formatters.push(function(e) {
						if (x(e)) {
							return e.join(", ");
						} else {
							return n;
						}
					});
					i.$isEmpty = function(e) {
						return !e || !e.length
					};
				}
			}
		},
		Wi = /^(true|false|\d+)$/,
		Vi = function() {
			return {
				priority: 100,
				compile: function(e, t) {
					if (Wi.test(t.ngValue)) {
						return function(e, t, n) {
							n.$set("value", e.$eval(n.ngValue))
						};
					} else {
						return function(e, t, n) {
							e.$watch(n.ngValue, function(e) {
								n.$set("value", e)
							})
						};
					}
				}
			}
		},
		Ji = nr(function(e, t, r) {
			t.addClass("ng-binding").data("$binding", r.ngBind);
			e.$watch(r.ngBind, function(e) {
				t.text(n == e ? "" : e)
			});
		}),
		Xi = ["$interpolate",
			function(e) {
				return function(t, n, r) {
					var i = e(n.attr(r.$attr.ngBindTemplate));
					n.addClass("ng-binding").data("$binding", i), r.$observe("ngBindTemplate", function(e) {
						n.text(e)
					})
				}
			}
		],
		Gi = ["$sce", "$parse",
			function(e, t) {
				return function(n, r, i) {
					function o() {
						return (a(n) || "").toString()
					}
					r.addClass("ng-binding").data("$binding", i.ngBindHtml);
					var a = t(i.ngBindHtml);
					n.$watch(o, function() {
						r.html(e.getTrustedHtml(a(n)) || "")
					})
				}
			}
		],
		Ki = dr("", true),
		Qi = dr("Odd", 0),
		Yi = dr("Even", 1),
		Zi = nr({
			compile: function(e, t) {
				t.$set("ngCloak", n);
				e.removeClass("ng-cloak");
			}
		}),
		eo = [

			function() {
				return {
					scope: true,
					controller: "@",
					priority: 500
				}
			}
		],
		to = {};
	o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(e) {
		var t = Ht("ng-" + e);
		to[t] = ["$parse",
			function(n) {
				return {
					compile: function(r, i) {
						var o = n(i[t]);
						return function(t, n) {
							n.on(pr(e), function(e) {
								t.$apply(function() {
									o(t, {
										$event: e
									})
								})
							})
						}
					}
				}
			}
		]
	});
	var no = ["$animate",
			function(e) {
				return {
					transclude: "element",
					priority: 600,
					terminal: true,
					restrict: "A",
					$$tlb: true,
					link: function(n, r, i, o, a) {
						var s, c, l;
						n.$watch(i.ngIf, function(o) {
							if (W(o)) {
								if (!(c)) {
									c = n.$new();
									a(c, function(n) {
										n[n.length++] = t.createComment(" end ngIf: " + i.ngIf + " ");
										s = {
											clone: n
										};
										e.enter(n, r.parent(), r);
									});
								}
							} else {
								if (l) {
									l.remove();
									l = null;
								}
								if (c) {
									c.$destroy();
									c = null;
								}
								if (s) {
									l = at(s.clone);
									e.leave(l, function() {
										l = null
									});
									s = null;
								}
							}
						})
					}
				}
			}
		],
		ro = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce",
			function(e, t, n, r, i) {
				return {
					restrict: "ECA",
					priority: 400,
					terminal: true,
					transclude: "element",
					controller: Ar.noop,
					compile: function(o, a) {
						var s = a.ngInclude || a.src,
							c = a.onload || "",
							l = a.autoscroll;
						return function(o, a, u, f, d) {
							var p, h, g, m = 0,
								v = function() {
									if (h) {
										h.remove();
										h = null;
									}
									if (p) {
										p.$destroy();
										p = null;
									}
									if (g) {
										r.leave(g, function() {
											h = null
										});
										h = g;
										g = null;
									}
								};
							o.$watch(i.parseAsResourceUrl(s), function(i) {
								var s = function() {
										if (!(!y(l) || l && !o.$eval(l))) {
											n()
										}
									},
									u = ++m;
								if (i) {
									e.get(i, {
										cache: t
									}).success(function(e) {
										if (u === m) {
											var t = o.$new();
											f.template = e;
											var n = d(t, function(e) {
												v();
												r.enter(e, null, a, s);
											});
											p = t;
											g = n;
											p.$emit("$includeContentLoaded");
											o.$eval(c);
										}
									}).error(function() {
										if (u === m) {
											v();
										}
									});
									o.$emit("$includeContentRequested");
								} else {
									v();
									f.template = null;
								}
							})
						}
					}
				}
			}
		],
		io = ["$compile",
			function(e) {
				return {
					restrict: "ECA",
					priority: -400,
					require: "ngInclude",
					link: function(t, n, r, i) {
						n.html(i.template);
						e(n.contents())(t);
					}
				}
			}
		],
		oo = nr({
			priority: 450,
			compile: function() {
				return {
					pre: function(e, t, n) {
						e.$eval(n.ngInit)
					}
				}
			}
		}),
		ao = nr({
			terminal: true,
			priority: 1e3
		}),
		so = ["$locale", "$interpolate",
			function(e, t) {
				var n = /{}/g;
				return {
					restrict: "EA",
					link: function(r, i, a) {
						var s = a.count,
							c = a.$attr.when && i.attr(a.$attr.when),
							l = a.offset || 0,
							u = r.$eval(c) || {},
							f = {},
							d = t.startSymbol(),
							p = t.endSymbol(),
							h = /^when(Minus)?(.+)$/;
						o(a, function(e, t) {
							if (h.test(t)) {
								(u[pr(t.replace("when", "").replace("Minus", "-"))] = i.attr(a.$attr[t]));
							}
						});
						o(u, function(e, r) {
							f[r] = t(e.replace(n, d + s + "-" + l + p))
						});
						r.$watch(function() {
							var t = parseFloat(r.$eval(s));
							if (isNaN(t)) {
								return "";
							} else {
								return (t in u || (t = e.pluralCat(t - l)), f[t](r, i, true));
							}
						}, function(e) {
							i.text(e)
						});
					}
				}
			}
		],
		co = ["$parse", "$animate",
			function(e, n) {
				function a(e) {
					return e.clone[0]
				}

				function s(e) {
					return e.clone[e.clone.length - 1]
				}
				var c = "$$NG_REMOVED",
					l = r("ngRepeat");
				return {
					transclude: "element",
					priority: 1e3,
					terminal: true,
					$$tlb: true,
					link: function(r, u, f, d, p) {
						var h, g, m, v, y, b, $, w, k, x = f.ngRepeat,
							T = x.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
							C = {
								$id: _t
							};
						if (!T) {
							throw l("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", x);
						}
						b = T[1];
						$ = T[2];
						h = T[3];
						if (h) {
							g = e(h);
							m = function(e, t, n) {
								if (k) {
									C[k] = e;
								}
								C[w] = t;
								C.$index = n;
								return g(r, C);
							};
						} else {
							v = function(e, t) {
								return _t(t);
							};
							y = function(e) {
								return e;
							};
						}
						T = b.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
						if (!T) {
							throw l("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", b);
						}
						w = T[3] || T[1];
						k = T[2];
						var S = {};
						r.$watchCollection($, function(e) {
							var f, d, h, g, b, $, T, C, A, E, N, j, _ = u[0],
								q = {},
								M = [];
							if (i(e)) {
								E = e;
								A = m || v;
							} else {
								A = m || y, E = [];
								for ($ in e) {
									if (e.hasOwnProperty($) && "$" != $.charAt(0)) {
										E.push($);
									}
								}
								E.sort()
							}
							g = E.length;
							d = M.length = E.length;
							for (f = 0; d > f; f++) {
								if ($ = e === E ? f : E[f], T = e[$], C = A($, T, f), it(C, "`track by` id"), S.hasOwnProperty(C)) {
									N = S[C];
									delete S[C];
									q[C] = N;
									M[f] = N;
								} else {
									if (q.hasOwnProperty(C)) {
										throw o(M, function(e) {
											if (e && e.scope) {
												S[e.id] = e;
											}
										}), l("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", x, C);
									}
									M[f] = {
										id: C
									}, q[C] = false
								}
							}
							for ($ in S) {
								if (S.hasOwnProperty($)) {
									N = S[$];
									j = at(N.clone);
									n.leave(j);
									o(j, function(e) {
										e[c] = true;
									});
									N.scope.$destroy();
								}
							}
							f = 0;
							for (d = E.length; d > f; f++) {
								if ($ = e === E ? f : E[f], T = e[$], N = M[f], M[f - 1] && (_ = s(M[f - 1])), N.scope) {
									b = N.scope, h = _;
									do h = h.nextSibling; while (h && h[c]);
									a(N) != h && n.move(at(N.clone), null, br(_)), _ = s(N)
								} else {
									b = r.$new();
								}
								b[w] = T;
								if (k) {
									b[k] = $;
								}
								b.$index = f;
								b.$first = 0 === f;
								b.$last = f === g - 1;
								b.$middle = !(b.$first || b.$last);
								b.$odd = !(b.$even = 0 === (1 & f));
								if (!(N.scope)) {
									p(b, function(e) {
										e[e.length++] = t.createComment(" end ngRepeat: " + x + " ");
										n.enter(e, null, br(_));
										_ = e;
										N.scope = b;
										N.clone = e;
										q[N.id] = N;
									})
								}
							}
							S = q
						});
					}
				}
			}
		],
		lo = ["$animate",
			function(e) {
				return function(t, n, r) {
					t.$watch(r.ngShow, function(t) {
						e[W(t) ? "removeClass" : "addClass"](n, "ng-hide")
					})
				}
			}
		],
		uo = ["$animate",
			function(e) {
				return function(t, n, r) {
					t.$watch(r.ngHide, function(t) {
						e[W(t) ? "addClass" : "removeClass"](n, "ng-hide")
					})
				}
			}
		],
		fo = nr(function(e, t, n) {
			e.$watch(n.ngStyle, function(e, n) {
				if (n && e !== n) {
					o(n, function(e, n) {
						t.css(n, "")
					}); 
				}
				if (e) {
					t.css(e); 
				}
			}, true)
		}),
		po = ["$animate",
			function(e) {
				return {
					restrict: "EA",
					require: "ngSwitch",
					controller: ["$scope",
						function() {
							this.cases = {}
						}
					],
					link: function(t, n, r, i) {
						var a, s, c, l = r.ngSwitch || r.on,
							u = [];
						t.$watch(l, function(n) {
							var l, f = u.length;
							if (f > 0) {
								if (c) {
									for (l = 0; f > l; l++) c[l].remove();
									c = null
								}
								c = [];
								for (l = 0; f > l; l++) {
									var d = s[l];
									u[l].$destroy();
									c[l] = d;
									e.leave(d, function() {
										c.splice(l, 1);
										if (0 === c.length) {
											(c = null); 
										}
									});
								}
							}
							s = [];
							u = [];
							if ((a = i.cases["!" + n] || i.cases["?"])) {
								t.$eval(r.change);
								o(a, function(n) {
									var r = t.$new();
									u.push(r), n.transclude(r, function(t) {
										var r = n.element;
										s.push(t), e.enter(t, r.parent(), r)
									})
								});
							}
						})
					}
				}
			}
		],
		ho = nr({
			transclude: "element",
			priority: 800,
			require: "^ngSwitch",
			link: function(e, t, n, r, i) {
				r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [];
				r.cases["!" + n.ngSwitchWhen].push({
					transclude: i,
					element: t
				});
			}
		}),
		go = nr({
			transclude: "element",
			priority: 800,
			require: "^ngSwitch",
			link: function(e, t, n, r, i) {
				r.cases["?"] = r.cases["?"] || [];
				r.cases["?"].push({
					transclude: i,
					element: t
				});
			}
		}),
		mo = nr({
			link: function(e, t, n, i, o) {
				if (!o) {
					throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", V(t));
				}
				o(function(e) {
					t.empty();
					t.append(e);
				})
			}
		}),
		vo = ["$templateCache",
			function(e) {
				return {
					restrict: "E",
					terminal: true,
					compile: function(t, n) {
						if ("text/ng-template" == n.type) {
							var r = n.id,
								i = t[0].text;
							e.put(r, i)
						}
					}
				}
			}
		],
		yo = r("ngOptions"),
		bo = m({
			terminal: true
		}),
		$o = ["$compile", "$parse",
			function(e, r) {
				var i = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
					s = {
						$setViewValue: h
					};
				return {
					restrict: "E",
					require: ["select", "?ngModel"],
					controller: ["$element", "$scope", "$attrs",
						function(e, t, n) {
							var r, i, o = this,
								a = {},
								c = s;
							o.databound = n.ngModel;
							o.init = function(e, t, n) {
								c = e;
								r = t;
								i = n;
							};
							o.addOption = function(t) {
								it(t, '"option value"');
								a[t] = true;
								if (t == c.$viewValue) {
									e.val(t);
									if (i.parent()) {
										i.remove(); 
									}
								}
							};
							o.removeOption = function(e) {
								if (this.hasOption(e)) {
									delete a[e];
									if (e == c.$viewValue) {
										this.renderUnknownOption(e)
									}
								}
							};
							o.renderUnknownOption = function(t) {
								var n = "? " + _t(t) + " ?";
								i.val(n);
								e.prepend(i);
								e.val(n);
								i.prop("selected", true);
							};
							o.hasOption = function(e) {
								return a.hasOwnProperty(e);
							};
							t.$on("$destroy", function() {
								o.renderUnknownOption = h;
							});
						}
					],
					link: function(s, c, l, u) {
						function f(e, t, n, r) {
							n.$render = function() {
								var e = n.$viewValue;
								if (r.hasOption(e)) {
									if (C.parent()) {
										C.remove();
									}
									t.val(e);
									if ("" === e) {
										h.prop("selected", true);
									}
								} else if (v(e) && h) {
									t.val("");
								} else {
									r.renderUnknownOption(e);
								}
							};
							t.on("change", function() {
								e.$apply(function() {
									if (C.parent()) {
										C.remove(); 
									}
									n.$setViewValue(t.val());
								})
							});
						}

						function d(e, t, n) {
							var r;
							n.$render = function() {
								var e = new qt(n.$viewValue);
								o(t.find("option"), function(t) {
									t.selected = y(e.get(t.value))
								})
							};
							e.$watch(function() {
								if (!(L(r, n.$viewValue))) {
									r = I(n.$viewValue);
									n.$render();
								}
							});
							t.on("change", function() {
								e.$apply(function() {
									var e = [];
									o(t.find("option"), function(t) {
										if (t.selected) {
											e.push(t.value);
										}
									}), n.$setViewValue(e)
								})
							});
						}

						function p(t, o, s) {
							function c() {
								var e, n, r, i, c, l, m, $, S, A, E, N, j, _, q, M = {
										"": []
									},
									O = [""],
									I = s.$modelValue,
									D = g(t) || [],
									L = d ? a(D) : D,
									P = {},
									F = false;
								if (b)
									if (v && x(I)) {
										F = new qt([]);
										for (var z = 0; z < I.length; z++) {
											P[f] = I[z];
											F.put(v(t, P), I[z]);
										}
									} else {
										F = new qt(I);
									}
								for (E = 0; S = L.length, S > E; E++) {
									if (m = E, d) {
										if (m = L[E], "$" === m.charAt(0)) continue;
										P[d] = m
									}
									if (P[f] = D[m], e = p(t, P) || "", (n = M[e]) || (n = M[e] = [], O.push(e)), b) N = y(F.remove(v ? v(t, P) : h(t, P)));
									else {
										if (v) {
											var R = {};
											R[f] = I, N = v(t, R) === v(t, P)
										} else {
											N = I === h(t, P);
										}
										F = F || N
									}
									q = u(t, P);
									if (y(q)) {
										q = q;
									} else {
										q = "";
									}
									n.push({
										id: v ? v(t, P) : d ? L[E] : E,
										label: q,
										selected: N
									});
								}
								if (!(b)) {
									if (w || null === I) {
										M[""].unshift({
											id: "",
											label: "",
											selected: !F
										});
									} else if (!(F)) {
										M[""].unshift({
											id: "?",
											label: "",
											selected: true
										}); 
									}
								}
								A = 0;
								for ($ = O.length; $ > A; A++) {
									e = O[A];
									n = M[e];
									if (C.length <= A) {
										i = {
											element: T.clone().attr("label", e),
											label: n.label
										};
										c = [i];
										C.push(c);
										o.append(i.element);
									} else {
										c = C[A];
										i = c[0];
										if (i.label != e) {
											i.element.attr("label", i.label = e);
										}
									}
									j = null;
									E = 0;
									for (S = n.length; S > E; E++) {
										r = n[E];
										if (l = c[E + 1]) {
											j = l.element;
											if (l.label !== r.label) {
												j.text(l.label = r.label);
											}
											if (l.id !== r.id) {
												j.val(l.id = r.id);
											}
											if (l.selected !== r.selected) {
												j.prop("selected", l.selected = r.selected);
											}
										} else {
											if ("" === r.id && w) {
												_ = w;
											} else {
												(_ = k.clone()).val(r.id).attr("selected", r.selected).text(r.label);
											}
											c.push(l = {
												element: _,
												label: r.label,
												id: r.id,
												selected: r.selected
											});
											if (j) {
												j.after(_);
											} else {
												i.element.append(_);
											}
											j = _;
										}
									}

									for (E++; c.length > E;) c.pop().element.remove()
								}
								for (; C.length > A;) C.pop()[0].element.remove()
							}
							var l;
							if (!(l = $.match(i))) {
								throw yo("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", $, V(o));
							}
							var u = r(l[2] || l[1]),
								f = l[4] || l[6],
								d = l[5],
								p = r(l[3] || ""),
								h = r(l[2] ? l[1] : f),
								g = r(l[7]),
								m = l[8],
								v = m ? r(l[8]) : null,
								C = [
									[{
										element: o,
										label: ""
									}]
								];
							if (w) {
								e(w)(t);
								w.removeClass("ng-scope");
								w.remove();
							}
							o.empty();
							o.on("change", function() {
								t.$apply(function() {
									var e, r, i, a, c, l, u, p, m, y = g(t) || [],
										$ = {};
									if (b) {
										i = [];
										l = 0;
										for (p = C.length; p > l; l++)
											for (e = C[l], c = 1, u = e.length; u > c; c++)
												if ((a = e[c].element)[0].selected) {
													if (r = a.val(), d && ($[d] = r), v)
														for (m = 0; m < y.length && ($[f] = y[m], v(t, $) != r); m++);
													else {
														$[f] = y[r];
													}
													i.push(h(t, $))
												}
									} else {
										if (r = o.val(), r == "?") i = n;
										else if ("" === r) i = null;
										else if (v) {
											for (m = 0; m < y.length; m++)
												if ($[f] = y[m], r == v(t, $)) {
													i = h(t, $);
													break
												}
										} else {
											$[f] = y[r];
											if (d) {
												$[d] = r;
											}
											i = h(t, $);
										}
										if (C[0].length > 1 && C[0][1].id !== r) {
											C[0][1].selected = false;
										}
									}
									s.$setViewValue(i)
								})
							});
							s.$render = c;
							t.$watch(c);
						}
						if (u[1]) {
							var h, g = u[0],
								m = u[1],
								b = l.multiple,
								$ = l.ngOptions,
								w = false,
								k = br(t.createElement("option")),
								T = br(t.createElement("optgroup")),
								C = k.clone(),
								S = 0,
								A = c.children();
							for (var E = A.length; E > S; S++)
								if ("" === A[S].value) {
									h = w = A.eq(S);
									break
								}
							g.init(m, w, C);
							if (b) {
								(m.$isEmpty = function(e) {
									return !e || 0 === e.length
								});
							}
							if ($) {
								p(s, c, m);
							} else if (b) {
								d(s, c, m);
							} else {
								f(s, c, m, g);
							}
						}
					}
				}
			}
		],
		wo = ["$interpolate",
			function(e) {
				var t = {
					addOption: h,
					removeOption: h
				};
				return {
					restrict: "E",
					priority: 100,
					compile: function(n, r) {
						if (v(r.value)) {
							var i = e(n.text(), true);
							if (!(i)) {
								r.$set("value", n.text())
							}
						}
						return function(e, n, r) {
							var o = "$selectController",
								a = n.parent(),
								s = a.data(o) || a.parent().data(o);
							if (s && s.databound) {
								n.prop("selected", false);
							} else {
								s = t;
							}
							if (i) {
								e.$watch(i, function(e, t) {
									r.$set("value", e);
									if (e !== t) {
										s.removeOption(t);
									}
									s.addOption(e);
								});
							} else {
								s.addOption(r.value);
							}
							n.on("$destroy", function() {
								s.removeOption(r.value)
							});
						}
					}
				}
			}
		],
		ko = m({
			restrict: "E",
			terminal: true
		});
	if (e.angular.bootstrap) {
		return void console.log("WARNING: Tried to load angular more than once.");
	} else {
		return (tt(), ct(Ar), void br(t).ready(function() {
			Y(t, Z)
		}));
	}
}(window, document);
