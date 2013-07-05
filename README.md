# {:navgoco}

Navgoco is a simple JQuery plugin which turns a nested unordered list of links into a beautiful vertical multi-level sliding navigation with options to remember sub-menus visible state between sessions or act as an accordion.

## Getting Started
Download the plugin, unzip it and copy the files to your application directory and load them inside your HTML.

```html
    <head>
		<!-- Load JQuery -->
        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
		<!-- Load jquery.cookie plugin (optional) -->
		<script type="text/javascript" src="/navgoco/src/jquery.cookie.js"></script>
		<!-- Load jquery.navgoco plugin js and css files -->
		<script type="text/javascript" src="/navgoco/src/jquery.navgoco.min.js"></script>
        <link rel="stylesheet" href="/navgoco/src/jquery.navgoco.css" type="text/css" media="screen" />
    </head>
```

Sample menu html code:
```html
	<ul class="nav">
		<li><a href="#">1. Menu</a>
			<ul>
				<li><a href="#">1.1 Submenu</a></li>
				<li><a href="#">1.2 Submenu</a></li>
				<li><a href="#">1.3 Submenu</a></li>
			</ul>
		</li>
	<!-- etc... -->
	</ul>
```
Activate the plugin like this:
```html
<script type="text/javascript">
	$(document).ready(function() {
		$('.nav').navgoco();
	});
</script>
```

You can also extend the default options:
```html
<script type="text/javascript">
	$(document).ready(function() {
		$('.nav').navgoco({
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
		  });
	});
</script>
```

## Options

You can pass these options as key/value object during activation to alter the default behaviour.

```javascript
var defaults = {
		caret: '<span class="caret"></span>', // This will be added inside parent links
		accordion: false, // Enable accordion mode
		openClass: 'open', // css class to be added in open parent li elements
		save: true,  // Enable remember state, this will be turned off automatically if cookie plugin isn't included or accordion mode is on.
		cookie: {
			name: 'navgoco', // Cookie's name to store visible states
			expires: false, // Cookie's lifespan in days. If omitted storage will be deleted between sessions.
			path: '/' // Cookie's path where is valid
		},
		slide: {
			duration: 400, // Slide duration in milliseconds
			easing: 'swing' // A string indicating which easing (linear|swing) function to use for the transition.
		}
	};
```
