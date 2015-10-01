function Character () {
	this.characters = ['#', '@', '&', '§', '!', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	this.charElem = document.createElement('div');
	this.charElem.innerHTML = this.characters[0];
	this.currentId = 0;
}

Character.prototype.update = function() {
	this.currentId += 1;
	this.charElem.innerHTML = this.characters[this.currentId % 15];
};

init();

var position = {x: 0, y: 0};

function init () {
	this.character = new Character();
	var sceneElem = document.querySelector('#scene');
	console.log(this.character.charElem.text);
	sceneElem.appendChild(this.character.charElem);
	this.start();
}

function start () {
	requestAnimationFrame(loop);
}

function loop () {
	this.character.update();
	requestAnimationFrame(loop);
}

//function addCharacterOnScene (event) {
//	var sceneElem = document.querySelector('#scene');
//	sceneElem.appendChild(charElem);
//}