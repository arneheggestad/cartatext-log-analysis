

exports.createJSON = function (data, delimiter) {
	var json = [];

	data = data.toString().split('\n');
//	console.log(data);

	var tokens = data[0].split(delimiter);
//	console.log(tokens);

	for (var i = 1; i < data.length; i++) {
		var toBeSplit = data[i].split(delimiter);
//		console.log(toBeSplit);
		var temp = {};
		for (var j = 0; j < tokens.length; j++) {
			var key = tokens[j].toString();
			var value = toBeSplit[j].toString();
			temp[key] = value;
		}
		json.push(temp);
	}
//	console.log(json);
	return json;
}

