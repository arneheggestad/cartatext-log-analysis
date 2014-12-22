var should = require('should'),
    userInfo = require('../lib/userInfo.js')
    testUserArray = require('./data/2014-fakeUsers.js')
    ;

describe('makeObject', function () {
	it('should be an object', function (done) {
		userInfo.makeObj(testUserArray, function (err, userObj) {
			(typeof(userObj)).should.equal('object');
			done();
		});
	});
	it('should return 1000 users', function (done) {
		userInfo.makeObj(testUserArray, function (err, userObj) {
			userObj.count.should.equal(1000);
			done();
		});
	});
	
})