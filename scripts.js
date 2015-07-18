/* jshint browser: true */
(function () {
	"use strict";

	function documentOffsetTop(el) {
		var offsetTop = 0;
		do {
			offsetTop += !isNaN(el.offsetTop) ? el.offsetTop : 0;
		} while (el = el.offsetParent);
		return offsetTop;
	}

	function addClass(el, className) {

		var classes;
		if (el.classList) {
			el.classList.add(className);
		} else {
			classes = el.className.split(' ');
			if (classes.indexOf(className) === -1) {
				classes.push(className);
				el.className = classes.join(' ');
			}
		}
	}

	function removeClass(el, className) {

		var inx, classes;
		if (el.classList) {
			el.classList.remove(className);
		} else {
			classes = el.className.split(' ');
			if ((inx = classes.indexOf(className)) !== -1) {
				classes.splice(inx, 1);
				el.className = classes.join(' ');
			}
		}
	}

	/**
	 * Helper function used to throttle the execution of a given function.
	 */
	function throttled(originalFunc, delay) {

		var deferId = null,
			context = null,
			args = null;

		function execute() {

			var currentContext = context,
				currentArgs = args;

			deferId = null;
			context = null;
			args = null;
			originalFunc.apply(currentContext, currentArgs);
		}

		return function wrapper() {

			var i;

			context = this;
			args = [];
			for (i = 0; i < arguments.length; i += 1) {
				args.push(arguments[i]);
			}

			if (!deferId) {
				deferId = setTimeout(execute, delay);
			}
		};
	}

	var navScrolling = {

		navElement: null,
		navOffsetTop: Infinity,

		checkForFixed: function () {
			if (document.body.scrollTop > this.navOffsetTop) {
				addClass(this.navElement, 'floating');
			} else {
				removeClass(this.navElement, 'floating');
			}
		},
		initChecks: function () {
			this.navElement = document.querySelector('nav');
			this.navOffsetTop = documentOffsetTop(this.navElement);
			window.addEventListener('scroll', throttled(this.checkForFixed, 10).bind(this), false);
		}

	};

	function init() {
		navScrolling.initChecks();
	}

	if (document.readyState !== 'loading') {
		init();
	} else {
		document.addEventListener('DOMContentLoaded', init);
	}

}());
