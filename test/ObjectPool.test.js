var should = require('chai').should();
var sinon = require('sinon');
var ObjectPool = require("../src/ObjectPool");

describe('ObjectPool()', function () {
	
	var objectPool = new ObjectPool();
	var fakeObject = sinon.stub;
	objectPool.initPool(10, fakeObject);

	describe('init()', function () {
		it('should init the pool', function () {
			objectPool.should.have.property('pool').with.length(10);
		});

	});

	var myObject = objectPool.require();

	describe('require()', function () {
		it('should return a free object', function () {
			myObject.should.exist;
			myObject.should.have.property('isFree').equal(false);
		});

		it('should have 1 used object in the pool', function () {
			var nbUsedObject = 0;
			for(var i=0, l=objectPool.pool.length; i<l; i++) {
				if(objectPool.pool[i].isFree === false) {
					nbUsedObject++;
				}
			}

			nbUsedObject.should.equal(1);
		});
	});
});