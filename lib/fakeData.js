var fs = require('fs');

var fakeUserData = function (users) {
	var callerID = "";
	var possible = "0123456789abcdef";
	var fakeUsers = "userID,uses";
	for (var j = 0; j < users; j++) {
		for (var i = 0; i < 48; i++) {
		  callerID += possible.charAt(Math.floor(Math.random() * possible.length));
  	};
    var fakeUses = Math.floor(Math.random()*250)+1
    fakeUsers += '\n' + callerID + ',' + fakeUses;
    callerID = "";
	}
  fs.writeFileSync('2014.users.fake', fakeUsers);
};

module.exports = fakeUserData;