var fs = require('fs');

var stats = {
  classifyUsage: function (users) {
    var usageArr = [];
    users = users.sort(function (a, b) {
      return b.uses - a.uses;
    });
    var maxUsage = parseInt(users[0].uses);
    var count = 0;
    for (var i = 0; i < users.length; i++) {
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
  }
}

var userInfo = function (users) {
  users = users.sort(function (a, b) {
    return b.uses - a.uses;
  });
  var len = users.length;
  var max = users[0].uses;
  var min = users[len-1].uses;

  var sumUses = 0;
  for (var i = 0; i < len; i++) {
    sumUses += parseInt(users[i].uses);
  };

  var mean = sumUses/len-1;
  var medianUser = Math.round((len-1)/2);
  var median = parseInt(users[medianUser].uses);

  var logFile = './analysis/userAnalysis.txt';
  var log = 'Unique users: ' + len + '\n'
            + 'Total uses: ' + sumUses + '\n'
            + 'Mean usage: ' + mean + '\n'
            + 'Median usage: ' + median + '\n'
            + 'Usage range: ' + min + ' - ' + max + '\n'
            ;
  stats.classifyUsage(users);
  console.log(log);
  fs.writeFileSync(logFile,log);
}

module.exports = userInfo;
