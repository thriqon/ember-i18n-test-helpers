module.exports = {
	scenarios: [
	{
		name: 'default',
		dependencies: { }
	},
	{
		name: 'ember-release',
		dependencies: {
			'ember': 'components/ember#release'
		},
		resolutions: {
			'ember': 'release'
		}
	},
	{
		name: 'ember-beta',
		dependencies: {
			'ember': 'components/ember#beta'
		},
		resolutions: {
			'ember': 'beta'
		}
	},
	{
		name: 'ember-canary',
		dependencies: {
			'ember': 'components/ember#canary'
		},
		resolutions: {
			'ember': 'canary'
		}
	},
	{
		name: 'ember-1-12-0',
		dependencies: {'ember': 'components/ember#1.12.0'}
	},
	{
		name: 'ember-1-12-1',
		dependencies: {'ember': 'components/ember#1.12.1'}
	},
	{
		name: 'ember-1-13-0',
		dependencies: {'ember': 'components/ember#1.13.0'}
	},
	{
		name: 'ember-1-13-1',
		dependencies: {'ember': 'components/ember#1.13.1'}
	},
	{
		name: 'ember-1-13-2',
		dependencies: {'ember': 'components/ember#1.13.2'}
	},
	{
		name: 'ember-1-13-3',
		dependencies: {'ember': 'components/ember#1.13.3'}
	},
	{
		name: 'ember-1-13-4',
		dependencies: {'ember': 'components/ember#1.13.4'}
	},
	{
		name: 'ember-1-13-5',
		dependencies: {'ember': 'components/ember#1.13.5'}
	},
	{
		name: 'ember-1-13-6',
		dependencies: {'ember': 'components/ember#1.13.6'}
	},
	{
		name: 'ember-2-0-0',
		dependencies: {'ember': 'components/ember#2.0.0'},
		resolutions: { 'ember': '2.0.0' }
	}
	]
};
