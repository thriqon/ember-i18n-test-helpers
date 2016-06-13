
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

test('it gives service with t() and exists() functions', function (assert) {
	assert.expect(2);

	mockI18n()
		.with('blah', 'test');

	const { t, exists } = getContext().container.lookup('service:i18n');

	assert.ok(exists);
	assert.ok(t);
});

test('it succeed if the environment does contain specified translation', function (assert) {
	assert.expect(2);

	mockI18n()
		.with('blah', 'test');

	const { t, exists } = getContext().container.lookup('service:i18n');

	assert.ok(exists('blah'));
	assert.equal(t('blah'), 'test');
});

test('it fails if the environment does not contain specified translation', function (assert) {
	assert.expect(2);

	mockI18n()
		.with('blah', 'test');

	const { t, exists } = getContext().container.lookup('service:i18n');

	assert.notOk(exists('asd'));
	assert.throws(function () { t('asd'); });
});

test('it gives default answer when configured', function (assert) {
	assert.expect(6);

	mockI18n()
		.with('now', 'JETZT')
		.withDefault('def')
		.with('tomorrow', 'MORGEN');

	const { t, exists } = getContext().container.lookup('service:i18n');

	assert.ok(exists('now'));
	assert.equal(t('now'), 'JETZT', 'uses specific value defined before');
	assert.ok(exists('tomorrow'));
	assert.equal(t('tomorrow'), 'MORGEN', 'uses specific value defined afterwards');
	assert.notOk(exists('asd'));
	assert.equal(t('asd'), 'def');
});

test('it gives new default answer when overwritten', function (assert) {
	assert.expect(2);

	mockI18n()
		.withDefault('def')
		.withDefault('defn');

	const { t, exists } = getContext().container.lookup('service:i18n');

	assert.notOk(exists('asd'));
	assert.equal(t('asd'), 'defn');
});

test('it throws again if default answer is deactivated', function (assert) {
	assert.expect(2);

	mockI18n()
		.withDefault('def')
		.withoutDefault();

	const { t, exists } = getContext().container.lookup('service:i18n');

	assert.notOk(exists('asd'));
	assert.throws(function () { t('asd'); });
});

test('it accepts dotted and nested object key syntax', function (assert) {
	assert.expect(10);

	mockI18n()
		.with('global.later', 'Später')
		.with({
			now: 'JETZT',
			global: {
				yes: 'Ja',
				no: 'Nein'
			},
			"global.maybe": 'vielleicht'
		})
		.with('cancel', 'Abbrechen');

	const { t, exists } = getContext().container.lookup('service:i18n');

	assert.ok(exists('now'));
	assert.equal(t('now'), 'JETZT');
	assert.ok(exists('global.yes'));
	assert.equal(t('global.yes'), 'Ja');
	assert.ok(exists('global.maybe'));
	assert.equal(t('global.maybe'), 'vielleicht');
	assert.ok(exists('global.later'));
	assert.equal(t('global.later'), 'Später');
	assert.ok(exists('cancel'));
	assert.equal(t('cancel'), 'Abbrechen');
});
