'use strict';

/**
 * Module dependencies.
 */
var  errorHandler = require('./errors.server.controller'),
	http = require('http'),
	catchedContent = '',
	_ = require('lodash');


/**
 * Catch page via CURL
 */
exports.catch = function(req, response) {

	var options = {
		host: 'www.lofty.com',
		port: 80,
		path: '/about-lofty',
		method: 'GET'
	};

	var curl = http.request(options, function(res) {

		res.setEncoding('utf8');

		catchedContent = '';

		res.on('data', function (data) {
			catchedContent += data;
		});

		res.on('end', function() {
			response.send(catchedContent);
		});

	}).on('error', function(e) {
		console.log('Problems Loading Lofty Page: ' + e.message);
	}).end();

};
