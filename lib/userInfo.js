var fs = require('fs');

var userInfo = {
  classifyUsage: function (userArray, cb) {
    var usageArr = [];
    userArray = userArray.sort(function (a, b) {
      return b.uses - a.uses;
    });
    var maxUsage = parseInt(userArray[0].uses),
        count = 0;
    for (var i = 0; i < userArray.length; i++) {
      if (parseInt(userArray[i].uses) < maxUsage) {
        usageArr.push([count, maxUsage]);
        maxUsage = parseInt(userArray[i].uses);
        count = 1;
      } else {
        count += 1;
      };
    };
    usageArr.push([count, maxUsage]);
    return cb(null, usageArr);
  },

  makeObj: function (userArray, cb) {
    var userObj = {};
    userArray = userArray.sort(function (a, b) {
      return b.uses - a.uses;
    });
    userObj.userCount = userArray.length;
    userObj.maxUse = userArray[0].uses;
    userObj.minUse = userArray[userObj.userCount - 1].uses;
    userObj.sumUses = 0;

    for (var i = 0; i < userObj.userCount; i++) {
      userObj.sumUses += parseInt(userArray[i].uses);
    };

    userObj.meanUse = userObj.sumUses / userObj.userCount;
    var medianUser = Math.round((userObj.userCount - 1) / 2);
    userObj.medianUse = parseInt(userArray[medianUser].uses);
    userInfo.classifyUsage(userArray, function (err, usageArr) {
      if (err) { return cb(err, null); }
      if (usageArr) {
        userObj.usage = usageArr;
      }
      return cb(null, userObj);
    })

  }
}

module.exports = userInfo;
