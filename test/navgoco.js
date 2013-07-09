(function($) {
	var menu,
		first,
		li,
		html = arrayToUl(links);

	function getVisible() {
		var result = [];
		menu.find('ul').filter(':visible').each(function() {
			result.push($(this).attr('data-index'));
		});
		return result;
	}

	module('#navgoco', {
		setup: function() {
			menu = $('<ul>' + html + '</ul>');
			menu.appendTo($('#qunit-fixture'));
			first = menu.find("li:has(ul) > a").first();
			li = first.parent();
			$.fn.navgoco.defaults.save = false;
			$.fn.navgoco.defaults.slide.duration = 1;
		}
	});

	test('chainability', function() {
		strictEqual(menu.navgoco(), menu, 'should be chainable');
	});

	test('caret', function() {
		expect(1);
		menu.navgoco();
		var link = menu.find("li:has(ul) > a").last();
		strictEqual(link.html(), 'Where to Buy<span class="caret"></span>', 'caret should be present');
	});

	test('mouse click', function() {
		expect(2);
		menu.navgoco();
		first.click();
		ok(li.hasClass('open'), 'should have class open');
		first.click();
		ok(!li.hasClass('open'), 'should not have class open');
	});

	test('manual toggle', function() {
		expect(2);
		menu.navgoco();
		menu.navgoco('toggle', true, 0);
		ok(li.hasClass('open'), 'should have class open');
		menu.navgoco('toggle', false, 0);
		ok(!li.hasClass('open'), 'should not have class open');
	});

	test('manual toggle also opens parents', function() {
		expect(1);
		menu.navgoco();
		menu.navgoco('toggle', true, 3);
		deepEqual(getVisible(), ['1', '3'], 'Both sub-menus 1 and 3 should be visible');
	});

	test('manual toggle all', function() {
		expect(1);
		menu.navgoco();
		menu.navgoco('toggle', true);
		deepEqual(getVisible(), ['0', '1', '2', '3', '4'], 'All sub-menus should be visible');
	});

	test('accordion', function() {
		expect(1);
		menu.navgoco({accordion: true});
		menu.navgoco('toggle', true, 0);
		menu.navgoco('toggle', true, 1);
		menu.navgoco('toggle', true, 0);
		stop();
		setTimeout(function() {
			deepEqual(getVisible(), ['0'], 'Only submenus 0 should be visible');
			start();
		}, 1000);
	});
}(jQuery));