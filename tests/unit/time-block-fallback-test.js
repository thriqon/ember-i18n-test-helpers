
import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('time-block', {
	unit: true
});

test('is returning difference with ago fallback if difference is -10', function (assert) {
	assert.expect(1);

	var component = this.subject();
	Ember.run(component, 'set', 'difference', -10);

	assert.equal(component.get('humanizedDifference'), 'ago -10');
});

test('is returning now fallback if difference is 0', function (assert) {
	assert.expect(1);

	var component = this.subject();
	Ember.run(component, 'set', 'difference', 0);

	assert.equal(component.get('humanizedDifference'), 'now');
});

test('is returning difference with in fallback if difference is 5', function (assert) {
	assert.expect(1);

	var component = this.subject();
	Ember.run(component, 'set', 'difference', 5);

	assert.equal(component.get('humanizedDifference'), 'in 5');
});

import hbs from 'htmlbars-inline-precompile';
import { mockI18n } from 'ember-i18n-test-helpers';

moduleForComponent('time-block', {
	integration: true,

	beforeEach() {
		mockI18n()
			.with('global.introduction', 'INTRO');
	}
});

test('is displaying an introduction and then ago fallback if difference is -10', function (assert) {
	assert.expect(1);

	this.render(hbs`{{time-block difference=-10}}`);

	assert.equal(this.$().text().trim(), "INTRO ago -10");
});


test('is displaying an introduction and then now fallback if difference is 0', function (assert) {
	assert.expect(1);

	this.render(hbs`{{time-block difference=0}}`);

	assert.equal(this.$().text().trim(), "INTRO now");
});

test('is displaying an introduction and then in fallback if difference is 5', function (assert) {
	assert.expect(1);

	this.render(hbs`{{time-block difference=5}}`);

	assert.equal(this.$().text().trim(), "INTRO in 5");
});
