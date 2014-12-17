var userInfo = require('./lib/userInfo.js'),
	convoInfo = require('./lib/convoInfo.js'),
	fakeData = require('./lib/fakeData.js'),
//	sampleUsers = require('./bin/sampleUsers.js'),
	parser = require('./lib/parser.js')
	;

// Generate fake user log data
//fakeData(1000);

// Process user log data
var fakeUsers = parser.parseFile('./data/2014.users.fake', ',', function (fakeUsers) {
	userInfo(fakeUsers);
});

// process convo log
var fakeLog = parser.parseFile('./data/2014-12.log.fake', '\t', function (fakeConvos) {
	convoInfo(fakeConvos);
});
