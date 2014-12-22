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
      if (parseInt(users[i].uses) < maxUsage) {
        usageArr.push({ 'count': count,
                        'uses': maxUsage });
        maxUsage = users[i].uses;
        count = 1;
      } else {
        count += 1;
      };
    };
    usageArr.push({ 'count': count,
                    'uses': maxUsage });
    var usageLog = "user count,uses";
    for (var j = 0; j < usageArr.length; j++) {
      usageLog += '\n' + usageArr[j].count + ',' + usageArr[j].uses;
    }
    fs.writeFileSync('./analysis/usageDistribution.csv',usageLog);
  },

  makeObj: function (userArray, cb) {
    var userObj = {};
    userArray = userArray.sort(function (a, b) {
      return b.uses - a.uses;
    });
    userObj.count = userArray.length;
    userObj.maxUse = userArray[0].uses;
    userObj.minUse = userArray[userObj.count - 1].uses;
    userObj.sumUses = 0;

    for (var i = 0; i < userObj.count; i++) {
      userObj.sumUses += parseInt(userArray[i].uses);
    };

    userObj.mean = userObj.sumUses / userObj.count;
    var medianUser = Math.round((userObj.count - 1) / 2);
    userObj.medianUse = parseInt(userArray[medianUser].uses);

    return cb(null, userObj);
  }
}

module.exports = userInfo;
