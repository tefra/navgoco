# {:navgoco}

Navgoco is a simple JQuery plugin which turns a nested unordered list of links
into a beautiful vertical multi-level sliding navigation with options to remember
sub-menus visible state between sessions or act as an accordion. *[Demo](http://demos.komposta.net/jquery/navgoco/demo/index.html)*


## Getting Started
Download the plugin, unzip it and copy the files to your application directory and load them inside your HTML.

```html
    <head>
		<!-- Load JQuery -->
        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
		<!-- Load jquery.cookie plugin (optional) -->
		<script type="text/javascript" src="/navgoco/src/jquery.cookie.js"></script>
		<!-- Load jquery.navgoco plugin js and css files -->
		<script type="text/javascript" src="/navgoco/src/jquery.navgoco.js"></script>
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

----------

#### caret
Type: `string`
Default `<span class="caret"></span>`

Raw html appended into parent links.

#### accordion
Type: `boolean`
Default `false`

Enable accordion mode.

----------

#### openClass:
Type: `string`
Default `open`

Css class to be added in open parent li.

----------

#### save:

Type: `object`
Default `true`

Save state between sessions, if cookie plugin is not included it will be automatically turned off.

----------

#### cookie:
Type: `object`

  * Cookie options
    * `name`:		Cookie name, Type: `string`, Default: `navgoco`
    * `expires`:	Cookie lifespan in days, `false` will make it a session cookie, Type: `boolean`, Default: `false`
    * `path`:		Cookie path where is valid, Type: `string`, Default: `/`

----------

#### slide:
Type: `object`

  * Slide options
    * `duration`:	Slide duration in milliseconds, Type: `integer`, Default: `400`
    * `easing`:	Slide easing function (linear|swing) for the transition, Type: `string`, Default: `swing`
