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
			o = ["aardvark", "accordion", "accountant", "actor", "actress", "adapter", "adult", "advantage", "advertisement", "afghanistan", "africa", "afternoon", "aftershave", "aeroplane", "airport", "alarm", "albatross", "algebra", "algeria", "alibi", "alley", "alligator", "alloy", "alphabet", "aluminium", "ambulance", "america", "amusement", "anatomy", "anethesiologist", "angle", "animal", "ankle", "answer", "ant", "antarctica", "anteater", "antelope", "anthropology", "apartment", "apology", "apparatus", "appeal", "appendix", "apple", "appliance", "approval", "april", "aquarius", "arch", "archaeology", "archer", "architecture", "area", "argentina", "argument", "aries", "arithmetic", "arm", "armadillo", "armchair", "armenian", "army", "arrow", "art", "ash", "asia", "asparagus", "asphalt", "asterisk", "astronomy", "athlete", "atom", "attack", "attempt", "attention", "attic", "attraction", "august", "aunt", "australia", "australian", "author", "avenue", "baboon", "baby", "back", "backbone", "bacon", "badge", "badger", "bag", "bagel", "bagpipe", "bail", "bait", "baker", "bakery", "balance", "ball", "balloon", "bamboo", "banana", "band", "bandana", "bangladesh", "bangle", "banjo", "bank", "banker", "bar", "barbara", "barber", "barge", "baritone", "barometer", "base", "baseball", "basement", "basin", "basket", "basketball", "bass", "bassoon", "bat", "bath", "bathroom", "bathtub", "battery", "battle", "bay", "beach", "bead", "beam", "bean", "bear", "beard", "beast", "beat", "beautician", "beauty", "beaver", "bed", "bedroom", "bee", "beech", "beef", "beet", "beetle", "beginner", "behaviour", "belgian", "belief", "believe", "bell", "belt", "bench", "bengal", "beret", "berry", "bestseller", "betty", "bibliography", "bicycle", "bike", "bill", "billboard", "biology", "birch", "bird", "birth", "birthday", "bit", "bite", "black", "bladder", "blade", "blanket", "blinker", "blizzard", "block", "blouse", "blue", "board", "boat", "body", "bolt", "bomb", "bomber", "bone", "bongo", "bonsai", "book", "bookcase", "booklet", "boot", "border", "botany", "bottle", "bottom", "boundary", "bow", "bowl", "bowling", "box", "boy", "brace", "bracket", "brain", "brake", "branch", "brand", "brandy", "brass", "brazil", "bread", "break", "breakfast", "breath", "brian", "brick", "bridge", "british", "broccoli", "brochure", "broker", "bronze", "brother", "brother-in-law", "brow", "brown", "brush", "bubble", "bucket", "budget", "buffer", "buffet", "building", "bulb", "bull", "bulldozer", "bumper", "bun", "burglar", "burma", "burst", "bus", "bush", "business", "butcher", "butter", "button", "buzzard", "cabbage", "cabinet", "cable", "cactus", "cafe", "cake", "calculator", "calculus", "calendar", "calf", "call", "camel", "camera", "camp", "can", "canada", "canadian", "candle", "cannon", "canoe", "canvas", "cap", "capital", "capricorn", "captain", "caption", "car", "caravan", "carbon", "card", "cardboard", "cardigan", "care", "carnation", "carol", "carp", "carpenter", "carriage", "carrot", "cart", "cartoon", "case", "cast", "cat", "catamaran", "caterpillar", "cathedral", "cattle", "cauliflower", "caution", "cave", "ceiling", "celery", "cell", "cellar", "cello", "celsius", "cement", "cemetery", "cent", "centimeter", "century", "ceramic", "cereal", "certification", "chain", "chair", "chalk", "chance", "change", "channel", "character", "charles", "chauffeur", "check", "cheek", "cheese", "cheetah", "chef", "chemistry", "cheque", "cherries", "cherry", "chess", "chest", "chick", "chicken", "chief", "child", "children", "chill", "chime", "chimpanzee", "chin", "china", "chinese", "chive", "chocolate", "chord", "christmas", "christopher", "church", "cinema", "circle", "circulation", "cirrus", "citizenship", "city", "clam", "clarinet", "class", "claus", "clave", "clef", "clerk", "click", "client", "climb", "clipper", "cloakroom", "clock", "close", "closet", "cloth", "cloud", "cloudy", "clover", "club", "clutch", "coach", "coal", "coast", "coat", "cobweb", "cockroach", "cocktail", "cocoa", "cod", "coffee", "coil", "coin", "coke", "cold", "collar", "college", "collision", "colombia", "colour", "colt", "column", "columnist", "comb", "comfort", "comic", "comma", "command", "commission", "committee", "community", "company", "comparison", "competition", "competitor", "composer", "composition", "computer", "condition", "condor", "cone", "confirmation", "conga", "congo", "conifer", "connection", "consonant", "continent", "control", "cook", "cooking", "copper", "copy", "copyright", "cord", "cork", "cormorant", "corn", "cornet", "correspondent", "cost", "cotton", "couch", "cough", "country", "course", "court", "cousin", "cover", "cow", "cowbell", "crab", "crack", "cracker", "craftsman", "crate", "crayfish", "crayon", "cream", "creator", "creature", "credit", "creditor", "creek", "crib", "cricket", "crime", "criminal", "crocodile", "crocus", "croissant", "crook", "crop", "cross", "crow", "crowd", "crown", "crush", "cry", "cub", "cuban", "cucumber", "cultivator", "cup", "cupboard", "cupcake", "currency", "current", "curtain", "curve", "cushion", "custard", "customer", "cut", "cycle", "cyclone", "cylinder", "cymbal", "dad", "daffodil", "daisy", "damage", "dance", "dancer", "danger", "daniel", "dash", "dashboard", "database", "date", "daughter", "david", "day", "deadline", "deal", "deborah", "debt", "debtor", "decade", "december", "decimal", "decision", "decrease", "dedication", "deer", "defense", "deficit", "degree", "delete", "delivery", "den", "denim", "dentist", "deodorant", "department", "deposit", "description", "desert", "design", "desire", "desk", "dessert", "destruction", "detail", "detective", "development", "dew", "diamond", "diaphragm", "dibble", "dictionary", "dietician", "difference", "digestion", "digger", "digital", "dill", "dime", "dimple", "dinghy", "dinner", "dinosaur", "diploma", "dipstick", "direction", "disadvantage", "discovery", "discussion", "disgust", "dish", "distance", "distributor", "diving", "division", "dock", "doctor", "dog", "doll", "dollar", "dolphin", "domain", "donald", "donkey", "donna", "door", "dorothy", "double", "doubt", "downtown", "dragon", "dragonfly", "drain", "drake", "drama", "draw", "drawbridge", "drawer", "dream", "dress", "dresser", "dressing", "drill", "drink", "drive", "driver", "driving", "drizzle", "drop", "drug", "drum", "dry", "dryer", "duck", "duckling", "dugout", "dungeon", "dust", "eagle", "ear", "earth", "earthquake", "ease", "east", "edge", "editor", "editorial", "education", "edward", "eel", "effect", "egg", "eggnog", "eggplant", "egypt", "eight", "elbow", "element", "elephant", "elizabeth", "ellipse", "employee", "employer", "encyclopedia", "end", "enemy", "energy", "engine", "engineer", "english", "entrance", "environment", "equinox", "equipment", "era", "error", "estimate", "ethernet", "ethiopia", "europe", "evening", "event", "examination", "example", "exchange", "exclamation", "exhaust", "expert", "explanation", "eye", "eyebrow", "eyelash", "eyeliner", "face", "fact", "factory", "fahrenheit", "fairies", "fall", "family", "fan", "fang", "farm", "farmer", "father", "faucet", "fear", "feast", "feather", "feature", "february", "feedback", "feeling", "feet", "female", "ferry", "ferryboat", "fertiliser", "fiber", "fiberglass", "fibre", "fiction", "field", "fifth", "fight", "fighter", "file", "find", "fine", "finger", "fir", "fire", "fireman", "fireplace", "firewall", "fish", "fisherman", "flag", "flame", "flare", "flat", "flavour", "flesh", "flight", "flock", "flood", "floor", "flower", "flute", "fly", "foam", "fog", "fold", "font", "food", "foot", "football", "footnote", "force", "forecast", "forehead", "forest", "forgery", "fork", "form", "format", "fortnight", "foundation", "fountain", "fowl", "fox", "fragrance", "frame", "france", "freckle", "freeze", "freezer", "french", "friction", "friday", "fridge", "friend", "frog", "front", "frost", "frown", "fruit", "fuel", "fur", "furniture", "galley", "gallon", "game", "garage", "garden", "garlic", "gas", "gasoline", "gate", "gateway", "gauge", "gazelle", "gear", "geese", "gemini", "geography", "geology", "geometry", "george", "geranium", "german", "germany", "ghana", "ghost", "giant", "giraffe", "girl", "glass", "glider", "gliding", "glockenspiel", "glove", "glue", "goal", "goat", "gold", "goldfish", "golf", "gondola", "gong", "good-bye", "goose", "gorilla", "gosling", "government", "governor", "grade", "grain", "gram", "granddaughter", "grandfather", "grandmother", "grandson", "grape", "graphic", "grass", "grasshopper", "gray", "grease", "greece", "greek", "green", "grey", "grill", "grip", "ground", "group", "grouse", "growth", "guarantee", "guatemalan", "guide", "guilty", "guitar", "gum", "gym", "gymnast", "hail", "hair", "haircut", "halibut", "hall", "hallway", "hamburger", "hammer", "hamster", "hand", "handball", "handle", "harbor", "hardboard", "hardcover", "hardhat", "hardware", "harmonica", "harmony", "harp", "hat", "hawk", "head", "headlight", "headline", "health", "hearing", "heart", "heat", "heaven", "hedge", "height", "helen", "helicopter", "helium", "hell", "help", "hemp", "hen", "heron", "herring", "hexagon", "hill", "himalayan", "hip", "hippopotamus", "history", "hobbies", "hockey", "hole", "holiday", "home", "honey", "hood", "hook", "hope", "horn", "horse", "hose", "hospital", "hot", "hour", "hourglass", "house", "hovercraft", "hub", "hubcap", "humidity", "humour", "hurricane", "hyacinth", "hydrant", "hydrogen", "hyena", "hygienic", "ice", "icebreaker", "icicle", "icon", "idea", "ikebana", "illegal", "improvement", "impulse", "inch", "income", "increase", "index", "india", "indonesia", "industry", "ink", "innocent", "input", "insect", "instruction", "instrument", "insurance", "interactive", "interest", "internet", "interviewer", "intestine", "invention", "invoice", "iran", "iraq", "iris", "iron", "island", "israel", "italian", "italy", "jacket", "jaguar", "jam", "james", "january", "japan", "japanese", "jar", "jasmine", "jason", "jaw", "jeans", "jeep", "jeff", "jelly", "jellyfish", "jennifer", "jet", "jewel", "jogging", "john", "join", "joke", "joseph", "journey", "judge", "judo", "juice", "july", "jumbo", "jump", "jumper", "june", "jury", "justice", "kamikaze", "kangaroo", "karate", "karen", "kayak", "kendo", "kenneth", "kenya", "ketchup", "kettle", "kevin", "key", "keyboard", "kick", "kidney", "kilogram", "kilometer", "kimberly", "kiss", "kitchen", "kite", "kitten", "kitty", "knee", "knickers", "knight", "knot", "knowledge", "korean", "lace", "ladybug", "lake", "lamb", "lamp", "land", "language", "lasagna", "latency", "latex", "laugh", "laundry", "laura", "law", "lawyer", "layer", "lead", "leaf", "learning", "leather", "leek", "leg", "legal", "lemonade", "lentil", "leo", "leopard", "letter", "lettuce", "level", "libra", "library", "license", "lift", "light", "lightning", "lilac", "lily", "limit", "linda", "line", "linen", "link", "lion", "lip", "lipstick", "liquid", "liquor", "lisa", "literature", "litter", "liver", "lizard", "llama", "loaf", "loan", "lobster", "lock", "locket", "locust", "look", "loss", "lotion", "love", "low", "lumber", "lunch", "lunchroom", "lung", "lycra", "lynx", "lyric", "macaroni", "machine", "magazine", "magic", "magician", "maid", "mail", "mailbox", "mailman", "makeup", "malaysia", "male", "mall", "mallet", "man", "manager", "mandolin", "manicure", "map", "maple", "maraca", "marble", "march", "margaret", "margin", "maria", "mark", "market", "married", "mary", "mascara", "mask", "mass", "match", "math", "may", "mayonnaise", "meal", "measure", "meat", "mechanic", "medicine", "meeting", "melody", "memory", "men", "menu", "mercury", "message", "metal", "meteorology", "meter", "mexican", "mexico", "mice", "michael", "michelle", "microwave", "middle", "mile", "milk", "milkshake", "millennium", "millimeter", "millisecond", "mind", "mine", "minibus", "mini-skirt", "minister", "mint", "minute", "mirror", "missile", "mist", "mistake", "mitten", "moat", "modem", "mole", "mum", "monday", "money", "monkey", "month", "moon", "morning", "morocco", "mosque", "mosquito", "mother", "motion", "motorboat", "motorcycle", "mountain", "mouse", "moustache", "mouth", "move", "multimedia", "muscle", "museum", "music", "musician", "mustard", "myanmar", "nail", "name", "nancy", "napkin", "nation", "neck", "need", "needle", "neon", "nepal", "nephew", "nerve", "nest", "net", "network", "news", "newsprint", "newsstand", "niece", "nigeria", "night", "nitrogen", "node", "noise", "noodle", "north", "north america", "north korea", "norwegian", "nose", "note", "notebook", "notify", "novel", "november", "number", "numeric", "nurse", "nut", "nylon", "oak", "oatmeal", "objective", "oboe", "observation", "occupation", "ocean", "octagon", "octave", "october", "octopus", "offence", "offer", "office", "oil", "okra", "olive", "onion", "open", "opera", "operation", "opinion", "option", "orange", "orchestra", "orchid", "order", "organ", "organisation", "ornament", "ostrich", "otter", "ounce", "output", "oval", "oven", "overcoat", "owl", "owner", "ox", "oxygen", "oyster", "package", "packet", "page", "pail", "pain", "paint", "pair", "pakistan", "palm", "pamphlet", "pan", "pancake", "pancreas", "panda", "pansy", "panther", "pantry", "pants", "paper", "paperback", "parade", "parallelogram", "parcel", "parent", "parentheses", "park", "parrot", "parsnip", "part", "particle", "partner", "partridge", "party", "passbook", "passenger", "passive", "pasta", "paste", "pastor", "pastry", "patch", "path", "patient", "patio", "patricia", "paul", "payment", "pea", "peace", "peak", "peanut", "pear", "pedestrian", "pediatrician", "pelican", "pen", "penalty", "pencil", "pendulum", "pentagon", "pepper", "perch", "perfume", "period", "periodical", "peripheral", "permission", "persian", "person", "peru", "pest", "pet", "pharmacist", "pheasant", "philippines", "philosophy", "phone", "physician", "piano", "piccolo", "pickle", "picture", "pie", "pig", "pigeon", "pike", "pillow", "pilot", "pimple", "pin", "pine", "ping", "pink", "pint", "pipe", "pisces", "pizza", "place", "plain", "plane", "planet", "plant", "plantation", "plaster", "plasterboard", "plastic", "plate", "platinum", "play", "playground", "playroom", "pleasure", "plier", "plot", "plough", "plow", "plywood", "pocket", "poet", "point", "poison", "poland", "police", "policeman", "polish", "politician", "pollution", "polo", "polyester", "pond", "popcorn", "poppy", "population", "porch", "porcupine", "port", "porter", "position", "possibility", "postage", "postbox", "pot", "potato", "poultry", "pound", "powder", "power", "precipitation", "preface", "prepared", "pressure", "price", "priest", "print", "printer", "prison", "probation", "process", "processing", "produce", "product", "production", "professor", "profit", "promotion", "propane", "property", "prose", "prosecution", "protest", "protocol", "pruner", "psychiatrist", "psychology", "puffin", "pull", "puma", "pump", "pumpkin", "punch", "punishment", "puppy", "purchase", "purple", "purpose", "push", "pyjama", "pyramid", "quail", "quality", "quart", "quarter", "quartz", "queen", "question", "quicksand", "quiet", "quill", "quilt", "quit", "quiver", "quotation", "rabbi", "rabbit", "racing", "radar", "radiator", "radio", "radish", "raft", "rail", "railway", "rain", "rainbow", "raincoat", "rainstorm", "rake", "random", "range", "rat", "rate", "raven", "ravioli", "ray", "rayon", "reaction", "reading", "reason", "receipt", "recess", "record", "recorder", "rectangle", "red", "reduction", "refrigerator", "refund", "regret", "reindeer", "relation", "relative", "religion", "relish", "reminder", "repair", "replace", "report", "representative", "request", "resolution", "respect", "responsibility", "rest", "restaurant", "result", "retailer", "revolve", "revolver", "reward", "rhinoceros", "rhythm", "rice", "richard", "riddle", "ring", "rise", "risk", "river", "riverbed", "road", "roadway", "roast", "robert", "robin", "rock", "rocket", "rod", "roll", "romania", "romanian", "ronald", "roof", "room", "rooster", "root", "rose", "rotate", "route", "router", "rowboat", "rub", "rubber", "rugby", "rule", "run", "russia", "russian", "ruth", "sack", "sagittarius", "sail", "sailboat", "sailor", "salad", "salary", "sale", "salesman", "salmon", "salt", "samurai", "sand", "sandra", "sandwich", "santa", "sarah", "sardine", "satin", "saturday", "sauce", "saudi arabia", "sausage", "save", "saw", "saxophone", "scale", "scallion", "scanner", "scarecrow", "scarf", "scene", "scent", "schedule", "school", "science", "scissors", "scooter", "scorpio", "scorpion", "scraper", "screen", "screw", "screwdriver", "sea", "seagull", "seal", "seaplane", "search", "seashore", "season", "seat", "second", "secretary", "secure", "security", "seed", "seeder", "segment", "select", "selection", "self", "sense", "sentence", "separated", "september", "servant", "server", "session", "shade", "shadow", "shake", "shallot", "shame", "shampoo", "shape", "share", "shark", "sharon", "shears", "sheep", "sheet", "shelf", "shell", "shield", "shingle", "ship", "shirt", "shock", "shoe", "shoemaker", "shop", "shorts", "shoulder", "shovel", "show", "shrimp", "shrine", "siamese", "siberian", "side", "sideboard", "sidecar", "sidewalk", "sign", "signature", "silica", "silk", "silver", "sing", "singer", "single", "sink", "sister", "size", "skate", "skiing", "skill", "skin", "skirt", "sky", "slash", "slave", "sled", "sleep", "sleet", "slice", "slime", "slip", "slipper", "slope", "smash", "smell", "smile", "smoke", "snail", "snake", "sneeze", "snow", "snowboarding", "snowflake", "snowman", "snowplow", "snowstorm", "soap", "soccer", "society", "sociology", "sock", "soda", "sofa", "softball", "softdrink", "software", "soil", "soldier", "son", "song", "soprano", "sort", "sound", "soup", "south africa", "south america", "south korea", "soy", "soybean", "space", "spade", "spaghetti", "spain", "spandex", "spark", "sparrow", "spear", "specialist", "speedboat", "sphere", "sphynx", "spider", "spike", "spinach", "spleen", "sponge", "spoon", "spot", "spring", "sprout", "spruce", "spy", "square", "squash", "squid", "squirrel", "stage", "staircase", "stamp", "star", "start", "starter", "state", "statement", "station", "statistic", "steam", "steel", "stem", "step", "steven", "stew", "stick", "stinger", "stitch", "stock", "stocking", "stomach", "stone", "stool", "stop", "stopsign", "stopwatch", "store", "storm", "story", "stove", "stranger", "straw", "stream", "street", "streetcar", "stretch", "string", "structure", "study", "sturgeon", "submarine", "substance", "subway", "success", "sudan", "suede", "sugar", "suggestion", "suit", "summer", "sun", "sunday", "sundial", "sunflower", "sunshine", "supermarket", "supply", "support", "surfboard", "surgeon", "surname", "surprise", "susan", "sushi", "swallow", "swamp", "swan", "sweater", "sweatshirt", "sweatshop", "swedish", "sweets", "swim", "swimming", "swing", "swiss", "switch", "sword", "swordfish", "sycamore", "syria", "syrup", "system", "table", "tablecloth", "tabletop", "tadpole", "tail", "tailor", "taiwan", "talk", "tank", "tanker", "tanzania", "target", "taste", "taurus", "tax", "taxi", "taxicab", "tea", "teacher", "teaching", "team", "technician", "teeth", "television", "temper", "temperature", "temple", "tempo", "tendency", "tennis", "tenor", "tent", "territory", "test", "text", "textbook", "texture", "thailand", "theater", "theory", "thermometer", "thing", "thistle", "thomas", "thought", "thread", "thrill", "throat", "throne", "thumb", "thunder", "thunderstorm", "thursday", "ticket", "tie", "tiger", "tights", "tile", "time", "timer", "tin", "tip", "tire", "titanium", "title", "toad", "toast", "toe", "toenail", "toilet", "tomato", "ton", "tongue", "tooth", "toothbrush", "toothpaste", "top", "tornado", "tortellini", "tortoise", "touch", "tower", "town", "toy", "tractor", "trade", "traffic", "trail", "train", "tramp", "transaction", "transmission", "transport", "trapezoid", "tray", "treatment", "tree", "trial", "triangle", "trick", "trigonometry", "trip", "trombone", "trouble", "trousers", "trout", "trowel", "truck", "trumpet", "trunk", "t-shirt", "tsunami", "tub", "tuba", "tuesday", "tugboat", "tulip", "tuna", "tune", "turkey", "turkish", "turn", "turnip", "turnover", "turret", "turtle", "tv", "twig", "twilight", "twist", "typhoon", "uganda", "ukraine", "ukrainian", "umbrella", "uncle", "underclothes", "underpants", "undershirt", "underwear", "unit", "united kingdom", "unshielded", "use", "utensil", "uzbekistan", "vacation", "vacuum", "valley", "value", "van", "vase", "vault", "vegetable", "vegetarian", "veil", "vein", "velvet", "venezuela", "venezuelan", "verdict", "vermicelli", "verse", "vessel", "vest", "veterinarian", "vietnam", "view", "vinyl", "viola", "violet", "violin", "virgo", "viscose", "vise", "vision", "visitor", "voice", "volcano", "volleyball", "voyage", "vulture", "waiter", "waitress", "walk", "wall", "wallaby", "wallet", "walrus", "war", "warm", "wash", "washer", "wasp", "waste", "watch", "watchmaker", "water", "waterfall", "wave", "wax", "way", "wealth", "weapon", "weasel", "weather", "wedge", "wednesday", "weed", "weeder", "week", "weight", "whale", "wheel", "whip", "whiskey", "whistle", "white", "wholesaler", "wilderness", "william", "willow", "wind", "windchime", "window", "windscreen", "windshield", "wine", "wing", "winter", "wire", "wish", "witch", "withdrawal", "witness", "wolf", "woman", "women", "wood", "wool", "woolen", "word", "work", "workshop", "worm", "wound", "wren", "wrench", "wrinkle", "wrist", "writer", "xylophone", "yacht", "yak", "yam", "yard", "yarn", "year", "yellow", "yew", "yogurt", "yoke", "yugoslavian", "zebra", "zephyr", "zinc", "zipper", "zone", "zoo"];
		return i
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
GameCtrl.$inject = ["$rootScope", "$location", "$log", "$lecturequiz-controller", "$window", "$config", "$session"];
JoinCtrl.$inject = ["$rootScope", "$location", "$log", "$lecturequiz-controller", "$preloader", "$window", "$config"];
InstructionsCtrl.$inject = ["$scope", "$rootScope", "$log", "$lecturequiz-controller"];
StartCtrl.$inject = ["$rootScope", "$scope", "$lecturequiz-controller", "$quiz", "$location"];
GetReadyCtrl.$inject = ["$scope", "$rootScope", "$countdown", "$location", "$lecturequiz-controller", "$quiz"];
AnswerCtrl.$inject = ["$scope", "$rootScope", "$log", "$lecturequiz-controller", "_", "$quiz", "$location", "sanitize"];
FeedbackCtrl.$inject = ["$scope", "$rootScope", "$log", "$lecturequiz-controller", "$location", "$quiz", "$timeout"];
GameOverCtrl.$inject = ["$rootScope", "$scope", "$lecturequiz-controller", "$window", "$config", "$quiz", "$location", "$timeout"];
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
//# sourceMappingURL=controller.min.js.map
