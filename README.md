# jQuery URLive
jQuery URLive lets you easily **create a live preview** of any url base on its *Open Graph* properties and other details, similar to Facebook's post attachment.

It doesn't only work on a `<textarea>` or `<input>` it also works on `<a>` tag and any element with a URL on its content.

[![URLive](http://i.imgur.com/HKp1uDH.png "jQuery URLive")](https://github.com/markserbol/urlive)

## Demo
[View demo](http://markserbol.github.io/urlive/)


## Basic Usage

Include the latest jQuery library together with `jquery.urlive.js` and `jquery.urlive.css` on your documents `<head>`.

After files inclusion, call `urlive()` function on the element with the URL you want to show a preview. And pass the selector of the element that will contain the preview.

````javascript
$(selector).urlive({ container: '.urlive-container' });
````

## Compatibility
Tested on all modern browsers – Chrome, Firefox, Safari, also IE.

## Changelog
- 	v1.0.4 (14 Apr 2014)

	Fixed reserved keyword error on IE

- 	v1.0.3 (23 Mar 2014)

	Fixed CSS and design orientation

- 	v1.0.2 (24 Feb 2014)

	Added callback function `onClick`, add a handler to preview snippet *click* event

- 	v1.0.1 (25 Jan 2014)

	Initial release

## License
jQuery URLive is under [MIT License](http://opensource.org/licenses/MIT)

Detailed usage can be found at [markserbol.github.io/urlive/](http://markserbol.github.io/urlive/). To learn more you can also contact me at my email found on my [Github Profile](https://github.com/markserbol/) or follow me on [Twitter](https://twitter.com/mark_serbol).
