var tps = [];

document.querySelector('#teleportPoint');
var i;

  

var player = document.querySelector('#player');
var newPos;

//tP.addEventListener('mouseenter', changeColor);
//tP.addEventListener('mouseleave', changeBack);
var goToCandidate = tP;

//tP.addEventListener('mouseenter', IsCandidate(tP));

tP.addEventListener('click', GoTo(tP));

function Start() {
	for (i = 0; i <= 5; i++) {
        tps[i] = document.querySelector("#tP0" + i.toString());
        tps[i].addEventListener('mouseenter', changeColor(tsp[i]));
    }
}

function GoTo(location) {
    newPos = location.getAttribute('position');
    player.setAttribute('position', newPos);
    console.log(goToCandidate);
    //console.log(tP.getAttribute('position'));
}

function IsCandidate(candidate) {
	goToCandidate = candidate;
	console.log(candidate);
	//candidate.setAttribute('color', yellow);
	//var COLORS = ['red', 'green', 'blue'];
	//var randomIndex = Math.floor(Math.random() * COLORS.length);
    candidate.setAttribute('material', 'color', "yellow");
}

function changeColor () {
    cursor.setAttribute('material', 'color: yellow; shader: flat');
    cursor.setAttribute('scale', '1.5 1.5 1.5');
}

