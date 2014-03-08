$(document).ready(function() {
	// Create menus on the fly from fixtures
	var demoMenu = '\n' + arrayToUl(links, 0, true);
	$("#demo1").append(demoMenu);
	$('#demo1 li').first().addClass('active');
	$("#demo2").append(demoMenu);
	$('#demo2 li').first().addClass('active');
	$("#demo3").append(demoMenu);
	$('#demo3 li').first().addClass('active');

	$('#demo1, #demo2, #demo3').find("li > a").click(function(e) {
		e.preventDefault();
		var isLink = $(this).is("a");
		var href = isLink ? $(this).attr('href') : '';

		if (isLink && href !== '#') {
			alert('I would go to `' + href + '` but i don\t want too :p');
		} else if (isLink) {
			alert('I will just toggle my submenu i am just a dummy link');
		} else {
			alert('I will toggle my submenu after all i am a caret/arrow');
		}
	});

	$('pre > code').each(function() {
		var that = $(this),
			type = that.attr('class'),
			source = that.data('source'),
			code = $('#' + source + '-' + type).html();
		that.text($.trim(code));
	});

	$(".tabs a").click(function(e) {
		e.preventDefault();
		$(this).parent().siblings().removeClass('active').end().addClass('active');
		$(this).parents('ul').next().children().hide().eq($(this).parent().index()).show();
	});

	$(".panes").each(function() {
		$(this).children().hide().eq(0).show();

	});
	hljs.tabReplace = '    ';
	hljs.initHighlightingOnLoad();
});
