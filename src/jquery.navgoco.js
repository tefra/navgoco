/*
 * jQuery Navgoco Menus Plugin v0.1.0 (2013-07-05)
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
		this.opts = options;
		this.uuid = this.$el.attr('id') ? this.$el.attr('id') : idx;
		this.open = {};
		this.init();
		return this;
	};

	Plugin.prototype = {
		init: function() {
			var self = this;
			if (self.opts.save) {
				self._load();
			}
			self.$el.find('ul').each(function(idx) {
				var sub = $(this);
				sub.data('index', idx);
				if (self.opts.save && self.open.hasOwnProperty(idx)) {
					sub.parent().addClass(self.opts.openClass);
					sub.show();
				} else if (sub.parent().hasClass(self.opts.openClass)) {
					sub.show();
					this.open[idx] = 1;
				} else {
					sub.hide();
				}
			});

			var parents = self.$el.find("li:has(ul) > a");
			if (self.opts.caret) {
				parents.append(self.opts.caret);
			}
			parents.click(function(e) {
				e.preventDefault();
				var sub = $(this).next();
				var isOpen = sub.is(":visible");
				self._toggle(sub, !isOpen);
				if (self.opts.save) {
					self._save();
				}
			});
		},
		_toggle: function(sub, open) {
			var self = this;
			var idx = sub.data('index');

			if (open) {
				sub.parent().addClass(self.opts.openClass);
				sub.slideDown(self.opts.slide);
				self.open[idx] = 1;

				if (self.opts.accordion) {
					var allowed = {};
					allowed[idx] = 1;
					sub.parent().parents("ul").each(function() {
						var idx = $(this).data('index');
						allowed[idx] = 1;
						self.open[idx] = 1;
					});

					self.$el.find("ul:visible").each(function() {
						var menu = $(this);
						if (!allowed.hasOwnProperty(menu.data('index'))) {
							self._toggle(menu, false);
						}
					});
				}

			} else {
				sub.parent().removeClass(self.opts.openClass);
				sub.slideUp(self.opts.slide);
				this.open[idx] = 0;
			}
		},
		_save: function() {
			var save = {};
			for (var key in this.open) {
				if (this.open[key] === 1) {
					save[key] = 1;
				}
			}
			cookie[this.uuid] = save;
			$.cookie(this.opts.cookie.name, JSON.stringify(cookie), this.opts.cookie);
		},
		_resetCookie: function() {
			cookie[this.uuid] = {};
		},
		_load: function() {
			if (cookie === null) {
				var data = $.cookie(this.opts.cookie.name);
				cookie = (data) ? JSON.parse(data) : {};
			}
			this.open = cookie.hasOwnProperty(this.uuid) ? cookie[this.uuid] : {};
		},
		collapse: function() {
			var self = this;
			self.$el.find('ul:visible').each(function() {
				self._toggle($(this), false);
			});
			if (self.opts.save) {
				self._save();
			}
		},
		expand: function() {
			var self = this;
			self.$el.find('ul').each(function() {
				self._toggle($(this), true);
			});
			if (self.opts.save) {
				self._save();
			}
		}
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
		var callback = typeof options === 'string';
		if (!callback) {
			options = $.extend({}, defaults, options || {});
			if (!$.cookie) {
				options.save = false;
			}
		}
		return this.each(function(idx) {
			var $this = $(this);
			var obj = $this.data('navgoco');
			if (callback && obj) {
				obj[options]();
			} else if (!obj) {
				$this.data('navgoco', new Plugin(this, options, idx));
			}
		});
	};
})(jQuery);