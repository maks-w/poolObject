function ObjectPool () {
	this._pool = [];
	this._object;
}

ObjectPool.prototype.init = function (poolSize, object) {
	this._pool.length = 0;
	this._object = object;

	for(var i=0; i<poolSize; i++) {
		this._pool.push({
			obj : new Object(object),
			isFree: true,
			id: i
		});
	}
};

ObjectPool.prototype.require = function() {
	for(var i=0, l=this._pool.length; i<l; i++) {
		if(this._pool[i].isFree) {
			this._pool[i].isFree = false;
			return this._pool[i];
		}
	}

	console.error(" :( All objects in the pool are used, you need to add new slots");
	return false;
};

ObjectPool.prototype.addNewSlot = function(nb) {
	nb = nb || 1;
	var object = this._object;
	var poolSize = this._pool.length;

	for(var i=0; i<nb; i++) {
		this._pool.push({
			obj : new Object(object),
			isFree: true,
			id: i + poolSize
		});
	}
};

ObjectPool.prototype.release = function(obj) {
	for(var i=0, l=this._pool.length; i<l; i++) {
		if(this._pool[i].id === obj.id) {
			this._pool[i].isFree = true;
			return this._pool[i];
		}
	}

	console.error(" :( this object is not a object from the pool ");	
};

module.exports = ObjectPool;