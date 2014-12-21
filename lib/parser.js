var fs = require('fs');

var parser = {
	createJSON: function (data, delimiter, cb) {
		var json = [],
				invalidChars = new RegExp(/( |\:|\;|\(|\))/g);
		data = data.toString().split('\n');

		// remove blank line at end of file
		if (data[data.length-1] === '') {
			data.splice(data.length-1, 1);
		}

		// find tokens for our JSON object
		var tokens = data[0].split(delimiter);
		for (var i = 0; i < tokens.length; i++) {
			tokens[i] = tokens[i].replace(invalidChars, ''); // remove any potential invalid characters from tokens
		};

		for (var i = 1; i < data.length; i++) {
			var toBeSplit = data[i].split(delimiter),
					temp = {};
			for (var j = 0; j < tokens.length; j++) {
				var key = tokens[j].toString(),
						value = toBeSplit[j].toString().replace(/\s(\s*)/g, ' ');
				temp[key] = value;
			}
			// in case the conversation does not have an ID (that is, we got it immediately and it never touched the database)
			if (temp['ConversationID'] === "null") {
				temp['ConversationID'] = temp['SessionID'];
			}
			json.push(temp);
		}
		return cb(null, json);
	},

	parseFile: function (file, delimiter, cb) {
		parser.createJSON(fs.readFileSync(file), delimiter, function (err, json) {
			if (err) {return cb(err);}
			return cb(null, json);
		});
	}
};

module.exports = parser;
