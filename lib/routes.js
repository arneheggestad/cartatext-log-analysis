var userInfo = require('../lib/userInfo.js'),
		convoInfo = require('../lib/convoInfo.js'),
		parser = require('../lib/parser.js')
		;

var defaultUserLog = './logs/2014.users',
		defaultConvoLog = './data/2014-12.log.fake'
		;


// routes
module.exports = function (app) {
	app.get('/', function(req, res) {
		var body = req.body;
		console.log(body);
		res.send({ message: 'received' });
	});

	app.get('/users', function (req, res) {
		parser.parseFile(defaultUserLog, ',', function (err, userArray) {
			userInfo.makeObj(userArray, function (err, userObj) {
				if (err) { res.json({'error': err}); }
				res.json(userObj);
			});
		});
	});

	app.get('/convos', function (req, res) {
		parser.parseFile(defaultConvoLog, ',', function (err, userArray) {

		})
	})
}
