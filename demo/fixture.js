function repeat(pattern, count) {
	if (count < 1)
		return '';
	var result = '';
	while (count > 0) {
		if (count & 1)
			result += pattern;
		count >>= 1, pattern += pattern;
	}
	return result;
}

function arrayToUl(data, depth, proper) {
	depth = (isNaN(depth) || depth == 0) ? 1 : depth;
	var html = '',
		il = repeat('\t', depth),
		iu = repeat('\t', depth + 1);

	for (var key in data) {
		html += il + '<li>';
		var isInt = (parseInt(key) == key);
		var label = isInt ? data[key] : key;
		var href = proper ? hrefs[Math.floor(Math.random() * hrefs.length)] : '#';
		label = href === '#' ? label : 'Google'
		html += '<a href="' + href + '">' + label + '</a>';
		if (!isInt) {
			html += '\n' + iu + '<ul>\n';
			html += arrayToUl(data[key], depth + 2, proper);
			html += iu + '</ul>\n' + il;
		}
		html += '</li>\n';
	}
	return html;
}

var links = {
	"0": "Home",
	"News and Events": [
		"Hot News",
		"RSS Feeds",
		"Peach Events",
		"User Groups"
	],
	"About": {
		"Contact Us": [
			"Support and Service",
			"Product Feedback",
			"Website Feedback"],
		"0": "Public Relations",
		"1": "Investors",
		"2": "Working at Peach",
		"3": "Environment",
		"Working with Peach": [
			"Procurement",
			"Supplier Responsibility"
		]
	},
	"Where to Buy": [
		"Where can I buy Peach products?",
		"Peach Online Store",
		"Peach Store for Business",
		"Peach Store for Education",
		"Peach Online Store Country Selector",
		"Peach Retail",
		"Find a Reseller",
		"Peach Financial Services", "Peach Rebates"
	]
};

var hrefs = [
	'http://www.google.com',
	'#'
];