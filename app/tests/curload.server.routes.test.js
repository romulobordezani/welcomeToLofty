'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	agent = request.agent(app);


describe('CURLoad tests', function() {

	it('should be able to load a Loftys page synchronously', function(done) {

		agent.get('/curloader')
			.expect(404)
			.end( function(curloadErr, curloadRes ) {

				if(curloadErr){
					done(curloadErr);
				}

				done(curloadRes);

			});

		agent.get('/curload')
			.expect(200)
			.end( function(curloadErr, curloadRes ) {
				done(curloadRes);
			});

		done();

	});

});
