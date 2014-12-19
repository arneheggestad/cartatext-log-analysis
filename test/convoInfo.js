var should = require('should'),
    convoInfo = require('../lib/convoInfo.js')
    ;

var convoArray = require('./data/2014-12-fakeLog.js'),
		getConvoIDResult = [ 
			'7b347fa9-b0eb-4ea5-a735-92e37f640f01',
		  '1b7b542f-9dae-4525-9ff9-9c6e40b6adba',
		  'c217cecc-ca58-4f7a-86ef-b9c54abf7179',
		  '5dfc6500-0377-4aa0-95cf-d8835e6fd1b3',
		  'cd1a5db8-a0b1-4265-b838-15ff1d5ef6fd',
		  '1cde68a5-5273-4c93-b5e4-44020a437e8d',
		  'a7073831-b8c3-4fd8-8609-c6ee5d9e95d4',
		  '20d51062-dd00-418f-9045-ff6627d42079',
		  '33bc1abb-b24e-4b28-8e03-d15a8f07d06a' ],
	  getTokensResult = {
		  'convoTokens': [ 
		  	'ConversationID',
	    	'ConversationStartTime',
		    'Tries',
		    'TotalConversationLength',
		    'ReasonforConvo' ],
		  'sessionTokens': [
		    'SessionID',
	      'SessionStartTime',
	      'SessionLengthms',
	      'Query',
	      'OurResponse',
	      'RouteNo',
	      'QuerySansBus',
	      'DefinitiveStop',
	      'MatchedStops',
	      'FilteredStops',
	      'CulledStops',
	      'DuplicateStops' ] }

describe('convo log testing', function () {
	it('should return an array of convo IDs', function (done) {
		convoInfo.getConvoIDs(convoArray, function (err, foundConvos) {
			foundConvos.length.should.eql(9);
			console.log(err);
			done();
		});
	});
	it('should find tokens for a log', function (done) {
		convoInfo.getTokens(convoArray, function (err, tokens) {
			tokens.should.eql(getTokensResult);
			done();
		});
	});
	it('should return an object of the conversations', function (done) {
		convoInfo.getSessions(convoArray, getConvoIDResult, getTokensResult, function (err, convosObj) {
			done();
		});
	});
	it('putting it all together', function (done) {
		convoInfo.getConvoIDs(convoArray, function (err, foundConvos) {
			convoInfo.getTokens(convoArray, function (err, foundTokens) {
				convoInfo.getSessions(convoArray, foundConvos, foundTokens, function (err, convoObj) {
					console.log(convoObj);
					done();
				})
			})
		})
	})
});