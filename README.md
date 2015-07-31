# Ember-i18n-test-helpers

[![Build Status](https://travis-ci.org/thriqon/ember-i18n-test-helpers.svg?branch=master)](https://travis-ci.org/thriqon/ember-i18n-test-helpers) [![Ember Observer Score](http://emberobserver.com/badges/ember-i18n-test-helpers.svg)](http://emberobserver.com/addons/ember-i18n-test-helpers)

Components etc. in Ember make regular use of translated contents, either
calculated in code or accessed in templates.
Conceptually, these units expect a translation service to be made
available to them as part of their usage contract to be actually testable.

A fully integrated and configured translation service such as `ember-i18n`
using real translations can't be considered a unit test, it's more of an integration
test.

This library gives you helper functions to provide a mocked translation service for
your tests, making them both more readable and less brittle to changing translations.

## Usage

    ember install ember-i18n-test-helpers

then you can do:

```javascript

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

test('is displaying difference with ago if difference is -10', function (assert) {
	assert.expect(1);

	var component = this.subject();
	Ember.run(component, 'set', 'difference', -10);

	assert.equal(component.get('humanizedDifference'), 'AGO_10');
});


test('is displaying now if difference is 0', function (assert) {
	assert.expect(1);

	var component = this.subject();
	Ember.run(component, 'set', 'difference', 0);

	assert.equal(component.get('humanizedDifference'), 'NOW');
});
```


## Contributing

* `git clone` this repository
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
