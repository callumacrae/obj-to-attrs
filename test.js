'use strict';

var test = require('tape');
var objToAttrs = require('./');

test('obj-to-attrs', function (t) {
	t.plan(12);

	// Test basic attributes and boolean attributes
	t.equal(objToAttrs({ value: 'test' }), 'value="test"');
	t.equal(objToAttrs({ value: 'test', foo: 'bar' }), 'value="test" foo="bar"');
	t.equal(objToAttrs({ dataSomething: 'a' }), 'data-something="a"');
	t.equal(objToAttrs({ checked: true }), 'checked');
	t.equal(objToAttrs({ checked: true, value: 'a' }), 'checked value="a"');

	// Test data helper
	t.equal(objToAttrs({ data: { foo: 'bar' }}), 'data-foo="bar"');

	// Test setting options
	t.equal(objToAttrs({ data: { foo: 'bar' }, checked: false }, {
		assignment: ' => ', quote: "'", separator: ', '
	}), "data-foo => 'bar', checked");

	// Test adding custom helpers
	objToAttrs.addHelper('upper', function (val) {
		return val.toUpperCase();
	});

	t.equal(objToAttrs({ upper: 'test' }), 'TEST');

	// Test removing custom helpers
	objToAttrs.removeHelper('upper');

	t.equal(objToAttrs({ upper: 'test' }), 'upper="test"');


	// More random tests
	t.equal(objToAttrs({
		width: 100, height: 100, style: 'font-color: red', dataFoo: 'bar'
	}), 'width="100" height="100" style="font-color: red" data-foo="bar"');

	var obj = { width: 100, height: 100 };
	t.equal(
		objToAttrs(obj, { assignment: ' = ', quote: "'", separator: '  ' }),
		"width = '100'  height = '100'"
	);

	t.equal(
		objToAttrs({ value: 'test', data: { foo: 'bar', hello: 'world' }}),
		'value="test" data-foo="bar" data-hello="world"'
	);
});

