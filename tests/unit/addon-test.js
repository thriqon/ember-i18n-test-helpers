
import { hoistedToFunction, mockI18n } from 'ember-i18n-test-helpers';
import { module } from 'qunit';
import { moduleFor, test } from 'ember-qunit';
import { getContext } from 'ember-test-helpers';

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

moduleFor('template:application');

test('it fails if the environment does not contain specified translation', function (assert) {
	assert.expect(2);

	mockI18n()
		.with('blah', 'test');

	let t = getContext().container.lookup('service:i18n').t;
	assert.ok(t);

	assert.throws(function () { t('asd'); });
});

test('it gives default answer when configured', function (assert) {
	assert.expect(3);

	mockI18n()
		.with('now', 'JETZT')
		.withDefault('def')
		.with('tomorrow', 'MORGEN');

	let t = getContext().container.lookup('service:i18n').t;

	assert.equal(t('now'), 'JETZT', 'uses specific value defined before');
	assert.equal(t('tomorrow'), 'MORGEN', 'uses specific value defined afterwards');
	assert.equal(t('asd'), 'def');
});

test('it gives new default answer when overwritten', function (assert) {
	assert.expect(1);

	mockI18n()
		.withDefault('def')
		.withDefault('defn');

	let t = getContext().container.lookup('service:i18n').t;

	assert.equal(t('asd'), 'defn');
});

test('it throws again if default answer is deactivated', function (assert) {
	assert.expect(2);

	mockI18n()
		.withDefault('def')
		.withoutDefault();

	let t = getContext().container.lookup('service:i18n').t;
	assert.ok(t);

	assert.throws(function () { t('asd'); });
});

