var userInfo = require('./bin/userInfo.js'),
	fakeData = require('./bin/fakeData.js'),
//	sampleUsers = require('./bin/sampleUsers.js'),
	csv = require('csv-to-json')
	;

//fakeData(1000);

var users = csv.parse('2014.users.fake');
userInfo(users);

// var convos;
// convoInfo(convos);
