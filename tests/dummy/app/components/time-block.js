
import Ember from 'ember';

export default Ember.Component.extend({
	i18n: Ember.inject.service(),

	difference: 0,

	humanizedDifference: Ember.computed('difference', function () {
		if (this.get('difference') === 0) {
			if (this.get('i18n').exists('global.now')) {
				return this.get('i18n').t('global.now');
			} else {
				return 'now';
			}
		} else if (this.get('difference') < 0) {
			if (this.get('i18n').exists('global.ago')) {
				return this.get('i18n').t('global.ago', {seconds: -this.get('difference')});
			} else {
				return `ago this.get('difference')`;
			}
		} else {
			if (this.get('i18n').exists('global.in')) {
				return this.get('i18n').t('global.in', {seconds: this.get('difference')});
			} else {
				return `in this.get('difference')`;
			}
		}
	})
});
