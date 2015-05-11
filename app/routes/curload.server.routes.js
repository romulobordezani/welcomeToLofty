'use strict';

/**
 * Module dependencies.
 */
var curload = require('../../app/controllers/curload.server.controller');

module.exports = function(app) {
	app.route('/curload')
		.get(curload.catch);

};
