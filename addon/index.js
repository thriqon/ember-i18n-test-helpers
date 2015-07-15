
import { getContext } from 'ember-test-helpers';

import Ember from 'ember';

const DO_NOT_INSTANTIATE = {
	instantiate: false
};

export function mockI18n() {
	const context = getContext();

	var translations = {};

	let t = function tHelper(key, params) {
		let entry = translations[key];
		Ember.assert(`Key [${key}] should be present in translation table`, !!entry);

		return entry(params);
	};

	context.registry.register('service:i18n', {t}, DO_NOT_INSTANTIATE);
	context.registry.register('helper:t', t);

	Ember.HTMLBars._registerHelper('t', t);

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
