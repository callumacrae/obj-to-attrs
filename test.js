'use strict';

var test = require('tape');
var objToArgs = require('./');

test('obj-to-args', function (t) {
	t.plan(12);

	// Test basic attributes and boolean attributes
	t.equal(objToArgs({ value: 'test' }), 'value="test"');
	t.equal(objToArgs({ value: 'test', foo: 'bar' }), 'value="test" foo="bar"');
	t.equal(objToArgs({ dataSomething: 'a' }), 'data-something="a"');
	t.equal(objToArgs({ checked: true }), 'checked');
	t.equal(objToArgs({ checked: true, value: 'a' }), 'checked value="a"');

	// Test data helper
	t.equal(objToArgs({ data: { foo: 'bar' }}), 'data-foo="bar"');

	// Test setting options
	t.equal(objToArgs({ data: { foo: 'bar' }, checked: false }, {
		assignment: ' => ', quote: "'", separator: ', '
	}), "data-foo => 'bar', checked");

	// Test adding custom helpers
	objToArgs.addHelper('upper', function (val) {
		return val.toUpperCase();
	});

	t.equal(objToArgs({ upper: 'test' }), 'TEST');

	// Test removing custom helpers
	objToArgs.removeHelper('upper');

	t.equal(objToArgs({ upper: 'test' }), 'upper="test"');


	// More random tests
	t.equal(objToArgs({
		width: 100, height: 100, style: 'font-color: red', dataFoo: 'bar'
	}), 'width="100" height="100" style="font-color: red" data-foo="bar"');

	var obj = { width: 100, height: 100 };
	t.equal(
		objToArgs(obj, { assignment: ' = ', quote: "'", separator: '  ' }),
		"width = '100'  height = '100'"
	);

	t.equal(
		objToArgs({ value: 'test', data: { foo: 'bar', hello: 'world' }}),
		'value="test" data-foo="bar" data-hello="world"'
	);
});

