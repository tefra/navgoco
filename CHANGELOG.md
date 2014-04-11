## Changelog

**v0.2.1** (April 11, 2014)
 * Fixed issue #13
 * Fixed issue #12
 * Updated documentation and demo

**v0.2.0** (March 9, 2014)
 * Added ability to have parent links with proper links
  * Parent links with `href` equal to `''` or `#` toggle submenus as they used to.
  * To toggle parent links with normal `href` you now have to click the caret/arrow
 * Added option `caretHtml` to insert custom html in the caret markup.
  * `caret` option was removed to since it's not optional anymore. Default caret markup: `<span></span>`
 * Updated demo css to opt for css content attribute instead of borders to create the arrow effects.
 * Updated documentation.

**v0.1.5** (September 7, 2013)
 * Added callback methods: onClickBefore, onClickAfter, onToggleBefore, onToggleAfter
 * Updated readme & demo.

**v0.1.4** (September 1, 2013)
 * Improve accordion mode to close sub-menus when clicking menu links without children.
 * Updated readme to correct a false statement.
 * Updated qunit tests, fixtures & demo.

**v0.1.3** (July 11, 2013)

* Small changes to improve performance and usability
* Updated default settings to be accessible `$.fn.navgoco.defaults.save = false;`
* Updated documentation and demo
* Updated tests

**v0.1.2** (July 9, 2013)

* Updated toggle procedure to open parent sub-menus
* Added code documentation
* Added qunit tests

----------

**v0.1.1** (July 8, 2013)

* Replaced public methods expand|collapse with new **toggle**
* Replaced `.data()` uses with `.attr('data-xxxx)`
* Added method destroy to clear instances and unbind events
* Added comments header to minified version
* Added banner image to project
* Code cleanup
* Updated demo

----------

**v0.1.0** (July 5, 2013)

* First Release