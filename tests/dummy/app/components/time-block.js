
import Ember from 'ember';

export default Ember.Component.extend({
	i18n: Ember.inject.service(),

	difference: 0,

	humanizedDifference: Ember.computed('difference', function () {
		if (this.get('difference') === 0) {
			return this.get('i18n').t('global.now');
		} else {
			return this.get('i18n').t('global.ago', {seconds: -this.get('difference')});
		}
	})
});
