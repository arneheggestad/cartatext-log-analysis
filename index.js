var userInfo = require('./lib/userInfo.js'),
		convoInfo = require('./lib/convoInfo.js'),
		parser = require('./lib/parser.js'),
		fs = require('fs')
	;

// Generate fake user log data
//fakeData(1000);

var convoLog = './logs/2014-12.log',
		path = new RegExp(/(.*\logs\/)(.*)(\.log)/),
		logAnalysisFile = convoLog.replace(path, './analysis/$2ConvoAnalysis.txt')
		;

parser.parseFile(convoLog, '\t', function (err, convoLogArray) {
	if (err) { return console.log(err); }
	if (!convoLogArray) { return console.log('no convoLogArray!'); }
	convoInfo.getConvoIDs(convoLogArray, function (err, convoIDs) {
		if (err) { return console.log(err); }
		convoInfo.getTokens(convoLogArray, function (err, tokens) {
			if (err) { return console.log(err); }
			convoInfo.getSessions(convoLogArray, convoIDs, tokens, function (err, convosObj) {
				if (err) { return console.log(err); }
				fs.writeFileSync(logAnalysisFile, JSON.stringify(convosObj, null, '\t'));
				console.log('Success. Analysis written to: ' + logAnalysisFile);
			})
		})
	})
})

var userLog = './logs/2014.users';

parser.parseFile(userLog, ',', function (err, userArray) {
	userInfo.makeObj(userArray, function (err, userObj) {
		console.log(userObj);
	});
});
