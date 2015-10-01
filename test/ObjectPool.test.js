var assert = require('chai').assert;
var should = require('chai').should();
var sinon = require('sinon');
var ObjectPool = require("../src/ObjectPool");

describe('ObjectPool()', function () {

	var objectPool,
		fakeObject = { test: 'test' },
		myObject;
	
	beforeEach(function () {
		objectPool = new ObjectPool();
		objectPool.init(10, fakeObject);
		myObject = objectPool.require();
	});

	describe('init()', function () {
		it('should init the pool', function () {
			objectPool.should.have.property('_pool').with.length(10);
		});

	});

	describe('require()', function () {
		it('should return a free object', function () {
			myObject.should.exist;
			myObject.should.have.property('isFree').equal(false);
		});

		it('should have 1 used object in the pool', function () {
			var nbUsedObject = 0;
			for(var i=0, l=objectPool._pool.length; i<l; i++) {
				if(objectPool._pool[i].isFree === false) {
					nbUsedObject++;
				}
			}

			nbUsedObject.should.equal(1);
		});

		it('should return false if no free objects are availaible in the pool', function () {
			var requireObject;
			while(requireObject = objectPool.require()) {}
			requireObject.should.equal(false);
		})
	});

	describe('addNewSlot()', function () {
		it('should upscale the pool to 11 object', function() {
			objectPool.addNewSlot();
			objectPool._pool.length.should.equal(11);
		});

		it('should upscale the pool to 15 object', function() {
			objectPool.addNewSlot(5);
			objectPool._pool.length.should.equal(15);
		});
	});

	describe('release()', function () {
		it('should release object from the pool', function () {
			myObject2 = objectPool.require();			
			var releaseObj = objectPool.release(myObject);
			releaseObj.id.should.equal(myObject.id);
			releaseObj.isFree.should.equal(true);
		});

		it('should not release unknown object from the pool', function () {
			var myObject3 = new Object({fakeObject: 'fake'});
			releaseObj = objectPool.release(myObject3);
			assert(!releaseObj);
		})
	});
});