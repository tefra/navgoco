$(document).ready(function() {
	// Create menus on the fly from fixtures
	var demoMenu = '\n' + arrayToUl(links);
	$("#demo1").append(demoMenu);
	$('#demo1 li').first().addClass('active');
	$("#demo2").append(demoMenu);
	$('#demo2 li').first().addClass('active');
	$("#demo3").append(demoMenu);
	$('#demo3 li').first().addClass('active');

	$('#demo1, #demo2, #demo3').find("li > a").click(function(e) {
		e.preventDefault();
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
