!function(){
	"use strict";
	function n(n){
		return function(){
			var r,
			    e=arguments[0],
			    e="["+(n?n+":":"")+e+"] http://errors.angularjs.org/1.2.16/"+(n?n+"/":"")+e,
			    enc;
			for(r=1;r<arguments.length;r++){
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
	}
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
	}(window)
}(window),
	function(n,r){
		"undefined"!=typeof module&&module.exports?module.exports=r():"function"==typeof define&&define.amd?define(r):this[n]=r()
	}(
			"$script",
			function(){
				function n(n,r){
					for(var e=0,t=n.length;t>e;++e)
		if(!r(n[e]))
		return c;
	return 1
				}
				function r(r,e){
					n(r,function(n){return!e(n)})
				}
				function e(i,u,c){
					function f(n){
						return n.call?n():d[n]
					}
					function s(){
						if(!--$){
							d[h]=1,v&&v();
							for(var e in m)
		n(e.split("|"),f)&&!r(m[e],f)&&(m[e]=[])
						}
					}
					i=i[a]?i:[i];
					var g=u&&u.call,v=g?u:c,h=g?i.join(""):u,$=i.length;
					return setTimeout(function(){
						r(i,function n(r,e){return null===r?s():(r=e||/^https?:\/\//.test(r)||!o?r:o+r+".js",p[r]?(h&&(l[h]=1),void(2==p[r]?s():setTimeout(n.bind(null,r,!0),0))):(p[r]=1,h&&(l[h]=1),t(r,s),void 0))})
					},0),e
				}
				function t(n,r){var e,t=i.createElement("script");t.onload=t.onerror=t[s]=function(){t[f]&&!/^c|loade/.test(t[f])||e||(t.onload=t[s]=null,e=1,p[n]=2,r())},t.async=1,t.src=n,u.insertBefore(t,u.lastChild)}
				var o,i=document,u=i.getElementsByTagName("head")[0],c=!1,a="push",f="readyState",s="onreadystatechange",d={},l={},m={},p={};
				return e.get=t,e.order=function(n,r,t){
					!function o(i){
						i=n.shift(),n.length?e(i,o):e(i,r,t)
					}()
				},e.path=function(n){o=n},
				       e.ready=function(t,o,i){
					       t=t[a]?t:[t];
					       var u=[];
					       return!r(t,function(n){d[n]||u[a](n)})&&n(t,function(n){return d[n]})?o():!function(n){m[n]=m[n]||[],m[n][a](o),i&&i(u)}(t.join("|")),e
				       },
				       e.done=function(n){
					       e([null],n)
				       },e
			}),
			"undefined"!=typeof dojo?dojo.provide("org.cometd"):(this.org=this.org||{},org.cometd={}),
			$script(["js/controller.min.js?v"+kahoot.version],function(){angular.bootstrap(document,["app"])});
