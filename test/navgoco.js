(function($) {
	var menu, first, li;
	var html = arrayToUl(links);
	module('#navgoco', {
		// This will run before each test in this module.
		setup: function() {
			menu = $('<ul>' + html + '</ul>');
			menu.appendTo($('#qunit-fixture'));
			first = menu.find("li:has(ul) > a").first();
			li = first.parent();
		}
	});

	test('test chainability', function() {
		strictEqual(menu.navgoco({save: false}), menu, 'should be chainable');

	});

	test('test mouse click', function() {
		expect(2);
		menu.navgoco({save: false});
		first.click();
		ok(li.hasClass('open'), 'should have class open');
		first.click();
		ok(!li.hasClass('open'), 'should not have class open');
	});

	test('test manual toggle', function() {
		expect(2);
		menu.navgoco({save: false});
		menu.navgoco('toggle', true, 0);
		ok(li.hasClass('open'), 'should have class open');
		menu.navgoco('toggle', false, 0);
		ok(!li.hasClass('open'), 'should not have class open');
	});

	test('test manual toggle to also open parents', function() {
		expect(1);
		menu.navgoco({save: false});
		menu.navgoco('toggle', true, 3);
		var expected = ['1', '3'];
		var result = [];

		menu.find('ul').each(function() {
			var sub = $(this);
			if (sub.parent().hasClass('open')) {
				result.push(sub.attr('data-index'));
			}
		});

		deepEqual(result, expected, 'Both sub-menus 1 and 3 should be visible');
	});

	test('test toggle all', function() {
		expect(1);
		menu.navgoco({save: false});
		menu.navgoco('toggle', true);
		var expected = ['0', '1', '2', '3', '4'];
		var result = [];

		menu.find('ul').each(function() {
			result.push($(this).attr('data-index'));
		});

		deepEqual(result, expected, 'All sub-menus should be visible');
	});

	test('test accordion', function() {
		expect(1);
		menu.navgoco({save: false, accordion: true});
		menu.navgoco('toggle', true, 0);
		menu.navgoco('toggle', true, 1);
		menu.navgoco('toggle', true, 4);

		var expected = ['4'];
		var result = [];

		menu.find('ul').each(function() {
			var sub = $(this);
			if (sub.parent().hasClass('open')) {
				result.push(sub.attr('data-index'));
			}
		});



		deepEqual(result, expected, 'Only submenus 1 and 2 should be visible');
	});


}(jQuery));