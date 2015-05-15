'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport');
	//User = mongoose.model('Prospect');

/**
 * Update user details
 */
exports.prospect = function(req, res) {

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	for( var userField in req.body ){
		console.log( userField );
	}

	// console.log( req.body );

	res.json(
		req.body
	);

};
