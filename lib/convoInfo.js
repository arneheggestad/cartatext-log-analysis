var fs = require('fs')
		;

var convoInfo = {
  getSessions: function (convoArray, foundConvos, foundTokens, cb) {
    var convosObj = {}
    for (var i = 0; i < foundConvos.length; i++) {
      var convoRef = foundConvos[i];
      for (var key in convoArray) {
        if (convoRef === convoArray[key].ConversationID) {
          var sessID = convoArray[key].SessionID;
          var tmpSess = {}
          for (var j = 0; j < foundTokens.sessionTokens.length; j++) {
            tmpSess[foundTokens.sessionTokens[j]] = convoArray[key][foundTokens.sessionTokens[j]];
          }
          var tmpConvo = {};
          for (var k = 0; k < foundTokens.convoTokens.length; k++) {
            tmpConvo[foundTokens.convoTokens[k]] = convoArray[key][foundTokens.convoTokens[k]];
          }
          if (tmpSess.OurResponse.search(/call CARTA/g) < 0) {
            tmpConvo.success = true;
          } else {
            tmpConvo.success = false;
          };
          if (convosObj[convoRef]) {
            for (convoKey in convosObj[convoRef]) {
              if (parseFloat(convosObj[convoRef][convoKey]) < parseFloat(tmpConvo[convoKey])) {
                convosObj[convoRef][convoKey] = tmpConvo[convoKey];
              }
              convosObj[convoRef].success = tmpConvo.success;
            }
          } else {
            convosObj[convoRef] = tmpConvo;
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
      var convoID = convoArray[i].ConversationID;
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
          if (key.search(/Conv/) < 0 && key.search(/onvo/) < 0 && key != 'tries' && key != 'Tries') {
            sessionTokens.push(key);
          } else {
            convoTokens.push(key);
          }
          allTokens.push(key);
        }
      }
    }
    foundTokens.convoTokens = convoTokens;
    foundTokens.sessionTokens = sessionTokens;
    return cb(null, foundTokens);
  },

  findSuccess: function (convoObject, cb) {
    var result = {},
        maxTries = 1;
    for (var convoID in convoObject) {
      if (convoObject.hasOwnProperty(convoID)) {
        var tries = parseInt(convoObject[convoID].Tries);
        if (tries > maxTries) {
          maxTries = tries;
        }
      }
    };
    for (var i = 1; i <= maxTries; i++) {
      var tmp = {
        success: 0,
        fail: 0
      };
      result[i] = tmp;
    };
    for (var convoID in convoObject) {
      if (convoObject.hasOwnProperty(convoID)) {
        var tries = parseInt(convoObject[convoID].Tries)
            ;
        for (var i = 1; i < tries; i++) {
          result[i].fail++;
        }
        if (convoObject[convoID].success === true) {
          result[i].success++;
        } else {
          result[i].fail++;
        }
      }
    }
    return cb(null, result);
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
