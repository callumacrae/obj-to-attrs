# obj-to-attrs

Turns a JavaScript object into a string containing HTML attributes.


## Install

```
$ npm install --save obj-to-attrs
```


## Usage

```js
var objToAttrs = require('obj-to-attrs');

objToAttrs({
	width: 100,
	height: 100,
	style: 'font-color: red',
	dataFoo: 'bar',
	checked: true
});
//=> width="100" height="100" style="font-color: red" data-foo="bar" checked
```

You can also specify options as a second argument, letting you change the
assignment operator, the quotes used, and and separator between attributes.

```js
var obj = { width: 100, height: 100 };
objToAttrs(obj, {
	assignment: ' = ',
	quote: "'",
	separator: '  '
});
// => width = '100'  height = '100'
```

Finally, it also includes a data attribute helper like in Rails, so you can use
an object to make lots of data attributes.

```js
objToAttrs({
	value: 'test',
	data: {
		foo: 'bar',
		hello: 'world'
	}
});
// => value="test" data-foo="bar" data-hello="world"
```

You can also add your own helpers. It's pretty simple; read the code.


## License

Released under the MIT license.
