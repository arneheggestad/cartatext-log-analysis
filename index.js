var userInfo = require('./lib/userInfo.js'),
		convoInfo = require('./lib/convoInfo.js'),
		parser = require('./lib/parser.js'),
		express = require('express'),
		app = express(),
		port = process.env.PORT || 8080,
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		fs = require('fs')
	;

// Generate fake user log data
//fakeData(1000);

var convoLog = './logs/2014-12.log',
		path = new RegExp(/(.*\logs\/)(.*)(\.log)/),
		logAnalysisFile = convoLog.replace(path, './analysis/$2ConvoAnalysis.txt')
		;

// set up express
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port);
console.log('Listening for logs on port ' + port);

// routes
app.post('/', function(req, res) {
	var body = req.body;
	console.log(body);
	res.send({ message: 'received' });
});

app.get('/users', function(req, res) {
	parser.parseFile(userLog, ',', function (err, userArray) {
		userInfo.makeObj(userArray, function (err, userObj) {
			if (err) { res.JSON({'error': err}); }
			res.JSON(userObj);
		});
	});	
})

var userLog = './logs/2014.users';


