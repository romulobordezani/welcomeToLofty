'use strict';

var http = require('http'),
	catchedContent = '',
    fs = require('fs'),
	swig = require('swig'),
	curloaderConfig = require('../../config/curloader.js'),
	curloaderInterval;


/**
 * Private Methods
 * @param options curloader.js optios
 * @returns string path to save the final File
 */

function getPath(options){

	var staticFilesDir = __dirname;
	staticFilesDir = staticFilesDir.replace( /\\app\\controllers/, '' ); // Clean the Node Server dir
	staticFilesDir = staticFilesDir.replace( /\\/, '/' ); // Replacing slashes
	staticFilesDir = staticFilesDir.replace( /([A-Z]\:\/)/, '/' ); // Clean up Windows Drives
	staticFilesDir = staticFilesDir + '/public/statics/' + options.finalFileName; // Adds the right folder and increments the finalFileName option

	return staticFilesDir;

}



function writeFile(content, options){


	var staticFilesDir = getPath(options);

	fs.writeFile( staticFilesDir, '', function(err) {
		if(err) {
			return console.log(err);
		}
	});

	fs.writeFile( staticFilesDir, content, function(err) {

		if(err) {
			return console.log(err);
		}

		console.log('Curloader - ', options.finalFileName, ': file reloaded successfuly');

	});

}


function loadURL(options){

	http.request(options, function(res) {

		res.setEncoding('utf8');

		catchedContent = '';

		res.on('data', function (data) {
			catchedContent += data;
		});

		res.on('end', function() {
			writeFile(catchedContent, options);
		});

	}).on('error', function(e) {
		console.log('Problems Loading Lofty Page: ' + e.message);
	}).end();

}


function readList(){

	for( var i = 0; i < curloaderConfig.urlsToCatchAndCache.length; i++ ){
		loadURL( curloaderConfig.urlsToCatchAndCache[i] );
	}

}


function setcurloaderInterval(timeIntervalInMinutes){
	curloaderInterval = setInterval(readList, timeIntervalInMinutes);
}


/**
 * Catchs pages and save them in static files
 * */
exports.init = function(config) {

	readList();
	config = config || {};
	var timeIntervalInMinutes = config.timeIntervalInMinutes * 60000 || ( 5 * 66000 );
	setcurloaderInterval( timeIntervalInMinutes );

};
