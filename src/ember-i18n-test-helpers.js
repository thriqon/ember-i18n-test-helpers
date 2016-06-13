
/* global define */

define("ember-i18n-test-helpers", ["ember", "ember-test-helpers", "exports"], function (Ember, EmberTestHelpers, exports) {

	Ember = Ember['default'] || Ember;
	var getContext = EmberTestHelpers["getContext"];

	var keys = Object.keys || Ember.keys;

	var DO_NOT_INSTANTIATE = {
		instantiate: false
	};


	function mockI18n() {
		var context = getContext();

		var translations = {};
		var defaultValue = null;

		var t = function tHelper(key, params) {
			var entry = translations[key] || defaultValue;
			Ember.assert('Key [' + key + '] should be present in translation table', !!entry);

			return entry(params);
		};

		var exists = function existsHelper(key, params) {
			var entry = translations[key] || undefined;
			return !!entry;
		};

		context.registry.register('service:i18n', {
			t: t,
			exists: exists
		}, DO_NOT_INSTANTIATE);

		if (Ember.Helper && Ember.Helper.helper) {
			context.registry.register('helper:t', Ember.Helper.helper(t), DO_NOT_INSTANTIATE);
		} else {
			Ember.HTMLBars._registerHelper('t', t);
		}

		function _with(key, result, prefix) {
				Ember.assert('key should be a string or an object',
						typeof key === "string" || typeof key === "object");

				if (typeof key === "object") {
					Ember.A(keys(key)).forEach(function (k) {
						if (typeof key[k] === "object") {
							_with(key[k], null, prefix + k + ".");
						} else {
							_with(prefix + k, key[k]);
						}
					});
				} else {
					translations[key] = hoistedToFunction(result);
				}
		}

		return {
			with: function (key, result) {
				_with(key, result, "");
				return this;
			},

			withDefault: function (result) {
				defaultValue = hoistedToFunction(result);
				return this;
			},

			withoutDefault: function () {
				defaultValue = null;
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
