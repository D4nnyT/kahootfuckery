angular.module("app.services.config", ["ng"]).factory("$config", ["$location", "$routeParams",
	function(e) {
		function t(e) {
			var t = e.split(".");
			if (t.length > 0) {
				return t[0];
			} else {
				return "";
			}
		}

		function n(t) {
			var n = /(.*mobitroll.nu|.*kahoot.local)/,
				r = /.*kahoot.me/,
				i = /.*mobitroll.me/,
				o = /.*kahoot.it/,
				a = /kahoot.local/,
				s = t.dev;
			if (i.test(e.host())) {
				s = t.test;
			} else if (r.test(e.host())) {
				s = t.stage;
			} else {
				if (o.test(e.host())) {
					s = t.prod;;
				} else if (n.test(e.host())) {
					s = t.advdev;;
				} else {
					if (a.test(e.host())) {
						s = t.devnoproxy || t.dev;
					};
				};
			}
			if ("string" == typeof s || s instanceof String) {
				return s.replace(/^proto:/, e.protocol() + ":");
			} else {
				return s;
			}
		}
		var r = {
			getHost: function() {
				var t = e.host().match(/[a-z]+\.[a-z]+$/);
				if (t && t.length > 0) {
					return t[0];
				} else {
					return "";
				}
			},
			xss_domain: n({
				dev: "localhost",
				advdev: "mobitroll.nu",
				test: "mobitroll.me",
				stage: "kahoot.me",
				prod: "kahoot.it"
			}),
			environment: n({
				dev: "dev",
				advdev: "advdev",
				test: "test",
				stage: "stage",
				prod: "prod"
			}),
			analytics: {
				batchSize: 10,
				baseUrl: n({
					dev: "/rest",
					devnoproxy: "http://hal.kahoot.local:9001",
					advdev: "/rest",
					test: "/rest",
					stage: "/rest",
					prod: "/rest"
				}),
				debug: n({
					dev: true,
					advdev: false,
					test: true,
					stage: false,
					prod: false
				})
			},
			cdn: {
				baseUrl: n({
					dev: "proto://d6am0t1arx3yz.cloudfront.net",
					advdev: "proto://media.mobitroll.me",
					test: "proto://media.mobitroll.me",
					stage: "proto://d6am0t1arx3yz.cloudfront.net",
					prod: "proto://d6am0t1arx3yz.cloudfront.net"
				})
			},
			builder: {
				baseUrl: n({
					dev: "proto://" + e.host() + ":8002",
					advdev: "proto://create.mobitroll.nu",
					test: "proto://create.mobitroll.me",
					stage: "proto://create.kahoot.me",
					prod: "proto://create.kahoot.it"
				})
			},
			player: {
				introDuration: 5,
				baseUrl: n({
					dev: "proto://" + e.host() + ":8001",
					advdev: "proto://play.mobitroll.nu",
					test: "proto://play.mobitroll.me",
					stage: "proto://play.kahoot.me",
					prod: "proto://play.kahoot.it"
				})
			},
			controller: {
				baseUrl: n({
					dev: "proto://" + e.host() + ":8000",
					advdev: "proto://mobitroll.nu",
					test: "proto://mobitroll.me",
					stage: "proto://kahoot.me",
					prod: "proto://kahoot.it"
				})
			},
			usergrid: {
				server: n({
					dev: "//create.mobitroll.me/rest",
					advdev: "/rest",
					test: "/rest",
					stage: "/rest",
					prod: "/rest"
				})
			},
			webpurify: {
				key: n({
					dev: "135d6f571ed76470aef59395ca137046",
					advdev: "135d6f571ed76470aef59395ca137046",
					test: "135d6f571ed76470aef59395ca137046",
					stage: "135d6f571ed76470aef59395ca137046",
					prod: "135d6f571ed76470aef59395ca137046"
				})
			},
			bugsense: {
				key: n({
					dev: "2a60b49a",
					advdev: "2a60b49a",
					test: "2a60b49a",
					stage: "2a60b49a",
					prod: "d3a5d794"
				}),
				enabled: n({
					dev: false,
					advdev: false,
					test: true,
					stage: true,
					prod: true
				})
			},
			session: {
				api: n({
					dev: "",
					advdev: "/reserve",
					test: "/reserve",
					stage: "/reserve",
					prod: "/reserve"
				})
			},
			social: {
				socialAuth: n({
					dev: "//db.mobitroll.me/auth/auth",
					advdev: "//db.mobitroll.nu/auth/auth",
					test: "//db.mobitroll.me/auth/auth",
					stage: "//db.kahoot.me/auth/auth",
					prod: "//db.kahoot.it/auth/auth"
				})
			},
			facebook: {
				appid: n({
					dev: "126467790894818",
					advdev: "126467790894818",
					test: "126467790894818",
					stage: "126467790894818",
					prod: "100369743487255"
				})
			},
			mixpanel: {
				token: n({
					dev: "2a69924f772124f83a747f0c88d373cc",
					advdev: "2a69924f772124f83a747f0c88d373cc",
					test: "2a69924f772124f83a747f0c88d373cc",
					stage: "2a69924f772124f83a747f0c88d373cc",
					prod: "4295d911a630aedf6e18a1eb8eca91a8"
				})
			},
			scoring: {
				min: 500,
				max: 1e3,
				upperThreshold: 1
			},
			anonuser: n({
				dev: {
					name: "anonymous",
					token: "6M]485077K9w7Vk"
				},
				advdev: {
					name: "anonymous",
					token: "6M]485077K9w7Vk"
				},
				test: {
					name: "anonymous",
					token: "6M]485077K9w7Vk"
				},
				stage: {
					name: "anonymous",
					token: "6M]485077K9w7Vk"
				},
				prod: {
					name: "anonymous",
					token: "6M]485077K9w7Vk"
				}
			}),
			optMinInstructions: false,
			optShowGamePin: false,
			optResetPlayers: false,
			kioskmode: {
				enabled: n({
					dev: false,
					advdev: false,
					test: false,
					stage: false,
					prod: false
				}),
				waitForJoin: 15,
				waitForResults: 5,
				waitForScoreboard: 5,
				waitForGameover: 5
			},
			audio: {
				lobby: true
			},
			subdomain: t(e.host()),
			comet: {
				protocol: e.protocol() + "://",
				server: n({
					dev: e.host() + ":8080",
					advdev: e.host(),
					test: e.host(),
					stage: e.host(),
					prod: e.host()
				}),
				contextPath: "",
				logLevel: n({
					dev: "debug",
					advdev: "debug",
					test: "debug",
					stage: "debug",
					prod: "debug"
				}),
				events: {
					getReady: 1,
					startQuestion: 2,
					gameOver: 3,
					timeUp: 4,
					playAgain: 5,
					answerSelected: 6,
					answerResponse: 7,
					revealAnswer: 8,
					startQuiz: 9,
					resetController: 10,
					submitFeedback: 11,
					feedback: 12
				}
			},
			kickCodes: {
				general: 1
			},
			isClickerKeycode: function(e) {
				if (e == 32 || e == 34) {
					return true;
				} else {
					return false;
				}
			},
			sessionTimeout: 36e5,
			mapImageUrl: function(e) {
				if (!e) {
					return null;
				}
				var t = /.*\/(.+?)$/i;
				if (e.match(t).length > 1) {
					var n = e.match(t)[1];
					e = r.cdn.baseUrl + "/" + n
				}
				return e
			}
		};
		return r
	}
]);
angular.module("app.services.comet", ["app.services.config"]).factory("$comet", ["$config", "$window", "$log", "$http",
	function(e, t, n, r) {
		function i() {
			var e = new org.cometd.LongPollingTransport,
				t = org.cometd.Transport.derive(e);
			t.xhrSend = function(e) {
				var t = e.headers || {};
				t["Content-Type"] = "application/json;charset=UTF-8";
				var i = r({
					method: "POST",
					url: e.url,
					data: e.body,
					headers: t,
					withCredentials: true,
					timeout: 4e4
				}).success(function(t) {
					e.onSuccess(t)
				}).error(function(t, n) {
					e.onError(n, t)
				});
				i.abort = function() {
					n.log("Abort called by Cometd on a $http request promise (long-polling).")
				};
				return i;
			};
			return t;
		}
		org.cometd.JSON = {};
		org.cometd.JSON.toJSON = angular.toJson;
		org.cometd.JSON.fromJSON = angular.fromJson;
		var o = new org.cometd.Cometd("comet-service");
		if (org.cometd.WebSocket) {
			o.registerTransport("websocket", new org.cometd.WebSocketTransport)
		}
		o.registerTransport("long-polling", new i);
		if (navigator.userAgent.match(/android(?!.*(chrome|firefox))/i)) {
			o.unregisterTransport("websocket")
		}
		t.onbeforeunload = function() {
			if (!(o.isDisconnected())) {
				o.disconnect(true)
			}
		};
		if (t.opera) {
			(t.onunload = t.onbeforeunload)
		}
		o.configure({
			url: e.comet.protocol + e.comet.server + e.comet.contextPath + "/cometd",
			logLevel: e.comet.logLevel,
			maxNetworkDelay: 4e4
		});
		return o;
	}
]);
angular.module("app.services.comet-ack", ["app.services.config", "app.services.comet"]).factory("$comet-ack", ["$config", "$log", "$comet",
	function(e, t, n) {
		function r(e) {
			var t = new e;
			n.registerExtension("ack", t);
			return t;
		}
		r(org.cometd.AckExtension, n);
		return n;
	}
]);
angular.module("app.services.comet-timesync", ["app.services.config", "app.services.comet"]).factory("$comet-timesync", ["$config", "$log", "$comet",
	function(e, t, n) {
		function r(e) {
			var t = new e;
			n.registerExtension("timesync", t);
			return t;
		}
		r(org.cometd.TimeSyncExtension, n);
		return n;
	}
]);
angular.module("app.services.network", ["underscore", "app.services.comet"]).factory("$network", ["$config", "$log", "_", "$comet", "$timeout", "$rootScope",
	function(e, t, n, r, i, o) {
		function a(e) {
			var e = e || 3e3;
			if (l) {
				i(function() {
					c();
					a(e);
				}, e);
			}
		}

		function s() {
			function e() {
				c()
			}
			if (!(u)) {
				f = o.$on("messageRecieved", e);
				d = o.$on("connectionHeartbeat", e);
			}
		}

		function c() {
			var e = p.getLag(),
				n = p.getAsssesment();
			t.log("Current estimated average lag: " + e + "ms"), o.$broadcast(p.events.lagUpdate, {
				lag: e,
				assessment: n
			})
		}
		var l = false,
			u = false,
			f = null,
			d = null,
			p = {
				latencyThreshold: {
					unplayable: 3e3,
					playableWithDifficulty: 300,
					playable: 0
				},
				events: {
					lagUpdate: "network.lagupdate"
				},
				getAsssesment: function() {
					var e = p,
						t = e.getLag();
					if (t > e.latencyThreshold.unplayable) {
						return e.latencyThreshold.unplayable;
					} else if (t > e.latencyThreshold.playableWithDifficulty) {
						return e.latencyThreshold.playableWithDifficulty;
					} else {
						return e.latencyThreshold.playable;
					}
				},
				getLag: function() {
					return r.getExtension("timesync").getNetworkLag()
				},
				watchNetworkWithTimeout: function(e) {
					if (!(l)) {
						l = true;
						a(e);
					}
				},
				unWatchNetworkWithTimeout: function() {
					if (l) {
						l = false;
					}
				},
				watchNetworkMessages: function() {
					if (!(u)) {
						if (f) {
							f();
							d();
							f = null;
							d = null;
							u = false;
						}
						s();
						u = true;
					}
				},
				unwatchNetworkMessages: function() {
					if (u) {
						u = false;
						if (f) {
							f();
							d();
							f = null;
							d = null;
						}
					}
				}
			};
		return p
	}
]);
angular.module("app.services.mobitroll", ["app.services.comet", "app.services.comet-ack", "app.services.comet-timesync", "ngCookies"]).factory("$mobitroll", ["$comet", "$config", "$location", "$rootScope", "$log", "$cookieStore", "$window", "$timeout", "$comet-ack", "$comet-timesync",
	function(e, t, n, r, i, o, a, s) {
		function c(e) {
			if (e.successful) {
				p.handshaked = true;
				r.$broadcast("handshakeSuccess", e);
			} else {
				r.$broadcast("handshakeFailure", e);
			}
		}

		function l(e) {
			i.log(e);
			r.$broadcast("channelFailure", e);
		}

		function u(e) {
			r.$broadcast("messageRecieved", e)
		}

		function f(e) {
			r.$broadcast("subscribed", e)
		}

		function d(t) {
			if (r.$broadcast("connectionHeartbeat", t), e.isDisconnected()) {
				p.connected = false;
				return void r.$broadcast("connectionClosed", t);
			}
			var n = p.connected;
			p.connected = t.successful === true, !n && p.connected ? r.$broadcast("connectionEstablished", t) : n && !p.connected && r.$broadcast("connectionBroken", t)
		}
		var p = {
			handshaked: false,
			connected: false,
			connect: function(t) {
				o.put("no.mobitroll.session", t);
				s(function() {
					var t = p;
					if (!(t.handshaked)) {
						e.addListener("/meta/handshake", c);
						e.addListener("/meta/connect", d);
						e.addListener("/meta/subscribe", f);
						e.addListener("/meta/unsuccessful", l);
						e.handshake();
					}
				}, 50);
			},
			disconnect: function() {
				e.disconnect(true);
				p.handshaked = false;
			},
			withComet: function(t) {
				return t(e)
			},
			redirect: function(e) {
				var t = p;
				n.path(e), t.usingWebsockets() && (r.$$phase || r.$apply())
			},
			publish: function(t, n) {
				e.publish(t, n)
			},
			subscribe: function(t) {
				return e.subscribe(t, u)
			},
			unsubscribe: function(t) {
				return e.unsubscribe(t)
			},
			usingWebsockets: function() {
				if (e.getTransport()) {
					return "websocket" === e.getTransport().getType().toLowerCase();
				} else {
					return false;
				}
			},
			ensureConnection: function() {
				var e = p;
				if (e.handshaked) {
					return false;
				} else {
					return (e.redirect("/"), true);
				}
			},
			clientId: function() {
				return e.getClientId()
			},
			isConnected: function() {
				return this.handshaked && this.connected
			},
			batch: function(t, n) {
				var r = p;
				if (t && t.length > 0) {
					var o = r.batchify(t);
					_.each(o, function(t) {
						try {
							e.batch(function() {
								_.each(t, function(e) {
									n(e)
								})
							})
						} catch (r) {
							i.warn("Something went wrong sending a cometd batch, keeping calm and carrying on. " + r.message)
						}
					})
				}
			},
			batchify: function(e) {
				for (var t = 200, n = [], r = 0; r < e.length;) {
					var i = e.slice(r, r + t);
					n.push(i), r += t
				}
				return n
			}
		};
		return p
	}
]);
angular.module("app.services.utils", ["underscore"]).factory("$utils", ["$window", "$document", "_",
	function(e, t, n) {
		var r = {
			findElemById: function(e, r) {
				return n.map(n.filter(t.find(e), function(e) {
					return r == e.id
				}), function(e) {
					return angular.element(e)
				})
			},
			hasFlash: function() {
				return "undefined" != typeof e.navigator.plugins && "object" == typeof e.navigator.plugins["Shockwave Flash"] || e.ActiveXObject && 0 != new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
			},
			isIOS: function() {
				return r.isMobile.iOS()
			},
			ordinal: function(e) {
				e = String(e);
				var t = e.substr(-Math.min(e.length, 2)) > 3 && e.substr(-Math.min(e.length, 2)) < 21 ? "th" : ["th", "st", "nd", "rd", "th"][Math.min(Number(e) % 10, 4)];
				return t
			},
			isMobile: {
				Android: function() {
					if (e.navigator.userAgent.match(/Android/i)) {
						return true;
					} else {
						return false;
					}
				},
				BlackBerry: function() {
					if (e.navigator.userAgent.match(/BlackBerry/i)) {
						return true;
					} else {
						return false;
					}
				},
				iOS: function() {
					if (e.navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
						return true;
					} else {
						return false;
					}
				},
				Windows: function() {
					if (e.navigator.userAgent.match(/IEMobile/i)) {
						return true;
					} else {
						return false;
					}
				},
				any: function() {
					return r.isMobile.Android() || r.isMobile.BlackBerry() || r.isMobile.iOS() || r.isMobile.Windows()
				}
			}
		};
		return r
	}
]);
angular.module("app.services.webpurify", ["underscore"]).factory("$webpurify", ["$http", "$log", "$config", "_",
	function(e, t, n) {
		function r(e, t) {
			var n = i("%METHOD%", e, a);
			n = i("%TEXT%", t, n);
			return n = i("%CALLBACK%", "JSON_CALLBACK", n);
		}

		function i(e, t, n) {
			var r = new RegExp(e, "g");
			return n.replace(r, t)
		}

		function o(n, r, i) {
			e.jsonp(n).success(function(e) {
				t.log(e);
				if (e.rsp && e.rsp.err) {
					if (i) {
						i(e.rsp.err["@attributes"].msg); 
					}
				} else {
					r(e);
				}
			}).error(function(e, n) {
				t.log("Error contacting profanity service, server said '" + n + "'");
				if (i) {
					i(n); 
				}
			})
		}
		var a = "//api1.webpurify.com/services/rest/?api_key=%API_KEY%&method=%METHOD%&format=json&lang=%LANG%&callback=%CALLBACK%&text=%TEXT%",
			s = "en",
			c = "",
			l = {
				check: "webpurify.live.check",
				checkcount: "webpurify.live.checkcount",
				replace: "webpurify.live.replace",
				returnProfanity: "webpurify.live.return"
			},
			u = {
				init: function(e) {
					c = e;
					a = a.replace(/%API_KEY%/g, c);
					a = a.replace(/%LANG%/g, s);
				},
				check: function(e, t) {
					var n = r(l.check, e);
					o(n, function(e) {
						var n = e.rsp.found > 0;
						t(n)
					})
				},
				checkcount: function(e, t) {
					var n = r(l.checkcount, e);
					o(n, function(e) {
						var n = e.rsp.found;
						t(n)
					})
				},
				replace: function(e, t, n) {
					var i = r(l.replace, e);
					i += "&replacesymbol=" + escape(t), o(i, function(e) {
						var t = e.rsp.text;
						n(t)
					})
				},
				returnProfanity: function(e, n) {
					var i = r(l.returnProfanity, e);
					o(i, function(e) {
						var t = e.rsp.expletive;
						n(t)
					}, function(e) {
						t.log("Error cleaning string, falling back to original: " + e);
						n(null);
					})
				}
			};
		! function() {
			u.init(n.webpurify.key);
		}();
		return u;
	}
]);
angular.module("app.services.profanityfilter", ["underscore", "app.services.webpurify"]).factory("$profanityfilter", ["$webpurify", "$log", "$config", "_",
	function(e, t, n, r) {
		var i = {
				clean: function(n, o) {
					e.returnProfanity(n, function(e) {
						var a = n;
						e && ("string" == typeof e && (e = [e]), t.log("$webpurify.returnProfanity() - " + e), r.each(e, function(e) {
							var n = new RegExp("" + e, "i"),
								r = i.getRandomWord();
							t.log("Replacing " + e + " with " + r), a = a.replace(n, i.getRandomWord())
						})), o(a)
					})
				},
				getRandomWord: function() {
					var e = Math.floor(Math.random() * o.length);
					return o[e]
				}
			},
			o = [
	"aardvark", "accordion", "accountant", "actor", "actress", "adapter", "adult", "advantage", "advertisement", "afghanistan", "africa", 
	"afternoon", "aftershave", "aeroplane", "airport", "alarm", "albatross", "algebra", "algeria", "alibi", "alley", "alligator", "alloy", "alphabet", "aluminium", "ambulance", 
	"america", "amusement", "anatomy", "anethesiologist", "angle", "animal", "ankle", "answer", "ant", "antarctica", "anteater", "antelope", "anthropology", "apartment", "apology", "apparatus", "appeal", "appendix", "apple", "appliance", "approval", "april", "aquarius", "arch", "archaeology", "archer", "architecture", "area", "argentina", "argument", "aries", "arithmetic", "arm", "armadillo", "armchair", "armenian", "army", "arrow", "art", "ash", "asia", "asparagus", "asphalt", "asterisk", "astronomy", "athlete", "atom", "attack", "attempt", "attention", "attic", "attraction", "august", "aunt", "australia", "australian", "author", "avenue", "baboon", "baby", "back", "backbone", "bacon", "badge", "badger", "bag", "bagel", "bagpipe", "bail", "bait", "baker", "bakery", "balance", "ball", "balloon", "bamboo", "banana", "band", "bandana", "bangladesh", "bangle", "banjo", "bank", "banker", "bar", "barbara", "barber", "barge", "baritone", "barometer", "base", "baseball", "basement", "basin", "basket", "basketball", "bass", "bassoon", "bat", "bath", "bathroom", "bathtub", "battery", "battle", "bay", "beach", "bead", "beam", "bean", "bear", "beard", "beast", "beat", "beautician", "beauty", "beaver", "bed", "bedroom", "bee", "beech", "beef", "beet", "beetle", "beginner", "behaviour", "belgian", "belief", "believe", "bell", "belt", "bench", "bengal", "beret", "berry", "bestseller", "betty", "bibliography", "bicycle", "bike", "bill", "billboard", "biology", "birch", "bird", "birth", "birthday", "bit", "bite", "black", "bladder", "blade", "blanket", "blinker", "blizzard", "block", "blouse", "blue", "board", "boat", "body", "bolt", "bomb", "bomber", "bone", "bongo", "bonsai", "book", "bookcase", "booklet", "boot", "border", "botany", "bottle", "bottom", "boundary", "bow", "bowl", "bowling", "box", "boy", "brace", "bracket", "brain", "brake", "branch", "brand", "brandy", "brass", "brazil", "bread", "break", "breakfast", "breath", "brian", "brick", "bridge", "british", "broccoli", "brochure", "broker", "bronze", "brother", "brother-in-law", "brow", "brown", "brush", "bubble", "bucket", "budget", "buffer", "buffet", "building", "bulb", "bull", "bulldozer", "bumper", "bun", "burglar", "burma", "burst", "bus", "bush", "business", "butcher", "butter", "button", "buzzard", "cabbage", "cabinet", "cable", "cactus", "cafe", "cake", "calculator", "calculus", "calendar", "calf", "call", "camel", "camera", "camp", "can", "canada", "canadian", "candle", "cannon", "canoe", "canvas", "cap", "capital", "capricorn", "captain", "caption", "car", "caravan", "carbon", "card", "cardboard", "cardigan", "care", "carnation", "carol", "carp", "carpenter", "carriage", "carrot", "cart", "cartoon", "case", "cast", "cat", "catamaran", "caterpillar", "cathedral", "cattle", "cauliflower", "caution", "cave", "ceiling", "celery", "cell", "cellar", "cello", "celsius", "cement", "cemetery", "cent", "centimeter", "century", "ceramic", "cereal", "certification", "chain", "chair", "chalk", "chance", "change", "channel", "character", "charles", "chauffeur", "check", "cheek", "cheese", "cheetah", "chef", "chemistry", "cheque", "cherries", "cherry", "chess", "chest", "chick", "chicken", "chief", "child", "children", "chill", "chime", "chimpanzee", "chin", "china", "chinese", "chive", "chocolate", "chord", "christmas", "christopher", "church", "cinema", "circle", "circulation", "cirrus", "citizenship", "city", "clam", "clarinet", "class", "claus", "clave", "clef", "clerk", "click", "client", "climb", "clipper", "cloakroom", "clock", "close", "closet", "cloth", "cloud", "cloudy", "clover", "club", "clutch", "coach", "coal", "coast", "coat", "cobweb", "cockroach", "cocktail", "cocoa", "cod", "coffee", "coil", "coin", "coke", "cold", "collar", "college", "collision", "colombia", "colour", "colt", "column", "columnist", "comb", "comfort", "comic", "comma", "command", "commission", "committee", "community", "company", "comparison", "competition", "competitor", "composer", "composition", "computer", "condition", "condor", "cone", "confirmation", "conga", "congo", "conifer", "connection", "consonant", "continent", "control", "cook", "cooking", "copper", "copy", "copyright", "cord", "cork", "cormorant", "corn", "cornet", "correspondent", "cost", "cotton", "couch", "cough", "country", "course", "court", "cousin", "cover", "cow", "cowbell", "crab", "crack", "cracker", "craftsman", "crate", "crayfish", "crayon", "cream", "creator", "creature", "credit", "creditor", "creek", "crib", "cricket", "crime", "criminal", "crocodile", "crocus", "croissant", "crook", "crop", "cross", "crow", "crowd", "crown", "crush", "cry", "cub", "cuban", "cucumber", "cultivator", "cup", "cupboard", "cupcake", "currency", "current", "curtain", "curve", "cushion", "custard", "customer", "cut", "cycle", "cyclone", "cylinder", "cymbal", "dad", "daffodil", "daisy", "damage", "dance", "dancer", "danger", "daniel", "dash", "dashboard", "database", "date", "daughter", "david", "day", "deadline", "deal", "deborah", "debt", "debtor", "decade", "december", "decimal", "decision", "decrease", "dedication", "deer", "defense", "deficit", "degree", "delete", "delivery", "den", "denim", "dentist", "deodorant", "department", "deposit", "description", "desert", "design", "desire", "desk", "dessert", "destruction", "detail", "detective", "development", "dew", "diamond", "diaphragm", "dibble", "dictionary", "dietician", "difference", "digestion", "digger", "digital", "dill", "dime", "dimple", "dinghy", "dinner", "dinosaur", "diploma", "dipstick", "direction", "disadvantage", "discovery", "discussion", "disgust", "dish", "distance", "distributor", "diving", "division", "dock", "doctor", "dog", "doll", "dollar", "dolphin", "domain", "donald", "donkey", "donna", "door", "dorothy", "double", "doubt", "downtown", "dragon", "dragonfly", "drain", "drake", "drama", "draw", "drawbridge", "drawer", "dream", "dress", "dresser", "dressing", "drill", "drink", "drive", "driver", "driving", "drizzle", "drop", "drug", "drum", "dry", "dryer", "duck", "duckling", "dugout", "dungeon", "dust", "eagle", "ear", "earth", "earthquake", "ease", "east", "edge", "editor", "editorial", "education", "edward", "eel", "effect", "egg", "eggnog", "eggplant", "egypt", "eight", "elbow", "element", "elephant", "elizabeth", "ellipse", "employee", "employer", "encyclopedia", "end", "enemy", "energy", "engine", "engineer", "english", "entrance", "environment", "equinox", "equipment", "era", "error", "estimate", "ethernet", "ethiopia", "europe", "evening", "event", "examination", "example", "exchange", "exclamation", "exhaust", "expert", "explanation", "eye", "eyebrow", "eyelash", "eyeliner", "face", "fact", "factory", "fahrenheit", "fairies", "fall", "family", "fan", "fang", "farm", "farmer", "father", "faucet", "fear", "feast", "feather", "feature", "february", "feedback", "feeling", "feet", "female", "ferry", "ferryboat", "fertiliser", "fiber", "fiberglass", "fibre", "fiction", "field", "fifth", "fight", "fighter", "file", "find", "fine", "finger", "fir", "fire", "fireman", "fireplace", "firewall", "fish", "fisherman", "flag", "flame", "flare", "flat", "flavour", "flesh", "flight", "flock", "flood", "floor", "flower", "flute", "fly", "foam", "fog", "fold", "font", "food", "foot", "football", "footnote", "force", "forecast", "forehead", "forest", "forgery", "fork", "form", "format", "fortnight", "foundation", "fountain", "fowl", "fox", "fragrance", "frame", "france", "freckle", "freeze", "freezer", "french", "friction", "friday", "fridge", "friend", "frog", "front", "frost", "frown", "fruit", "fuel", "fur", "furniture", "galley", "gallon", "game", "garage", "garden", "garlic", "gas", "gasoline", "gate", "gateway", "gauge", "gazelle", "gear", "geese", "gemini", "geography", "geology", "geometry", "george", "geranium", "german", "germany", "ghana", "ghost", "giant", "giraffe", "girl", "glass", "glider", "gliding", "glockenspiel", "glove", "glue", "goal", "goat", "gold", "goldfish", "golf", "gondola", "gong", "good-bye", "goose", "gorilla", "gosling", "government", "governor", "grade", "grain", "gram", "granddaughter", "grandfather", "grandmother", "grandson", "grape", "graphic", "grass", "grasshopper", "gray", "grease", "greece", "greek", "green", "grey", "grill", "grip", "ground", "group", "grouse", "growth", "guarantee", "guatemalan", "guide", "guilty", "guitar", "gum", "gym", "gymnast", "hail", "hair", "haircut", "halibut", "hall", "hallway", "hamburger", "hammer", "hamster", "hand", "handball", "handle", "harbor", "hardboard", "hardcover", "hardhat", "hardware", "harmonica", "harmony", "harp", "hat", "hawk", "head", "headlight", "headline", "health", "hearing", "heart", "heat", "heaven", "hedge", "height", "helen", "helicopter", "helium", "hell", "help", "hemp", "hen", "heron", "herring", "hexagon", "hill", "himalayan", "hip", "hippopotamus", "history", "hobbies", "hockey", "hole", "holiday", "home", "honey", "hood", "hook", "hope", "horn", "horse", "hose", "hospital", "hot", "hour", "hourglass", "house", "hovercraft", "hub", "hubcap", "humidity", "humour", "hurricane", "hyacinth", "hydrant", "hydrogen", "hyena", "hygienic", "ice", "icebreaker", "icicle", "icon", "idea", "ikebana", "illegal", "improvement", "impulse", "inch", "income", "increase", "index", "india", "indonesia", "industry", "ink", "innocent", "input", "insect", "instruction", "instrument", "insurance", "interactive", "interest", "internet", "interviewer", "intestine", "invention", "invoice", "iran", "iraq", "iris", "iron", "island", "israel", "italian", "italy", "jacket", "jaguar", "jam", "james", "january", "japan", "japanese", "jar", "jasmine", "jason", "jaw", "jeans", "jeep", "jeff", "jelly", "jellyfish", "jennifer", "jet", "jewel", "jogging", "john", "join", "joke", "joseph", "journey", "judge", "judo", "juice", "july", "jumbo", "jump", "jumper", "june", "jury", "justice", "kamikaze", "kangaroo", "karate", "karen", "kayak", "kendo", "kenneth", "kenya", "ketchup", "kettle", "kevin", "key", "keyboard", "kick", "kidney", "kilogram", "kilometer", "kimberly", "kiss", "kitchen", "kite", "kitten", "kitty", "knee", "knickers", "knight", "knot", "knowledge", "korean", "lace", "ladybug", "lake", "lamb", "lamp", "land", "language", "lasagna", "latency", "latex", "laugh", "laundry", "laura", "law", "lawyer", "layer", "lead", "leaf", "learning", "leather", "leek", "leg", "legal", "lemonade", "lentil", "leo", "leopard", "letter", "lettuce", "level", "libra", "library", "license", "lift", "light", "lightning", "lilac", "lily", "limit", "linda", "line", "linen", "link", "lion", "lip", "lipstick", "liquid", "liquor", "lisa", "literature", "litter", "liver", "lizard", "llama", "loaf", "loan", "lobster", "lock", "locket", "locust", "look", "loss", "lotion", "love", "low", "lumber", "lunch", "lunchroom", "lung", "lycra", "lynx", "lyric", "macaroni", "machine", "magazine", "magic", "magician", "maid", "mail", "mailbox", "mailman", "makeup", "malaysia", "male", "mall", "mallet", "man", "manager", "mandolin", "manicure", "map", "maple", "maraca", "marble", "march", "margaret", "margin", "maria", "mark", "market", "married", "mary", "mascara", "mask", "mass", "match", "math", "may", "mayonnaise", "meal", "measure", "meat", "mechanic", "medicine", "meeting", "melody", "memory", "men", "menu", "mercury", "message", "metal", "meteorology", "meter", "mexican", "mexico", "mice", "michael", "michelle", "microwave", "middle", "mile", "milk", "milkshake", "millennium", "millimeter", "millisecond", "mind", "mine", "minibus", "mini-skirt", "minister", "mint", "minute", "mirror", "missile", "mist", "mistake", "mitten", "moat", "modem", "mole", "mum", "monday", "money", "monkey", "month", "moon", "morning", "morocco", "mosque", "mosquito", "mother", "motion", "motorboat", "motorcycle", "mountain", "mouse", "moustache", "mouth", "move", "multimedia", "muscle", "museum", "music", "musician", "mustard", "myanmar", "nail", "name", "nancy", "napkin", "nation", "neck", "need", "needle", "neon", "nepal", "nephew", "nerve", "nest", "net", "network", "news", "newsprint", "newsstand", "niece", "nigeria", "night", "nitrogen", "node", "noise", "noodle", "north", "north america", "north korea", "norwegian", "nose", "note", "notebook", "notify", "novel", "november", "number", "numeric", "nurse", "nut", "nylon", "oak", "oatmeal", "objective", "oboe", "observation", "occupation", "ocean", "octagon", "octave", "october", "octopus", "offence", "offer", "office", "oil", "okra", "olive", "onion", "open", "opera", "operation", "opinion", "option", "orange", "orchestra", "orchid", "order", "organ", "organisation", "ornament", "ostrich", "otter", "ounce", "output", "oval", "oven", "overcoat", "owl", "owner", "ox", "oxygen", "oyster", "package", "packet", "page", "pail", "pain", "paint", "pair", "pakistan", "palm", "pamphlet", "pan", "pancake", "pancreas", "panda", "pansy", "panther", "pantry", "pants", "paper", "paperback", "parade", "parallelogram", "parcel", "parent", "parentheses", "park", "parrot", "parsnip", "part", "particle", "partner", "partridge", "party", "passbook", "passenger", "passive", "pasta", "paste", "pastor", "pastry", "patch", "path", "patient", "patio", "patricia", "paul", "payment", "pea", "peace", "peak", "peanut", "pear", "pedestrian", "pediatrician", "pelican", "pen", "penalty", "pencil", "pendulum", "pentagon", "pepper", "perch", "perfume", "period", "periodical", "peripheral", "permission", "persian", "person", "peru", "pest", "pet", "pharmacist", "pheasant", "philippines", "philosophy", "phone", "physician", "piano", "piccolo", "pickle", "picture", "pie", "pig", "pigeon", "pike", "pillow", "pilot", "pimple", "pin", "pine", "ping", "pink", "pint", "pipe", "pisces", "pizza", "place", "plain", "plane", "planet", "plant", "plantation", "plaster", "plasterboard", "plastic", "plate", "platinum", "play", "playground", "playroom", "pleasure", "plier", "plot", "plough", "plow", "plywood", "pocket", "poet", "point", "poison", "poland", "police", "policeman", "polish", "politician", "pollution", "polo", "polyester", "pond", "popcorn", "poppy", "population", "porch", "porcupine", "port", "porter", "position", "possibility", "postage", "postbox", "pot", "potato", "poultry", "pound", "powder", "power", "precipitation", "preface", "prepared", "pressure", "price", "priest", "print", "printer", "prison", "probation", "process", "processing", "produce", "product", "production", "professor", "profit", "promotion", "propane", "property", "prose", "prosecution", "protest", "protocol", "pruner", "psychiatrist", "psychology", "puffin", "pull", "puma", "pump", "pumpkin", "punch", "punishment", "puppy", "purchase", "purple", "purpose", "push", "pyjama", "pyramid", "quail", "quality", "quart", "quarter", "quartz", "queen", "question", "quicksand", "quiet", "quill", "quilt", "quit", "quiver", "quotation", "rabbi", "rabbit", "racing", "radar", "radiator", "radio", "radish", "raft", "rail", "railway", "rain", "rainbow", "raincoat", "rainstorm", "rake", "random", "range", "rat", "rate", "raven", "ravioli", "ray", "rayon", "reaction", "reading", "reason", "receipt", "recess", "record", "recorder", "rectangle", "red", "reduction", "refrigerator", "refund", "regret", "reindeer", "relation", "relative", "religion", "relish", "reminder", "repair", "replace", "report", "representative", "request", "resolution", "respect", "responsibility", "rest", "restaurant", "result", "retailer", "revolve", "revolver", "reward", "rhinoceros", "rhythm", "rice", "richard", "riddle", "ring", "rise", "risk", "river", "riverbed", "road", "roadway", "roast", "robert", "robin", "rock", "rocket", "rod", "roll", "romania", "romanian", "ronald", "roof", "room", "rooster", "root", "rose", "rotate", "route", "router", "rowboat", "rub", "rubber", "rugby", "rule", "run", "russia", "russian", "ruth", "sack", "sagittarius", "sail", "sailboat", "sailor", "salad", "salary", "sale", "salesman", "salmon", "salt", "samurai", "sand", "sandra", "sandwich", "santa", "sarah", "sardine", "satin", "saturday", "sauce", "saudi arabia", "sausage", "save", "saw", "saxophone", "scale", "scallion", "scanner", "scarecrow", "scarf", "scene", "scent", "schedule", "school", "science", "scissors", "scooter", "scorpio", "scorpion", "scraper", "screen", "screw", "screwdriver", "sea", "seagull", "seal", "seaplane", "search", "seashore", "season", "seat", "second", "secretary", "secure", "security", "seed", "seeder", "segment", "select", "selection", "self", "sense", "sentence", "separated", "september", "servant", "server", "session", "shade", "shadow", "shake", "shallot", "shame", "shampoo", "shape", "share", "shark", "sharon", "shears", "sheep", "sheet", "shelf", "shell", "shield", "shingle", "ship", "shirt", "shock", "shoe", "shoemaker", "shop", "shorts", "shoulder", "shovel", "show", "shrimp", "shrine", "siamese", "siberian", "side", "sideboard", "sidecar", "sidewalk", "sign", "signature", "silica", "silk", "silver", "sing", "singer", "single", "sink", "sister", "size", "skate", "skiing", "skill", "skin", "skirt", "sky", "slash", "slave", "sled", "sleep", "sleet", "slice", "slime", "slip", "slipper", "slope", "smash", "smell", "smile", "smoke", "snail", "snake", "sneeze", "snow", "snowboarding", "snowflake", "snowman", "snowplow", "snowstorm", "soap", "soccer", "society", "sociology", "sock", "soda", "sofa", "softball", "softdrink", "software", "soil", "soldier", "son", "song", "soprano", "sort", "sound", "soup", "south africa", "south america", "south korea", "soy", "soybean", "space", "spade", "spaghetti", "spain", "spandex", "spark", "sparrow", "spear", "specialist", "speedboat", "sphere", "sphynx", "spider", "spike", "spinach", "spleen", "sponge", "spoon", "spot", "spring", "sprout", "spruce", "spy", "square", "squash", "squid", "squirrel", "stage", "staircase", "stamp", "star", "start", "starter", "state", "statement", "station", "statistic", "steam", "steel", "stem", "step", "steven", "stew", "stick", "stinger", "stitch", "stock", "stocking", "stomach", "stone", "stool", "stop", "stopsign", "stopwatch", "store", "storm", "story", "stove", "stranger", "straw", "stream", "street", "streetcar", "stretch", "string", "structure", "study", "sturgeon", "submarine", "substance", "subway", "success", "sudan", "suede", "sugar", "suggestion", "suit", "summer", "sun", "sunday", "sundial", "sunflower", "sunshine", "supermarket", "supply", "support", "surfboard", "surgeon", "surname", "surprise", "susan", "sushi", "swallow", "swamp", "swan", "sweater", "sweatshirt", "sweatshop", "swedish", "sweets", "swim", "swimming", "swing", "swiss", "switch", "sword", "swordfish", "sycamore", "syria", "syrup", "system", "table", "tablecloth", "tabletop", "tadpole", "tail", "tailor", "taiwan", "talk", "tank", "tanker", "tanzania", "target", "taste", "taurus", "tax", "taxi", "taxicab", "tea", "teacher", "teaching", "team", "technician", "teeth", "television", "temper", "temperature", "temple", "tempo", "tendency", "tennis", "tenor", "tent", "territory", "test", "text", "textbook", "texture", "thailand", "theater", "theory", "thermometer", "thing", "thistle", "thomas", "thought", "thread", "thrill", "throat", "throne", "thumb", "thunder", "thunderstorm", "thursday", "ticket", "tie", "tiger", "tights", "tile", "time", "timer", "tin", "tip", "tire", "titanium", "title", "toad", "toast", "toe", "toenail", "toilet", "tomato", "ton", "tongue", "tooth", "toothbrush", "toothpaste", "top", "tornado", "tortellini", "tortoise", "touch", "tower", "town", "toy", "tractor", "trade", "traffic", "trail", "train", "tramp", "transaction", "transmission", "transport", "trapezoid", "tray", "treatment", "tree", "trial", "triangle", "trick", "trigonometry", "trip", "trombone", "trouble", "trousers", "trout", "trowel", "truck", "trumpet", "trunk", "t-shirt", "tsunami", "tub", "tuba", "tuesday", "tugboat", "tulip", "tuna", "tune", "turkey", "turkish", "turn", "turnip", "turnover", "turret", "turtle", "tv", "twig", "twilight", "twist", "typhoon", "uganda", "ukraine", "ukrainian", "umbrella", "uncle", "underclothes", "underpants", "undershirt", "underwear", "unit", "united kingdom", "unshielded", "use", "utensil", "uzbekistan", "vacation", "vacuum", "valley", "value", "van", "vase", "vault", "vegetable", "vegetarian", "veil", "vein", "velvet", "venezuela", "venezuelan", "verdict", "vermicelli", "verse", "vessel", "vest", "veterinarian", "vietnam", "view", "vinyl", "viola", "violet", "violin", "virgo", "viscose", "vise", "vision", "visitor", "voice", "volcano", "volleyball", "voyage", "vulture", "waiter", "waitress", "walk", "wall", "wallaby", "wallet", "walrus", "war", "warm", "wash", "washer", "wasp", "waste", "watch", "watchmaker", "water", "waterfall", "wave", "wax", "way", "wealth", "weapon", "weasel", "weather", "wedge", "wednesday", "weed", "weeder", "week", "weight", "whale", "wheel", "whip", "whiskey", "whistle", "white", "wholesaler", "wilderness", "william", "willow", "wind", "windchime", "window", "windscreen", "windshield", "wine", "wing", "winter", "wire", "wish", "witch", "withdrawal", "witness", "wolf", "woman", "women", "wood", "wool", "woolen", "word", "work", "workshop", "worm", "wound", "wren", "wrench", "wrinkle", "wrist", "writer", "xylophone", "yacht", "yak", "yam", "yard", "yarn", "year", "yellow", "yew", "yogurt", "yoke", "yugoslavian", "zebra", "zephyr", "zinc", "zipper", "zone", "zoo"];
		return i;
	}
]);
angular.module("app.services.countdown", ["underscore"]).factory("$countdown", ["$rootScope", "$log", "$timeout", "_",
	function(e, t, n, r) {
		e.$on("$routeChangeStart", function() {
			i.killAll()
		});
		var i = {
			countdowns: [],
			registerCountdown: function(t, i, o) {
				var a = {
						id: t || Math.random(),
						countdownStep: o || 1e3,
						timeoutId: null,
						duration: i,
						counter: i,
						onCount: function() {
							var t = a;
							if (t.counter > 0) {
								t.counter--;
								t.timeoutId = n(t.onCount, t.countdownStep);
								e.$broadcast("countdown", {
									id: t.id,
									timeLeft: t.counter
								});
							} else {
								t.stop();
							}
						},
						stop: function(t) {
							if ("undefined" != typeof t) {
								t = t;
							} else {
								t = true;
							}
							var r = a;
							if (r.timeoutId) {
								n.cancel(r.timeoutId);
								r.timeoutId = null;
								if (t) {
									e.$broadcast("countdownStopped", {
										id: r.id,
										timeLeft: r.counter
									})
								}
							}
						},
						start: function() {
							var t = a;
							t.timeoutId = n(t.onCount, t.countdownStep), e.$broadcast("countdownStarted", {
								id: t.id,
								timeLeft: t.counter
							})
						},
						reset: function() {
							var e = a;
							e.counter = i
						},
						restart: function(e) {
							var t = a;
							t.stop(e);
							t.reset();
							t.start();
						}
					},
					s = r.find(this.countdowns, function(e) {
						return e.id === a.id
					});
				if (s) {
					return (s.stop(), s.countdownStep = a.countdownStep, s.duration = a.duration, s.counter = a.counter, s);
				} else {
					return (this.countdowns.push(a), a);
				}
			},
			killAll: function() {
				var e = i;
				r.each(e.countdowns, function(e) {
					e.stop(false)
				})
			}
		};
		return i
	}
]);
angular.module("underscore", []).factory("_", [

	function() {
		return _ || void 0
	}
]);
angular.module("app.services.preloader", ["underscore"]).factory("$preloader", ["_", "$log", "$timeout", "$rootScope",
	function(e, t, n, r) {
		function i(e, t, r, i, o) {
			var a = 0;
			! function() {
				var s = t.length - a,
					c = s >= r ? r : s;
				if (a < t.length) {
					for (; c--;) e(t[a++]);
					n(arguments.callee, i)
				} else if (o) {
					o();
				}
			}()
		}

		function o(e, n) {
			var r = 0;
			i(function(i) {
				n[i] = new Image;
				n[i].onload = function() {
					r++;
					t.log("Preloaded " + i + " (" + r + " of " + e.length + ").");
					a(r, e.length);
				};
				n[i].src = i;
			}, e, 1, 250, function() {
				t.log("Preloading complete.");
				a(r, e.length, true);
			})
		}

		function a(e, t, n) {
			if (n) {
				r.$broadcast("imageLoadingComplete", {
					loaded: e,
					of: t,
					progress: 100
				});
			} else {
				r.$broadcast("imageLoaded", {
					loaded: e,
					of: t,
					progress: Math.round(e / t * 100)
				});
			}
		}
		var s = {
			fetchImages: function(n, r) {
				if (r) {
					(n = e.map(n, function(e) {
						return r + e
					}));
				}
				var i = e.uniq(n);
				i = e.compact(i);
				t.log("Preloading " + i.length + " images...");
				if (i.length > 0) {
					o(e.uniq(i), []);
				}
			}
		};
		return s
	}
]);
angular.module("app.services.session", []).factory("$session", ["$config", "$location", "$rootScope", "$log", "$http", "$authentication",
	function(e, t, n, r, i, o) {
		function a() {
			if (e.session.api) {
				return i.post(e.session.api + "/?" + (new Date).getTime(), null, {
					headers: o.oAuthHeaders(),
					transformResponse: function(e) {
						return angular.fromJson(e)
					}
				});
			} else {
				return (r.log("No reservation server API"), null);
			}
		}
		var s = {
			reserve: function(e, t) {
				var n = a();
				if (n) {
					n.success(function(t) {
						e(t)
					}).error(t);
				}
			},
			exists: function(t, n) {
				var r = e.session.api + "/test/" + t + "/?" + (new Date).getTime(),
					a = i.get(r, {
						headers: o.oAuthHeaders()
					});
				a.success(function(e, t) {
					if (n) {
						if ("true" === e) {
							n(true, t);
						} else {
							n(false, t);
						}
					}
				});
				a.error(function(e, t) {
					if (n) {
						n(false, t);
					}
				});
				return a;
			}
		};
		return s
	}
]);
angular.module("app.services.random", []).factory("$random", [

	function() {
		function e(e, t) {
			var o = [];
			e = i(r(t ? [e, a] : arguments.length ? e : [(new Date).getTime(), a, window], 3), o);
			p = new n(o);
			i(p.S, a);
			return e;
		}

		function t() {
			for (var e = p.g(c), t = f, n = 0; l > e;) {
				e = (e + n) * s;
				t *= s;
				n = p.g(1);
			}
			for (; e >= u;) {
				e /= 2;
				t /= 2;
				n >>>= 1;
			}
			return (e + n) / t;
		}

		function n(e) {
			var t, n, r = this,
				i = e.length,
				a = 0,
				c = r.i = r.j = r.m = 0;
			for (r.S = [], r.c = [], i || (e = [i++]); s > a;) r.S[a] = a++;
			for (a = 0; s > a; a++) {
				t = r.S[a];
				c = o(c + t + e[a % i]);
				n = r.S[c];
				r.S[a] = n;
				r.S[c] = t;
			}
			r.g = function(e) {
				var t = r.S,
					n = o(r.i + 1),
					i = t[n],
					a = o(r.j + i),
					c = t[a];
				t[n] = c, t[a] = i;
				for (var l = t[o(i + c)]; --e;) {
					n = o(n + 1);
					i = t[n];
					a = o(a + i);
					c = t[a];
					t[n] = c;
					t[a] = i;
					l = l * s + t[o(i + c)];
				}
				r.i = n;
				r.j = a;
				return l;
			}, r.g(s)
		}

		function r(e, t, n, i, o) {
			n = [];
			o = typeof e;
			if (t && o == "object")
				for (i in e)
					if (i.indexOf("S") < 5) try {
						n.push(r(e[i], t - 1))
					} catch (a) {}
			if (n.length) {
				return n;
			} else {
				return e + ("string" != o ? "\x00" : "");
			}
		}

		function i(e, t, n, r) {
			e += "";
			n = 0;
			for (r = 0; r < e.length; r++) {
				t[o(r)] = o((n ^= 19 * t[o(r)]) + e.charCodeAt(r));
			}
			e = "";
			for (r in t) e += String.fromCharCode(t[r]);
			return e
		}

		function o(e) {
			return e & s - 1
		}
		var a = [],
			s = 256,
			c = 6,
			l = Math.pow(2, 52),
			u = 2 * l,
			f = Math.pow(s, c),
			d = [],
			p = null;
		i(Math.random(), a);
		var h = {
			seed: function(t, n) {
				return e(t, n)
			},
			random: function() {
				return t()
			},
			pushseed: function() {},
			popseed: function() {
				if (d.length) {
					return d.pop();
				} else {
					return null;
				}
			}
		};
		return h
	}
]);
angular.module("app.services.lang", ["ngResource", "underscore"]).factory("$lang", ["$rootScope", "$resource", "$timeout",
	function(e, t) {
		var n = {
			language: "en_gb",
			setLanguage: function(e) {
				n.language = e
			},
			getContent: function() {
				var r = t("/theme/lang/" + n.language + ".json"),
					i = {};
				r.get(function(t) {
					for (var n in t) {
						var r = t[n];
						if ("$" != n.substring(0, 1)) {
							i[n] = r;
						}
					}
					e.siteAppContent = i, e.$broadcast("loadContentSuccess")
				}, function() {
					e.$broadcast("loadContentFailed")
				})
			}
		};
		return n
	}
]);
angular.module("app.services.quiz", ["underscore"]).factory("$quiz", ["$config", "$log", "$http", "_", "$authentication", "$q",
	function(e, t, n, r, i, o) {
		function a(t) {
			var o = e.usergrid.server + "/kahoots/" + t;
			return n.get(o, {
				headers: i.oAuthHeaders(),
				transformResponse: function(t) {
					var n = angular.fromJson(t);
					n.cover = e.mapImageUrl(n.cover);
					r.each(n.questions, function(t) {
						t.image = e.mapImageUrl(t.image)
					});
					return n;
				}
			})
		}
		var s = {
			all: function() {
				return a()
			},
			byId: function(e, t, n) {
				a(e).success(function(e) {
					var n = e;
					t(n)
				}).error(n)
			},
			byIdList: function(e) {
				return o.all(r.map(e, function(e) {
					return a(e)
				}))
			},
			favouriteQuiz: function(t, r, o) {
				if (i.currentUser()) {
					var a = e.usergrid.server + "/users/" + i.currentUser().uuid + "/favourites/kahoot/" + t;
					n.post(a, null, {
						headers: i.oAuthHeaders()
					}).success(function() {
						r()
					}).error(o)
				}
			},
			coverImageOrPlaceholder: function(t) {
				if (t.cover) {
					return e.mapImageUrl(t.cover);
				} else {
					return "//kahoot-static-assets.s3.amazonaws.com/covers/placeholder_cover_" + (t.quizType || "quiz") + ".jpg";
				}
			},
			quizTypes: {
				quiz: {
					showTitle: true,
					showQuestionNumbers: true,
					showScore: true,
					showRandomise: true,
					showSocial: true,
					pointQuestions: true,
					pointlessQuestions: true
				},
				survey: {
					showTitle: true,
					showQuestionNumbers: true,
					showScore: false,
					showRandomise: false,
					showSocial: false,
					pointQuestions: false,
					pointlessQuestions: true
				},
				poll: {
					showTitle: false,
					showQuestionNumbers: false,
					showScore: false,
					showRandomise: false,
					showSocial: true,
					pointQuestions: false,
					pointlessQuestions: true
				}
			}
		};
		return s
	}
]);
angular.module("app.services.ios7fixes", ["ng"]).factory("$ios7fixes", ["$window",
	function(e) {
		if (e.navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
			$("html").addClass("ipad ios7")
		}
		if (e.navigator.userAgent.indexOf("CriOS") >= 0) {
			$("html").addClass("chromeios")
		}
		if (e.navigator.standalone) {
			$("html").addClass("standalone")
		}
		return null;
	}
]);
angular.module("app.services.lq.analytics", ["ng"]).factory("$analytics", ["$rootScope", "$window", "$location",
	function(e, t) {
		function n() {
			var e = t.document.location.pathname + t.document.location.search + t.document.location.hash;
			if (-1 == e.toLowerCase().indexOf("token")) {
				if (t._gaq) {
					t._gaq.push(["_trackPageview", e])
				}
				if (t.ga) {
					t.ga("send", "pageview", e)
				}
			}
		}

		function r(e, n, r, i) {
			if (t._gaq) {
				t._gaq.push(["_trackEvent", e, n, r, i]); 
			}
			if (t.ga) {
				t.ga("send", "event", e, n, r, i); 
			}
		}

		function i(e, n, r) {
			var i = 1;
			t._gaq && t._gaq.push(["_trackEvent", "connection", n, angular.toJson(r), i]), t.ga && t.ga("send", "event", "connection." + e, n, angular.toJson(r), i, {
				nonInteraction: 1
			})
		}
		var o = {
			trackCurrentPage: function() {
				n()
			},
			trackCustom: function(e, t, n, i) {
				r(e, t, n, i)
			},
			trackConnection: i
		};
		return o
	}
]);
angular.module("app.directives.loader", []).directive("loader", function() {
	return {
		link: function(e, t) {
			t.css("display", "none")
		}
	}
});
angular.module("app.directives.debug", ["app.services.network", "app.services.config", "underscore"]).directive("debugInfo", ["$config", "$network", "_",
	function(e, t, n) {
		return {
			link: function(r, i, o) {
				function a(e, t) {
					var n = i,
						r = '<span class="seq">[T' + c() + "]</span> ",
						o = $('<p class="debug-msg">' + (u ? r : "") + e + "</p>");
					o.css("opacity", 0), t && n.html("");
					var a = $("p", i[0]).length;
					if (a >= f) {
						$($("p", i[0])[0]).remove();
					}
					n.append(o);
					o.animate({
						opacity: 1
					}, 600);
				}

				function s(e, t) {
					for (var n = "" + e; n.length < t;) n = "0" + n;
					return n
				}

				function c() {
					var e = new Date,
						t = s(e.getHours(), 2),
						n = s(e.getMinutes(), 2),
						r = s(e.getSeconds(), 2),
						i = s(e.getMilliseconds(), 3),
						o = t + ":" + n + ":" + r + ":" + i;
					return o
				}
				var l = [],
					u = "string" == typeof o.debugTimestamp || false,
					f = parseInt(o.maxRows);
				isNaN(f) && (f = 3), "string" == typeof o.debugInfo && o.debugInfo.length > 0 && (l = o.debugInfo.split(","));
				var d = l.length > 0 && n.some(l, function(t) {
					return t === e.environment
				});
				if (d) {
					i.css("display", "block");
					a("Debug info enabled...");
					a("Env: " + e.environment);
					r.$on(t.events.lagUpdate, function() {
						a("Lag: " + t.getLag() + "ms");
					});
					r.$on("debug", function(e, t) {
						a("Debug: " + t);
					});
				}
			}
		}
	}
]);
angular.module("app.directives.notifications", []).directive("alerts", ["$timeout",
	function(e) {
		function t(e, t, n, r) {
			return "<div id=" + n + ' class="alert ' + e + '">' + (r ? '<div class="close_icon"></div>' : "") + '<i class="icon"></i><div class="msg">' + t + '</div><span class="logo"></span></div>'
		}

		function n(e) {
			return '<div id="waitOverlay" class="alert-fullscreen valignwrapper"><div class="alert-spinner valign"><div class="spinner"></div><div class="spinner-message">' + e + "</div></div></div>"
		}
		var r = {
				error: "alert-error",
				info: "alert-info",
				warning: "",
				success: "alert-success"
			},
			i = 0,
			o = 0,
			a = {};
		return {
			link: function(s, c, l) {
				var u = parseInt(l.fadeDuration);
				if (isNaN(u)) {
					u = 500;
				}
				var f = parseInt(l.slideDuration);
				if (isNaN(f)) {
					f = 250;
				}
				s.$on("clearWait", function(e, t) {
					if (!i || t && t.level && t.level >= i) {
						i = 0;
						var n = $("#waitOverlay", c[0]).animate({
							opacity: 0
						}, u, "linear", function() {
							n.remove()
						})
					}
				});
				s.$on("dismissAlert", function(e, t) {
					var n = $("#" + t.key, c[0]).animate({
						opacity: 0
					}, u, "linear", function() {
						n.remove()
					})
				});
				s.$on("dismissAllNotifications", function(e, t) {
					s.$broadcast("clearWait");
					if (!o || t && t.level && t.level >= o) {
						o = 0;
						var n = $(".alert", c[0]).animate({
							opacity: 0
						}, u, "linear", function() {
							n.remove()
						})
					}
				});
				s.$on("wait", function(e, t) {
					var r = c[0],
						o = "#waitOverlay";
					if (t.level && i < t.level && (i = t.level), 0 == $(o, r).length || $(o, r).css("opacity") < 1) {
						var a = $(n(t.message)),
							s = new Spinner(kahoot.theme.current.controller.spinner).spin();
						a.find(".spinner").append(s.el), c.prepend(a)
					} else {
						var l = $(o + " .spinner-message", r);
						l.html(t.message)
					}
				});
				s.$on("alert", function(n, i) {
					if (0 == $("#" + i.key, c[0]).length || $("#" + i.key, c[0]).css("opacity") < 1) {
						if (i.level && o < i.level) {
							o = i.level;
						}
						var s = 99999,
							l = $(t(r[i.alertType], i.message, i.key, i.userDismissable));
						if (i.level > 0) {
							l.css("z-index", s + i.level);
						} else {
							l.css("z-index", s + 1);
						}
						c.append(l);
						if (i.logo) {
							l.addClass("with-logo");
						}
						l.css("bottom", -(l.height() + 10));
						l.animate({
							bottom: 0
						}, f, easings.easeOut);
						if (i.userDismissable) {
							l.bind("click", function() {
								var e = $(this);
								e.animate({
									opacity: 0
								}, u, "linear", function() {
									e.remove()
								})
							});
						}
					} else {
						var l = $("#" + i.key, c[0]);
						i.logo && l.addClass("with-logo"), l.find(".msg").text(i.message)
					} if (i.autoDismiss) {
						var l = l || $("#" + i.key),
							d = i.autoDismiss.delay || 4e3;
						a[i.key] && e.cancel(a[i.key]), a[i.key] = e(function() {
							l.animate({
								opacity: 0
							}, u, "linear", function() {
								l.remove();
								delete a[i.key];
							})
						}, d)
					} else if (a[i.key]) {
						e.cancel(a[i.key]);
					}
				});
			}
		}
	}
]);
angular.module("app.directives.blocking", []).directive("blocking", function() {
	return function(e, t, n) {
		var r = "disabled";
		e.$on("busy", function() {
			if (!(t.hasClass(r))) {
				t.addClass(r);
				t.prop("disabled", true);
				if ("" !== n.blocking) {
					e.prevHtml = t.html();
					t.html(n.blocking);
				}
			}
		}), e.$on("free", function() {
			t.removeClass(r);
			t.prop("disabled", false);
			if (e.prevHtml) {
				t.html(e.prevHtml);
			}
		})
	}
});
angular.module("app.directives.placeholder", []).directive("placeholder", ["$rootScope",
	function() {
		return function(e, t) {
			$(t).placeholder()
		}
	}
]);
angular.module("app.services.sanitize", []).value("sanitize", mobitroll.sanitize);
angular.module("app.directives.sanitize", ["app.services.sanitize"]).directive("bindHtml", ["sanitize",
	function(e) {
		return function(t, n, r) {
			n.addClass("ng-binding").data("$binding", r.bindHtml);
			t.$watch(r.bindHtml, function(t) {
				if (e) {
					t = e.removeDangerousTags(t);
				} 
				else {
					t = "";
				}
				n.html(t || "");
			});
		}
	}
]).directive("bindHtmlEscaped", ["sanitize",
	function(e) {
		return function(t, n, r) {
			n.addClass("ng-binding").data("$binding", r.bindHtml);
			t.$watch(r.bindHtmlEscaped, function(t) {
				if (e) {
					t = e.escapeTags(t);
				} 
				else {
					t = "";
				}
				n.html(t || "");
			});
		}
	}
]);
angular.module("app", ["app.filters", "app.directives", "app.directives.spinner", "app.directives.effects", "app.directives.notifications", "app.directives.loader", "app.directives.mobile", "app.directives.placeholder", "app.directives.sanitize", "app.directives.moderation", "app.services.moderation", "app.services.sanitize", "app.services.lq.controller", "app.services.countdown", "app.services.auth", "app.services.session", "app.services.lang", "app.services.quiz", "app.services.ios7fixes", "app.services.preloader", "app.services.config", "app.services.random", "app.directives.debug", "app.directives.blocking", "underscore", "ngRoute", "ngSanitize"]).config(["$routeProvider", "$locationProvider",
	function(e) {
		kahoot.theme.current.controller.templateBase;
		e.when("/", {
			templateUrl: "gameid.html",
			controller: GameCtrl,
			resolve: {
				loadContent: appCtrl.loadContent
			}
		});
		e.when("/join", {
			templateUrl: "join.html",
			controller: JoinCtrl,
			resolve: {
				loadContent: appCtrl.loadContent
			}
		});
		e.when("/instructions", {
			templateUrl: "instructions.html",
			controller: InstructionsCtrl,
			resolve: {
				loadContent: appCtrl.loadContent
			}
		});
		e.when("/start", {
			templateUrl: "start.html",
			controller: StartCtrl,
			resolve: {
				loadContent: appCtrl.loadContent
			}
		});
		e.when("/getready", {
			templateUrl: "getready.html",
			controller: GetReadyCtrl,
			resolve: {
				loadContent: appCtrl.loadContent
			}
		});
		e.when("/answer", {
			templateUrl: "answer.html",
			controller: AnswerCtrl,
			resolve: {
				loadContent: appCtrl.loadContent
			}
		});
		e.when("/feedback", {
			templateUrl: "feedback.html",
			controller: FeedbackCtrl,
			resolve: {
				loadContent: appCtrl.loadContent
			}
		});
		e.when("/gameover", {
			templateUrl: "gameover.html",
			controller: GameOverCtrl,
			resolve: {
				loadContent: appCtrl.loadContent
			}
		});
		e.otherwise({
			redirectTo: "/"
		});
	}
]).run(["$config",
	function() {}
]);
angular.module("app.services.auth", []).factory("$authentication", [

	function() {
		var e = {
			oAuthHeaders: function() {
				return {}
			}
		};
		return e
	}
]);
angular.module("app.services.moderation", []).factory("$moderation", ["$rootScope", "$cookies",
	function(e, t) {
		var n = {
			kickCookieName: "bLjokq2kR2b82fN",
			kickCookie: function(e) {
				t[n.kickCookieName] = e.toString()
			},
			kickAlert: function(t) {
				e.$broadcast("snitch", {
					kickCode: t
				});
				e.$broadcast("alert", {
					key: "kicked-general",
					message: e.siteAppContent.errors["kicked-general"],
					alertType: "error",
					autoDismiss: false,
					userDismissable: false
				});
			},
			kickController: function(r) {
				r = r || t[n.kickCookieName];
				n.kickAlert(r);
				n.kickCookie(r);
				if (e.user) {
					e.user.name = "";
				}
			},
			isKicked: function() {
				return 1 * t[n.kickCookieName] > 0
			},
			unKick: function() {
				delete t[n.kickCookieName];
				e.$broadcast("snitch.clear");
			}
		};
		return n
	}
]);
angular.module("app.services.lq.controller", ["app.services.mobitroll", "app.services.utils", "app.services.profanityfilter", "app.services.network", "app.services.lq.analytics"]).factory("$lecturequiz-controller", ["$mobitroll", "$location", "$rootScope", "$config", "$log", "_", "$profanityfilter", "$utils", "$preloader", "$window", "$network", "$timeout", "$analytics", "$moderation",
	function(e, t, n, r, i, o, a, s, c, l, u, f, d, p) {
		function h() {
			e.withComet(function(e) {
				e.publish("/service/controller", {
					type: "login",
					gameid: n.gameId,
					host: r.comet.server,
					name: b
				})
			})
		}
		var g, m, v, y = r.comet.events,
			b = "",
			$ = false,
			w = false,
			k = false;
		n.$on(u.events.lagUpdate, function(t, r) {
			if (e.isConnected()) {
				switch (n.$broadcast("dismissAlert", {
					key: "reconnecting"
				}), r.assessment) {
					case u.latencyThreshold.unplayable:
						if (k) {
							n.$broadcast("dismissAlert", {
								key: "network-usable"
							});
							n.$broadcast("wait", {
								message: n.siteAppContent.info["slow-network"]
							});
							n.$broadcast("alert", {
								key: "network-unusable",
								alertType: "error",
								message: n.siteAppContent.errors["network-unusable"],
								autoDismiss: true,
								userDismissable: true
							});
						}
						break;
					case u.latencyThreshold.playableWithDifficulty:
						if (k) {
							n.$broadcast("clearWait");
							n.$broadcast("dismissAlert", {
								key: "network-unusable"
							});
							n.$broadcast("alert", {
								key: "network-usable",
								alertType: "warning",
								message: n.siteAppContent.info["network-usable"],
								autoDismiss: true,
								userDismissable: true
							});
						}
						break;
					case u.latencyThreshold.playable:
				}
			}
		});
		n.$on("userNameCleaned", function(e, t) {
			b = t
		});
		n.$on("handshakeSuccess", function() {
			T.trackConnection("handshakeSuccess");
			x();
		});
		n.$on("connectionEstablished", function() {
			x();
			T.trackConnection("connectionEstablished");
			if (null !== T.playerId) {
				e.withComet(function(e) {
					e.publish("/service/controller", {
						type: "relogin",
						gameid: n.gameId,
						host: r.comet.server,
						cid: T.playerId
					})
				});
			}
			n.$broadcast("dismissAlert", {
				key: "reconnecting"
			});
			if (T.state == T.states.playing) {
				n.$broadcast("wait", {
					message: n.siteAppContent.info["waiting-next-question"]
				});
				n.$broadcast("alert", {
					key: "waitingfornextquestion",
					alertType: "success",
					message: n.siteAppContent.info["welcome-back"]
				});
			} else if (k) {
				n.$broadcast("clearWait");
			}
		});
		n.$on("connectionBroken", function() {
			n.$broadcast("wait", {
				message: n.siteAppContent.info["attempt-reconnection"]
			});
			n.$broadcast("alert", {
				key: "reconnecting",
				message: n.siteAppContent.misc.oops + ". " + n.siteAppContent.errors["lost-connection"]
			});
			T.trackConnection("connectionBroken");
		});
		n.$on("$routeChangeSuccess", function() {
			switch (t.path()) {
				case "/":
				case "/join":
					T.state = T.states.joining, u.unwatchNetworkMessages();
					break;
				case "/instructions":
				case "/start":
					T.state = T.states.waitingToStart;
					break;
				case "/getready":
				case "/answer":
					T.state = T.states.playing;
					break;
				case "/gameover":
					T.state = T.states.gameOver
			}
		});
		var x = function() {
			if (g) {
				e.unsubscribe(g);
			}
			if (m) {
				e.unsubscribe(m);
			}
			if (v) {
				e.unsubscribe(v);
			}
			g = null;
			m = null;
			v = null;
			g = e.subscribe("/service/controller");
			m = e.subscribe("/service/player");
			v = e.subscribe("/service/status");
		};
		n.$on("messageRecieved", function(t, r) {
			function i(e) {
				n.qIdx = e.questionNumber;
				n.quizType = e.quizType;
				n.quizQuestionAnswers = e.quizQuestionAnswers;
				n.qAnswerMap = e.answerMap || {
					1: 1,
					2: 2,
					3: 3,
					4: 4
				};
			}
			if ("loginResponse" === r.data.type)
				if (r.data.error) {
					switch (String(r.data.error)) {
						case "USER_INPUT":
							n.$broadcast("clearWait");
							n.$broadcast("badUsername");
							n.$broadcast("alert", {
								key: "duplicatenickname",
								message: n.siteAppContent.errors["quiz-nickname-taken"],
								alertType: "error",
								autoDismiss: false,
								userDismissable: true
							});
							break;
						case "RESTART":
							h(), T.trackConnection("restart");
							break;
						case "NONEXISTING_SESSION":
							k = false;
							n.$broadcast("wait", {
								message: n.siteAppContent.info["attempt-reconnection"]
							});
							n.$broadcast("alert", {
								key: "nonexisting-session",
								message: n.siteAppContent.misc.oops + ". " + n.siteAppContent.errors["lost-session"]
							});
							f(function() {
								h()
							}, 3e3);
							T.trackConnection("nonExistingSession");
					}
				} else {
					n.$broadcast("clearWait");
					n.$broadcast("dismissAlert", {
						key: "nonexisting-session"
					});
					n.$broadcast("dismissAlert", {
						key: "duplicatenickname"
					});
					T.playerId = r.data.cid;
					if (!(w)) {
						e.redirect("/instructions");
					}
					w = false;
					k = true;
				} else if ("status" === r.data.type) {
				switch (String(r.data.status)) {
					case "MISSING":
						if (T.state != T.states.gameOver) {
							n.$broadcast("wait", {
								message: n.siteAppContent.info["please-wait"],
								level: 5
							});
						}
						$ = true;
						T.trackConnection("playerMissing");
						break;
					case "ACTIVE":
						if ($) {
							$ = false;
							w = true;
							n.$broadcast("clearWait", {
								level: 5
							});
							T.trackConnection("playerActive");
						}
				}
			} else if ("message" === r.data.type) {
				switch (parseInt(r.data.id, 10)) {
					case y.getReady:
						i(angular.fromJson(r.data.content));
						e.redirect("/getready");
						p.unKick();
						break;
					case y.startQuestion:
						if (T.state != T.states.playing) {
							i(angular.fromJson(r.data.content));
							e.redirect("/answer");
							n.$broadcast("dismissAllNotifications");
						}
						break;
					case y.timeUp:
						n.$broadcast("timeUp", {
							content: angular.fromJson(r.data.content)
						});
						break;
					case y.gameOver:
						n.result = angular.fromJson(r.data.content);
						n.quizType = n.result.quizType;
						n.quizQuestionAnswers = n.result.quizQuestionAnswers;
						if ("quiz" !== n.quizType) {
							e.redirect("/gameover");
						}
						n.$broadcast("dismissAllNotifications");
						break;
					case y.feedback:
						e.redirect("/feedback"), n.$broadcast("dismissAllNotifications");
						break;
					case y.playAgain:
						e.redirect("/instructions"), n.$broadcast("dismissAllNotifications");
						break;
					case y.answerResponse:
						break;
					case y.revealAnswer:
						n.$broadcast("revealAnswer", angular.fromJson(r.data.content));
						break;
					case y.startQuiz:
						var o = angular.fromJson(r.data.content);
						n.quizName = o.quizName;
						n.quizType = o.quizType || "quiz";
						n.quizQuestionAnswers = o.quizQuestionAnswers;
						n.quizRandAnswers = o.quizRandAnswers;
						n.qIdx = 0;
						e.redirect("/start");
						break;
					case y.resetController:
						var a = angular.fromJson(r.data.content);
						e.disconnect();
						e.redirect("/");
						if (a.kickCode) {
							p.kickController(a.kickCode);
						}
				}
			}
		});
		var T = {
			playerId: null,
			states: {
				joining: 0,
				waitingToStart: 1,
				playing: 2,
				gameOver: 3
			},
			state: null,
			connect: e.connect,
			join: function(t) {
				var i = t,
					o = t.replace(/[0-9\s\!\£\$\%\^\&\*\(\)\_\-\+\;\:\'\"\\\|\]\}\[\{\,\<\.\>\/\?\`\~\§\±]/gi, "");
				a.clean(o, function(t) {
					var a = o === t ? i : t;
					n.$broadcast("userNameCleaned", a);
					u.watchNetworkMessages();
					e.withComet(function(e) {
						e.publish("/service/controller", {
							type: "login",
							gameid: n.gameId,
							host: r.comet.server,
							name: a
						})
					});
				})
			},
			selectAnswer: function(t) {
				e.withComet(function(e) {
					e.publish("/service/controller", {
						id: y.answerSelected,
						type: "message",
						gameid: n.gameId,
						host: r.comet.server,
						content: angular.toJson({
							choice: n.qAnswerMap[t],
							meta: {
								lag: u.getLag(),
								device: {
									userAgent: l.navigator.userAgent,
									screen: {
										width: l.screen.availWidth,
										height: l.screen.availHeight
									}
								}
							}
						})
					})
				})
			},
			submitFeedback: function(t) {
				e.withComet(function(e) {
					e.publish("/service/controller", {
						id: y.submitFeedback,
						type: "message",
						gameid: n.gameId,
						host: r.comet.server,
						content: angular.toJson(t)
					})
				})
			},
			preloadAssets: function() {
				var e = "/theme/" + kahoot.theme.current.name + "/img",
					t = "/shared/theme/kahoot/img";
				if (Modernizr.svg) {
					var n = ["/buttons/square.svg", "/buttons/triangle.svg", "/buttons/cross.svg", "/buttons/circle.svg", "/error.svg", "/information.svg", "/success.svg", "/warning.svg", "/kahoot.svg", "/sad.svg", "/happy.svg", "/indifferent.svg", "/dont_recommend_blue.svg", "/dont_recommend_white_selected.svg", "/number_blue.svg", "/number_white_selected.svg", "/star_yellow.svg", "/star_white_selected.svg", "/recommend_blue.svg", "/recommend_white_selected.svg"];
				} else {
					var n = ["/buttons/square.png", "/buttons/triangle.png", "/buttons/cross.png", "/buttons/circle.png"];
				}
				var r = ["/alert_sprites.png"],
					i = ["/alert_sprites_retina.png"],
					o = 2 == l.devicePixelRatio ? i : r;
				c.fetchImages(o, e), c.fetchImages(n, t)
			},
			ensureConnection: e.ensureConnection,
			ordinal: s.ordinal,
			connectionInfo: function() {
				var t = {
					game_pin: n.gameId,
					client_id: e.clientId()
				};
				if (T.playerId > 0) {
					(t.cid = T.playerId)
				}
				return t;
			},
			trackConnection: function(e) {
				var t = "controller";
				d.trackConnection(t, e, T.connectionInfo())
			}
		};
		return T
	}
]);
angular.module("app.filters", []).filter("interpolate", ["version",
	function(e) {
		return function(t) {
			return String(t).replace(/\%VERSION\%/gm, e)
		}
	}
]);
angular.module("app.directives", []).directive("appVersion", ["version",
	function(e) {
		return function(t, n) {
			n.text(e)
		}
	}
]);
angular.module("app.directives.spinner", []).directive("spinner", function() {
	var e = {
		link: function(e, t) {
			var n = new Spinner(kahoot.theme.current.controller.spinner).spin();
			t.append(n.el)
		}
	};
	return e
});
angular.module("app.directives.moderation", ["app.services.moderation"]).directive("snitch", ["$moderation",
	function(e) {
		return function(t, n) {
			t.$on("snitch", function() {
				n.addClass("kicked")
			});
			t.$on("snitch.clear", function() {
				n.removeClass("kicked")
			});
			t.$on("loadContentSuccess", function() {
				if (e.isKicked()) {
					n.addClass("kicked");
					e.kickAlert();
				}
			});
		}
	}
]);
angular.module("app.directives.mobile", []).directive("tap", ["$rootScope",
	function() {
		return function(e, t, n) {
			function r() {
				e.$apply(n.tap)
			}
			t.bind("mouseup", r)
		}
	}
]).directive("tapstart", ["$rootScope",
	function() {
		return function(e, t, n) {
			function r() {
				e.$apply(n.tapstart)
			}
			t.bind("mousedown", r), t.bind("touchstart", function() {
				t.unbind("mousedown", r);
				r();
			})
		}
	}
]).directive("ios7fix", ["$timeout", "$rootScope",
	function(e) {
		return function(t, n) {
			n.bind("touchend", function() {
				e(function() {
					n.trigger("focus")
				}, 500)
			})
		}
	}
]).directive("ios7ViewportFix", ["$rootScope", "$window",
	function(e, t) {
		return function() {
			if (t.navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && t.innerHeight != t.document.documentElement.clientHeight) {
				var e = function() {
					t.document.body.style.height = t.innerHeight + "px";
					if (0 !== t.document.body.scrollTop) {
						t.scrollTo(0, 0); 
					}
				};
				t.addEventListener("orientationchange", e, false);
				e();
				t.document.body.style.webkitTransform = "translate3d(0,0,0)";
			}
		}
	}
]);
angular.module("app.directives.effects", []).directive("fadeoutOnClick", function() {
	return {
		link: function(e, t, n) {
			var r = parseInt(n.fadeDuration);
			isNaN(r) && (r = 500), t.bind("click", function() {
				var e = $(this);
				e.animate({
					opacity: 0
				}, r, "linear", function() {
					t.remove()
				})
			})
		}
	}
}).directive("slideUp", function() {
	return {
		link: function(e, t, n) {
			var r = parseInt(n.slideDuration);
			if (isNaN(r)) {
				r = 250;
			}
			var i = $(t[0]);
			i.css("bottom", -(i.height() + 10)), i.animate({
				bottom: 0
			}, r, "linear")
		}
	}
}).directive("shake", function() {
	return {
		link: function(e, t, n) {
			if ("" !== n.shake) {
				var r = n.shake;
				e.$on(r, function() {
					t[0].style[morpheus.transform] = "translate(0px,0px)";
					var e = 3,
						n = -10;
					! function r(e, n) {
						morpheus(t[0], {
							transform: "translate(" + e + "px,0px)",
							duration: 100,
							easing: easings.easeOut,
							complete: function() {
								if (n > 0) {
									r(-e, n - 1);
								} else if (n == 0) {
									r(0, n - 1)
								}
							}
						})
					}(n, e)
				})
			}
		}
	}
});
angular.module("app").run(["$templateCache",
	function(e) {
		e.put("answer.html", '<div class="screen answer-screen">  <div class="statusbar top">    <div class="info">      <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>      <div class="username" ng-cloak>{{user.cleanName}}</div>    </div>    <div class="title">      <div class="number" ng-cloak>{{questionNumber(\'Q\')}}</div>      <div class="question" ng-cloak>{{statusBarTitle}}</div>    </div>  </div>  <div class="center valignwrapper selectanswer">    <div class="valign">      <div class="answerButtons" ng-class="answerButtonsClass()">        <button class="answer answerA" type="button" tapstart="selectAnswer(0)"><span>A</span></button>        <button class="answer answerB" type="button" tapstart="selectAnswer(1)"><span>B</span></button>        <button class="answer answerC" type="button" tapstart="selectAnswer(2)" ng-show="showAnswer(2)"><span>C</span></button>        <button class="answer answerD" type="button" tapstart="selectAnswer(3)" ng-show="showAnswer(3)"><span>D</span></button>      </div>      <div class="message" ng-class="messageClass()">        <div class="valign">          <div class="result" ng-class="resultClass()">            <div class="resultIcon" ng-class="resultIcon()"></div>            <h1 ng-cloak ng-bind-html="resultMessage"></h1>          </div>          <button class="btn disabled selectedAnswer" ng-class="selectedAnswerClass()"><span bind-html="selectedAnswerLabel()"></span></button>          <h4 class="message_container" ng-bind-html="statusMessage" ng-class="statusMessageClass()"></h4>        </div>      </div>    </div>  </div>  <div class="statusbar fixed bottom">    <div class="username" ng-cloak>{{user.cleanName}}</div>    <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>  </div></div>');
		e.put("feedback.html", '<div class="screen feedback-screen">  <div class="statusbar top">    <div class="info">      <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>      <div class="username" ng-cloak>{{user.cleanName}}</div>    </div>    <div class="title">      <div class="question" ng-cloak>{{statusBarTitle}}</div>    </div>  </div>  <div class="sub-screen" ng-show="!done()">    <div class="center main valignwrapper feedback">      <div class="valign pad">        <div class="feedback-item">          <div class="feedback-question">How fun was it?</div>          <div class="feedback-controls">            <div class="scale-control">              <div class="scale-input"><input type="radio" name="feedback2" id="feedback2-1" value="1" ng-model="feedback.fun"><label for="feedback2-1" class="s1"></label></div>            </div>            <div class="scale-control">              <div class="scale-input"><input type="radio" name="feedback2" id="feedback2-2" value="2" ng-model="feedback.fun"><label for="feedback2-2" class="s2"></label></div>            </div>            <div class="scale-control">              <div class="scale-input"><input type="radio" name="feedback2" id="feedback2-3" value="3" ng-model="feedback.fun"><label for="feedback2-3" class="s3"></label></div>            </div>            <div class="scale-control">              <div class="scale-input"><input type="radio" name="feedback2" id="feedback2-4" value="4" ng-model="feedback.fun"><label for="feedback2-4" class="s4"></label></div>            </div>            <div class="scale-control">              <div class="scale-input"><input type="radio" name="feedback2" id="feedback2-5" value="5" ng-model="feedback.fun"><label for="feedback2-5" class="s5"></label></div>            </div>          </div>        </div>        <div class="feedback-item binary">          <div class="feedback-question">Did you learn something?</div>          <div class="feedback-controls">            <div class="scale-control binary">              <div class="scale-input"><input type="radio" name="feedback1" id="feedback1-1" value="1" ng-model="feedback.learning"><label for="feedback1-1" class="like"></label></div>            </div>            <div class="scale-control binary">              <div class="scale-input"><input type="radio" name="feedback1" id="feedback1-2" value="0" ng-model="feedback.learning"><label for="feedback1-2" class="dislike"></label></div>            </div>          </div>        </div>        <div class="feedback-item binary">          <div class="feedback-question">Do you recommend it?</div>          <div class="feedback-controls">            <div class="scale-control binary">              <div class="scale-input"><input type="radio" name="feedback3" id="feedback3-1" value="1" ng-model="feedback.recommend"><label for="feedback3-1" class="like"></label></div>            </div>            <div class="scale-control binary">              <div class="scale-input"><input type="radio" name="feedback3" id="feedback3-2" value="0" ng-model="feedback.recommend"><label for="feedback3-2" class="dislike"></label></div>            </div>          </div>        </div>      </div>    </div>    <div class="info-footer">      <div class="content">        <div class="feedback-summary">          <div class="feedback-item">            <div class="feedback-question">To continue, tell us how you feel?</div>            <div>                            <button type="button" class="face-btn happy" tap="smile()"></button>              <button type="button" class="face-btn indifferent" tap="meh()"></button>              <button type="button" class="face-btn sad" tap="frown()"></button>                          </div>          </div>        </div>      </div>    </div>  </div>  <div class="sub-screen" ng-show="done()">    <div class="center main valignwrapper feedback">      <div class="valign pad">        <h1 ng-bind="feedbackResponse().title">Thanks!</h1>        <div class="smiley" ng-class="feeling()"></div>        <div class="feedback-response" ng-bind="feedbackResponse().text"></div>      </div>    </div>  </div></div>');
		e.put("gameid.html", '<div class="center join_view valignwrapper">	<div class="valign">		<div class="logo center-block"><span>Kahoot!</span></div>		<form ng-submit="joinSession(gameId)">			<input id="inputSession" ios7fix class="username" placeholder="Game pin" ng-model="gameId" type="tel" maxlength="6" shake="badGameId">			<button type="button" class="btn btn-block btn-greyscale join" blocking tap="joinSession(gameId)">Enter</button>		</form>	</div>	<p class="info" ng-show="notStandalone()">Make your own at <a href="https://getkahoot.com" target="_system">getkahoot.com</a></a></p></div>');
		e.put("gameover.html", '<div class="screen gameover-screen">  <div class="statusbar top endscreen">    <div class="info">      <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>      <div class="username" ng-cloak>{{user.cleanName}}</div>    </div>    <div class="title">      <div class="question" ng-cloak>{{statusBarTitle}}</div>    </div>  </div>  <div class="center valignwrapper gameover" ng-class="gameOverClass()">    <div class="valign">      <h1 ng-bind-html="gameoverTitle()"></h1>      <h4 ng-cloak ng-bind-html="resultMessage()"></h4>      <div class="resultsList" ng-class="resultsListClass()">        <div class="correct">          <div class="icon"></div>          <div class="answers" ng-cloak>{{result.correctCount}} correct</div>        </div>        <div class="incorrect">          <div class="icon"></div>          <div class="answers" ng-cloak>{{result.incorrectCount}} incorrect</div>        </div>      </div>      <div ng-class="shareSocialClass()">        <span class="text">Share my {{shareWhat}}:</span>        <a ng-click="shareTwitter()" class="but-twitter" type="button">Tweet on twitter</a>        <a ng-click="shareFacebook()" class="but-facebook" type="button">Post to my wall</a>      </div>    </div>  </div>  <div class="info-footer">    <div class="divider"></div>    <div class="content">      <p><a href="https://getkahoot.com/register/" target="_system"><strong>Get my free account now</strong> and start making my own! <i class="icon-link"></i></a></p>    </div>  </div>  <div class="statusbar fixed bottom">    <div class="username" ng-cloak>{{user.cleanName}}</div>    <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>  </div></div>');
		e.put("getready.html", '<div class="statusbar top">  <div class="info">    <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>    <div class="username" ng-cloak>{{user.cleanName}}</div>  </div>  <div class="title">    <div class="number" ng-cloak>{{questionNumber(\'Q\')}}</div>    <div class="question" ng-cloak>{{statusBarTitle}}</div>  </div></div><div class="center intro valignwrapper">  <div class="valign">    <h1 ng-cloak>{{questionNumber(\'Question \')}}</h1>    <h1 class="counter" ng-cloak>{{counter}}</h1>    <h4 ng-bind-html="introMessage()"></h4>  </div></div><div class="statusbar fixed bottom">  <div class="username" ng-cloak>{{user.cleanName}}</div>  <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div></div>');
		e.put("instructions.html", '<div class="screen instructions-screen">  <div class="statusbar top">    <div class="info">      <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>      <div class="username" ng-cloak>{{user.cleanName}}</div>    </div>    <div class="title">      <div class="question" ng-cloak>{{statusBarTitle}}</div>    </div>  </div>  <div class="center main valignwrapper instructions">    <div class="valign pad">      <h1>You&rsquo;re In!</h1>      <h4>Did you see your name appear at the front?</h4>    </div>  </div>  <div class="statusbar fixed bottom">    <div class="username" ng-cloak>{{user.cleanName}}</div>    <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>  </div></div>');
		e.put("join.html", '<div class="screen join-screen">	<div class="statusbar">		<div class="title" ng-cloak>{{statusBarTitle}}</div>	</div>	<div class="center join_view valignwrapper">				<div class="valign">			<h1>Play Now</h1>			<form ng-submit="join(user)">				<input id="username" ios7fix class="username" type="text" placeholder="Nickname" ng-model="user.name" maxlength="15" shake="badUsername">				<button type="button" class="btn btn-block btn-greyscale join" blocking tap="join(user)">Join game</button>			</form>		 </div>	</div></div>');
		e.put("start.html", '<div class="screen start-screen">  <div class="statusbar top">    <div class="info">      <div ng-cloak ng-class="scoreClass()">{{totalScore}}</div>      <div class="username" ng-cloak>{{user.cleanName}}</div>    </div>    <div class="title">      <div class="question">{{statusBarTitle}}</div>    </div>  </div>  <div class="center main valignwrapper start">    <div class="valign pad">      <h1>Get Ready!</h1>      <div class="spinner" spinner></div>      <h4>Loading</h4>    </div>  </div>  <div class="statusbar fixed bottom">    <div class="username" ng-cloak>{{user.cleanName}}</div>    <div ng-class="scoreClass()" ng-cloak>{{totalScore}}</div>  </div></div>');
	}
]);
