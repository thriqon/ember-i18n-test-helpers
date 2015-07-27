
/* global define */

define("ember-i18n-test-helpers", ["ember", "ember-test-helpers", "exports"], function (Ember, EmberTestHelpers, exports) {

	Ember = Ember['default'] || Ember;
	var getContext = EmberTestHelpers["getContext"];

	var DO_NOT_INSTANTIATE = {
		instantiate: false
	};

	function mockI18n() {
		var context = getContext();

		var translations = {};

		var t = function tHelper(key, params) {
			var entry = translations[key];
			Ember.assert('Key [' + key + '] should be present in translation table', !!entry);

			return entry(params);
		};

		context.registry.register('service:i18n', {t: t}, DO_NOT_INSTANTIATE);
		context.registry.register('helper:t', t);

		Ember.HTMLBars._registerHelper('t', t);

		return {
			with: function (key, result) {
				Ember.assert('key should be a string', typeof key === "string");
				translations[key] = hoistedToFunction(result);
				return this;
			}
		};
	}

	function hoistedToFunction(x) {
		if (typeof x !== 'function') {
			return function () { return x; };
		} else {
			return x;
		}
	}

	exports.mockI18n = mockI18n;
	exports.hoistedToFunction = hoistedToFunction;
});
