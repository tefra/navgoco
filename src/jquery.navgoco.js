/*
 * jQuery Navgoco Menus Plugin v0.1.0 (2013-07-07)
 * https://github.com/tefra/navgoco
 *
 * Copyright (c) 2013 Chris T
 * BSD - https://github.com/tefra/navgoco/blob/master/LICENSE-BSD
 */
(function($) {

	"use strict";

	var Plugin = function(el, options, idx) {
		this.el = el;
		this.$el = $(el);
		this.options = options;
		this.uuid = this.$el.attr('id') ? this.$el.attr('id') : idx;
		this.open = {};
		this.init();
		return this;
	};

	Plugin.prototype = {
		init: function() {
			var self = this;
			self._load();
			self.$el.find('ul').each(function(idx) {
				var sub = $(this);
				sub.attr('data-index', idx);
				if (self.options.save && self.open.hasOwnProperty(idx)) {
					sub.parent().addClass(self.options.openClass);
					sub.show();
				} else if (sub.parent().hasClass(self.options.openClass)) {
					sub.show();
					this.open[idx] = 1;
				} else {
					sub.hide();
				}
			});

			var links = self.$el.find("li:has(ul) > a");
			if (self.options.caret) {
				links.append(self.options.caret);
			}
			links.click(function(e) {
				e.preventDefault();
				var sub = $(this).next();
				var isOpen = sub.is(":visible");
				self._toggle(sub, !isOpen);
				self._save();
			});
		},
		_toggle: function(sub, open) {
			var self = this;
			var idx = sub.attr('data-index');
			var parent = sub.parent();
			if (open) {
				parent.addClass(self.options.openClass);
				sub.slideDown(self.options.slide);
				self.open[idx] = 1;

				if (self.options.accordion) {
					var parents = parent.parents("ul");
					var allowed = {};
					allowed[idx] = 1;
					parents.each(function() {
						var idx = $(this).attr('data-index');
						allowed[idx] = 1;
						self.open[idx] = 1;
					});

					self.$el.find("ul:visible").each(function() {
						var sub = $(this);
						var idx = sub.attr('data-index');
						if (!allowed.hasOwnProperty(idx)) {
							self._toggle(sub, false);
						}
					});
				}
			} else {
				parent.removeClass(self.options.openClass);
				sub.slideUp(self.options.slide);
				this.open[idx] = 0;
			}
		},
		toggle: function(flag) {
			var self = this;
			var list = Array.prototype.slice.call(arguments, 1);
			var only = {};

			for (var i = 0; i < list.length; i++) {
				only[list[i]] = true;
			}

			self.$el.find('ul').each(function() {
				var sub = $(this);
				var idx = sub.attr('data-index');
				if (!only.length || only.hasOwnProperty(idx)) {
					self._toggle(sub, flag);
					if (only.length === 1) {
						return false;
					}
				}
			});
			self._save();
		},
		_save: function() {
			if (this.options.save) {
				var save = {};
				for (var key in this.open) {
					if (this.open[key] === 1) {
						save[key] = 1;
					}
				}
				cookie[this.uuid] = save;
				$.cookie(this.options.cookie.name, JSON.stringify(cookie), this.options.cookie);
			}
		},
		_load: function() {
			if (this.options.save) {
				if (cookie === null) {
					var data = $.cookie(this.options.cookie.name);
					cookie = (data) ? JSON.parse(data) : {};
				}
				this.open = cookie.hasOwnProperty(this.uuid) ? cookie[this.uuid] : {};
			}
		},
	};

	var cookie = null;
	var defaults = {
		caret: '<span class="caret"></span>',
		accordion: false,
		openClass: 'open',
		save: true,
		cookie: {
			name: 'navgoco',
			expires: false,
			path: '/'
		},
		slide: {
			duration: 400,
			easing: 'swing'
		}
	};

	$.fn.navgoco = function(options) {
		var method = (typeof options === 'string' && options.charAt(0) !== '_');
		if (method) {
			var args = Array.prototype.slice.call(arguments, 1);
		} else {
			options = $.extend({}, defaults, options || {});
			if (!$.cookie) {
				options.save = false;
			}
		}
		return this.each(function(idx) {
			var $this = $(this);
			var obj = $this.data('navgoco');
			if (method && obj) {
				obj[options].apply(obj, args);
			} else if (!obj && !method) {
				$this.data('navgoco', new Plugin(this, options, idx));
			}
		});
	};
})(jQuery);