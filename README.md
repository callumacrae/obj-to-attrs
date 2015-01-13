# obj-to-args

Turns a JavaScript object into a string containing HTML attributes.


## Install

```
$ npm install --save obj-to-args
```


## Usage

```js
var objToArgs = require('obj-to-args');

objToArgs({
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
objToArgs(obj, {
	assignment: ' = ',
	quote: "'",
	separator: '  '
});
// => width = '100'  height = '100'
```

Finally, it also includes a data attribute helper like in Rails, so you can use
an object to make lots of data attributes.

```js
objToArgs({
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
