var	express = require('express'),
		app = express(),
		port = process.env.PORT || 8080,
		morgan = require('morgan'),
		bodyParser = require('body-parser')
	;

// Generate fake user log data
//fakeData(1000);

// set up express
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./lib/routes.js')(app);

app.listen(port);
console.log('Listening for logs on port ' + port);
