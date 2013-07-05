(function() {
	// Get any jquery=___ param from the query string.
	var jqversion = location.search.match(/[?&]jquery=(.*?)(?=&|$)/);
	jqversion = (jqversion) ? jqversion[1] : 'latest';
	var path = 'http://code.jquery.com/jquery-' + jqversion + '.min.js';
	// This is the only time I'll ever use document.write, I promise!
	document.write('<script src="' + path + '"></script>');
}());
