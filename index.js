var userInfo = require('./bin/userInfo.js'),
	convoInfo = require('./bin/convoInfo.js'),
	fakeData = require('./bin/fakeData.js'),
//	sampleUsers = require('./bin/sampleUsers.js'),
	csv = require('csv-to-json')
	;

// Generate fake user log data
//fakeData(1000);

// Process user log data
//var fakeUsers = csv.parse('./data/2014.users.fake');
//userInfo(fakeUsers);

// process convo log
var fakeLog = csv.parse('./data/2014-12.log.fake');
convoInfo(fakeLog);

