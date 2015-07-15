
import { hoistedToFunction } from 'ember-i18n-test-mock';
import { module, test } from 'qunit';

module('Unit - hoisting');

test('hoists a string to a function', function (assert) {
	var h = hoistedToFunction('asd');

	assert.equal(h(), 'asd');
});

test('does not increase function depth on a function', function (assert) {
	var f = function () { return 5; };

	assert.equal(hoistedToFunction(f)(), 5);
});

test('does not change the identity of the function', function (assert) {
	var f = function () { return 5; };

	assert.equal(hoistedToFunction(f), f);
});
