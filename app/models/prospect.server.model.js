'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	// return ((this.provider !== 'local' && !this.updated) || property.length);
	return (property.length) ;
};


/**
 * Prospect Schema
 */
var ProspectSchema = new Schema({

	firstName: {
		type: String,
		trim: true,
		default: ''
	},

	lastName: {
		type: String,
		trim: true,
		default: ''
	},

	displayName: {
		type: String,
		trim: true
	},

	email: {
		type: String,
		trim: true,
		default: ''
	},

	username: {
		type: String,
		unique: 'Username already exists',
		trim: true
	},

	updated: {
		type: Date
	},

	created: {
		type: Date,
		default: Date.now
	}

});


/**
 * Find possible not used username
 */
ProspectSchema.statics.findUniqueUsername = function(username, suffix, callback) {

	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne(

		{
			username: possibleUsername
		},

		function(err, user) {

			if (!err) {
				if (!user) {
					callback(possibleUsername);
				} else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			} else {
				callback(null);
			}

		}

	);
};

mongoose.model('Prospect', ProspectSchema);
