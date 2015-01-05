var fs = require('fs');

var fakeUserData = function (users) {
	var callerID = "";
	var possible = "0123456789abcdef";
	var fakeUsers = "userID,uses";
	for (var j = 0; j < users; j++) {
		for (var i = 0; i < 48; i++) {
		  callerID += possible.charAt(Math.floor(Math.random() * possible.length));
  	};
    var fakeUses = expDecay(Math.random() * 9) + 1;
    fakeUsers += '\n' + callerID + ',' + fakeUses;
    callerID = "";
	}
  fs.writeFileSync('./data/2014.users.decay', fakeUsers);
};

module.exports = fakeUserData;

var expDecay = function (x) {
	var y = 300 * Math.pow( Math.E, (-1 * x) );
	y = Math.round(y);
	return y;
}
