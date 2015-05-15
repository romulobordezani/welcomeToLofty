'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {

	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	// Setting up the users authentication api
	app.route('/prospect').post(users.prospect);


};
