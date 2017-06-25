//<script src="js/talk-actions.js"></script> 
//onclick = "AskToTalk();">
/*
<script src="https://npmcdn.com/aframe-template-component@3.1.1"></script>

        <a-entity id="test"> 
        <a-sphere id="iAmTalk"
                        color="green"
                        position="-1 1 0"
                        scale="0.2 0.1 0.1"
                        visible = "true"
                        event-set__1="_event: mousedown; scale: .25 .15 .15; color: white"
                        event-set__2="_event: mouseup; scale: .2 .1 .1; color: green"
                        event-set__3="_event: mouseenter; scale: .25 .15 .15; color: white"
                        event-set__4="_event: mouseleave; scale: .2 .1 .1; color: green"       
                        </a-sphere>
                    <a-sphere id="iAmQuestion"
                        color="yellow"
                        visible = "true"
                        position="0 1 0"
                        scale="0.2 0.1 0.1">       
                        </a-sphere>
                    <a-sphere id="comradeQuestion"
                        color="red"
                        visible = "true"
                        position="1 1 0"
                        scale="0.2 0.1 0.1">       
                        </a-sphere>
        </a-entity>
        <a-entity obj-model="obj: #avatar01-obj; mtl: #avatar01-mtl" scale = "0.1 0.1 0.1" position= "2 4 2"></a-entity>
        */


var isPresenter = true;
var wantsToTalk = false;
var stoodUp = false;

var player = document.querySelector('#player');
var heightShift = document.querySelector('#heightShift');

var playerPosition;

var questionPopup = document.getElementById("questionPopup");
var speakingPopUp = document.getElementById("speakingPopUp");

//var iAmTalk = document.querySelector('#iAmTalk');
//var iAmQuestion = document.querySelector('#iAmQuestion');
//var comradeQuestion = document.querySelector('#comradeQuestion');

//hoping these get covered in the index
//iAmTalk.addEventListener('mouseenter', changeColor);
//iAmTalk.addEventListener('mouseleave', changeBack);



start();

function start() {

	//iAmTalk.setAttribute('visible', true);
	//iAmQuestion.setAttribute('visible', true);
	//comradeQuestion.setAttribute('visible', true);
	
	//if your ID is a certain thing at the beginning
	//if (true) {
		//isPresenter= true;
	//}

	//then if you click on stuff or someone clicks on you, isPresenter and wantsToTalk toggle true/false

	if (isPresenter) {
		wantsToTalk = false;
		//iAmTalk.setAttribute('visible', true);
		//iAmQuestion.setAttribute('visible', false);
		//comradeQuestion.setAttribute('visible', false);
	}
	/*
	if (wantsToTalk) {
		isPresenter = false;
		iAmTalk.setAttribute('visible', false);
		iAmQuestion.setAttribute('visible', true);
	} */
	if (!wantsToTalk && !isPresenter) {
		isPresenter = false;
		//iAmTalk.setAttribute('visible', false);
		//iAmQuestion.setAttribute('visible', false);
	}
	
	document.body.onkeyup = function (e) {
		//open bracket
        if (e.keyCode == 219) {
            isPresenter = !isPresenter;
        }
		//close bracket
        if (e.keyCode == 221) {
            wantsToTalk = !wantsToTalk;
        }
		//Tab
        if (e.keyCode == 9) {
            //backPano();
            SitDown();
        }
		//Spacebar
        if (e.keyCode == 32) {
            StandUp();
        }
    }
}

function AskToTalk () {
	//send message to Presenter you clicked on and let them know you would like to speak, sets their comradeQuestion visibility to true and:
    //wantsToTalk = true;
    ClickedOnOther();
}

function StandUp() {
    if (!stoodUp) {
        stoodUp = true;
        playerPosition = player.getAttribute('position');
        player.setAttribute('position', {x: playerPosition.x, y: 1.7, z: playerPosition.z});
        speakingPopup.setAttribute('visible', false);
        ClickedOnOther();
    } else {
        stoodUp = false;
        playerPosition = player.getAttribute('position');
        player.setAttribute('position', {x: playerPosition.x, y: 1.4, z: playerPosition.z});
        ClickedOnOther();
    }
}

