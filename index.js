'use strict';

var _ = require('lodash');

var boolean = 'checked,compact,declare,defer,disabled,ismap,multiple,nohref,' +
	'noresize,noshade,nowrap,readonly,selected';

/**
 * Turns a JavaScript object into a string containing HTML attributes.
 *
 * @param {object} object The object to turn into attributes.
 * @param {object} options Allows you to configure stuff. See README or code.
 * @returns {string} Returns an HTML attribute string!
 */
function objToAttrs(object, options) {
	options = _.merge({}, {
		assignment: '=',
		quote: '"',
		separator: ' '
	}, options);

	return _.map(object, function (value, argument) {
		// If a helper is available, use that
		if (typeof helpers[argument] === 'function') {
			var helped = helpers[argument](value);
			return (typeof helped === 'object') ? objToAttrs(helped, options) : helped;
		}

		// Turn dataTest into data-test
		argument = argument.replace(/[A-Z]/g, function (letter) {
			return '-' + letter.toLowerCase();
		});

		// If it's a boolean attribute, we don't need =""
		if (boolean.indexOf(argument) !== -1) {
			return argument;
		}

		// argument="value"
		var quote = options.quote;
		return argument + options.assignment + quote + value + quote;
	}).join(options.separator);
}

var helpers = {};

/**
 * Adds a helper for a certain attribute.
 *
 * @param {string} name Name of the attribute to call the helper on.
 * @param {function} helper The helper function, which should return either an
 * 							object to be turning into a string or a string.
 * @returns {objToAttrs} Returns itself to allow method chaining.
 */
objToAttrs.addHelper = function (name, helper) {
	helpers[name] = helper;
	return this;
};

/**
 * Removes a helper for a certain attribute.
 *
 * @param {string} name Name of the attribute to remove the helper for.
 * @returns {objToAttrs} Returns itself to allow method chaining.
 */
objToAttrs.removeHelper = function (name) {
	delete helpers[name];
	return this;
};

// A default helper to turn `data: { foo: 'bar' }` into `data-foo="bar"`
objToAttrs.addHelper('data', function (argument) {
	var newObject = {};

	_.each(argument, function (value, name) {
		newObject['data-' + name] = value;
	});

	return newObject;
});

module.exports = objToAttrs;