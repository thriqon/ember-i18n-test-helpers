
import { getContext } from 'ember-test-helpers';

import Ember from 'ember';

export var MockService = Ember.Object.extend({
	translationTable: null,

});

export function mockI18n() {
	const context = getContext();

	var translations = {};

	var tHelper = function t(key, params) {
		let entry = translations[key];
		Ember.assert(`Key [${key}] should be present in translation table`, !!entry);

		return entry(params);
	};

	context.registry.register('service:i18n', {
		t: tHelper
	}, {
		instantiate: false
	});
	context.registry.register('helper:t', tHelper);

	Ember.HTMLBars._registerHelper('t', tHelper);

	return {
		with(key, result) {

			translations[key] = hoistedToFunction(result);

			return this;
		}
	};
}

export function hoistedToFunction(x) {
	if (typeof x !== 'function') {
		return function () { return x; };
	} else {
		return x;
	}
}
