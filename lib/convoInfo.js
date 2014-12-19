var fs = require('fs')
		;

var convoInfo = {
  getSessions: function (convoArray, foundConvos, foundTokens, cb) {
    var convosObj = {}
    for (var i = 0; i < foundConvos.length; i++) {
      var convoRef = foundConvos[i];
      for (var key in convoArray) {
        if (convoRef === convoArray[key].convoID) {
          var sessID = convoArray[key].sessionID;
          var tmpSess = {
            sessionStart: convoArray[key].sessionStart,
            sessionLength: convoArray[key].sessionLength,
            query: convoArray[key].query,
            querySansBus: convoArray[key].querySansBus,
            definitiveStop: convoArray[key].definitiveStop,
            matchedStops: convoArray[key].matchedStops,
            filteredStops: convoArray[key].filteredStops,
            culledStops: convoArray[key].culledStops,
            duplicateStops: convoArray[key].duplicateStops,
            reasonForConvo: convoArray[key].reasonForConvo,
            ourResponse: convoArray[key].response
          };
          var tmp = {
            convoStart: convoArray[key].convoStart,
            convoLength: convoArray[key].totalConvoLength,
            tries: convoArray[key].tries
          }
          if (tmpSess.ourResponse.search(/call CARTA/g) < 0) {
            tmp.success = true;
          } else {
            tmp.success = false;
          };
          if (convosObj[convoRef]) {
            convosObj[convoRef].convoLength = tmp.convoLength;
            convosObj[convoRef].tries = tmp.tries;
            convosObj[convoRef].success = tmp.success;
          } else {
            convosObj[convoRef] = tmp;
          }
          convosObj[convoRef][sessID] = tmpSess;
        };
      };
    };
    return cb(null, convosObj);
  },

  getConvoIDs: function (convoArray, cb) {
    if (typeof(convoArray) != 'object') { return cb('cannot process convoArray', null); }
    var foundConvos = [];
    for (var i = 0; i < convoArray.length; i ++) {
      var convoID = convoArray[i].convoID;
      if (foundConvos.indexOf(convoID) < 0) {
        foundConvos.push(convoID);
      };
    }
    return cb(null, foundConvos);
  },

  getTokens: function (convoArray, cb) {
    var foundTokens = {},
        allTokens = [],
        convoTokens = [],
        sessionTokens = [];
    for (var i = 0; i < convoArray.length; i++) {
      for (var key in convoArray[i]) {
        if (allTokens.indexOf(key) < 0) {
          if (key.search(/onvo/) < 0) {
            sessionTokens.push(key);
          } else {
            convoTokens.push(key);
          }
          allTokens.push(key);
        } else {
          console.log('Old token: ' + key);
        }
      }
    }
    foundTokens.convoTokens = convoTokens;
    foundTokens.sessionTokens = sessionTokens;
    return cb(null, foundTokens);
  }
};

module.exports = convoInfo;

var convoSchema = {
	convoID: {
    convoStartTime: '',
    totalConvoLength: '',
    tries: '',
    success: true,
    sessionID: {
      sessionStartTime: '',
      sessionLength: '',    
      query: '',
      querySansBus: '',
      definitiveStop: '',
      matchedStops: '',
      filteredStops: '',
      culledStops: '',
      duplicateStops: '',
      reasonForConvo: '',
      ourResponse: ''
    }
  }
}
