var userInfo = require('../lib/userInfo.js'),
		convoInfo = require('../lib/convoInfo.js'),
		parser = require('../lib/parser.js'),
		moment = require('moment')
		;

var currentYear = String(moment().year()),
		currentMonth = String(moment().month() + 1).replace(/^(\d)$/, '0$1'), // nb: moment's months are zero-indexed
		currentUserLog = './logs/' + currentYear + '-users.log',
		currentConvoLog = './logs/' + currentYear + '-' + currentMonth + '-convos.log',
//		demoUserLog = './logs/2014.users',
		demoUserLog = './data/2014.users.decay',
		demoConvoLog = './data/2014-12.log.fake'
		;


// routes
module.exports = function (app) {
	app.get('/', function(req, res) {
		var body = req.body;
		console.log(body);
		res.send({ message: 'received' });
	});

	app.get('/users/:year', function (req, res) {
		var year = req.params.year;
		if (year === 'demo') {
			var userLogName = demoUserLog;
		} else {
			var userLogName = './logs/' + year + '.users';
		}				
		parser.parseFile(userLogName, ',', function (err, userArray) {
			if (err) { return res.status(500).send({ error: err}); }
			userInfo.makeObj(userArray, function (err, userObj) {
				if (err) { return res.status(500).send({ error: err}); }
				res.json(userObj);
			});
		});		
	});

	app.get('/users', function (req, res) {
		parser.parseFile(currentUserLog, ',', function (err, userArray) {
			if (err) { return res.status(500).send({ error: err}); }
			userInfo.makeObj(userArray, function (err, userObj) {
				if (err) { return res.status(500).send({ error: err}); }
				res.json(userObj);
			});
		});
	});

	app.get('/convos/demo', function (req, res) {
		parser.parseFile(demoConvoLog, '\t', function (err, convoArray) {
			convoInfo.getTokens(convoArray, function (err, foundTokens) {
				convoInfo.getConvoIDs(convoArray, function (err, foundConvos) {
					convoInfo.getSessions(convoArray, foundConvos, foundTokens, function (err, convoObj) {
						convoInfo.findSuccess(convoObj, function (err, successes) {
							convoObj.successes = successes;
							res.json(convoObj);
						})
					});
				});
			});			
		});
	});

	app.get('/convos/:year/:month', function (req, res) {
		var year = req.params.year,
				month = req.params.month,
				convoLogName = './logs/' + year + '-' + month + '-convos.log';
		parser.parseFile(convoLogName, '\t', function (err, convoArray) {
			convoInfo.getTokens(convoArray, function (err, foundTokens) {
				convoInfo.getConvoIDs(convoArray, function (err, foundConvos) {
					convoInfo.getSessions(convoArray, foundConvos, foundTokens, function (err, convoObj) {
						res.json(convoObj);
					});
				});
			});			
		});
	});

	app.get('/convos', function (req, res) {
		parser.parseFile(currentConvoLog, '\t', function (err, convoArray) {
				if (err) { return res.status(500).send({ error: err}); }
				convoInfo.getTokens(convoArray, function (err, foundTokens) {
					convoInfo.getConvoIDs(convoArray, function (err, foundConvos) {
						if (err) { return res.status(500).send({ error: err}); }
						convoInfo.getSessions(convoArray, foundConvos, foundTokens, function (err, convoObj) {
							res.json(convoObj);
					});
				});
			});			
		});
	});

}
