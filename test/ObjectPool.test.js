var expect = require('chai').expect;
var ObjectPool = require("../src/ObjectPool");

describe('ObjectPool()', function () {
	
	it('shoud be a Singleton', function () {
		var ObjectPool1 = ObjectPool.getInstance(),
			ObjectPool2 = ObjectPool.getInstance();

		console.log(ObjectPool1);

		expect(ObjectPool1).to.deep.equal(ObjectPool2);
	});

});