function arrayToUl(data) {
	var html = '';
	for (var key in data) {
		html += '<li>';
		var isInt = (parseInt(key) == key);
		var label = isInt ? data[key] : key;
		html += '<a href="#">' + label + '</a>';
		if (!isInt) {
			html += '<ul>';
			html += arrayToUl(data[key]);
			html += '</ul>';
		}
		html += '<li>';
	}
	return html;
}

var links = {
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