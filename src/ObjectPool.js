function ObjectPool () {
	this.pool = [];
}

ObjectPool.prototype.init = function(poolSize, objectToPool) {
	for(var i=0; i<poolSize; i++) {
		this.pool.push({
			obj : new objectToPool()),
			isFree: true
		};
	}
};

ObjectPool.prototype.acquire = function() {
	for(var i=0, l=this.pool.length; i<l; i++) {
		if(this.pool[i].isFree) {
			this.pool[i].isFree = false;
			return this.pool[i];
		}
	}

	return this.upscalePool();
};

ObjectPool.prototype.upscalePool = function(nb) {
	var nb = nb || 1;
	var tmpPool = [];

	for(var i=0; i<nb; i++) {
		tmpPool.push({
			obj : new objectToPool()),
			isFree: true
		};
	}

	this.pool.push(tmpPool);
	return tmpPool[0];
};

ObjectPool.prototype.release = function(obj) {
	for(var i=0, l=this.pool.length; i<l; i++) {
		if(this.pool[i] === obj) {
			this.pool[i].isFree = true;
		}
	}	
};