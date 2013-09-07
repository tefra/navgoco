[![{:navgoco}](https://github.com/tefra/navgoco/raw/master/demo/navgoco.jpg)](http://www.komposta.net/article/navgoco)


# {:navgoco} [![Build Status](https://travis-ci.org/tefra/navgoco.png?branch=master)](https://travis-ci.org/tefra/navgoco)

Navgoco is a simple JQuery plugin which turns a nested unordered list of links
into a beautiful vertical multi-level slide navigation, with ability to preserve
expanded sub-menus between sessions by using cookies and optionally act as an accordion
menu.

**[Demo](http://apps.komposta.net/jquery/navgoco/demo)** | **[Homepage](http://www.komposta.net/article/navgoco)**

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

Sample menu html and activation code:
```html
<script type="text/javascript">
	$(document).ready(function() {
		$('.nav').navgoco();
	});
</script>
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
  * **Type:** `string`
  * **Default:** `<span class="caret"></span>`

Raw html appended into parent links:
`<a href="#link">Item<span class="carent"></span></a>`

#### accordion
  * **Type:** `boolean`
  * **Default:** `false`

Enable accordion mode.

----------

#### openClass:
  * **Type:** `string`
  * **Default:** `open`

CSS class to be added in open parent li.

----------

#### save:
  * **Type:** `boolean`
  * **Default:** `true`

Preserve expanded sub-menus between session. If jquery.cookie is not included it will be automatically turned off.

----------

#### cookie:
  * **Type:** `object`
    * `name`: Cookie name
      * *Type:* `string`
      * *Default:* `navgoco`
    * `expires`: Lifespan in days, `false` makes it a session cookie
      * *Type:* `integer|false`
      * *Default:* `false`
    * `path`: Path where cookie is valid
      * *Type:* `string`
      * *Default:* `/`

----------

#### slide:
  * **Type:** `object`
    * `duration`: Slide duration in milliseconds
      * *Type:* `integer`
      * *Default:* `400`
    * `easing`:	Slide easing function (linear|swing) for the transition
      * *Type:* `string`
      * *Default:* `swing`


## Callbacks
With the options you can also pass callback functions to extend the plugin's functionality.

#### onClickBefore:
This callback is executed before the plugin's main procedure when clicking links.
 * **Parameters**
   * `Event`: `Event Object`
   * `Submenu`: False if the clicked link is a leaf or the next `sub-menu` if link is a branch.

----------

#### onClickAfter:
This callback is executed after the plugin's main procedure when clicking links.
 * **Parameters**
   * `Event`: `Event Object`
   * `Submenu`: `False` if the clicked link is a leaf or the next `sub-menu` if link is a branch.

----------

#### onToggleBefore:
This callback is executed before the plugin's main procedure when toggling sub-menus.
 * **Parameters**
   * `Submenu`: `JQuery Object`
   * `Opening`: `True|False` the submenu is opening or closing

----------

This callback is executed after the plugin's main procedure when toggling sub-menus.
 * **Parameters**
   * *Submenu:* `JQuery Object`
   * *Opened:* `True|False` the submenu opened or closed

## Public Methods

#### toggle
Manually open or close sub-menus.

  * Parameters:
    * `boolean`: Show or hide
    * `Variable list of indexes`: If omitted toggles **all sub-menus**
      *  `integer`
      *  `...`
      *  `integer`

```js
// Show|Hide all sub-menus
$(selector).navgoco('toggle', true|false);
```

```js
// Show|Hide sub-menus with specific indexes
// It will also open parent sub-menus since v0.1.2
$(selector).navgoco('toggle', true|false, 1, 2, ...);
```

----------

#### destroy
Destroy instances and unbind events.

```js
// I can't think of any other use except for testing...
$(selector).navgoco('destroy');
```

## Contributing

#### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.**

#### Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI is installed by running `grunt --version`.  If the command isn't found, run `npm install -g grunt-cli`.  For more information about installing Grunt, see the [getting started guide](http://gruntjs.com/getting-started).

1. Fork and clone the repo.
1. Run `npm install` to install all dependencies (including Grunt).
1. Run `grunt` to grunt this project.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing is broken.

#### Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Add failing tests for the change you want to make. Run `grunt` to see the tests fail.
1. Fix stuff.
1. Run `grunt` to see if the tests pass. Repeat steps 2-4 until done.
1. Open `test/*.html` unit test file(s) in actual browser to ensure tests pass everywhere.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.