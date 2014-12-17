var should = require('should'),
    fs = require('fs'),
    parser = require('../lib/parser.js')
    ;

var csvTest = 'userID,uses\n631ff8e68339d6dc1eb7038e81ee8a7d569487e7b65b1c3b,137';
var tokensTest = ['userID','uses'];
var csvResult = {'userID': '631ff8e68339d6dc1eb7038e81ee8a7d569487e7b65b1c3b', 'uses': '137'};

// parse CSV data
describe('csv', function () {

  it('should split data on newline into an array', function (done) {
    parser.createJSON(csvTest,',', function (parsedData) {
      parsedData.should.be.an.array;
      done();
    });
  });

})

var tsvTest = 'Conversation ID\tSession ID\tConversation Start Time\tSession Start Time\tSession Length (ms)\tTries\tTotal Conversation Length\tQuery\tOur Response\tRoute No\tQuery Sans Bus\tDefinitive Stop\tMatched Stops\tFiltered Stops\tCulled Stops\tDuplicate Stops\tReason for Convo\n7b347fa9-b0eb-4ea5-a735-92e37f640f01\t7b347fa9-b0eb-4ea5-a735-92e37f640f01\tFri Dec 05 2014 09:44:23 GMT-0500 (EST)\tFri Dec 05 2014 09:44:23 GMT-0500 (EST)\t57\t1\t57 milliseconds.\t shuttle broad and 4th\tOne Downtown Shuttle headed to Shuttle Park South is arriving at 4th and Broad St now; three more in 6m, 14m, 23m. Four headed to Shuttle Park North will arrive in 3m, 11m, 20m, 27m\tSHUTTLE\tshuttle broad and 4th\t789\t789, 1537, 1598\t789, 1537\t789\t{"789":1537}\t ';

// parse TSV data
describe('tsv', function () {
  it('should split data on newline into an array', function (done) {
    parser.createJSON(tsvTest,'\t', function (parsedData) {
      parsedData.should.be.an.array;
      done();
    });
  });
  it('should strip invalid characters in key names', function (done) {
    parser.createJSON(tsvTest, '\t', function (parsedData) {
      parsedData[0].ConversationID.should.equal('7b347fa9-b0eb-4ea5-a735-92e37f640f01');
      done();
    })
  })
})

// return JSON
describe('return JSON', function () {
  it('should return an object', function (done) {
    parser.createJSON(csvTest, ',', function (parsedData) {
      parsedData.should.be.type('object');
      done();
    });
  });
  it('should be the correct object', function (done) {
    parser.createJSON(csvTest, ',', function (parsedData) {
      parsedData[0].uses.should.equal('137');
      done();
    });
  })
})

// handle files
describe('file handling', function () {
})