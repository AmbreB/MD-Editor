(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(function () {
	var app = {
		init: function init() {
			var mdEditor = CodeMirror(document.getElementById('container'), {
				value: "# Hello",
				mode: "text/x-markdown",
				lineNumbers: true,
				theme: "default"
			});

			var htmlEditor = CodeMirror(document.getElementById('container'), {
				value: "<h1>Hello</h1>",
				mode: "text/html",
				lineNumbers: true,
				theme: "default"
			});
			app.getText(mdEditor);
		},
		getText: function getText(editor) {
			$('.CodeMirror').on('keypress', function () {
				var text = editor.getValue();
				console.log(text);
			});
		}
	};
	app.init();
});

},{}]},{},[1]);

//# sourceMappingURL=bundle.js.map
