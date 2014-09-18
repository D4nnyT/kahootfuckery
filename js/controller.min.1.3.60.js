function hasSVG() {
	document.documentElement.className = document.documentElement.className.replace(/\bno-svg\b/gi, "svg")
}

function detectSVG() {
	var e = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D",
		t = document.createElement("img");
	t.setAttribute("src", e);
	t.onload = hasSVG;
	document.documentElement.className += " no-svg";
}

function appCtrl() {}

function GameCtrl(e, t, n, r, i, o, a) {
	e.statusBarTitle = "Kahoot!";
	e.gameId = null;
	r.playerId = null;
	r.preloadAssets();
	e.notStandalone = function() {
		return !i.navigator.standalone;
	};
	e.joinSession = function(n) {
		function i() {
			e.$broadcast("clearWait");
			e.$broadcast("dismissAlert", {
				key: "handshakeFailure"
			});
			t.path("/join");
			if (!(e.$$phase)) {
				e.$apply()
			}
		}

		function s(t) {
			e.gameId = t;
			r.connect(e.gameId);
		}

		function c() {
			e.$broadcast("clearWait");
			e.$broadcast("badGameId");
			e.$broadcast("alert", {
				key: "invalidGameId",
				message: e.siteAppContent.errors["quiz-pin-invalid"],
				alertType: "error",
				autoDismiss: true,
				userDismissable: true
			});
		}
		e.handshakeWitnessed = false;
		e.$broadcast("dismissAlert", {
			key: "blankGameId"
		});
		e.$broadcast("dismissAlert", {
			key: "invalidGameId"
		});
		e.$on("handshakeFailure", function() {
			e.$broadcast("clearWait");
			e.$broadcast("alert", {
				key: "handshakeFailure",
				message: e.siteAppContent.errors["quiz-connection"],
				alertType: "error",
				autoDismiss: false,
				userDismissable: false
			});
		});
		e.$on("handshakeSuccess", function() {
			if (!(e.handshakeWitnessed)) {
				e.handshakeWitnessed = true;
				i();
			}
		});
		if ("string" == typeof n) {
			(n = n.replace(/^\s+|\s+$/g, ""));
		}
		if (n) {
			e.$broadcast("busy");
			if (o.session.api) {
				n = n.replace(/[^0-9]+/g, "");
				n = 1 * n;
				e.$broadcast("wait", {
					message: e.siteAppContent.info["connecting-to-server"]
				});
				a.exists(n, function(t, r) {
					if (t) {
						s(n);
					} else {
						if (r == 200) {
							c();
						} else {
							e.$broadcast("badGameId");
							e.$broadcast("alert", {
								key: "invalidGameId",
								message: e.siteAppContent.errors["quiz-pin-general"],
								alertType: "error",
								autoDismiss: true,
								userDismissable: true
							});
						}
						e.$broadcast("free");
					}
				});
			} else if (1 * n == 1) {
				e.$broadcast("wait", {
					message: e.siteAppContent.info["connecting-to-server"]
				});
				s(n);
			} else {
				c();
				e.$broadcast("free");
			}
		} else {
			e.$broadcast("badGameId");
			e.$broadcast("alert", {
				key: "blankGameId",
				message: e.siteAppContent.errors["quiz-pin-non-entry"],
				alertType: "error",
				autoDismiss: true,
				userDismissable: true
			});
		}
	}
}

function JoinCtrl(e, t, n, r) {
	if (e.gameId === void 0) {
		t.path("/")
		return void 0
	}
	e.statusBarTitle = e.siteAppContent.info["game-pin"] + e.gameId;
	e.user = e.user || {};
	e.$on("userNameCleaned", function(t, n) {
		e.user.cleanName = n;
		e.$broadcast("free");
	});
	e.join = function(t) {
		if (t.name && t.name.length > 0) {
			e.$broadcast("busy");
			e.$broadcast("wait", {
				message: e.siteAppContent.info["checking-nickname"]
			});
			e.user = angular.copy(t);
			r.join(e.user.name);
			e.$broadcast("dismissAlert", {
				key: "blanknickname"
			});
			e.$broadcast("dismissAlert", {
				key: "kicked-general"
			});
		} else {
			e.$broadcast("badUsername");
			e.$broadcast("alert", {
				key: "blanknickname",
				message: e.siteAppContent.errors["quiz-nickname-non-entry"],
				alertType: "error",
				autoDismiss: true,
				userDismissable: true
			});
		}
	};
	return void 0;
}

function InstructionsCtrl(e, t, n, r) {
	if (!r.ensureConnection()) {
		if ("undefined" != typeof t.totalScore) {
			t.totalScore = t.totalScore;
		} else {
			t.totalScore = 0;
		}
		if ("undefined" != typeof t.qIdx) {
			t.qIdx = t.qIdx;
		} else {
			t.qIdx = 0;
		}
		e.statusBarTitle = e.siteAppContent.info["game-pin"] + e.gameId;
		e.scoreClass = function() {
			return "hide";
		};
	}
}

function StartCtrl(e, t, n, r, i) {
	if (!n.ensureConnection()) {
		e.totalScore = 0;
		e.qIdx = 0;
		if (!e.quizType) {
			return void i.path("/instructions");
		}
		t.statusBarTitle = t.siteAppContent.info["game-pin"] + t.gameId;
		t.scoreClass = function() {
			if (r.quizTypes[e.quizType].showScore) {
				return "score";
			} else {
				return "hide";
			}
		}
	}
}

function GetReadyCtrl(e, t, n, r, i, o) {
	if (!i.ensureConnection()) {
		var a = 5,
			s = 1e3;
		e.introTimer = n.registerCountdown("introTimer", a - 1, s);
		e.introMessages = ["Go!", "Steady&hellip;", "Ready&hellip;"];
		e.introMessage = e.introMessages[e.introMessages.length - 1];
		e.counter = a;
		if (!t.quizType) {
			return void r.path("/instructions");
		}
		e.statusBarTitle = e.siteAppContent.info["game-pin"] + e.gameId;
		e.introMessage = function() {
			var t = e.introTimer.counter > e.introMessages.length - 1 ? e.introMessages.length - 1 : e.introTimer.counter;
			return e.introMessages[t]
		};
		e.questionNumber = function(e) {
			if (o.quizTypes[t.quizType].showQuestionNumbers) {
				return e + "" + (t.qIdx + 1);
			} else {
				return "";
			}
		};
		e.$on("countdown", function(t, n) {
			if ("introTimer" === n.id) {
				e.counter = n.timeLeft + 1;
			}
		});
		e.$on("countdownStopped", function(e, t) {
			if ("introTimer" === t.id) {
				r.path("/answer");
			}
		});
		e.scoreClass = function() {
			if (o.quizTypes[t.quizType].showScore) {
				return "score";
			} else {
				return "hide";
			}
		};
		e.introTimer.start();
	}
}

function AnswerCtrl(e, t, n, r, i, o, a, s) {
	if (!r.ensureConnection()) {
		e.uiEnabled = true;
		e.statusMessage = "";
		e.selectedAnswer = null;
		e.choices = ["A", "B", "C", "D"];
		if (!t.quizType) {
			a.path("/instructions");
			return void 0;
		}
		e.statusBarTitle = e.siteAppContent.info["game-pin"] + e.gameId;
		e.questionNumber = function(e) {
			if (o.quizTypes[t.quizType].showQuestionNumbers) {
				return e + "" + (t.qIdx + 1);
			} else {
				return "";
			}
		};
		e.quizQuestionAnswers = t.quizQuestionAnswers[t.qIdx];
		e.showAnswer = function(t) {
			if (t + 1 > e.quizQuestionAnswers) {
				return false;
			} else {
				return true;
			}
		};
		e.selectAnswer = function(i) {
			if (e.uiEnabled) {
				n.log("Selected answer: " + i);
				e.uiEnabled = false;
				e.selectedAnswer = i;
				e.statusMessage = t.siteAppContent.info["waiting-other-answers"];
				if (!(e.$$phase)) {
					e.$apply()
				}
				r.selectAnswer(i);
			}
		};
		e.scoreClass = function() {
			if (o.quizTypes[t.quizType].showScore) {
				return "score";
			} else {
				return "hide";
			}
		};
		e.messageClass = function() {
			var t = "";
			if ((null != e.selectedAnswer || e.timeUp)) {
				t += " show";
			}
			return t += e.revealAnswer ? e.revealAnswer && e.correct ? " correct" : " incorrect" : " answer" + e.choices[e.selectedAnswer];
		};
		e.statusMessageClass = function() {
			if (e.revealAnswer) {
				return "";
			} else {
				return "waiting";
			}
		};
		e.resultClass = function() {
			if (e.revealAnswer) {
				return "";
			} else {
				return "hide";
			}
		};
		e.isSelectedAnswer = function(t) {
			return t == e.selectedAnswer;
		};
		e.answerButtonsClass = function() {
			var t = "";
			if (e.revealAnswer || null != e.selectedAnswer || e.timeUp) {
				t += "hidden";
			}
			return t;
		};
		e.selectedAnswerClass = function() {
			var t = "";
			if (e.selectedAnswer >= 0) {
				(t = "answer" + e.choices[e.selectedAnswer])
			}
			if (e.revealAnswer) {
				(t += " hidden")
			}
			return t;
		};
		e.selectedAnswerLabel = function() {
			return e.choices[e.selectedAnswer]
		};
		e.resultIcon = function() {
			if (e.correct) {
				return "correct";
			} else {
				return "incorrect";
			}
		};
		e.$on("timeUp", function() {
			if (null === e.selectedAnswer) {
				e.timeUp = true;
				e.uiEnabled = false;
				if (!(e.$$phase)) {
					e.$apply()
				}
			}
		});
		e.$on("revealAnswer", function(n, a) {
			var c = "";
			e.revealAnswer = true;
			e.playerRank = a.rank + "<sup>" + r.ordinal(a.rank) + "</sup>";
			if (a.isCorrect) {
				e.correct = true;
				e.resultMessage = "Correct!";
				c = a.points + " Kahoots for you.";
			} else {
				e.correct = false;
				if (e.timeUp) {
					e.resultMessage = "Time Up!";
				} else {
					e.resultMessage = "Wrong!";
				}
				i.each(a.correctAnswers, function(e, t) {
					if (t > 0) {
						c += ", ";
					}
					c += "<span class='correctAnswer richText'>" + s.removeDangerousTags(e) + "</span>";
				});
				c += (a.correctAnswers.length > 1 ? " were" : " was") + " correct.";
			}
			c += "<br>You&rsquo;re now in <span class='correctAnswer'>" + e.playerRank + "</span> position.";
			if (a.nemesis) {
				var l = a.nemesis.totalScore - a.totalScore;
				if (l == 0) {
					c += "<br>You're tied with <span class='correctAnswer'>" + s.removeDangerousTags(a.nemesis.name) + "</span>!";
				} else {
					c += "<br>Only <span class='correctAnswer'>" + l + "</span> behind <span class='correctAnswer'>" + s.removeDangerousTags(a.nemesis.name) + "</span>!";
				}
			}
			if (o.quizTypes[t.quizType].showScore) {
				e.statusMessage = c;
			} else {
				e.statusMessage = "";
			}
			if (!o.quizTypes[t.quizType].showScore) {
				var c = '<span class="correctAnswer richText">You selected \'' + (s.removeDangerousTags(a.text) || "") + "'</span>";
				if (e.timeUp) {
					e.resultMessage = "Time Up!";
				} else {
					e.resultMessage = c;
				}
				t.lastAnswer = s.removeDangerousTags(a.text) || "";
			}
			e.points = a.points;
			t.totalScore = a.totalScore;
			if (!(e.$$phase)) {
				e.$apply()
			}
		});
	}
}

function FeedbackCtrl(e, t, n, r, i, o, a) {
	if (!r.ensureConnection()) {
		e.statusBarTitle = "Rate this ";
		e.statusBarTitle = e.siteAppContent.info["game-pin"] + e.gameId;
		e.feedback = {};
		e.feedback.totalScore = t.totalScore;
		e.submitted = false;
		e.feedbackResponse = function() {
			var t = {};
			switch (e.feedback.overall) {
				case 0:
					t.title = e.siteAppContent.feedback.meh.title;
					t.text = e.siteAppContent.feedback.meh.text;
					break;
				case -1:
					t.title = e.siteAppContent.feedback.frown.title;
					t.text = e.siteAppContent.feedback.frown.text;
					break;
				case 1:
					t.title = e.siteAppContent.feedback.smile.title;
					t.text = e.siteAppContent.feedback.smile.text
			}
			return t;
		};
		e.feeling = function() {
			var t = "";
			switch (e.feedback.overall) {
				case 0:
					t = "indifferent";
					break;
				case -1:
					t = "sad";
					break;
				case 1:
					t = "happy";
					break;
			}
			return t;
		};
		e.scoreClass = function() {
			if (o.quizTypes[t.quizType].showScore) {
				return "score";
			} else {
				return "hide";
			}
		};
		e.meh = function() {
			e.feedback.overall = 0;
			e.submitFeedback();
		};
		e.frown = function() {
			e.feedback.overall = -1;
			e.submitFeedback();
		};
		e.smile = function() {
			e.feedback.overall = 1;
			e.submitFeedback();
		};
		e.submitFeedback = function() {
			e.submitted = true;
			e.feedback.nickname = e.user.cleanName;
			if (e.feedback.fun) {
				e.feedback.fun = 1 * e.feedback.fun;
			}
			if (e.feedback.learning) {
				e.feedback.learning = 1 * e.feedback.learning;
			}
			if (e.feedback.recommend) {
				e.feedback.recommend = 1 * e.feedback.recommend;
			}
			if (e.feedback.overall) {
				e.feedback.overall = 1 * e.feedback.overall;
			}
			r.submitFeedback(e.feedback);
			a(function() {
				i.path("/gameover");
			}, 3e3);
		};
		e.done = function() {
			return e.submitted
		};
	}
}

function GameOverCtrl(e, t, n, r, i, o, a, s) {
	function c() {
		var t = {};
		if (1 == e.result.rank) {
			t.winner = true;
			t.position = "I won";
		} else {
			t.winner = false;
			t.position = "I finished " + e.result.rank + n.ordinal(e.result.rank);
		}
		t.score = e.result.totalScore + " Kahoots";
		t.kahoots = e.result.totalScore;
		t.quiz = e.quizName;
		t.quizurl = i.player.baseUrl + "/#/k/" + e.result.quizId;
		return t;
	}

	function l() {
		var t = {};
		t.quizurl = i.player.baseUrl + "/#/k/" + e.result.quizId;
		t.text = "I answered '" + e.lastAnswer + "' in the @GetKahoot discussion " + e.quizName + " " + t.quizurl;
		return t;
	}
	if (!n.ensureConnection()) {
		if (!e.quizType) {
			return void a.path("/instructions");
		}
		if (o.quizTypes[e.quizType].showTitle) {
			t.shareWhat = "score";
		} else {
			t.shareWhat = "opinion";
		}
		t.statusBarTitle = t.siteAppContent.info["game-pin"] + t.gameId;
		t.resultMessage = function() {
			if (o.quizTypes[e.quizType].showScore) {
				return "<span class='correctAnswer game-over-small'>Game Over!</span> You finished <span class='correctAnswer'>" + e.result.rank + n.ordinal(e.result.rank) + "</span> with <span class='correctAnswer'>" + e.result.totalScore + "</span> Kahoots";
			} else {
				return "";
			}
		};
		t.resultsListClass = function() {
			if (o.quizTypes[e.quizType].showScore) {
				return "";
			} else {
				return "hide";
			}
		};
		t.shareSocialClass = function() {
			if (o.quizTypes[e.quizType].showSocial) {
				return "sharesocial";
			} else {
				return "hide";
			}
		};
		t.gameoverTitle = function() {
			if (o.quizTypes[e.quizType].showScore) {
				return "Game over";
			} else {
				return t.siteAppContent.contentTypes[e.quizType] + " over!";
			}
		};
		t.gameOverClass = function() {
			if (1 == e.result.rank) {
				return "winner";
			} else {
				return "";
			}
		};
		t.scoreClass = function() {
			if (o.quizTypes[e.quizType].showScore) {
				return "score";
			} else {
				return "hide";
			}
		};
		t.shareFacebook = function() {
			var n = document.location.pathname + document.location.search + document.location.hash;
			if (r._gaq) {
				_gaq.push(["_trackSocial", "facebook", "share", e.result.quizId, n]);
			}
			if (r.ga) {
				ga("send", "social", "facebook", "share", e.result.quizId, {
					page: n
				});
			}
			if (o.quizTypes[e.quizType].showScore) {
				var a = c(),
					u = a.position;
				u += a.winner ? " the Kahoot! quiz '" + a.quiz + "'" : " in the Kahoot! quiz '" + a.quiz + "'";
				u += " out of " + e.result.playerCount + " players";
				s(function() {
					r.location.href = "https://www.facebook.com/dialog/feed?app_id=" + i.facebook.appid + "&link=" + encodeURIComponent(a.quizurl) + "&picture=https://getkahoot.com/img/kahoot-facebook-play-image.png&name=" + encodeURIComponent(u) + "&caption=" + encodeURIComponent("With " + a.score + "!") + "&description=" + encodeURIComponent(t.siteAppContent.info["facebook-desc"]) + "&redirect_uri=" + encodeURIComponent(i.controller.baseUrl + "/#/instructions");
				}, 100);
			} else {
				var a = l(),
					u = a.text;
				s(function() {
					r.location.href = "https://www.facebook.com/dialog/feed?app_id=" + i.facebook.appid + "&link=" + encodeURIComponent(a.quizurl) + "&picture=https://getkahoot.com/img/kahoot-facebook-play-image.png&name=" + encodeURIComponent(u) + "&description=" + encodeURIComponent(t.siteAppContent.info["facebook-desc"]) + "&redirect_uri=" + encodeURIComponent(i.controller.baseUrl + "/#/instructions");
				}, 100)
			}
		};
		t.shareTwitter = function() {
			if (o.quizTypes[e.quizType].showScore) {
				var t = c(),
					n = t.position;
				n += t.winner ? " the" : " in the";
				n += " @GetKahoot quiz '";
				var i = "' out of " + e.result.playerCount + " players, with " + t.kahoots + " #Kahoots!",
					a = document.location.pathname + document.location.search + document.location.hash;
				if (r._gaq) {
					_gaq.push(["_trackSocial", "twitter", "share", e.result.quizId, a]);
				}
				if (r.ga) {
					ga("send", "social", "twitter", "share", e.result.quizId, {
						page: a
					});
				}
				$.ajax({
					type: "POST",
					url: "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBm3PtKPSKP5YPKvX4hQ4lnhxDfgvULJuI",
					dataType: "json",
					contentType: "application/json",
					crossDomain: true,
					async: false,
					data: angular.toJson({
						longUrl: t.quizurl
					})
				}).done(function(e) {
					var o = e.id,
						a = n + t.quiz.substr(0, 140 - n.length - i.length) + i + " " + o;
					s(function() {
						r.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(a), "_blank")
					}, 100);
				})
			} else {
				var t = l(),
					u = t.text;
				s(function() {
					r.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(u), "_blank")
				}, 100);
			}
		}
	}
};
// globalfunc1
// globalfunc2
if (!angular.$$csp()) {
	angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>');
}
var svgOldWinOnload = window.onload;
window.onload = function() {
	detectSVG();
	if (svgOldWinOnload) {
		svgOldWinOnload(); 
	}
};
// org.cometd
! function() {
	function e(e) {
		return e.AckExtension = function() {
			function e(e, n) {
				t._debug(e, n)
			}
			var t, n = false,
				r = -1;
			this.registered = function(n, r) {
				t = r;
				e("AckExtension: executing registration callback");
			};
			this.unregistered = function() {
				e("AckExtension: executing unregistration callback");
				t = null;
			};
			this.incoming = function(t) {
				var i = t.channel;
				if (i == "/meta/handshake") {
					n = t.ext && t.ext.ack;
					e("AckExtension: server supports acks", n);
				} else if (n && i == "/meta/connect" && t.successful) {
					var o = t.ext;
					if (o && "number" == typeof o.ack) {
						r = o.ack;
						e("AckExtension: server sent ack id", r);
					}
				}
				return t
			};
			this.outgoing = function(i) {
				var o = i.channel;
				if (o == "/meta/handshake") {
					if (!(i.ext)) {
						i.ext = {};
					}
					i.ext.ack = t && t.ackEnabled !== false;
					r = -1;
				} else if (n && o == "/meta/connect") {
					if (!(i.ext)) {
						(i.ext = {}); 
					}
					i.ext.ack = r;
					e("AckExtension: client sending ack id", r);
				}
				return i;
			};
		}
	}
	if ("function" == typeof define && define.amd) {
		define(["org/cometd"], e);
	} else {
		e(org.cometd);
	}
}();

! function() {
	function e(e) {
		return e.TimeSyncExtension = function(t) {
			function n(e, t) {
				r._debug(e, t)
			}
			var r, i = t && t.maxSamples || 10,
				o = [],
				a = [],
				s = 0,
				c = 0;
			this.registered = function(e, t) {
				r = t;
				n("TimeSyncExtension: executing registration callback");
			};
			this.unregistered = function() {
				n("TimeSyncExtension: executing unregistration callback");
				r = null;
				o = [];
				a = [];
			};
			this.incoming = function(e) {
				var t = e.channel;
				if (t && 0 === t.indexOf("/meta/") && e.ext && e.ext.timesync) {
					var r = e.ext.timesync;
					n("TimeSyncExtension: server sent timesync", r);
					var l = (new Date).getTime(),
						u = (l - r.tc - r.p) / 2,
						f = r.ts - r.tc - u;
					o.push(u);
					a.push(f);
					if (a.length > i) {
						a.shift();
						o.shift();
					}
					for (var d = a.length, p = 0, h = 0, g = 0; d > g; ++g) {
						p += o[g];
						h += a[g];
					}
					s = parseInt((p / d).toFixed());
					c = parseInt((h / d).toFixed());
					n("TimeSyncExtension: network lag", s, "ms, time offset with server", c, "ms", s, c);
				}
				return e
			};
			this.outgoing = function(t) {
				var r = t.channel;
				if (r && 0 === r.indexOf("/meta/")) {
					if (!(t.ext)) {
						t.ext = {};
					}
					t.ext.timesync = {
						tc: (new Date).getTime(),
						l: s,
						o: c
					};
					n("TimeSyncExtension: client sending timesync", e.JSON.toJSON(t.ext.timesync));
				}
				return t;
			};
			this.getTimeOffset = function() {
				return c
			};
			this.getTimeOffsetSamples = function() {
				return a
			};
			this.getNetworkLag = function() {
				return s
			};
			this.getServerTime = function() {
				return (new Date).getTime() + c
			};
			this.getServerDate = function() {
				return new Date(this.getServerTime())
			};
			this.setTimeout = function(t, n) {
				var i = n instanceof Date ? n.getTime() : 0 + n,
					o = i - c,
					a = o - (new Date).getTime();
				if (0 >= a) {
					(a = 1)
				}
				return e.Utils.setTimeout(r, t, a);
			};
		}
	}
	if ("function" == typeof define && define.amd) {
		define(["org/cometd"], e);
	} else {
		e(org.cometd);
	}
}();

! function(e, t, n) {
	"use strict";
	t.module("ngCookies", ["ng"]).factory("$cookies", ["$rootScope", "$browser",
		function(e, r) {
			function i() {
				var e, i, o, c;
				for (e in s)
					if (u(a[e])) {
						r.cookies(e, n);
					}
				for (e in a) {
					i = a[e];
					if (!(t.isString(i))) {
						i = "" + i;
						a[e] = i;
					}
					if (i !== s[e]) {
						r.cookies(e, i);
						c = true;
					}
				}
				if (c) {
					c = false, o = r.cookies();
					for (e in a)
						if (a[e] !== o[e]) {
							if (u(o[e])) {
								delete a[e];
							} else {
								a[e] = o[e];
							}
							c = true;
						}
				}
			}
			var o, a = {},
				s = {},
				c = false,
				l = t.copy,
				u = t.isUndefined;
			r.addPollFn(function() {
				var t = r.cookies();
				if (o != t) {
					o = t;
					l(t, s);
					l(t, a);
					if (c) {
						e.$apply()
					}
				}
			})();
			c = true;
			e.$watch(i);
			return a;
		}
	]).factory("$cookieStore", ["$cookies",
		function(e) {
			return {
				get: function(n) {
					var r = e[n];
					if (r) {
						return t.fromJson(r);
					} else {
						return r;
					}
				},
				put: function(n, r) {
					e[n] = t.toJson(r)
				},
				remove: function(t) {
					delete e[t]
				}
			}
		}
	])
}(window, window.angular);

! function(e, t, n) {
	"use strict";

	function r(e) {
		return null != e && "" !== e && "hasOwnProperty" !== e && s.test("." + e)
	}

	function i(e, t) {
		if (!r(t)) {
			throw a("badmember", 'Dotted member path "@{0}" is invalid.', t);
		}
		for (var i = t.split("."), o = 0, s = i.length; s > o && e !== n; o++) {
			var c = i[o];
			if (null !== e) {
				e = e[c];
			} else {
				e = n;
			}
		}
		return e
	}

	function o(e, n) {
		n = n || {}, t.forEach(n, function(e, t) {
			delete n[t]
		});
		for (var r in e)
			if (!(!e.hasOwnProperty(r) || "$" === r.charAt(0) && "$" === r.charAt(1))) {
				(n[r] = e[r])
			}
		return n
	}
	var a = t.$$minErr("$resource"),
		s = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
	t.module("ngResource", ["ng"]).factory("$resource", ["$http", "$q",
		function(e, r) {
			function s(e) {
				return c(e, true).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
			}

			function c(e, t) {
				return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
			}

			function l(e, t) {
				this.template = e;
				this.defaults = t || {};
				this.urlParams = {};
			}

			function u(s, c, v) {
				function y(e, t) {
					var n = {};
					t = h({}, c, t);
					p(t, function(t, r) {
						if (m(t)) {
							(t = t()); 
						}
						if (t && t.charAt && "@" == t.charAt(0)) {
							n[r] = i(e, t.substr(1));
						} 
						else {
							n[r] = t;
						}
					});
					return n;
				}

				function b(e) {
					return e.resource
				}

				function $(e) {
					o(e || {}, this)
				}
				var w = new l(s);
				v = h({}, f, v);
				p(v, function(i, s) {
					var c = /^(POST|PUT|PATCH)$/i.test(i.method);
					$[s] = function(s, l, u, f) {
						var v, k, x, T = {};
						switch (arguments.length) {
							case 4:
								x = f, k = u;
							case 3:
							case 2:
								if (!m(l)) {
									T = s;
									v = l;
									k = u;
									break
								}
								if (m(s)) {
									k = s, x = l;
									break
								}
								k = l, x = u;
							case 1:
								if (m(s)) {
									k = s;
								} else if (c) {
									v = s;
								} else {
									T = s;
								}
								break;
							case 0:
								break;
							default:
								throw a("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length)
						}
						var C = this instanceof $,
							S = C ? v : i.isArray ? [] : new $(v),
							A = {},
							E = i.interceptor && i.interceptor.response || b,
							N = i.interceptor && i.interceptor.responseError || n;
						p(i, function(e, t) {
							if ("params" != t && "isArray" != t && "interceptor" != t) {
								(A[t] = g(e));
							}
						});
						if (c) {
							(A.data = v);
						}
						w.setUrlParams(A, h({}, y(v, i.params || {}), T), i.url);
						var j = e(A).then(function(e) {
							var n = e.data,
								r = S.$promise;
							if (n) {
								if (t.isArray(n) !== !!i.isArray) {
									throw a("badcfg", "Error in resource configuration. Expected response to contain an {0} but got an {1}", i.isArray ? "array" : "object", t.isArray(n) ? "array" : "object");
								}
								if (i.isArray) {
									S.length = 0;
									p(n, function(e) {
										S.push(new $(e))
									});
								} else {
									o(n, S);
									S.$promise = r;
								}
							}
							S.$resolved = true;
							e.resource = S;
							return e;
						}, function(e) {
							S.$resolved = true;
							(x || d)(e);
							return r.reject(e);
						});
						j = j.then(function(e) {
							var t = E(e);
							(k || d)(t, e.headers);
							return t;
						}, N);
						if (C) {
							return j;
						} else {
							return (S.$promise = j, S.$resolved = false, S);
						}
					}, $.prototype["$" + s] = function(e, t, n) {
						if (m(e)) {
							n = t;
							t = e;
							e = {};
						}
						var r = $[s].call(this, e, this, t, n);
						return r.$promise || r
					}
				});
				$.bind = function(e) {
					return u(s, h({}, c, e), v)
				};
				return $;
			}
			var f = {
					get: {
						method: "GET"
					},
					save: {
						method: "POST"
					},
					query: {
						method: "GET",
						isArray: true
					},
					remove: {
						method: "DELETE"
					},
					"delete": {
						method: "DELETE"
					}
				},
				d = t.noop,
				p = t.forEach,
				h = t.extend,
				g = t.copy,
				m = t.isFunction;
			l.prototype = {
				setUrlParams: function(e, n, r) {
					var i, o, c = this,
						l = r || c.template,
						u = c.urlParams = {};
					p(l.split(/\W/), function(e) {
						if ("hasOwnProperty" === e) {
							throw a("badname", "hasOwnProperty is not a valid parameter name.");
						}
						if (!new RegExp("^\\d+$").test(e) && e && new RegExp("(^|[^\\\\]):" + e + "(\\W|$)").test(l)) {
							u[e] = true;
						}
					});
					l = l.replace(/\\:/g, ":");
					n = n || {};
					p(c.urlParams, function(e, r) {
						if (n.hasOwnProperty(r)) {
							i = n[r];
						} 
						else {
							i = c.defaults[r];
						}
						if (t.isDefined(i) && null !== i) {
							o = s(i);
							l = l.replace(new RegExp(":" + r + "(\\W|$)", "g"), function(e, t) {
								return o + t
							});
						} else {
							l = l.replace(new RegExp("(/?):" + r + "(\\W|$)", "g"), function(e, t, n) {
								if ("/" == n.charAt(0)) {
									return n;
								} else {
									return t + n;
								}
							});
						}
					});
					l = l.replace(/\/+$/, "") || "/";
					l = l.replace(/\/\.(?=\w+($|\?))/, ".");
					e.url = l.replace(/\/\\\./, "/.");
					p(n, function(t, n) {
						if (!(c.urlParams[n])) {
							e.params = e.params || {};
							e.params[n] = t;
						}
					});
				}
			};
			return u;
		}
	])
}(window, window.angular);

! function(e, t) {
	"use strict";

	function n() {
		function e(e, n) {
			return t.extend(new(t.extend(function() {}, {
				prototype: e
			})), n)
		}

		function n(e, t) {
			var n = t.caseInsensitiveMatch,
				r = {
					originalPath: e,
					regexp: e
				},
				i = r.keys = [];
			e = e.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(e, t, n, r) {
				var o = "?" === r ? r : null,
					a = "*" === r ? r : null;
				i.push({
					name: n,
					optional: !!o
				});
				t = t || "";
				return "" + (o ? "" : t) + "(?:" + (o ? t : "") + (a && "(.+?)" || "([^/]+)") + (o || "") + ")" + (o || "");
			}).replace(/([\/$\*])/g, "\\$1");
			r.regexp = new RegExp("^" + e + "$", n ? "i" : "");
			return r;
		}
		var r = {};
		this.when = function(e, i) {
			if (r[e] = t.extend({
				reloadOnSearch: true
			}, i, e && n(e, i)), e) {
				var o = "/" == e[e.length - 1] ? e.substr(0, e.length - 1) : e + "/";
				r[o] = t.extend({
					redirectTo: e
				}, n(o, i))
			}
			return this
		};
		this.otherwise = function(e) {
			this.when(null, e);
			return this;
		};
		this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce",
			function(n, i, o, a, s, c, l, u) {
				function f(e, t) {
					var n = t.keys,
						r = {};
					if (!t.regexp) {
						return null;
					}
					var i = t.regexp.exec(e);
					if (!i) {
						return null;
					}
					for (var o = 1, a = i.length; a > o; ++o) {
						var s = n[o - 1],
							c = "string" == typeof i[o] ? decodeURIComponent(i[o]) : i[o];
						if (s && c) {
							r[s.name] = c;
						}
					}
					return r
				}

				function d() {
					var e = p(),
						r = m.current;
					if (e && r && e.$$route === r.$$route && t.equals(e.pathParams, r.pathParams) && !e.reloadOnSearch && !g) {
						r.params = e.params;
						t.copy(r.params, o);
						n.$broadcast("$routeUpdate", r);
					} else if ((e || r)) {
						g = false;
						n.$broadcast("$routeChangeStart", e, r);
						m.current = e;
						if (e && e.redirectTo) {
							if (t.isString(e.redirectTo)) {
								i.path(h(e.redirectTo, e.params)).search(e.params).replace();
							} else {
								i.url(e.redirectTo(e.pathParams, i.path(), i.search())).replace();
							}
						}
						a.when(e).then(function() {
							if (e) {
								var n, r, i = t.extend({}, e.resolve);
								t.forEach(i, function(e, n) {
									if (t.isString(e)) {
										i[n] = s.get(e);
									} else {
										i[n] = s.invoke(e);
									}
								});
								if (t.isDefined(n = e.template)) {
									if (t.isFunction(n)) {
										(n = n(e.params));
									}
								} else {
									if (t.isDefined(r = e.templateUrl)) {
										if (t.isFunction(r)) {
											(r = r(e.params)); 
										}
										r = u.getTrustedResourceUrl(r);
										if (t.isDefined(r)) {
											e.loadedTemplateUrl = r;
											n = c.get(r, {
												cache: l
											}).then(function(e) {
												return e.data
											});
										}
									}
								}
								if (t.isDefined(n)) {
									(i.$template = n)
								}
								return a.all(i);
							}
						}).then(function(i) {
							if (e == m.current) {
								if (e) {
									e.locals = i;
									t.copy(e.params, o);
								}
								n.$broadcast("$routeChangeSuccess", e, r);
							}
						}, function(t) {
							if (e == m.current) {
								n.$broadcast("$routeChangeError", e, r, t);
							}
						});
					}
				}

				function p() {
					var n, o;
					t.forEach(r, function(r) {
						if (!o && (n = f(i.path(), r))) {
							o = e(r, {
								params: t.extend({}, i.search(), n),
								pathParams: n
							});
							o.$$route = r;
						}
					});
					return o || r[null] && e(r[null], {
						params: {},
						pathParams: {}
					});
				}

				function h(e, n) {
					var r = [];
					t.forEach((e || "").split(":"), function(e, t) {
						if (0 === t) r.push(e);
						else {
							var i = e.match(/(\w+)(.*)/),
								o = i[1];
							r.push(n[o]);
							r.push(i[2] || "");
							delete n[o];
						}
					});
					return r.join("");
				}
				var g = false,
					m = {
						routes: r,
						reload: function() {
							g = true;
							n.$evalAsync(d);
						}
					};
				n.$on("$locationChangeSuccess", d);
				return m;
			}
		];
	}

	function r() {
		this.$get = function() {
			return {}
		}
	}

	function i(e, n, r) {
		return {
			restrict: "ECA",
			terminal: true,
			priority: 400,
			transclude: "element",
			link: function(i, o, a, s, c) {
				function l() {
					if (p) {
						p.remove();
						p = null;
					}
					if (f) {
						f.$destroy();
						f = null;
					}
					if (d) {
						r.leave(d, function() {
							p = null
						});
						p = d;
						d = null;
					}
				}

				function u() {
					var a = e.current && e.current.locals,
						s = a && a.$template;
					if (t.isDefined(s)) {
						var u = i.$new(),
							p = e.current,
							m = c(u, function(e) {
								r.enter(e, null, d || o, function() {
									if (!(!t.isDefined(h) || h && !i.$eval(h))) {
										n()
									}
								});
								l();
							});
						d = m;
						f = p.scope = u;
						f.$emit("$viewContentLoaded");
						f.$eval(g);
					} else {
						l();
					}
				}
				var f, d, p, h = a.autoscroll,
					g = a.onload || "";
				i.$on("$routeChangeSuccess", u), u()
			}
		}
	}

	function o(e, t, n) {
		return {
			restrict: "ECA",
			priority: -400,
			link: function(r, i) {
				var o = n.current,
					a = o.locals;
				i.html(a.$template);
				var s = e(i.contents());
				if (o.controller) {
					a.$scope = r;
					var c = t(o.controller, a);
					if (o.controllerAs) {
						(r[o.controllerAs] = c);
					}
					i.data("$ngControllerController", c);
					i.children().data("$ngControllerController", c);
				}
				s(r)
			}
		}
	}
	var a = t.module("ngRoute", ["ng"]).provider("$route", n);
	a.provider("$routeParams", r);
	a.directive("ngView", i);
	a.directive("ngView", o);
	i.$inject = ["$route", "$anchorScroll", "$animate"];
	o.$inject = ["$compile", "$controller", "$route"];
}(window, window.angular);

! function(e, t) {
	"use strict";

	function n() {
		this.$get = ["$$sanitizeUri",
			function(e) {
				return function(t) {
					var n = [];
					o(t, c(n, function(t, n) {
						return !/^unsafe/.test(e(t, n))
					}));
					return n.join("");
				}
			}
		]
	}

	function r(e) {
		var n = [],
			r = c(n, t.noop);
		r.chars(e);
		return n.join("");
	}

	function i(e) {
		var t, n = {},
			r = e.split(",");
		for (t = 0; t < r.length; t++) {
			n[r[t]] = true;
		}
		return n
	}

	function o(e, n) {
		function r(e, r, o, s) {
			if (r = t.lowercase(r), x[r])
				for (; y.last() && T[y.last()];) i("", y.last());
			if (k[r] && r == y.last()) {
				i("", r);
			}
			s = b[r] || !!s;
			if (!(s)) {
				y.push(r);
			}
			var c = {};
			o.replace(d, function(e, t, n, r, i) {
				var o = n || r || i || "";
				c[t] = a(o)
			}), n.start && n.start(r, c, s)
		}

		function i(e, r) {
			var i, o = 0;
			if (r = t.lowercase(r)) {
				for (o = y.length - 1; o >= 0 && y[o] != r; o--);
			}
			if (o >= 0) {
				for (i = y.length - 1; i >= o; i--)
					if (n.end) {
						n.end(y[i]);
					}
				y.length = o
			}
		}
		var o, s, c, y = [],
			$ = e;
		for (y.last = function() {
			return y[y.length - 1]
		}; e;) {
			if (s = true, y.last() && C[y.last()]) e = e.replace(new RegExp("(.*)<\\s*\\/\\s*" + y.last() + "[^>]*>", "i"), function(e, t) {
				t = t.replace(g, "$1").replace(v, "$1");
				if (n.chars) {
					n.chars(a(t))
				}
				return "";
			}), i("", y.last());
			else if (0 === e.indexOf("<!--") ? (o = e.indexOf("--", 4), o >= 0 && e.lastIndexOf("-->", o) === o && (n.comment && n.comment(e.substring(4, o)), e = e.substring(o + 3), s = false)) : m.test(e) ? (c = e.match(m), c && (e = e.replace(c[0], ""), s = false)) : h.test(e) ? (c = e.match(f), c && (e = e.substring(c[0].length), c[0].replace(f, i), s = false)) : p.test(e) && (c = e.match(u), c && (e = e.substring(c[0].length), c[0].replace(u, r), s = false)), s) {
				o = e.indexOf("<");
				var w = 0 > o ? e : e.substring(0, o);
				e = 0 > o ? "" : e.substring(o), n.chars && n.chars(a(w))
			}
			if ($ == e) {
				throw l("badparse", "The sanitizer was unable to parse the following block of html: {0}", e);
			}
			$ = e
		}
		i()
	}

	function a(e) {
		if (!e) {
			return "";
		}
		var t = j.exec(e),
			n = t[1],
			r = t[3],
			i = t[2];
		if (i) {
			N.innerHTML = i.replace(/</g, "&lt;");
			if ("textContent" in N) {
				i = N.textContent;
			} 
			else {
				i = N.innerText;
			}
		}
		return n + i + r;
	}

	function s(e) {
		return e.replace(/&/g, "&amp;").replace(y, function(e) {
			return "&#" + e.charCodeAt(0) + ";"
		}).replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}

	function c(e, n) {
		var r = false,
			i = t.bind(e, e.push);
		return {
			start: function(e, o, a) {
				e = t.lowercase(e);
				if (!r && C[e]) {
					r = e;
				}
				if (!(r || S[e] !== true)) {
					i("<");
					i(e);
					t.forEach(o, function(r, o) {
						var a = t.lowercase(o),
							c = "img" === e && "src" === a || "background" === a;
						if (!(E[a] !== true || A[a] === true && !n(r, c))) {
							i(" ");
							i(o);
							i('="');
							i(s(r));
							i('"');
						}
					});
					i(a ? "/>" : ">");
				}
			},
			end: function(e) {
				e = t.lowercase(e);
				if (!(r || S[e] !== true)) {
					i("</");
					i(e);
					i(">");
				}
				if (r == e) {
					r = false;
				}
			},
			chars: function(e) {
				if (!(r)) {
					i(s(e))
				}
			}
		}
	}
	var l = t.$$minErr("$sanitize"),
		u = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
		f = /^<\s*\/\s*([\w:-]+)[^>]*>/,
		d = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
		p = /^</,
		h = /^<\s*\//,
		g = /<!--(.*?)-->/g,
		m = /<!DOCTYPE([^>]*?)>/i,
		v = /<!\[CDATA\[(.*?)]]>/g,
		y = /([^\#-~| |!])/g,
		b = i("area,br,col,hr,img,wbr"),
		$ = i("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
		w = i("rp,rt"),
		k = t.extend({}, w, $),
		x = t.extend({}, $, i("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
		T = t.extend({}, w, i("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
		C = i("script,style"),
		S = t.extend({}, b, x, T, k),
		A = i("background,cite,href,longdesc,src,usemap"),
		E = t.extend({}, A, i("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),
		N = document.createElement("pre"),
		j = /^(\s*)([\s\S]*?)(\s*)$/;
	t.module("ngSanitize", []).provider("$sanitize", n), t.module("ngSanitize").filter("linky", ["$sanitize",
		function(e) {
			var n = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
				i = /^mailto:/;
			return function(o, a) {
				function s(e) {
					if (e) {
						p.push(r(e));
					}
				}

				function c(e, n) {
					p.push("<a ");
					if (t.isDefined(a)) {
						p.push('target="');
						p.push(a);
						p.push('" ');
					}
					p.push('href="');
					p.push(e);
					p.push('">');
					s(n);
					p.push("</a>");
				}
				if (!o) {
					return o;
				}
				for (var l, u, f, d = o, p = []; l = d.match(n);) {
					u = l[0];
					if (l[2] == l[3]) {
						u = "mailto:" + u;
					}
					f = l.index;
					s(d.substr(0, f));
					c(u, l[0].replace(i, ""));
					d = d.substring(f + l[0].length);
					s(d);
				}
				return e(p.join(""));
			}
		}
	])
}(window, window.angular);

! function(e, t, n) {
	function r(e) {
		var t = {},
			r = /^jQuery\d+$/;
		n.each(e.attributes, function(e, n) {
			if (n.specified && !r.test(n.name)) {
				t[n.name] = n.value;
			}
		});
		return t;
	}

	function i(e, r) {
		var i = this,
			o = n(i);
		if (i.value == o.attr("placeholder") && o.hasClass("placeholder"))
			if (o.data("placeholder-password")) {
				if (o = o.hide().next().show().attr("id", o.removeAttr("id").data("placeholder-id")), e === true) {
					return o[0].value = r;
				}
				o.focus()
			} else {
				i.value = "";
				o.removeClass("placeholder");
				if (i == t.activeElement) {
					i.select();
				}
			}
	}

	function o() {
		var e, t = this,
			o = n(t),
			a = this.id;
		if ("" == t.value) {
			if ("password" == t.type) {
				if (!o.data("placeholder-textinput")) {
					try {
						e = o.clone().attr({
							type: "text"
						})
					} catch (s) {
						e = n("<input>").attr(n.extend(r(this), {
							type: "text"
						}))
					}
					e.removeAttr("name").data({
						"placeholder-password": true,
						"placeholder-id": a
					}).bind("focus.placeholder", i), o.data({
						"placeholder-textinput": e,
						"placeholder-id": a
					}).before(e)
				}
				o = o.removeAttr("id").hide().prev().attr("id", a).show()
			}
			o.addClass("placeholder"), o[0].value = o.attr("placeholder")
		} else {
			o.removeClass("placeholder");
		}
	}
	var a, s, c = "placeholder" in t.createElement("input"),
		l = "placeholder" in t.createElement("textarea"),
		u = n.fn,
		f = n.valHooks;
	if (c && l) {
		s = u.placeholder = function() {
			return this
		};
		s.input = s.textarea = true;
	} else {
		s = u.placeholder = function() {
			var e = this;
			e.filter((c ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
				"focus.placeholder": i,
				"blur.placeholder": o
			}).data("placeholder-enabled", true).trigger("blur.placeholder");
			return e;
		};
		s.input = c;
		s.textarea = l;
		a = {
			get: function(e) {
				var t = n(e);
				if (t.data("placeholder-enabled") && t.hasClass("placeholder")) {
					return "";
				} else {
					return e.value;
				}
			},
			set: function(e, r) {
				var a = n(e);
				if (a.data("placeholder-enabled")) {
					return (r == "" ? (e.value = r, e != t.activeElement && o.call(e)) : a.hasClass("placeholder") ? i.call(e, true, r) || (e.value = r) : e.value = r, a);
				} else {
					return e.value = r;
				}
			}
		};
		if (!(c)) {
			f.input = a;
		}
		if (!(l)) {
			f.textarea = a;
		}
		n(function() {
			n(t).delegate("form", "submit.placeholder", function() {
				var e = n(".placeholder", this).each(i);
				setTimeout(function() {
					e.each(o)
				}, 10)
			})
		});
		n(e).bind("beforeunload.placeholder", function() {
			n(".placeholder").each(function() {
				this.value = ""
			})
		});
	}
}(this, document, jQuery);
window.Modernizr = function(e, t, n) {
	function r(e) {
		b.cssText = e
	}

	function i(e, t) {
		return r(x.join(e + ";") + (t || ""))
	}

	function o(e, t) {
		return typeof e === t
	}

	function a(e, t) {
		return !!~("" + e).indexOf(t)
	}

	function s(e, t) {
		for (var r in e) {
			var i = e[r];
			if (!a(i, "-") && b[i] !== n) {
				if (t == "pfx") {
					return i;
				} else {
					return true;
				}
			}
		}
		return false
	}

	function c(e, t, r) {
		for (var i in e) {
			var a = t[e[i]];
			if (a !== n) {
				if (r === false) {
					return e[i];
				} else if (o(a, "function")) {
					return a.bind(r || t);
				} else {
					return a;
				}
			}
		}
		return false
	}

	function l(e, t, n) {
		var r = e.charAt(0).toUpperCase() + e.slice(1),
			i = (e + " " + C.join(r + " ") + r).split(" ");
		if (o(t, "string") || o(t, "undefined")) {
			return s(i, t);
		} else {
			return (i = (e + " " + S.join(r + " ") + r).split(" "), c(i, t, n));
		}
	}

	function u() {
		h.input = function(n) {
			for (var r = 0, i = n.length; i > r; r++) {
				j[n[r]] = n[r] in $;
			}
			if (j.list) {
				(j.list = !!t.createElement("datalist") && !!e.HTMLDataListElement)
			}
			return j;
		}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));
		h.inputtypes = function(e) {
			for (var r, i, o, a = 0, s = e.length; s > a; a++) {
				$.setAttribute("type", i = e[a]);
				r = "text" !== $.type;
				if (r) {
					$.value = w;
					$.style.cssText = "position:absolute;visibility:hidden;";
					if (/^range$/.test(i) && $.style.WebkitAppearance !== n) {
						m.appendChild($);
						o = t.defaultView;
						r = o.getComputedStyle && "textfield" !== o.getComputedStyle($, null).WebkitAppearance && 0 !== $.offsetHeight;
						m.removeChild($);
					} else if (!(/^(search|tel)$/.test(i))) {
						if (/^(url|email)$/.test(i)) {
							r = $.checkValidity && $.checkValidity() === false;
						} 
						else {
							r = $.value != w;
						} 
					}
				}
				N[e[a]] = !!r;
			}
			return N
		}("search tel url email datetime date month week time datetime-local number range color".split(" "));
	}
	var f, d, p = "2.6.2",
		h = {},
		g = true,
		m = t.documentElement,
		v = "modernizr",
		y = t.createElement(v),
		b = y.style,
		$ = t.createElement("input"),
		w = ":)",
		k = {}.toString,
		x = " -webkit- -moz- -o- -ms- ".split(" "),
		T = "Webkit Moz O ms",
		C = T.split(" "),
		S = T.toLowerCase().split(" "),
		A = {
			svg: "http://www.w3.org/2000/svg"
		},
		E = {},
		N = {},
		j = {},
		_ = [],
		q = _.slice,
		M = function(e, n, r, i) {
			var o, a, s, c, l = t.createElement("div"),
				u = t.body,
				f = u || t.createElement("body");
			if (parseInt(r, 10))
				for (; r--;) {
					s = t.createElement("div");
					if (i) {
						s.id = i[r];
					} else {
						s.id = v + (r + 1);
					}
					l.appendChild(s);
				}
			o = ["&#173;", '<style id="s', v, '">', e, "</style>"].join("");
			l.id = v;
			(u ? l : f).innerHTML += o;
			f.appendChild(l);
			if (!(u)) {
				f.style.background = "";
				f.style.overflow = "hidden";
				c = m.style.overflow;
				m.style.overflow = "hidden";
				m.appendChild(f);
			}
			a = n(l, e);
			if (u) {
				l.parentNode.removeChild(l);
			} else {
				f.parentNode.removeChild(f);
				m.style.overflow = c;
			}
			return !!a;
		},
		O = function(t) {
			var n = e.matchMedia || e.msMatchMedia;
			if (n) {
				return n(t).matches;
			}
			var r;
			M("@media " + t + " { #" + v + " { position: absolute; } }", function(t) {
				r = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
			});
			return r;
		},
		I = function() {
			function e(e, i) {
				i = i || t.createElement(r[e] || "div"), e = "on" + e;
				var a = e in i;
				if (!(a)) {
					if (!(i.setAttribute)) {
						(i = t.createElement("div")); 
					}
					if (i.setAttribute && i.removeAttribute) {
						i.setAttribute(e, "");
						a = o(i[e], "function");
						if (!(o(i[e], "undefined"))) {
							(i[e] = n);
						}
						i.removeAttribute(e);
					}
				}
				i = null;
				return a;
			}
			var r = {
				select: "input",
				change: "input",
				submit: "form",
				reset: "form",
				error: "img",
				load: "img",
				abort: "img"
			};
			return e
		}(),
		D = {}.hasOwnProperty;
	d = o(D, "undefined") || o(D.call, "undefined") ? function(e, t) {
		return t in e && o(e.constructor.prototype[t], "undefined")
	} : function(e, t) {
		return D.call(e, t)
	}, Function.prototype.bind || (Function.prototype.bind = function(e) {
		var t = this;
		if ("function" != typeof t) {
			throw new TypeError;
		}
		var n = q.call(arguments, 1),
			r = function() {
				if (this instanceof r) {
					var i = function() {};
					i.prototype = t.prototype;
					var o = new i,
						a = t.apply(o, n.concat(q.call(arguments)));
					if (Object(a) === a) {
						return a;
					} else {
						return o;
					}
				}
				return t.apply(e, n.concat(q.call(arguments)))
			};
		return r
	}), E.flexbox = function() {
		return l("flexWrap")
	}, E.canvas = function() {
		var e = t.createElement("canvas");
		return !!e.getContext && !!e.getContext("2d")
	}, E.canvastext = function() {
		return !!h.canvas && !!o(t.createElement("canvas").getContext("2d").fillText, "function")
	}, E.webgl = function() {
		return !!e.WebGLRenderingContext
	}, E.touch = function() {
		var n;
		if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) {
			n = true;
		} else {
			M(["@media (", x.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
				n = 9 === e.offsetTop
			});
		}
		return n;
	}, E.geolocation = function() {
		return "geolocation" in navigator
	}, E.postmessage = function() {
		return !!e.postMessage
	}, E.websqldatabase = function() {
		return !!e.openDatabase
	}, E.indexedDB = function() {
		return !!l("indexedDB", e)
	}, E.hashchange = function() {
		return I("hashchange", e) && (t.documentMode === n || t.documentMode > 7)
	}, E.history = function() {
		return !!e.history && !!history.pushState
	}, E.draganddrop = function() {
		var e = t.createElement("div");
		return "draggable" in e || "ondragstart" in e && "ondrop" in e
	}, E.websockets = function() {
		return "WebSocket" in e || "MozWebSocket" in e
	}, E.rgba = function() {
		r("background-color:rgba(150,255,150,.5)");
		return a(b.backgroundColor, "rgba");
	}, E.hsla = function() {
		r("background-color:hsla(120,40%,100%,.5)");
		return a(b.backgroundColor, "rgba") || a(b.backgroundColor, "hsla");
	}, E.multiplebgs = function() {
		r("background:url(https://),url(https://),red url(https://)");
		return /(url\s*\(.*?){3}/.test(b.background);
	}, E.backgroundsize = function() {
		return l("backgroundSize")
	}, E.borderimage = function() {
		return l("borderImage")
	}, E.borderradius = function() {
		return l("borderRadius")
	}, E.boxshadow = function() {
		return l("boxShadow")
	}, E.textshadow = function() {
		return "" === t.createElement("div").style.textShadow
	}, E.opacity = function() {
		i("opacity:.55");
		return /^0.55$/.test(b.opacity);
	}, E.cssanimations = function() {
		return l("animationName")
	}, E.csscolumns = function() {
		return l("columnCount")
	}, E.cssgradients = function() {
		var e = "background-image:",
			t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
			n = "linear-gradient(left top,#9f9, white);";
		r((e + "-webkit- ".split(" ").join(t + e) + x.join(n + e)).slice(0, -e.length));
		return a(b.backgroundImage, "gradient");
	}, E.cssreflections = function() {
		return l("boxReflect")
	}, E.csstransforms = function() {
		return !!l("transform")
	}, E.csstransforms3d = function() {
		var e = !!l("perspective");
		if (e && "webkitPerspective" in m.style) {
			M("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t) {
				e = 9 === t.offsetLeft && 3 === t.offsetHeight
			})
		}
		return e;
	}, E.csstransitions = function() {
		return l("transition")
	}, E.fontface = function() {
		var e;
		M('@font-face {font-family:"font";src:url("https://")}', function(n, r) {
			var i = t.getElementById("smodernizr"),
				o = i.sheet || i.styleSheet,
				a = o ? o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || "" : "";
			e = /src/i.test(a) && 0 === a.indexOf(r.split(" ")[0])
		});
		return e;
	}, E.generatedcontent = function() {
		var e;
		M(["#", v, "{font:0/0 a}#", v, ':after{content:"', w, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
			e = t.offsetHeight >= 3
		});
		return e;
	}, E.video = function() {
		var e = t.createElement("video"),
			n = false;
		try {
			if ((n = !!e.canPlayType)) {
				n = new Boolean(n);
				n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, "");
				n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, "");
				n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "");
			}
		} catch (r) {}
		return n
	}, E.audio = function() {
		var e = t.createElement("audio"),
			n = false;
		try {
			if ((n = !!e.canPlayType)) {
				n = new Boolean(n);
				n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, "");
				n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, "");
				n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "");
				n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, "");
			}
		} catch (r) {}
		return n
	}, E.localstorage = function() {
		try {
			localStorage.setItem(v, v);
			localStorage.removeItem(v);
			return true;
		} catch (e) {
			return false
		}
	}, E.sessionstorage = function() {
		try {
			sessionStorage.setItem(v, v);
			sessionStorage.removeItem(v);
			return true;
		} catch (e) {
			return false
		}
	}, E.webworkers = function() {
		return !!e.Worker
	}, E.applicationcache = function() {
		return !!e.applicationCache
	}, E.svg = function() {
		return !!t.createElementNS && !!t.createElementNS(A.svg, "svg").createSVGRect
	}, E.inlinesvg = function() {
		var e = t.createElement("div");
		e.innerHTML = "<svg/>";
		return (e.firstChild && e.firstChild.namespaceURI) == A.svg;
	}, E.smil = function() {
		return !!t.createElementNS && /SVGAnimate/.test(k.call(t.createElementNS(A.svg, "animate")))
	}, E.svgclippaths = function() {
		return !!t.createElementNS && /SVGClipPath/.test(k.call(t.createElementNS(A.svg, "clipPath")))
	};
	for (var L in E)
		if (d(E, L)) {
			f = L.toLowerCase();
			h[f] = E[L]();
			_.push((h[f] ? "" : "no-") + f);
		}
	return h.input || u(), h.addTest = function(e, t) {
			if ("object" == typeof e)
				for (var r in e)
					if (d(e, r)) {
						h.addTest(r, e[r]);
					} else {
						if (e = e.toLowerCase(), h[e] !== n) {
							return h;
						}
						if ("function" == typeof t) {
							t = t();
						} else {
							t = t;
						}
						if ("undefined" != typeof g && g) {
							(m.className += " " + (t ? "" : "no-") + e);
						}
						h[e] = t;
					}
			return h
		}, r(""), y = $ = null,
		function(e, t) {
			function n(e, t) {
				var n = e.createElement("p"),
					r = e.getElementsByTagName("head")[0] || e.documentElement;
				n.innerHTML = "x<style>" + t + "</style>";
				return r.insertBefore(n.lastChild, r.firstChild);
			}

			function r() {
				var e = v.elements;
				if ("string" == typeof e) {
					return e.split(" ");
				} else {
					return e;
				}
			}

			function i(e) {
				var t = m[e[h]];
				if (!(t)) {
					t = {};
					g++;
					e[h] = g;
					m[g] = t;
				}
				return t;
			}

			function o(e, n, r) {
				if (n || (n = t), u) {
					return n.createElement(e);
				}
				if (!(r)) {
					(r = i(n))
				}
				var o;
				if (r.cache[e]) {
					o = r.cache[e].cloneNode();
				} else if (p.test(e)) {
					o = (r.cache[e] = r.createElem(e)).cloneNode();
				} else {
					o = r.createElem(e);
				}
				if (o.canHaveChildren && !d.test(e)) {
					return r.frag.appendChild(o);
				} else {
					return o;
				}
			}

			function a(e, n) {
				if (e || (e = t), u) {
					return e.createDocumentFragment();
				}
				n = n || i(e);
				for (var o = n.frag.cloneNode(), a = 0, s = r(), c = s.length; c > a; a++) {
					o.createElement(s[a]);
				}
				return o
			}

			function s(e, t) {
				if (!(t.cache)) {
					t.cache = {};
					t.createElem = e.createElement;
					t.createFrag = e.createDocumentFragment;
					t.frag = t.createFrag();
				}
				e.createElement = function(n) {
					if (v.shivMethods) {
						return o(n, e, t);
					} else {
						return t.createElem(n);
					}
				};
				e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/\w+/g, function(e) {
					t.createElem(e);
					t.frag.createElement(e);
					return 'c("' + e + '")';
				}) + ");return n}")(v, t.frag);
			}

			function c(e) {
				if (!(e)) {
					(e = t)
				}
				var r = i(e);
				if (v.shivCSS && !l && !r.hasCSS) {
					(r.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}"))
				}
				if (!(u)) {
					s(e, r)
				}
				return e;
			}
			var l, u, f = e.html5 || {},
				d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
				p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
				h = "_html5shiv",
				g = 0,
				m = {};
			! function() {
				try {
					var e = t.createElement("a");
					e.innerHTML = "<xyz></xyz>";
					l = "hidden" in e;
					u = 1 == e.childNodes.length || function() {
						t.createElement("a");
						var e = t.createDocumentFragment();
						return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
					}();
				} catch (n) {
					l = true;
					u = true;
				}
			}();
			var v = {
				elements: f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
				shivCSS: f.shivCSS !== false,
				supportsUnknownElements: u,
				shivMethods: f.shivMethods !== false,
				type: "default",
				shivDocument: c,
				createElement: o,
				createDocumentFragment: a
			};
			e.html5 = v, c(t)
		}(this, t), h._version = p, h._prefixes = x, h._domPrefixes = S, h._cssomPrefixes = C, h.mq = O, h.hasEvent = I, h.testProp = function(e) {
			return s([e])
		}, h.testAllProps = l, h.testStyles = M, h.prefixed = function(e, t, n) {
			if (t) {
				return l(e, t, n);
			} else {
				return l(e, "pfx");
			}
		}, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (g ? " js " + _.join(" ") : ""), h
}(this, this.document);

! function(e, t, n) {
	function r(e) {
		return "[object Function]" == m.call(e)
	}

	function i(e) {
		return "string" == typeof e
	}

	function o() {}

	function a(e) {
		return !e || e == "loaded" || e == "complete" || e == "uninitialized"
	}

	function s() {
		var e = v.shift();
		y = 1, e ? e.t ? h(function() {
			("c" == e.t ? d.injectCss : d.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
		}, 0) : (e(), s()) : y = 0
	}

	function c(e, n, r, i, o, c, l) {
		function u(t) {
			if (!p && a(f.readyState) && (b.r = p = 1, !y && s(), f.onload = f.onreadystatechange = null, t)) {
				if ("img" != e) {
					h(function() {
						w.removeChild(f)
					}, 50);
				}
				for (var r in S[n])
					if (S[n].hasOwnProperty(r)) {
						S[n][r].onload();
					}
			}
		}
		var l = l || d.errorTimeout,
			f = t.createElement(e),
			p = 0,
			m = 0,
			b = {
				t: r,
				s: n,
				e: o,
				a: c,
				x: l
			};
		if (1 === S[n]) {
			m = 1;
			S[n] = [];
		}
		if (e == "object") {
			f.data = n;
		} else {
			f.src = n;
			f.type = e;
		}
		f.width = f.height = "0";
		f.onerror = f.onload = f.onreadystatechange = function() {
			u.call(this, m)
		};
		v.splice(i, 0, b);
		if ("img" != e) {
			if (m || 2 === S[n]) {
				w.insertBefore(f, $ ? null : g);
				h(u, l);
			} else {
				S[n].push(f);
			}
		}
	}

	function l(e, t, n, r, o) {
		y = 0;
		t = t || "j";
		if (i(e)) {
			c(t == "c" ? x : k, e, t, this.i++, n, r, o);
		} else {
			v.splice(this.i++, 0, e);
			if (1 == v.length) {
				s(); 
			}
		}
		return this;
	}

	function u() {
		var e = d;
		e.loader = {
			load: l,
			i: 0
		};
		return e;
	}
	var f, d, p = t.documentElement,
		h = e.setTimeout,
		g = t.getElementsByTagName("script")[0],
		m = {}.toString,
		v = [],
		y = 0,
		b = "MozAppearance" in p.style,
		$ = b && !!t.createRange().compareNode,
		w = $ ? p : g.parentNode,
		p = e.opera && "[object Opera]" == m.call(e.opera),
		p = !!t.attachEvent && !p,
		k = b ? "object" : p ? "script" : "img",
		x = p ? "script" : k,
		T = Array.isArray || function(e) {
			return "[object Array]" == m.call(e)
		},
		C = [],
		S = {},
		A = {
			timeout: function(e, t) {
				if (t.length) {
					(e.timeout = t[0])
				}
				return e;
			}
		};
	d = function(e) {
		function t(e) {
			var t, n, r, e = e.split("!"),
				i = C.length,
				o = e.pop(),
				a = e.length,
				o = {
					url: o,
					origUrl: o,
					prefixes: e
				};
			for (n = 0; a > n; n++) {
				r = e[n].split("=");
				if ((t = A[r.shift()])) {
					(o = t(o, r));
				}
			}
			for (n = 0; i > n; n++) {
				o = C[n](o);
			}
			return o
		}

		function a(e, i, o, a, s) {
			var c = t(e),
				l = c.autoCallback;
			c.url.split(".").pop().split("?").shift();
			if (!(c.bypass)) {
				if (i) {
					if (r(i)) {
						i = i;
					} 
					else {
						i = i[e] || i[a] || i[e.split("/").pop().split("?")[0]];
					} 
				}
				if (c.instead) {
					c.instead(e, i, o, a, s);
				} else {
					if (S[c.url]) {
						c.noexec = true;
					} 
					else {
						S[c.url] = 1;
					}
					o.load(c.url, c.forceCSS || !c.forceJS && "css" == c.url.split(".").pop().split("?").shift() ? "c" : n, c.noexec, c.attrs, c.timeout);
					if ((r(i) || r(l))) {
						o.load(function() {
							u();
							if (i) {
								i(c.origUrl, s, a);
							}
							if (l) {
								l(c.origUrl, s, a);
							}
							S[c.url] = 2;
						}); 
					}
				}
			}
		}

		function s(e, t) {
			function n(e, n) {
				if (e) {
					if (i(e)) n || (f = function() {
						var e = [].slice.call(arguments);
						d.apply(this, e), p()
					}), a(e, f, t, 0, l);
					else if (Object(e) === e)
						for (c in s = function() {
							var t, n = 0;
							for (t in e)
								if (e.hasOwnProperty(t)) {
									n++;
								}
							return n
						}(), e)
							if (e.hasOwnProperty(c)) {
								if (!n && !--s) {
									if (r(f)) {
										f = function() {
											var e = [].slice.call(arguments);
											d.apply(this, e), p()
										};
									} else {
										f[c] = function(e) {
											return function() {
												var t = [].slice.call(arguments);
												e && e.apply(this, t), p()
											}
										}(d[c]);
									}
								}
								a(e[c], f, t, c, l);
							}
				} else if (!n) {
					p();
				}
			}
			var s, c, l = !!e.test,
				u = e.load || e.both,
				f = e.callback || o,
				d = f,
				p = e.complete || o;
			n(l ? e.yep : e.nope, !!u), u && n(u)
		}
		var c, l, f = this.yepnope.loader;
		if (i(e)) a(e, 0, f, 0);
		else if (T(e))
			for (c = 0; c < e.length; c++) {
				l = e[c];
				if (i(l)) {
					a(l, 0, f, 0);
				} else if (T(l)) {
					d(l);
				} else if (Object(l) === l) {
					s(l, f);
				}
			} else if (Object(e) === e) {
				s(e, f);
			}
	};
	d.addPrefix = function(e, t) {
		A[e] = t
	};
	d.addFilter = function(e) {
		C.push(e)
	};
	d.errorTimeout = 1e4;
	if (null == t.readyState && t.addEventListener) {
		t.readyState = "loading";
		t.addEventListener("DOMContentLoaded", f = function() {
			t.removeEventListener("DOMContentLoaded", f, 0);
			t.readyState = "complete";
		}, 0);
	}
	e.yepnope = u();
	e.yepnope.executeStack = s;
	e.yepnope.injectJs = function(e, n, r, i, c, l) {
		var u, f, p = t.createElement("script"),
			i = i || d.errorTimeout;
		p.src = e;
		for (f in r) {
			p.setAttribute(f, r[f]);
		}
		if (l) {
			n = s;
		} else {
			n = n || o;
		}
		p.onreadystatechange = p.onload = function() {
			if (!u && a(p.readyState)) {
				u = 1;
				n();
				p.onload = p.onreadystatechange = null;
			}
		};
		h(function() {
			if (!(u)) {
				u = 1;
				n(1);
			}
		}, i);
		if (c) {
			p.onload();
		} else {
			g.parentNode.insertBefore(p, g);
		}
	};
	e.yepnope.injectCss = function(e, n, r, i, a, c) {
		var l, i = t.createElement("link"),
			n = c ? s : n || o;
		i.href = e;
		i.rel = "stylesheet";
		i.type = "text/css";
		for (l in r) {
			i.setAttribute(l, r[l]);
		}
		if (!(a)) {
			g.parentNode.insertBefore(i, g);
			h(n, 0);
		}
	};
}(this, document), Modernizr.load = function() {
	yepnope.apply(window, [].slice.call(arguments, 0))
};
var addToHome = function(e) {
	function t() {
		if (T) {
			var t, r = Date.now();
			if (e.addToHomeConfig)
				for (t in e.addToHomeConfig) {
					E[t] = e.addToHomeConfig[t];
				}
			if (!(E.autostart)) {
				E.hookOnLoad = false;
			}
			f = /ipad/gi.test(x.platform);
			d = e.devicePixelRatio && e.devicePixelRatio > 1;
			p = /Safari/i.test(x.appVersion) && !/CriOS/i.test(x.appVersion);
			h = x.standalone;
			g = x.appVersion.match(/OS (\d+_\d+)/i);
			if (g[1]) {
				g = +g[1].replace("_", ".");
			} else {
				g = 0;
			}
			A = +e.localStorage.getItem("addToHome");
			v = e.sessionStorage.getItem("addToHomeSession");
			if (E.returningVisitor) {
				y = A && A + 24192e5 > r;
			} else {
				y = true;
			}
			if (!(A)) {
				A = r;
			}
			m = y && r >= A;
			if (E.hookOnLoad) {
				e.addEventListener("load", n, false);
			} else if (!E.hookOnLoad && E.autostart) {
				n();
			}
		}
	}

	function n() {
		e.removeEventListener("load", n, false);
		if (y) {
			if (E.expire && m) {
				e.localStorage.setItem("addToHome", Date.now() + 6e4 * E.expire)
			}
		} else {
			e.localStorage.setItem("addToHome", Date.now());
		}
		if ($ || p && m && !v && !h && y) {
			var t = "",
				i = x.platform.split(" ")[0],
				o = x.language.replace("-", "_");
			b = document.createElement("div");
			b.id = "addToHomeScreen";
			b.style.cssText += "left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:" + (5 > g ? "absolute" : "fixed");
			if (E.message in N) {
				o = E.message;
				E.message = "";
			}
			if ("" === E.message) {
				if (o in N) {
					E.message = N[o];
				} 
				else {
					E.message = N.en_us;
				}
			}
			if (E.touchIcon) {
				t = document.querySelector(d ? 'head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon][sizes="144x144"]' : 'head link[rel^=apple-touch-icon][sizes="57x57"],head link[rel^=apple-touch-icon]');
				if (t) {
					(t = '<span style="background-image:url(' + t.href + ')" class="addToHomeTouchIcon"></span>'); 
				}
			}
			b.className = (f ? "addToHomeIpad" : "addToHomeIphone") + (t ? " addToHomeWide" : "");
			b.innerHTML = t + E.message.replace("%device", i).replace("%icon", g >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') + (E.arrow ? '<span class="addToHomeArrow"></span>' : "") + (E.closeButton ? '<span class="addToHomeClose">×</span>' : "");
			document.body.appendChild(b);
			if (E.closeButton) {
				b.addEventListener("click", a, false);
			}
			if (!f && g >= 6) {
				window.addEventListener("orientationchange", u, false);
			}
			setTimeout(r, E.startDelay);
		}
	}

	function r() {
		var t, n = 208;
		if (f) {
			switch (5 > g ? (S = e.scrollY, C = e.scrollX) : 6 > g && (n = 160), b.style.top = S + E.bottomOffset + "px", b.style.left = C + n - Math.round(b.offsetWidth / 2) + "px", E.animationIn) {
				case "drop":
					t = "0.6s", b.style.webkitTransform = "translate3d(0," + -(e.scrollY + E.bottomOffset + b.offsetHeight) + "px,0)";
					break;
				case "bubble":
					t = "0.6s";
					b.style.opacity = "0";
					b.style.webkitTransform = "translate3d(0," + (S + 50) + "px,0)";
					break;
				default:
					t = "1s", b.style.opacity = "0"
			}
		} else {
			switch (S = e.innerHeight + e.scrollY, 5 > g ? (C = Math.round((e.innerWidth - b.offsetWidth) / 2) + e.scrollX, b.style.left = C + "px", b.style.top = S - b.offsetHeight - E.bottomOffset + "px") : (b.style.left = "50%", b.style.marginLeft = -Math.round(b.offsetWidth / 2) - (e.orientation % 180 && g >= 6 ? 40 : 0) + "px", b.style.bottom = E.bottomOffset + "px"), E.animationIn) {
				case "drop":
					t = "1s", b.style.webkitTransform = "translate3d(0," + -(S + E.bottomOffset) + "px,0)";
					break;
				case "bubble":
					t = "0.6s", b.style.webkitTransform = "translate3d(0," + (b.offsetHeight + E.bottomOffset + 50) + "px,0)";
					break;
				default:
					t = "1s", b.style.opacity = "0"
			}
		}
		b.offsetHeight;
		b.style.webkitTransitionDuration = t;
		b.style.opacity = "1";
		b.style.webkitTransform = "translate3d(0,0,0)";
		b.addEventListener("webkitTransitionEnd", s, false);
		k = setTimeout(o, E.lifespan);
	}

	function i(e) {
		if (T && !b) {
			$ = e;
			n();
		}
	}

	function o() {
		clearInterval(w);
		clearTimeout(k);
		k = null;
		if (b) {
			var t = 0,
				n = 0,
				r = "1",
				i = "0";
			switch (E.closeButton && b.removeEventListener("click", a, false), !f && g >= 6 && window.removeEventListener("orientationchange", u, false), 5 > g && (t = f ? e.scrollY - S : e.scrollY + e.innerHeight - S, n = f ? e.scrollX - C : e.scrollX + Math.round((e.innerWidth - b.offsetWidth) / 2) - C), b.style.webkitTransitionProperty = "-webkit-transform,opacity", E.animationOut) {
				case "drop":
					if (f) {
						i = "0.4s";
						r = "0";
						t += 50;
					} else {
						i = "0.6s";
						t = t + b.offsetHeight + E.bottomOffset + 50;
					}
					break;
				case "bubble":
					if (f) {
						i = "0.8s";
						t = t - b.offsetHeight - E.bottomOffset - 50;
					} else {
						i = "0.4s";
						r = "0";
						t -= 50;
					}
					break;
				default:
					i = "0.8s", r = "0"
			}
			b.addEventListener("webkitTransitionEnd", s, false);
			b.style.opacity = r;
			b.style.webkitTransitionDuration = i;
			b.style.webkitTransform = "translate3d(" + n + "px," + t + "px,0)";
		}
	}

	function a() {
		e.sessionStorage.setItem("addToHomeSession", "1");
		v = true;
		o();
	}

	function s() {
		b.removeEventListener("webkitTransitionEnd", s, false);
		b.style.webkitTransitionProperty = "-webkit-transform";
		b.style.webkitTransitionDuration = "0.2s";
		if (k) {
			return void(5 > g && k && (w = setInterval(c, E.iterations)));
		} else {
			return (b.parentNode.removeChild(b), void(b = null));
		}
	}

	function c() {
		var t = new WebKitCSSMatrix(e.getComputedStyle(b, null).webkitTransform),
			n = f ? e.scrollY - S : e.scrollY + e.innerHeight - S,
			r = f ? e.scrollX - C : e.scrollX + Math.round((e.innerWidth - b.offsetWidth) / 2) - C;
		if ((n != t.m42 || r != t.m41)) {
			(b.style.webkitTransform = "translate3d(" + r + "px," + n + "px,0)");
		}
	}

	function l() {
		e.localStorage.removeItem("addToHome");
		e.sessionStorage.removeItem("addToHomeSession");
	}

	function u() {
		b.style.marginLeft = -Math.round(b.offsetWidth / 2) - (e.orientation % 180 && g >= 6 ? 40 : 0) + "px"
	}
	var f, d, p, h, g, m, v, y, b, $, w, k, x = e.navigator,
		T = "platform" in x && /iphone|ipod|ipad/gi.test(x.platform),
		C = 0,
		S = 0,
		A = 0,
		E = {
			autostart: true,
			returningVisitor: false,
			animationIn: "drop",
			animationOut: "fade",
			startDelay: 2e3,
			lifespan: 15e3,
			bottomOffset: 14,
			expire: 0,
			message: "",
			touchIcon: false,
			arrow: true,
			hookOnLoad: true,
			closeButton: true,
			iterations: 100
		},
		N = {
			ar: '<span dir="rtl">قم بتثبيت هذا التطبيق على <span dir="ltr">%device:</span>انقر<span dir="ltr">%icon</span> ،<strong>ثم اضفه الى الشاشة الرئيسية.</strong></span>',
			ca_es: "Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d'inici</strong>.",
			cs_cz: "Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.",
			da_dk: "Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.",
			de_de: "Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.",
			el_gr: "Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.",
			en_us: "Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.",
			es_es: "Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.",
			fi_fi: "Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.",
			fr_fr: "Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l'écran d'accueil</strong>.",
			he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
			hr_hr: "Instaliraj ovu aplikaciju na svoj %device: klikni na %icon i odaberi <strong>Dodaj u početni zaslon</strong>.",
			hu_hu: "Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.",
			it_it: "Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.",
			ja_jp: "このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。",
			ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
			nb_no: "Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>",
			nl_nl: "Installeer deze webapp op uw %device: tik %icon en dan <strong>Voeg toe aan beginscherm</strong>.",
			pl_pl: "Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.",
			pt_br: "Instale este aplicativo em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.",
			pt_pt: "Para instalar esta aplicação no seu %device, prima o %icon e depois o <strong>Adicionar ao ecrã principal</strong>.",
			ru_ru: "Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.",
			sv_se: "Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.",
			th_th: "ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>",
			tr_tr: "Bu uygulamayı %device'a eklemek için %icon simgesine sonrasında <strong>Ana Ekrana Ekle</strong> düğmesine basın.",
			zh_cn: "您可以将此应用程式安装到您的 %device 上。请按 %icon 然后点选<strong>添加至主屏幕</strong>。",
			zh_tw: "您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。"
		};
	t();
	return {
		show: i,
		close: o,
		reset: l
	};
}(window);
! function(e) {
	e("sanitize", function(e, t) {
		var n = {
			allowedTags: ["sub", "sup", "i", "b"],
			removeDangerousTags: function(e) {
				for (var t = e, r = 0; r < n.allowedTags.length; r++) {
					var i = n.allowedTags[r],
						o = new RegExp("<" + i + ">", "gi"),
						a = new RegExp("</" + i + ">", "gi");
					t = t.replace(o, "&Klt;" + i + "&Kgt;"), t = t.replace(a, "&Klt;/" + i + "&Kgt;")
				}
				var s = new RegExp("<[^>]>+", "gi");
				t = t.replace(s, "");
				t = t.replace(/\&Klt;/g, "<");
				t = t.replace(/\&Kgt;/g, ">");
				return t = t.replace(/"/g, "&quot;");
			},
			characterCount: function(e) {
				if (!e || !e.length) {
					return 0;
				}
				var t = n.plainText(e);
				return t.length
			},
			escapeTags: function(e) {
				if (e) {
					return String(e).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
				} else {
					return "";
				}
			},
			escapeEntities: function(e) {
				if (e) {
					return String(e).replace(/&(.+?);/g, "&amp;$1;");
				} else {
					return "";
				}
			},
			plainText: function(e) {
				var t = document.createElement("div");
				t.innerHTML = e;
				var n = t.textContent || t.innerText;
				return n
			},
			stripTags: function(e) {
				return e.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
			},
			wysiwigEncode: function(e) {
				return n.escapeEntities(n.removeDangerousTags(e))
			}
		};
		if (void 0 !== t) {
			t.allowedTags = n.allowedTags;
			t.characterCount = n.characterCount;
			t.removeDangerousTags = n.removeDangerousTags;
			t.escapeTags = n.escapeTags;
			t.stripTags = n.stripTags;
			t.plainText = n.plainText;
			t.escapeEntities = n.escapeEntities;
			t.wysiwigEncode = n.wysiwigEncode;
		}
		return n;
	})
}("function" == typeof define && define.amd ? define : function(e, t) {
	if ("undefined" != typeof exports) {
		t(require, exports);
	} else {
		window.mobitroll = window.mobitroll || {};
		t(function(e) {
			return window[e]
		}, window.mobitroll.sanitize = {});
	}
});
! function(e, t, n) {
	function r(e, n) {
		var r, i = t.createElement(e || "div");
		for (r in n) {
			i[r] = n[r];
		}
		return i
	}

	function i(e) {
		for (var t = 1, n = arguments.length; n > t; t++) {
			e.appendChild(arguments[t]);
		}
		return e
	}

	function o(e, t, n, r) {
		var i = ["opacity", t, ~~ (100 * e), n, r].join("-"),
			o = .01 + n / r * 100,
			a = Math.max(1 - (1 - e) / t * (100 - o), e),
			s = f.substring(0, f.indexOf("Animation")).toLowerCase(),
			c = s && "-" + s + "-" || "";
		if (!(p[i])) {
			h.insertRule("@" + c + "keyframes " + i + "{0%{opacity:" + a + "}" + o + "%{opacity:" + e + "}" + (o + .01) + "%{opacity:1}" + (o + t) % 100 + "%{opacity:" + e + "}100%{opacity:" + a + "}}", h.cssRules.length);
			p[i] = 1;
		}
		return i;
	}

	function a(e, t) {
		var r, i, o = e.style;
		if (o[t] !== n) {
			return t;
		}
		t = t.charAt(0).toUpperCase() + t.slice(1);
		for (i = 0; i < d.length; i++)
			if (r = d[i] + t, o[r] !== n) {
				return r;
			}
	}

	function s(e, t) {
		for (var n in t) {
			e.style[a(e, n) || n] = t[n];
		}
		return e
	}

	function c(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			for (var i in r)
				if (e[i] === n) {
					e[i] = r[i];
				}
		}
		return e
	}

	function l(e) {
		for (var t = {
			x: e.offsetLeft,
			y: e.offsetTop
		}; e = e.offsetParent;) {
			t.x += e.offsetLeft;
			t.y += e.offsetTop;
		}
		return t
	}

	function u(e) {
		if (this.spin) {
			return void(this.opts = c(e || {}, u.defaults, g));
		} else {
			return new u(e);
		}
	}
	var f, d = ["webkit", "Moz", "ms", "O"],
		p = {},
		h = function() {
			var e = r("style", {
				type: "text/css"
			});
			i(t.getElementsByTagName("head")[0], e);
			return e.sheet || e.styleSheet;
		}(),
		g = {
			lines: 12,
			length: 7,
			width: 5,
			radius: 10,
			rotate: 0,
			corners: 1,
			color: "#000",
			speed: 1,
			trail: 100,
			opacity: .25,
			fps: 20,
			zIndex: 2e9,
			className: "spinner",
			top: "auto",
			left: "auto",
			position: "relative"
		};
	u.defaults = {};
	c(u.prototype, {
		spin: function(e) {
			this.stop();
			var t, n, i = this,
				o = i.opts,
				a = i.el = s(r(0, {
					className: o.className
				}), {
					position: o.position,
					width: 0,
					zIndex: o.zIndex
				}),
				c = o.radius + o.length + o.width;
			if (e) {
				e.insertBefore(a, e.firstChild || null);
				n = l(e);
				t = l(a);
				s(a, {
					left: ("auto" == o.left ? n.x - t.x + (e.offsetWidth >> 1) : parseInt(o.left, 10) + c) + "px",
					top: ("auto" == o.top ? n.y - t.y + (e.offsetHeight >> 1) : parseInt(o.top, 10) + c) + "px"
				});
			}
			a.setAttribute("aria-role", "progressbar");
			i.lines(a, i.opts);
			if (!f) {
				var u = 0,
					d = o.fps,
					p = d / o.speed,
					h = (1 - o.opacity) / (p * o.trail / 100),
					g = p / o.lines;
				! function m() {
					u++;
					for (var e = o.lines; e; e--) {
						var t = Math.max(1 - (u + e * g) % p * h, o.opacity);
						i.opacity(a, o.lines - e, t, o)
					}
					i.timeout = i.el && setTimeout(m, ~~ (1e3 / d))
				}()
			}
			return i
		},
		stop: function() {
			var e = this.el;
			if (e) {
				clearTimeout(this.timeout);
				if (e.parentNode) {
					e.parentNode.removeChild(e);
				}
				this.el = n;
			}
			return this;
		},
		lines: function(e, t) {
			function n(e, n) {
				return s(r(), {
					position: "absolute",
					width: t.length + t.width + "px",
					height: t.width + "px",
					background: e,
					boxShadow: n,
					transformOrigin: "left",
					transform: "rotate(" + ~~(360 / t.lines * c + t.rotate) + "deg) translate(" + t.radius + "px,0)",
					borderRadius: (t.corners * t.width >> 1) + "px"
				})
			}
			for (var a, c = 0; c < t.lines; c++) {
				a = s(r(), {
					position: "absolute",
					top: 1 + ~(t.width / 2) + "px",
					transform: t.hwaccel ? "translate3d(0,0,0)" : "",
					opacity: t.opacity,
					animation: f && o(t.opacity, t.trail, c, t.lines) + " " + 1 / t.speed + "s linear infinite"
				});
				if (t.shadow) {
					i(a, s(n("#000", "0 0 4px #000"), {
						top: "2px"
					}));
				}
				i(e, i(a, n(t.color, "0 0 1px rgba(0,0,0,.1)")));
			}
			return e
		},
		opacity: function(e, t, n) {
			if (t < e.childNodes.length) {
				e.childNodes[t].style.opacity = n;
			}
		}
	});

	! function() {
		function e(e, t) {
			return r("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
		}
		var t = s(r("group"), {
			behavior: "url(#default#VML)"
		});
		if (!a(t, "transform") && t.adj) {
			h.addRule(".spin-vml", "behavior:url(#default#VML)");
			u.prototype.lines = function(t, n) {
				function r() {
					return s(e("group", {
						coordsize: l + " " + l,
						coordorigin: -c + " " + -c
					}), {
						width: l,
						height: l
					})
				}

				function o(t, o, a) {
					i(f, i(s(r(), {
						rotation: 360 / n.lines * t + "deg",
						left: ~~o
					}), i(s(e("roundrect", {
						arcsize: n.corners
					}), {
						width: c,
						height: n.width,
						left: n.radius,
						top: -n.width >> 1,
						filter: a
					}), e("fill", {
						color: n.color,
						opacity: n.opacity
					}), e("stroke", {
						opacity: 0
					}))))
				}
				var a, c = n.length + n.width,
					l = 2 * c,
					u = 2 * -(n.width + n.length) + "px",
					f = s(r(), {
						position: "absolute",
						top: u,
						left: u
					});
				if (n.shadow) {
					for (a = 1; a <= n.lines; a++) {
						o(a, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
					}
				}
				for (a = 1; a <= n.lines; a++) {
					o(a);
				}
				return i(t, f)
			};
			u.prototype.opacity = function(e, t, n, r) {
				var i = e.firstChild;
				r = r.shadow && r.lines || 0, i && t + r < i.childNodes.length && (i = i.childNodes[t + r], i = i && i.firstChild, i = i && i.firstChild, i && (i.opacity = n))
			};
		} else {
			f = a(t, "animation");
		}
	}();
	if ("function" == typeof define && define.amd) {
		define(function() {
			return u
		});
	} else {
		e.Spinner = u;
	}
}(window, document);

! function(e, t) {
	"use strict";

	function n(e) {
		return new r(e)
	}

	function r(e) {
		if (e && e._wrapped) {
			return e;
		} else {
			return void(this._wrapped = e);
		}
	}

	function i() {
		for (var e, t, n, r = -1, i = arguments.length, o = {
			bottom: "",
			exit: "",
			init: "",
			top: "",
			arrayBranch: {
				beforeLoop: "",
				loopExp: "++index < length"
			},
			objectBranch: {
				beforeLoop: ""
			}
		}; ++r < i;) {
			e = arguments[r];
			for (t in e) {
				if (null == (n = e[t])) {
					n = "";
				} else {
					n = n;
				}
				if (/beforeLoop|loopExp|inLoop/.test(t)) {
					if ("string" == typeof n) {
						(n = {
							array: n,
							object: n
						});
					}
					o.arrayBranch[t] = n.array;
					o.objectBranch[t] = n.object;
				} else {
					o[t] = n;
				}
			}
		}
		var a = o.args,
			s = o.arrayBranch,
			l = o.objectBranch,
			u = /^[^,]+/.exec(a)[0],
			f = l.loopExp,
			d = /\S+$/.exec(f || u)[0];
		o.firstArg = u;
		o.hasDontEnumBug = St;
		o.hasExp = "hasOwnProperty.call(" + d + ", index)";
		o.iteratedObject = d;
		o.shadowed = Mt;
		o.useHas = o.useHas !== false;
		if (!(o.exit)) {
			(o.exit = "if (!" + u + ") return result");
		}
		if (!("object" != u && s.inLoop)) {
			o.arrayBranch = null;
		}
		if (!(f)) {
			l.loopExp = "index in " + d;
		}
		var p = Function("arrayClass, funcClass, hasOwnProperty, identity, iteratorBind, objectTypes, stringClass, toString, undefined", '"use strict"; return function(' + a + ") {\n" + ln(o) + "\n}");
		return p(Ht, Wt, Yt, gt, c, zt, Xt, tn)
	}

	function o(e, t) {
		return Dt[t]
	}

	function a(e) {
		return "\\" + Rt[e]
	}

	function s(e) {
		return Ft[e]
	}

	function c(e, t) {
		return function(n, r, i) {
			return e.call(t, n, r, i)
		}
	}

	function l() {}

	function u(e, t) {
		var n = Dt.length;
		Dt[n] = "'+\n_.escape(" + t + ") +\n'";
		return It + n;
	}

	function f(e, t) {
		var n = Dt.length;
		Dt[n] = "'+\n((__t = (" + t + ")) == null ? '' : __t) +\n'";
		return It + n;
	}

	function d(e, t) {
		var n = Dt.length;
		Dt[n] = "';\n" + t + ";\n__p += '";
		return It + n;
	}

	function p(e, t, n, r) {
		if (!e) {
			return n;
		}
		var i = e.length,
			o = arguments.length < 3;
		if (r && (t = c(t, r)), i === i >>> 0) {
			for (i && o && (n = e[--i]); i--;) n = t(n, e[i], i, e);
			return n
		}
		var a, s = On(e);
		for (i = s.length, i && o && (n = e[s[--i]]); i--;) {
			a = s[i];
			n = t(n, e[a], a, e);
		}
		return n
	}

	function h(e) {
		if (!e) {
			return [];
		}
		if (Wt == tn.call(e.toArray)) {
			return e.toArray();
		}
		var t = e.length;
		if (t === t >>> 0) {
			return en.call(e);
		} else {
			return In(e);
		}
	}

	function g(e) {
		var t = [];
		if (!e) {
			return t;
		}
		for (var n = -1, r = e.length; ++n < r;)
			if (e[n]) {
				t.push(e[n]);
			}
		return t
	}

	function m(e) {
		var t = [];
		if (!e) {
			return t;
		}
		for (var n = -1, r = e.length, i = Qt.apply(t, en.call(arguments, 1)); ++n < r;)
			if ($(i, e[n]) < 0) {
				t.push(e[n]);
			}
		return t
	}

	function v(e, n, r) {
		if (e) {
			if (t == n || r) {
				return e[0];
			} else {
				return en.call(e, 0, n);
			}
		} else {
			return void 0;
		}
	}

	function y(e, t) {
		var n = [];
		if (!e) {
			return n;
		}
		for (var r, i = -1, o = e.length; ++i < o;) {
			r = e[i];
			if (qn(r)) {
				Zt.apply(n, t ? r : y(r));
			} else {
				n.push(r);
			}
		}
		return n
	}

	function b(e, t, n) {
		var r = {};
		if (!e) {
			return r;
		}
		var i, o, a = -1,
			s = "function" == typeof t,
			l = e.length;
		for (s && n && (t = c(t, n)); ++a < l;) {
			o = e[a];
			if (s) {
				i = t(o, a, e);
			} else {
				i = o[t];
			}
			(Yt.call(r, i) ? r[i] : r[i] = []).push(o);
		}
		return r
	}

	function $(e, t, n) {
		if (!e) {
			return -1;
		}
		var r = -1,
			i = e.length;
		if (n) {
			if ("number" != typeof n) {
				r = M(e, t);
				if (e[r] === t) {
					return r;
				} else {
					return -1;
				}
			}
			r = (0 > n ? Math.max(0, i + n) : n) - 1
		}
		for (; ++r < i;)
			if (e[r] === t) {
				return r;
			}
		return -1
	}

	function w(e, n, r) {
		if (e) {
			return en.call(e, 0, -(t == n || r ? 1 : n));
		} else {
			return [];
		}
	}

	function k(e) {
		var t = [];
		if (!e) {
			return t;
		}
		for (var n, r = -1, i = e.length, o = en.call(arguments, 1); ++r < i;) {
			n = e[r];
			if ($(t, n) < 0 && yn(o, function(e) {
				return $(e, n) > -1
			})) {
				t.push(n);
			}
		}
		return t
	}

	function x(e, t) {
		var n = [];
		if (!e) {
			return n;
		}
		for (var r = en.call(arguments, 2), i = -1, o = e.length, a = "function" == typeof t; ++i < o;) n[i] = (a ? t : e[i][t]).apply(e[i], r);
		return n
	}

	function T(e, n, r) {
		if (e) {
			var i = e.length;
			if (t == n || r) {
				return e[i - 1];
			} else {
				return en.call(e, -n || i);
			}
		}
	}

	function C(e, t, n) {
		if (!e) {
			return -1;
		}
		var r = e.length;
		for (n && "number" == typeof n && (r = (0 > n ? Math.max(0, r + n) : Math.min(n, r - 1)) + 1); r--;)
			if (e[r] === t) {
				return r;
			}
		return -1
	}

	function S(e, t, n) {
		var r = -1 / 0,
			i = r;
		if (!e) {
			return i;
		}
		var o, a = -1,
			s = e.length;
		if (!t) {
			for (; ++a < s;)
				if (e[a] > i) {
					i = e[a];
				}
			return i
		}
		for (n && (t = c(t, n)); ++a < s;) {
			o = t(e[a], a, e);
			if (o > r) {
				r = o;
				i = e[a];
			}
		}
		return i
	}

	function A(e, t, n) {
		var r = 1 / 0,
			i = r;
		if (!e) {
			return i;
		}
		var o, a = -1,
			s = e.length;
		if (!t) {
			for (; ++a < s;)
				if (e[a] < i) {
					i = e[a];
				}
			return i
		}
		for (n && (t = c(t, n)); ++a < s;) {
			o = t(e[a], a, e);
			if (r > o) {
				r = o;
				i = e[a];
			}
		}
		return i
	}

	function E(e, t) {
		if (!e) {
			return [];
		}
		for (var n = -1, r = e.length, i = Array(r); ++n < r;) i[n] = e[n][t];
		return i
	}

	function N(e, t, n) {
		n || (n = 1), arguments.length < 2 && (t = e || 0, e = 0);
		for (var r = -1, i = Math.max(Math.ceil((t - e) / n), 0), o = Array(i); ++r < i;) {
			o[r] = e;
			e += n;
		}
		return o
	}

	function j(e, n, r) {
		if (e) {
			return en.call(e, t == n || r ? 1 : n);
		} else {
			return [];
		}
	}

	function _(e) {
		if (!e) {
			return [];
		}
		for (var t, n = -1, r = e.length, i = Array(r); ++n < r;) {
			t = Math.floor(Math.random() * (n + 1));
			i[n] = i[t];
			i[t] = e[n];
		}
		return i
	}

	function q(e, n, r) {
		if (!e) {
			return [];
		}
		if ("string" == typeof n) {
			var i = n;
			n = function(e) {
				return e[i]
			}
		} else if (r) {
			(n = c(n, r));
		}
		for (var o = -1, a = e.length, s = Array(a); ++o < a;) s[o] = {
			criteria: n(e[o], o, e),
			value: e[o]
		};
		for (s.sort(function(e, n) {
			var r = e.criteria,
				i = n.criteria;
			if (r === t) {
				return 1;
			} else if (i === t) {
				return -1;
			} else if (i > r) {
				return -1;
			} else if (r > i) {
				return 1;
			} else {
				return 0;
			}
		}); a--;) s[a] = s[a].value;
		return s
	}

	function M(e, t, n, r) {
		if (!e) {
			return 0;
		}
		var i, o = 0,
			a = e.length;
		if (n) {
			for (t = n.call(r, t); a > o;) {
				i = o + a >>> 1;
				if (n.call(r, e[i]) < t) {
					o = i + 1;
				} else {
					a = i;
				}
			}
		} else {
			for (; a > o;) {
				i = o + a >>> 1;
				if (e[i] < t) {
					o = i + 1;
				} else {
					a = i;
				}
			}
		}
		return o
	}

	function O() {
		for (var e = -1, t = [], n = Qt.apply(t, arguments), r = n.length; ++e < r;)
			if ($(t, n[e]) < 0) {
				t.push(n[e]);
			}
		return t
	}

	function I(e, t, n, r) {
		var i = [];
		if (!e) {
			return i;
		}
		var o, a = -1,
			s = e.length,
			l = [];
		for ("function" == typeof t && (r = n, n = t, t = false), n ? r && (n = c(n, r)) : n = gt; ++a < s;) {
			o = n(e[a], a, e);
			if ((t ? !a || l[l.length - 1] !== o : $(l, o) < 0)) {
				l.push(o);
				i.push(e[a]);
			}
		}
		return i
	}

	function D(e) {
		var t = [];
		if (!e) {
			return t;
		}
		for (var n = en.call(arguments, 1), r = -1, i = e.length; ++r < i;)
			if ($(n, e[r]) < 0) {
				t.push(e[r]);
			}
		return t
	}

	function L(e) {
		if (!e) {
			return [];
		}
		for (var t = -1, n = S(E(arguments, "length")), r = Array(n); ++t < n;) r[t] = E(arguments, t);
		return r
	}

	function P(e, t) {
		if (1 > e) {
			return t();
		} else {
			return function() {
				if (--e < 1) {
					return t.apply(this, arguments);
				} else {
					return void 0;
				}
			};
		}
	}

	function F(e, t) {
		function n() {
			var a = arguments,
				s = t;
			if (!(i)) {
				(e = t[r])
			}
			if (o.length) {
				if (a.length) {
					a = Qt.apply(o, a);
				} else {
					a = o;
				}
			}
			if (this instanceof n) {
				l.prototype = e.prototype, s = new l;
				var c = e.apply(s, a);
				if (zt[typeof c] && null !== c) {
					return c;
				} else {
					return s;
				}
			}
			return e.apply(s, a)
		}
		var r, i = Wt == tn.call(e);
		if (i) {
			if (nn) {
				return nn.call.apply(nn, arguments);
			}
		} else {
			r = t;
			t = e;
		}
		var o = en.call(arguments, 2);
		return n
	}

	function z(e) {
		var t = arguments,
			n = 1;
		if (1 == t.length) {
			n = 0;
			t = jn(e);
		}
		for (var r = t.length; r > n; n++) {
			e[t[n]] = F(e[t[n]], e);
		}
		return e
	}

	function R() {
		var e = arguments;
		return function() {
			for (var t = arguments, n = e.length; n--;) {
				t = [e[n].apply(this, t)];
			}
			return t[0]
		}
	}

	function H(e, n, r) {
		function i() {
			c = t;
			if (!(r)) {
				e.apply(s, o); 
			}
		}
		var o, a, s, c;
		return function() {
			var t = r && !c;
			o = arguments;
			s = this;
			sn(c);
			c = cn(i, n);
			if (t) {
				(a = e.apply(s, o))
			}
			return a;
		}
	}

	function B(e, n) {
		var r = en.call(arguments, 2);
		return cn(function() {
			return e.apply(t, r)
		}, n)
	}

	function U(e) {
		var n = en.call(arguments, 1);
		return cn(function() {
			return e.apply(t, n)
		}, 1)
	}

	function W(e, t) {
		var n = {};
		return function() {
			var r = t ? t.apply(this, arguments) : arguments[0];
			if (Yt.call(n, r)) {
				return n[r];
			} else {
				return n[r] = e.apply(this, arguments);
			}
		}
	}

	function V(e) {
		var t, n = false;
		return function() {
			if (n) {
				return t;
			} else {
				return (n = true, t = e.apply(this, arguments));
			}
		}
	}

	function J(e) {
		var t = en.call(arguments, 1),
			n = t.length;
		return function() {
			var r, i = arguments;
			if (i.length) {
				t.length = n;
				Zt.apply(t, i);
			}
			if (1 == t.length) {
				r = e.call(this, t[0]);
			} else {
				r = e.apply(this, t);
			}
			t.length = n;
			return r;
		}
	}

	function X(e, n) {
		function r() {
			c = new Date;
			s = t;
			e.apply(a, i);
		}
		var i, o, a, s, c = 0;
		return function() {
			var t = new Date,
				l = n - (t - c);
			i = arguments;
			a = this;
			if (0 >= l) {
				c = t;
				o = e.apply(a, i);
			} else if (!(s)) {
				(s = cn(r, l));
			}
			return o;
		}
	}

	function G(e, t) {
		return function() {
			var n = [e];
			if (arguments.length) {
				Zt.apply(n, arguments)
			}
			return t.apply(this, n);
		}
	}

	function K(e) {
		if (zt[typeof e] && null !== e) {
			if (qn(e)) {
				return e.slice();
			} else {
				return An({}, e);
			}
		} else {
			return e;
		}
	}

	function Q(e, t) {
		return Yt.call(e, t)
	}

	function Y(e) {
		return e === true || e === false || Bt == tn.call(e)
	}

	function Z(e) {
		return Ut == tn.call(e)
	}

	function et(e) {
		return !(!e || 1 != e.nodeType)
	}

	function tt(e, n, r) {
		if (r || (r = []), e === n) {
			return 0 !== e || 1 / e == 1 / n;
		}
		if (t == e || t == n) {
			return e === n;
		}
		if (e._chain) {
			(e = e._wrapped)
		}
		if (n._chain) {
			(n = n._wrapped)
		}
		if (e.isEqual && Wt == tn.call(e.isEqual)) {
			return e.isEqual(n);
		}
		if (n.isEqual && Wt == tn.call(n.isEqual)) {
			return n.isEqual(e);
		}
		var i = tn.call(e);
		if (i != tn.call(n)) {
			return false;
		}
		switch (i) {
			case Xt:
				return e == String(n);
			case Vt:
				if (e != +e) {
					return n != +n;
				} else if (e == 0) {
					return 1 / e == 1 / n;
				} else {
					return e == +n;
				}
			case Bt:
			case Ut:
				return +e == +n;
			case Jt:
				return e.source == n.source && e.global == n.global && e.multiline == n.multiline && e.ignoreCase == n.ignoreCase
		}
		if ("object" != typeof e || "object" != typeof n) {
			return false;
		}
		for (var o = r.length; o--;)
			if (e == r[o]) {
				return true;
			}
		var a = -1,
			s = true,
			c = 0;
		if (r.push(e), Ht == i) {
			c = e.length;
			if (s = c == n.length) {
				for (; c-- && (s = tt(e[c], n[c], r)););
			}
		} else {
			if ("constructor" in e != "constructor" in n || e.constructor != n.constructor) {
				return false;
			}
			for (var l in e)
				if (Yt.call(e, l) && (c++, !(s = Yt.call(n, l) && tt(e[l], n[l], r)))) break;
			if (s) {
				for (l in n)
					if (Yt.call(n, l) && !c--) break;
				s = !c
			}
			if (s && St) {
				for (; ++a < 7 && (l = Mt[a], !Yt.call(e, l) || (s = Yt.call(n, l) && tt(e[l], n[l], r))););
			}
		}
		r.pop();
		return s;
	}

	function nt(e) {
		return on(e) && Vt == tn.call(e)
	}

	function rt(e) {
		return Wt == tn.call(e)
	}

	function it(e) {
		return zt[typeof e] && null !== e
	}

	function ot(e) {
		return Vt == tn.call(e) && e != +e
	}

	function at(e) {
		return null === e
	}

	function st(e) {
		return Vt == tn.call(e)
	}

	function ct(e) {
		return Jt == tn.call(e)
	}

	function lt(e) {
		return Xt == tn.call(e)
	}

	function ut(e) {
		return e === t
	}

	function ft(e) {
		for (var t, n = 0, r = Qt.apply(Gt, arguments), i = r.length, o = {}; ++n < i;) {
			t = r[n];
			if (t in e) {
				(o[t] = e[t]); 
			}
		}
		return o
	}

	function dt(e) {
		var t = tn.call(e);
		if (Ht == t || Xt == t) {
			return e.length;
		} else {
			return On(e).length;
		}
	}

	function pt(e, t) {
		t(e);
		return e;
	}

	function ht(e) {
		if (e == null) {
			return "";
		} else {
			return (e + "").replace(_t, s);
		}
	}

	function gt(e) {
		return e
	}

	function mt(e) {
		wn(jn(e), function(t) {
			var i = n[t] = e[t];
			r.prototype[t] = function() {
				var e = [this._wrapped];
				if (arguments.length) {
					Zt.apply(e, arguments);
				}
				var t = i.apply(n, e);
				if (this._chain) {
					t = new r(t);
					t._chain = true;
				}
				return t;
			}
		})
	}

	function vt() {
		e._ = Et;
		return this;
	}

	function yt(e, t) {
		if (!e) {
			return null;
		}
		var n = e[t];
		if (Wt == tn.call(n)) {
			return e[t]();
		} else {
			return n;
		}
	}

	function bt(e, t, r) {
		if (!(r)) {
			(r = {})
		}
		var i, s = n.templateSettings,
			c = r.escape,
			l = r.evaluate,
			p = r.interpolate,
			h = r.variable;
		if (c == null) {
			(c = s.escape)
		}
		if (l == null) {
			(l = s.evaluate)
		}
		if (p == null) {
			(p = s.interpolate)
		}
		if (c) {
			(e = e.replace(c, u))
		}
		if (p) {
			(e = e.replace(p, f))
		}
		if (l) {
			(e = e.replace(l, d))
		}
		e = "__p='" + e.replace(qt, a).replace(jt, o) + "';\n";
		Dt.length = 0;
		if (!(h)) {
			h = s.variable;
			e = "with (" + h + " || {}) {\n" + e + "\n}\n";
		}
		e = "function(" + h + ") {\nvar __p, __t, __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" + e + "return __p\n}";
		if (Lt) {
			(e += "\n//@ sourceURL=/lodash/template/source[" + Ot+++"]")
		}
		i = Function("_", "return " + e)(n);
		if (t) {
			return i(t);
		} else {
			return (i.source = e, i);
		}
	}

	function $t(e, t, n) {
		var r = -1;
		if (n) {
			for (; ++r < e;) {
				t.call(n, r);
			}
		} else {
			for (; ++r < e;) {
				t(r)
			}
		}
	}

	function wt(e) {
		var t = At++;
		if (e) {
			return e + t;
		} else {
			return t;
		}
	}

	function kt(e) {
		e = new r(e);
		e._chain = true;
		return e;
	}

	function xt() {
		this._chain = true;
		return this;
	}

	function Tt() {
		return this._wrapped
	}
	var Ct = "object" == typeof exports && exports && ("object" == typeof global && global && global == global.global && (e = global), exports),
		St = !{
			valueOf: 0
		}.propertyIsEnumerable("valueOf"),
		At = 0,
		Et = e._,
		Nt = RegExp("^" + ({}.valueOf + "").replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
		jt = /__token__(\d+)/g,
		_t = /[&<"']/g,
		qt = /['\n\r\t\u2028\u2029\\]/g,
		Mt = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
		Ot = 0,
		It = "__token__",
		Dt = [];
	try {
		var Lt = (Function("//@")(), true)
	} catch (Pt) {}
	var Ft = {
			"&": "&amp;",
			"<": "&lt;",
			'"': "&quot;",
			"'": "&#x27;"
		},
		zt = {
			"boolean": false,
			"function": true,
			object: true,
			number: false,
			string: false,
			undefined: false
		},
		Rt = {
			"\\": "\\",
			"'": "'",
			"\n": "n",
			"\r": "r",
			"	": "t",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		Ht = "[object Array]",
		Bt = "[object Boolean]",
		Ut = "[object Date]",
		Wt = "[object Function]",
		Vt = "[object Number]",
		Jt = "[object RegExp]",
		Xt = "[object String]",
		Gt = Array.prototype,
		Kt = Object.prototype,
		Qt = Gt.concat,
		Yt = Kt.hasOwnProperty,
		Zt = Gt.push,
		en = Gt.slice,
		tn = Kt.toString,
		nn = Nt.test(nn = en.bind) && /\n|Opera/.test(nn + tn.call(e.opera)) && nn,
		rn = Nt.test(rn = Array.isArray) && rn,
		on = e.isFinite,
		an = Nt.test(an = Object.keys) && an,
		sn = e.clearTimeout,
		cn = e.setTimeout;
	n.templateSettings = {
		escape: /<%-([\s\S]+?)%>/g,
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		variable: "obj"
	};
	var ln = bt("var index, result<% if (init) { %> = <%= init %><% } %>;\n<%= exit %>;\n<%= top %>;\n<% if (arrayBranch) { %>var length = <%= firstArg %>.length; index = -1;  <% if (objectBranch) { %>\nif (length === length >>> 0) {<% } %>\n  <%= arrayBranch.beforeLoop %>;\n  while (<%= arrayBranch.loopExp %>) {\n    <%= arrayBranch.inLoop %>;\n  }  <% if (objectBranch) { %>\n}\n<% }}if (objectBranch) {  if (arrayBranch) { %>else {\n<% }  if (!hasDontEnumBug) { %>  var skipProto = typeof <%= iteratedObject %> == 'function';\n<% } %>  <%= objectBranch.beforeLoop %>;\n  for (<%= objectBranch.loopExp %>) {  \n<%  if (hasDontEnumBug) {    if (useHas) { %>    if (<%= hasExp %>) {\n  <% } %>    <%= objectBranch.inLoop %>;<%    if (useHas) { %>\n    }<% }  }  else {  %>    if (!(skipProto && index == 'prototype')<% if (useHas) { %> && <%= hasExp %><% } %>) {\n      <%= objectBranch.inLoop %>;\n    }  <% } %>\n  }  <% if (hasDontEnumBug) { %>\n  var ctor = <%= iteratedObject %>.constructor;\n  <% for (var k = 0; k < 7; k++) { %>\n  index = '<%= shadowed[k] %>';\n  if (<%      if (shadowed[k] == 'constructor') {        %>!(ctor && ctor.prototype === <%= iteratedObject %>) && <%      } %><%= hasExp %>) {\n    <%= objectBranch.inLoop %>;\n  }<%     }   }   if (arrayBranch) { %>\n}<% }} %>\n<%= bottom %>;\nreturn result"),
		un = {
			args: "collection, callback, thisArg",
			init: "collection",
			top: "if (!callback) {\n  callback = identity\n}\nelse if (thisArg) {\n  callback = iteratorBind(callback, thisArg)\n}",
			inLoop: "callback(collection[index], index, collection)"
		},
		fn = {
			init: "true",
			inLoop: "if (!callback(collection[index], index, collection)) return !result"
		},
		dn = {
			args: "object",
			init: "object",
			top: "for (var source, sourceIndex = 1, length = arguments.length; sourceIndex < length; sourceIndex++) {\n  source = arguments[sourceIndex];\n" + (St ? "  if (source) {" : ""),
			loopExp: "index in source",
			useHas: false,
			inLoop: "object[index] = source[index]",
			bottom: (St ? "  }\n" : "") + "}"
		},
		pn = {
			init: "[]",
			inLoop: "callback(collection[index], index, collection) && result.push(collection[index])"
		},
		hn = {
			top: "if (thisArg) callback = iteratorBind(callback, thisArg)"
		},
		gn = {
			inLoop: {
				object: un.inLoop
			}
		},
		mn = i({
			args: "object",
			exit: "if (!objectTypes[typeof object] || object === null) throw TypeError()",
			init: "[]",
			inLoop: "result.push(index)"
		}),
		vn = i({
			args: "collection, target",
			init: "false",
			inLoop: "if (collection[index] === target) return true"
		}),
		yn = i(un, fn),
		bn = i(un, pn),
		$n = i(un, hn, {
			init: "",
			inLoop: "if (callback(collection[index], index, collection)) return collection[index]"
		}),
		wn = i(un, hn),
		kn = i(un, {
			init: "",
			exit: "if (!collection) return []",
			beforeLoop: {
				array: "result = Array(length)",
				object: "result = []"
			},
			inLoop: {
				array: "result[index] = callback(collection[index], index, collection)",
				object: "result.push(callback(collection[index], index, collection))"
			}
		}),
		xn = i({
			args: "collection, callback, accumulator, thisArg",
			init: "accumulator",
			top: "var noaccum = arguments.length < 3;\nif (thisArg) callback = iteratorBind(callback, thisArg)",
			beforeLoop: {
				array: "if (noaccum) result = collection[++index]"
			},
			inLoop: {
				array: "result = callback(result, collection[index], index, collection)",
				object: "result = noaccum\n  ? (noaccum = false, collection[index])\n  : callback(result, collection[index], index, collection)"
			}
		}),
		Tn = i(un, pn, {
			inLoop: "!" + pn.inLoop
		}),
		Cn = i(un, fn, {
			init: "false",
			inLoop: fn.inLoop.replace("!", "")
		}),
		Sn = i(dn, {
			inLoop: "if (object[index] == undefined)" + dn.inLoop
		}),
		An = i(dn),
		En = i(un, hn, gn, {
			useHas: false
		}),
		Nn = i(un, hn, gn),
		jn = i({
			args: "object",
			init: "[]",
			useHas: false,
			inLoop: "if (toString.call(object[index]) == funcClass) result.push(index)",
			bottom: "result.sort()"
		}),
		_n = function(e) {
			return "[object Arguments]" == tn.call(e)
		};
	if (!(_n(arguments))) {
		(_n = function(e) {
			return !(!e || !Yt.call(e, "callee"))
		})
	}
	var qn = rn || function(e) {
			return Ht == tn.call(e)
		},
		Mn = i({
			args: "value",
			init: "true",
			top: "var className = toString.call(value);\nif (className == arrayClass || className == stringClass) return !value.length",
			inLoop: {
				object: "return false"
			}
		}),
		On = an ? function(e) {
			if ("function" == typeof e) {
				return mn(e);
			} else {
				return an(e);
			}
		} : mn,
		In = i({
			args: "object",
			init: "[]",
			inLoop: "result.push(object[index])"
		});
	n.VERSION = "0.3.1", n.after = P, n.bind = F, n.bindAll = z, n.chain = kt, n.clone = K, n.compact = g, n.compose = R, n.contains = vn, n.debounce = H, n.defaults = Sn, n.defer = U, n.delay = B, n.difference = m, n.escape = ht, n.every = yn, n.extend = An, n.filter = bn, n.find = $n, n.first = v, n.flatten = y, n.forEach = wn, n.forIn = En, n.forOwn = Nn, n.functions = jn, n.groupBy = b, n.has = Q, n.identity = gt, n.indexOf = $, n.initial = w, n.intersection = k, n.invoke = x, n.isArguments = _n, n.isArray = qn, n.isBoolean = Y, n.isDate = Z, n.isElement = et, n.isEmpty = Mn, n.isEqual = tt, n.isFinite = nt, n.isFunction = rt, n.isNaN = ot, n.isNull = at, n.isNumber = st, n.isObject = it, n.isRegExp = ct, n.isString = lt, n.isUndefined = ut, n.keys = On, n.last = T, n.lastIndexOf = C, n.map = kn, n.max = S, n.memoize = W, n.min = A, n.mixin = mt, n.noConflict = vt, n.once = V, n.partial = J, n.pick = ft, n.pluck = E, n.range = N, n.reduce = xn, n.reduceRight = p, n.reject = Tn, n.rest = j, n.result = yt, n.shuffle = _, n.size = dt, n.some = Cn, n.sortBy = q, n.sortedIndex = M, n.tap = pt, n.template = bt, n.throttle = X, n.times = $t, n.toArray = h, n.union = O, n.uniq = I, n.uniqueId = wt, n.values = In, n.without = D, n.wrap = G, n.zip = L, n.all = yn, n.any = Cn, n.collect = kn, n.detect = $n, n.each = wn, n.foldl = xn, n.foldr = p, n.head = v, n.include = vn, n.inject = xn, n.methods = jn, n.select = bn, n.tail = j, n.take = v, n.unique = I, n._iteratorTemplate = ln, n._shimKeys = mn, r.prototype = n.prototype, mt(n), r.prototype.chain = xt, r.prototype.value = Tt, wn(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
		var t = Gt[e];
		r.prototype[e] = function() {
			var e = this._wrapped;
			t.apply(e, arguments);
			if (0 === e.length) {
				delete e[0]
			}
			if (this._chain) {
				e = new r(e);
				e._chain = true;
			}
			return e;
		}
	}), wn(["concat", "join", "slice"], function(e) {
		var t = Gt[e];
		r.prototype[e] = function() {
			var e = this._wrapped,
				n = t.apply(e, arguments);
			if (this._chain) {
				n = new r(n);
				n._chain = true;
			}
			return n;
		}
	}), "function" == typeof define && "object" == typeof define.amd && define.amd ? (e._ = n, define(function() {
		return n
	})) : Ct ? "object" == typeof module && module && Ct == module.exports ? (module.exports = n)._ = n : Ct._ = n : e._ = n
}(this);

! function(e) {
	var t = e.document;
	if (!location.hash && e.addEventListener) {
		window.scrollTo(0, 1);
		var n = 1,
			r = function() {
				return e.pageYOffset || "CSS1Compat" === t.compatMode && t.documentElement.scrollTop || t.body.scrollTop || 0
			},
			i = setInterval(function() {
				if (t.body) {
					clearInterval(i);
					n = r();
					e.scrollTo(0, 1 === n ? 0 : 1);
				}
			}, 15);
		e.addEventListener("load", function() {
			setTimeout(function() {
				if (r() < 20) {
					e.scrollTo(0, 1 === n ? 0 : 1);
				}
			}, 0)
		})
	}
}(this);
! function(e, t) {
	if ("function" == typeof define) {
		define(t);
	} else if ("undefined" != typeof module) {
		module.exports = t();
	} else {
		this[e] = t();
	}
}("morpheus", function() {
	function e(e, t, n) {
		if (Array.prototype.indexOf) {
			return e.indexOf(t);
		}
		for (n = 0; n < e.length; ++n)
			if (e[n] === t) {
				return n;
			}
	}

	function t(e) {
		var n, r = L.length;
		for (k && (e = w()), n = r; n--;) {
			L[n](e);
		}
		if (L.length) {
			D(t);
		}
	}

	function n(e) {
		if (1 === L.push(e)) {
			D(t);
		}
	}

	function r(t) {
		var n, r = e(L, t);
		if (r >= 0) {
			n = L.slice(r + 1);
			L.length = r;
			L = L.concat(n);
		}
	}

	function i(e, t) {
		var n, r = {};
		if ((n = e.match(E))) {
			(r.rotate = g(n[1], t ? t.rotate : null))
		}
		if ((n = e.match(N))) {
			(r.scale = g(n[1], t ? t.scale : null))
		}
		if ((n = e.match(j))) {
			r.skewx = g(n[1], t ? t.skewx : null);
			r.skewy = g(n[3], t ? t.skewy : null);
		}
		if ((n = e.match(_))) {
			r.translatex = g(n[1], t ? t.translatex : null);
			r.translatey = g(n[3], t ? t.translatey : null);
		}
		return r;
	}

	function o(e) {
		var t = "";
		if ("rotate" in e) {
			(t += "rotate(" + e.rotate + "deg) ")
		}
		if ("scale" in e) {
			(t += "scale(" + e.scale + ") ")
		}
		if ("translatex" in e) {
			(t += "translate(" + e.translatex + "px," + e.translatey + "px) ")
		}
		if ("skewx" in e) {
			(t += "skew(" + e.skewx + "deg," + e.skewy + "deg)")
		}
		return t;
	}

	function a(e, t, n) {
		return "#" + (1 << 24 | e << 16 | t << 8 | n).toString(16).slice(1)
	}

	function s(e) {
		var t = e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
		return (t ? a(t[1], t[2], t[3]) : e).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3")
	}

	function c(e) {
		return e.replace(/-(.)/g, function(e, t) {
			return t.toUpperCase()
		})
	}

	function l(e) {
		return "function" == typeof e
	}

	function u(e) {
		return Math.sin(e * Math.PI / 2)
	}

	function f(e, t, i, o, a, s) {
		function c(e) {
			var n = e - h;
			if (n > f || g) {
				return (s = isFinite(s) ? s : 1, g ? v && t(s) : t(s), r(c), i && i.apply(d));
			} else {
				return void t(isFinite(s) ? p * o(n / f) + a : o(n / f));
			}
		}
		if (l(o)) {
			o = o;
		} else {
			o = m.easings[o] || u;
		}
		var f = e || T,
			d = this,
			p = s - a,
			h = w(),
			g = 0,
			v = 0;
		n(c);
		return {
			stop: function(e) {
				g = 1;
				v = e;
				if (!(e)) {
					i = null;
				}
			}
		};
	}

	function d(e, t) {
		var n, r, i = e.length,
			o = [];
		for (n = 0; i > n; ++n) {
			o[n] = [e[n][0], e[n][1]];
		}
		for (r = 1; i > r; ++r)
			for (n = 0; i - r > n; ++n) {
				o[n][0] = (1 - t) * o[n][0] + t * o[parseInt(n + 1, 10)][0];
				o[n][1] = (1 - t) * o[n][1] + t * o[parseInt(n + 1, 10)][1];
			}
		return [o[0][0], o[0][1]]
	}

	function p(e, t, n) {
		var r, i, o, a, s = [];
		for (r = 0; 6 > r; r++) {
			o = Math.min(15, parseInt(t.charAt(r), 16));
			a = Math.min(15, parseInt(n.charAt(r), 16));
			i = Math.floor((a - o) * e + o);
			if (i > 15) {
				i = 15;
			} else if (0 > i) {
				i = 0;
			} else {
				i = i;
			}
			s[r] = i.toString(16);
		}
		return "#" + s.join("")
	}

	function h(e, t, n, r, i, o, a) {
		if (i == "transform") {
			a = {};
			for (var s in n[o][i]) {
				if (s in r[o][i]) {
					a[s] = Math.round(((r[o][i][s] - n[o][i][s]) * e + n[o][i][s]) * T) / T;
				} else {
					a[s] = n[o][i][s];
				}
			}
			return a
		}
		if ("string" == typeof n[o][i]) {
			return p(e, n[o][i], r[o][i]);
		} else {
			return (a = Math.round(((r[o][i] - n[o][i]) * e + n[o][i]) * T) / T, i in q || (a += t[o][i] || "px"), a);
		}
	}

	function g(e, t, n, r, i) {
		if ((n = S.exec(e))) {
			return (i = parseFloat(n[2])) && t + ("+" == n[1] ? 1 : -1) * i;
		} else {
			return parseFloat(e);
		}
	}

	function m(e, t) {
		var n, r, a, u = e ? u = isFinite(e.length) ? e : [e] : [],
			p = t.complete,
			m = t.duration,
			v = t.easing,
			y = t.bezier,
			b = [],
			$ = [],
			w = [],
			k = [];
		for (y && (r = t.left, a = t.top, delete t.right, delete t.bottom, delete t.left, delete t.top), n = u.length; n--;) {
			b[n] = {};
			$[n] = {};
			w[n] = {};
			if (y) {
				var x = I(u[n], "left"),
					T = I(u[n], "top"),
					S = [g(l(r) ? r(u[n]) : r || 0, parseFloat(x)), g(l(a) ? a(u[n]) : a || 0, parseFloat(T))];
				if (l(y)) {
					k[n] = y(u[n], S);
				} else {
					k[n] = y;
				}
				k[n].push(S);
				k[n].unshift([parseInt(x, 10), parseInt(T, 10)]);
			}
			for (var E in t) {
				switch (E) {
					case "complete":
					case "duration":
					case "easing":
					case "bezier":
						continue
				}
				var N, j = I(u[n], E),
					_ = l(t[E]) ? t[E](u[n]) : t[E];
				if ("string" != typeof _ || !C.test(_) || C.test(j)) {
					if (E == "transform") {
						b[n][E] = i(j);
					} else if ("string" == typeof _ && C.test(_)) {
						b[n][E] = s(j).slice(1);
					} else {
						b[n][E] = parseFloat(j);
					}
					if (E == "transform") {
						$[n][E] = i(_, b[n][E]);
					} else if ("string" == typeof _ && "#" == _.charAt(0)) {
						$[n][E] = s(_).slice(1);
					} else {
						$[n][E] = g(_, parseFloat(j));
					}
					if ("string" == typeof _ && (N = _.match(A))) {
						w[n][E] = N[1];
					}
				} else {
					delete t[E];
				}
			}
		}
		return f.apply(u, [m,
			function(e, r, i) {
				for (n = u.length; n--;) {
					if (y) {
						i = d(k[n], e);
						u[n].style.left = i[0] + "px";
						u[n].style.top = i[1] + "px";
					}
					for (var a in t) {
						r = h(e, w, b, $, a, n);
						if (a == "transform") {
							u[n].style[M] = o(r);
						} else if ("opacity" != a || O) {
							u[n].style[c(a)] = r;
						} else {
							u[n].style.filter = "alpha(opacity=" + 100 * r + ")";
						}
					}
				}
			},
			p, v
		])
	}
	var v = document,
		y = window,
		b = y.performance,
		$ = b && (b.now || b.webkitNow || b.msNow || b.mozNow),
		w = $ ? function() {
			return $.call(b)
		} : function() {
			return +new Date
		},
		k = false,
		x = v.documentElement,
		T = 1e3,
		C = /^rgb\(|#/,
		S = /^([+\-])=([\d\.]+)/,
		A = /^(?:[\+\-]=?)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/,
		E = /rotate\(((?:[+\-]=)?([\-\d\.]+))deg\)/,
		N = /scale\(((?:[+\-]=)?([\d\.]+))\)/,
		j = /skew\(((?:[+\-]=)?([\-\d\.]+))deg, ?((?:[+\-]=)?([\-\d\.]+))deg\)/,
		_ = /translate\(((?:[+\-]=)?([\-\d\.]+))px, ?((?:[+\-]=)?([\-\d\.]+))px\)/,
		q = {
			lineHeight: 1,
			zoom: 1,
			zIndex: 1,
			opacity: 1,
			transform: 1
		},
		M = function() {
			var e, t = v.createElement("a").style,
				n = ["webkitTransform", "MozTransform", "OTransform", "msTransform", "Transform"];
			for (e = 0; e < n.length; e++)
				if (n[e] in t) {
					return n[e];
				}
		}(),
		O = function() {
			return "undefined" != typeof v.createElement("a").style.opacity
		}(),
		I = v.defaultView && v.defaultView.getComputedStyle ? function(e, t) {
			t = t == "transform" ? M : t, t = c(t);
			var n = null,
				r = v.defaultView.getComputedStyle(e, "");
			if (r) {
				(n = r[t])
			}
			return e.style[t] || n;
		} : x.currentStyle ? function(e, t) {
			if (t = c(t), t == "opacity") {
				var n = 100;
				try {
					n = e.filters["DXImageTransform.Microsoft.Alpha"].opacity
				} catch (r) {
					try {
						n = e.filters("alpha").opacity
					} catch (i) {}
				}
				return n / 100
			}
			var o = e.currentStyle ? e.currentStyle[t] : null;
			return e.style[t] || o
		} : function(e, t) {
			return e.style[c(t)]
		},
		D = function() {
			return y.requestAnimationFrame || y.webkitRequestAnimationFrame || y.mozRequestAnimationFrame || y.msRequestAnimationFrame || y.oRequestAnimationFrame || function(e) {
				y.setTimeout(function() {
					e(+new Date)
				}, 17)
			}
		}();
	D(function(e) {
		k = e > 1e12 != w() > 1e12
	});
	var L = [];
	m.tween = f;
	m.getStyle = I;
	m.bezier = d;
	m.transform = M;
	m.parseTransform = i;
	m.formatTransform = o;
	m.easings = {};
	return m;
});
var easings = {
	easeOut: function(e) {
		return Math.sin(e * Math.PI / 2)
	},
	easeOutStrong: function(e) {
		if (e == 1) {
			return 1;
		} else {
			return 1 - Math.pow(2, -10 * e);
		}
	},
	easeIn: function(e) {
		return e * e
	},
	easeInStrong: function(e) {
		if (e == 0) {
			return 0;
		} else {
			return Math.pow(2, 10 * (e - 1));
		}
	},
	easeOutBounce: function(e) {
		if (1 / 2.75 > e) {
			return 7.5625 * e * e;
		} else if (2 / 2.75 > e) {
			return 7.5625 * (e -= 1.5 / 2.75) * e + .75;
		} else if (2.5 / 2.75 > e) {
			return 7.5625 * (e -= 2.25 / 2.75) * e + .9375;
		} else {
			return 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
		}
	},
	easeInBack: function(e) {
		var t = 1.70158;
		return e * e * ((t + 1) * e - t)
	},
	easeOutBack: function(e) {
		var t = 1.70158;
		return (e -= 1) * e * ((t + 1) * e + t) + 1
	},
	bounce: function(e) {
		if (1 / 2.75 > e) {
			return 7.5625 * e * e;
		} else if (2 / 2.75 > e) {
			return 7.5625 * (e -= 1.5 / 2.75) * e + .75;
		} else if (2.5 / 2.75 > e) {
			return 7.5625 * (e -= 2.25 / 2.75) * e + .9375;
		} else {
			return 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
		}
	},
	bouncePast: function(e) {
		if (1 / 2.75 > e) {
			return 7.5625 * e * e;
		} else if (2 / 2.75 > e) {
			return 2 - (7.5625 * (e -= 1.5 / 2.75) * e + .75);
		} else if (2.5 / 2.75 > e) {
			return 2 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375);
		} else {
			return 2 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375);
		}
	},
	swingTo: function(e) {
		var t = 1.70158;
		return (e -= 1) * e * ((t + 1) * e + t) + 1
	},
	swingFrom: function(e) {
		var t = 1.70158;
		return e * e * ((t + 1) * e - t)
	},
	elastic: function(e) {
		return -1 * Math.pow(4, -8 * e) * Math.sin(2 * (6 * e - 1) * Math.PI / 2) + 1
	},
	spring: function(e) {
		return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
	},
	blink: function(e, t) {
		return Math.round(e * (t || 5)) % 2
	},
	pulse: function(e, t) {
		return -Math.cos(e * ((t || 5) - .5) * 2 * Math.PI) / 2 + .5
	},
	wobble: function(e) {
		return -Math.cos(e * Math.PI * 9 * e) / 2 + .5
	},
	sinusoidal: function(e) {
		return -Math.cos(e * Math.PI) / 2 + .5
	},
	flicker: function(e) {
		var e = e + (Math.random() - .5) / 5;
		return easings.sinusoidal(0 > e ? 0 : e > 1 ? 1 : e)
	},
	mirror: function(e) {
		return easings.sinusoidal(.5 > e ? 2 * e : 1 - 2 * (e - .5))
	}
};
appCtrl.loadContent = function(e, t, n, r) {
	if (window.device) {
		navigator.splashscreen.hide()
	}
	n.defer = e.defer();
	if (n.siteAppContent) {
		n.defer.resolve();
	} else {
		r.getContent();
		n.$on("loadContentSuccess", function() {
			n.defer.resolve()
		});
		n.$on("loadContentFailure", function() {
			n.defer.reject()
		});
	}
	return n.defer.promise;
};
appCtrl.loadContent.$inject = ["$q", "$timeout", "$rootScope", "$lang", "$ios7fixes"];
GameCtrl.$inject = ["$rootScope", "$location", "$log", "$lecturequiz-controller", "$window", "$config", "$session"];
JoinCtrl.$inject = ["$rootScope", "$location", "$log", "$lecturequiz-controller", "$preloader", "$window", "$config"];
InstructionsCtrl.$inject = ["$scope", "$rootScope", "$log", "$lecturequiz-controller"];
StartCtrl.$inject = ["$rootScope", "$scope", "$lecturequiz-controller", "$quiz", "$location"];
GetReadyCtrl.$inject = ["$scope", "$rootScope", "$countdown", "$location", "$lecturequiz-controller", "$quiz"];
AnswerCtrl.$inject = ["$scope", "$rootScope", "$log", "$lecturequiz-controller", "_", "$quiz", "$location", "sanitize"];
FeedbackCtrl.$inject = ["$scope", "$rootScope", "$log", "$lecturequiz-controller", "$location", "$quiz", "$timeout"];
GameOverCtrl.$inject = ["$rootScope", "$scope", "$lecturequiz-controller", "$window", "$config", "$quiz", "$location", "$timeout"];
//# sourceMappingURL=controller.min.js.map
