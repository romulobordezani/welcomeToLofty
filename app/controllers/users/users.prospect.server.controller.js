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

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;
	var prospect = new Prospect(req.body);


	if( prospect.username ){

		Prospect.findOne( { username : prospect.username }, function (err, prospectFinded ) {

			if (err) {

				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});

				return;

			}

			console.log( prospectFinded )

			if( prospectFinded ){

				res.json(
					prospectFinded
				);

			}


		});

		/*

		prospect.save(function(err) {

			console.log( err );
		});

		 */

	}






	// Add missing user fields
	prospect.displayName = prospect.firstName + ' ' + prospect.lastName;



	for( var userField in req.body ){
		console.log( userField );
	}



	// console.log( req.body );

	/*

	res.json(
		req.body
	);

	*/

};
