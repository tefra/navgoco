/* Navgoco - v0.1.0 - 2013-07-03
 * https://github.com/Tefra/navgoco
 * Copyright (c) 2013 Chris T; Licensed MIT */
(function($) {
	"use strict";

	var Plugin = function(el, options, idx) {
		this.el = el;
		this.$el = $(el);
		this.opts = options;
		this.uuid = this.$el.attr('id') ? this.$el.attr('id') : idx;
		this.init();
		return this;
	};

	Plugin.prototype = {
		init: function() {
			var self = this;
			if (self.opts.save) {
				var cookie = self._load();
			}
			self.$el.find('ul').each(function(idx) {
				var sub = $(this);
				sub.data('index', idx);
				if (self.opts.save && cookie.hasOwnProperty(idx)) {
					sub.parent().addClass(self.opts.openClass);
					sub.show();
				} else if (sub.parent().hasClass(self.opts.openClass)) {
					sub.show();
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
				var open = sub.is(":visible");
				self._toggle(sub, open);
				if (self.opts.accordion) {
					self._accordion(sub);
				} else if (self.opts.save) {
					self._update(sub, !open, true);
				}
			});
		},
		_toggle: function(sub, open) {
			if (open) {
				sub.parent().removeClass(this.opts.openClass);
				sub.slideUp(this.opts.slide);
			} else {
				sub.parent().addClass(this.opts.openClass);
				sub.slideDown(this.opts.slide);
			}
		},
		_accordion: function(sub) {
			var self = this;
			var allowed = {};

			allowed[sub.data('index')] = true;
			sub.parent().parents("ul").each(function() {
				allowed[$(this).data('index')] = true;
			});

			self.$el.find("ul:visible").each(function() {
				var menu = $(this);
				if (!allowed.hasOwnProperty(menu.data('index'))) {
					menu.parent().removeClass(self.opts.openClass);
					menu.slideUp(self.opts.slide);
				}
			});
		},
		_update: function(menu, open, save) {
			var idx = menu.data('index');

			if (open) {
				cookie[this.uuid][idx] = 1;
			} else {
				delete cookie[this.uuid][idx];
			}
			if (save) {
				this._save();
			}
		},
		_save: function() {
			$.cookie(this.opts.cookie.name, JSON.stringify(cookie), this.opts.cookie);
		},
		_load: function() {
			if (cookie === null) {
				var data = $.cookie(this.opts.cookie.name);
				cookie = (data) ? JSON.parse(data) : {};
			}
			if (!cookie.hasOwnProperty(this.uuid)) {
				cookie[this.uuid] = {};
			}
			return cookie[this.uuid];
		},
		collapse: function() {
			var self = this;

			self.$el.find('ul').each(function() {
				self._toggle($(this), true);
			});

			if (self.opts.save) {
				cookie[self.uuid] = {};
				self._save();
			}
		},
		expand: function() {
			var self = this;
			var submenus = self.$el.find('ul');

			submenus.each(function() {
				var sub = $(this);
				self._toggle(sub, false);
				if (self.opts.save) {
					self._update(sub, true, false);
				}
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
			if (options.accordion || !$.cookie) {
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