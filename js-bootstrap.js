//window = {}
//document = {}
//document.getElementsByTagName = function(){
//	console.log("document.getElementsByTagName()");
//	a={};
//	return a;
//}

!function(){
	"use strict";
	function n(n){
		return function(){
			var r,
			    e=arguments[0],
			    e="["+(n?n+":":"")+e+"] http://errors.angularjs.org/1.2.16/"+(n?n+"/":"")+e,
			    enc;
			for(r = 1; r < arguments.length; r++){
				if(typeof arguments[r] == "function")       enc = arguments[r].toString().replace(/ \{[\s\S]*$/,"");
				else if(typeof arguments[r] == "undefined") enc = "undefined";
				else if(typeof arguments[r] != "string")    enc = JSON.stringify(arguments[r]);
				else                                        enc = arguments[r];
				enc = encodeURIComponent(enc);
				e=e+
					(1==r?"?":"&")+
					"p"+
					(r-1)+
					"="+enc;
			}
			return Error(e);
		}
	};
	!function(r){
		var e=n("$injector"),t=n("ng");
		r = r.angular || (r.angular={});
		r.$$minErr = r.$$minErr || n;
		if(!r.module){
			r.module = function(){
				var n={};
				return function(r,o,i){
					if("hasOwnProperty"===r) throw t("badname","module");
					o && n.hasOwnProperty(r) && (n[r] = null);
					if(!n[r]){
						n[r] = function(){
							function n(n,r,e){
								return function(){
									t[e||"push"]([n,r,arguments]);
									return a;
								}
							}
							if(!o) throw e("nomod",r);
							var t=[],u=[],c=n("$injector","invoke"),a={
								_invokeQueue:t,
								_runBlocks:u,
								requires:o,
								name:r,
								provider:n("$provide","provider"),
								factory:n("$provide","factory"),
								service:n("$provide","service"),
								value:n("$provide","value"),
								constant:n("$provide","constant","unshift"),
								animation:n("$animateProvider","register"),
								filter:n("$filterProvider","register"),
								controller:n("$controllerProvider","register"),
								directive:n("$compileProvider","directive"),
								config:c,
								run:function(n){return u.push(n),this}
							};
							i && c(i);
							return a
						}()
					}
					return n[r];
				}
			}()
		}
		return r.module;
	}(window);
}(window);
!function(){
	r = function(){
		function n(n,r){
			for(var e = 0, t = n.length; t > e; ++e){
				if(!r(n[e])) return false;
			}
			return true;
		}
		function r(r,e){
			n(r,function(n){return !e(n)})
		}
		// $script( array of js urls,
		function e(i,u,c){
			function f(n){
				return n.call ? n() : d[n]
			}
			function s(){
				if(!--$){
					d[h]=1;
					if(v) v();
					for(var e in m){
						if(n(e.split("|"),f) && !r(m[e],f)){
							m[e]=[];
						}
					}
				}
			}
			i=i.push ? i : [i];
			var g=u && u.call,
			    v=g ? u : c,
			    h=g?i.join(""):u,
			    $=i.length;
			setTimeout(function(){
				r(i,function n(r,e){
					if(r === null){
						return s();
					}
					r = e || /^https?:\/\//.test(r) || !o ? r : (o+r+".js");
					if(p[r]){
						h && l[h] = 1;
						if(p[r] == 2){
							return s();
						} else {
							setTimeout(n.bind(null,r,!0),0);
						}
						return void 0;
					} else {
						p[r] = 1;
						h && (l[h] = 1);
						t(r,s);
						return void 0;
					}
				})
			},0);
			return e;
		}
		function t(n,r){
			var e,
			    t=document.createElement("script");
			t.onload=t.onerror=t.onreadystatechange=function(){
				t.readyState && !/^c|loade/.test(t.readyState) || e || (t.onload=t.onreadystatechange=null,e=1,p[n]=2,r());
			};
			t.async=1;
			t.src=n;
			document.getElementsByTagName("head")[0].insertBefore(t,document.getElementsByTagName("head")[0].lastChild);
		}
		var o,
		    i=document,
		    u=document.getElementsByTagName("head")[0],
		    d={},
		    l={},
		    m={},
		    p={};
		e.get = t;
		e.order=function(n,r,t){
			!function o(i){
				i=n.shift();
				n.length ? e(i,o) : e(i,r,t)
			}()
		};
		e.path=function(n){
			o=n;
		};
		e.ready=function(t,o,i){
			t = t.push ? t : [t];
			var u=[];
			!r(t,function(n){
				if(!d[n]){
					u.push(n);
				}
			}) && n(t,function(n){
				return d[n];
			}) ? o() : !function(n){
				if(!m[n]) m[n] = [];
				m[n].push(o);
				i&&i(u);
			}(t.join("|"));
			return e;
		};
		e.done=function(n){
			e([null],n)
		};
		return e;
	};
	if(typeof module != "undefined" && module.exports){
		module.exports = r()
	} else if(typeof define == "function" && define.amd){
		define(r)
	} else {
		this.$script = r()
	}
}();
if(typeof dojo != "undefined"){
	dojo.provide("org.cometd");
} else {
	this.org = this.org || {};
	org.cometd = {};
}

$script(
		["js/controller.min.js?v"+kahoot.version],
		function(){angular.bootstrap(document,["app"])}
       );
