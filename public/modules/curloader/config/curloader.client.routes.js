'use strict';

// Setting up route
angular.module('curloader').config(['$stateProvider',
	function($stateProvider) {

		// Curloader routing
		$stateProvider.
			state('curloader', {
				url: '/curloader',
				templateUrl: 'http://localhost:3000/curload'
			});

	}
]);
