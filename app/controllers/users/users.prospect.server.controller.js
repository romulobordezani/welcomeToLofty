'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Prospect = mongoose.model('Prospect');


/**
 * Update user details
 */
exports.prospect = function(req, res) {

	console.log( '--------------------------------------------------------------------------' );

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;
	var prospect = new Prospect(req.body);
	var session = req.session;

	console.log( 'session.alreadyProspected', session.alreadyProspected );

	if( prospect.username && session.alreadyProspected ){

		Prospect.findOne( { 'username' : prospect.username }, function (err, prospectFound) {

			if (err) {
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
				return;
			}

			if( prospectFound ){

				console.log( 'if prospectFound ', prospectFound );

				session.alreadyProspected = prospectFound._id;

				res.json(
					prospectFound
				);

			}else{

				console.log( 'else' );

				session.alreadyProspected = null;

				prospect.save(function(err){
					console.log( err );
				});

				res.json(
					req.body
				);

			}

		});



	}









	// Add missing user fields
	//prospect.displayName = prospect.firstName + ' ' + prospect.lastName;




	// console.log( req.body );

	/*

	res.json(
		req.body
	);

	*/

};
