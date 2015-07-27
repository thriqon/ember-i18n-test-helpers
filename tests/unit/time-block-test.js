
import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

import { mockI18n } from 'ember-i18n-test-helpers';

moduleForComponent('time-block', {
	unit: true,

	beforeEach() {
		mockI18n()
			.with('global.now', 'NOW')
			.with('global.ago', params => 'AGO_' + params.seconds);
	}
});

// ...

test('is returning difference with ago if difference is -10', function (assert) {
	assert.expect(1);

	var component = this.subject();
	Ember.run(component, 'set', 'difference', -10);

	assert.equal(component.get('humanizedDifference'), 'AGO_10');
});

test('is returning now if difference is 0', function (assert) {
	assert.expect(1);

	var component = this.subject();
	Ember.run(component, 'set', 'difference', 0);

	assert.equal(component.get('humanizedDifference'), 'NOW');
});


import hbs from 'htmlbars-inline-precompile';

moduleForComponent('time-block', {
	integration: true,

	beforeEach() {
		mockI18n()
			.with('global.now', 'NOW')
			.with('global.ago', params => 'AGO_' + params.seconds)
			.with('global.introduction', 'INTRO');
	}
});

test('is displaying an introduction and then now if difference is 0', function (assert) {
	assert.expect(1);

	this.render(hbs`{{time-block difference=0}}`);

	assert.equal(this.$().text().trim(), "INTRO NOW");
});

