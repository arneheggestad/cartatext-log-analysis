var should = require('should'),
		fakeData = require('../lib/fakeData.js')
		;

describe('create fake exponential decay usage data', function () {
	fakeData(1000);
})