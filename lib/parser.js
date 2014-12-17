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
				var value = toBeSplit[j].toString();
				temp[key] = value;
			}
			json.push(temp);
		}
		return cb(json);
	},

	parseFile: function (file, delimiter, cb) {
		parser.createJSON(fs.readFileSync(file), delimiter, function (json) {
			cb(json);
		});
	}
};

module.exports = parser;
