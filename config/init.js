'use strict';

/**
 * Module dependencies.
 */
var glob = require('glob'),
	chalk = require('chalk'),
	curloader = require('../app/controllers/curloader.server.controller.js');

/**
 * Module init function.
 */
module.exports = function() {
	/**
	 * Before we begin, lets set the environment variable
	 * We'll Look for a valid NODE_ENV variable and if one cannot be found load the development NODE_ENV
	 */
	glob('./config/env/' + process.env.NODE_ENV + '.js', {
		sync: true
	}, function(err, environmentFiles) {
		if (!environmentFiles.length) {

			if (process.env.NODE_ENV) {
				console.error(chalk.red('No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
			} else {
				console.error(chalk.yellow('Warning: NODE_ENV is not defined. Using default development environment'));
			}

			process.env.NODE_ENV = 'development';
		}
	});

	var curloaderConfig = {
		timeIntervalInMinutes  : 1
	};

	curloader.init(curloaderConfig);

};
