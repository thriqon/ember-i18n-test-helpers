/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-i18n-test-mock',
	treeFor: function (name) {
		if (name === "vendor") {
			return __dirname + '/src';
		}
	},
	included: function (app) {
		if (app.env !== "production") {
			app.import('vendor/ember-i18n-test-helpers.js', {
				exports: {
					"ember-i18n-test-helpers": [
						"mockI18n",
						"hoistedToFunction"
					]
				},
				type: "test"
			});
		}
	}
};
