var fs = require('fs');

var parser = {
	createJSON: function (data, delimiter, cb) {
		var json = [];
		var invalidChars = new RegExp(/( |\:|\;|\(|\))/g);
		data = data.toString().split('\n');

		var tokens = data[0].split(delimiter);
		for (var i = 0; i < tokens.length; i++) {
			tokens[i] = tokens[i].replace(invalidChars, '');
		};

		for (var i = 1; i < data.length; i++) {
			var toBeSplit = data[i].split(delimiter);
			var temp = {};
			for (var j = 0; j < tokens.length; j++) {
				var key = tokens[j].toString();
				var value = toBeSplit[j].toString().replace(/\s(\s*)/g, ' ');
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
			return cb(null, json);
		});
	}
};

module.exports = parser;
