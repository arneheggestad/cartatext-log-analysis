var userInfo = require('./bin/userInfo.js'),
	fakeData = require('./bin/fakeData.js'),
//	sampleUsers = require('./bin/sampleUsers.js'),
	csv = require('csv-to-json')
	;

//fakeData(1000);

var fakeUsers = csv.parse('./data/2014.users.fake');
userInfo(fakeUsers);

// var convos;
// convoInfo(convos);
