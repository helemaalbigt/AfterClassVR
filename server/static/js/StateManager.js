var Game = {};
var connectionValid = false;
var startRan = false;
var connectedUserId;
var timeConnected;
var userIndex = 0;
var connectedUsers = new Array();

var isPresenter = false;
var askedPermission = false;
var hasPermission = false;

var player = document.querySelector('#player');
var playerPosition;
var tps = [];
var i;

//var askPermission = document.querySelector('#askPermission');
//var revokePermission = document.querySelector('#revokePermission');
//var questionPopup = document.getElementById("player").getElementById("questionPopup");
//var speakingPopUp = document.getElementById("player").getElementById("speakingPopUp");

Game.fps = 10;

//set up user id and the time the user was created
window.onload = function () {
    connectedUserId = RandomString(8);
    timeConnected = new Date().getTime();
    console.log("new user " + connectedUserId + ", created at " + timeConnected);
};

Game.run = function () {
    Game.update();
};

// Start the game loop
Game._intervalId = setInterval(Game.run, 1000 / Game.fps);

//game loop
Game.update = function () {
    if (NAF.connection.isConnected()) {
        //clearInterval(Game._intervalId);

        //console.log("connected " + connectedUserId);
        NAF.connection.broadcastDataGuaranteed("ping", "");
        NAF.connection.subscribeToDataChannel("ping", TestPing);
        NAF.connection.subscribeToDataChannel("pong", TestPong);

        NAF.connection.subscribeToDataChannel("pingConnectedUsers", ReplyToPing);
        NAF.connection.subscribeToDataChannel("pingReply", IncreaseIndex);

        NAF.connection.subscribeToDataChannel("grantPermission", CheckIfCanSpeak);
        NAF.connection.subscribeToDataChannel("revokePermission", CheckIfCanSpeak);
        NAF.connection.subscribeToDataChannel("askPermission", ShowRequest);

        if (connectionValid && !startRan) {
            Start();
        }

        UpdatePermissions();
        UpdateMic();
    }
};

function TestPing() {
    NAF.connection.broadcastDataGuaranteed("pong", "");
}
function TestPong() {
    connectionValid = true;
}


function Start() {
    //console.log("start");
    UpdatePosition();
    GatherPoints();
    ToggleMic(false);
    startRan = true;
    NAF.connection.broadcastDataGuaranteed("pingConnectedUsers", "");
}

function ReplyToPing(e) {
    var userInfo = { uid: connectedUserId, time: timeConnected };
    NAF.connection.broadcastDataGuaranteed("pingReply", userInfo);
}

function IncreaseIndex(message, channel, data) {
    if (connectedUsers.indexOf(data.uid) == -1) {
        connectedUsers.push(data.uid);
        if (data.time < timeConnected) {
            userIndex++;
            UpdatePosition();
        }
    }
    console.log(userIndex);
}

function ToggleMic(value) {
    //console.log("turn mic to "+ value);
    easyrtc.enableMicrophone(value);
}

function RandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function UpdatePermissions() {
    if (userIndex > 0) {
        isPresenter = false;
    } else {
        isPresenter = true;
    }
}

function UpdateMic() {
    if (isPresenter || hasPermission) {
        ToggleMic(true);
    } else {
        ToggleMic(false);
    }
}

function UpdatePosition() {
    if (userIndex < tps.length) {
        playerPosition = player.getAttribute('position');
        console.log(playerPosition);
        player.setAttribute('position', tps[userIndex].getAttribute('position'));
    }
}

function ShowRequest() {
    if (isPresenter) {
       // questionPopup.setAttribute('visible', true);
    }
}

//call when someone clicked on another avatar to ask for permissions or grant them
function ClickedOnOther() {
    if (isPresenter) {
        console.log("clicked on other as presenter");
        NAF.connection.broadcastDataGuaranteed("grantPermission", "");
    } else {
        console.log("clicked on other as student");
        //questionPopup.setAttribute('visible', true);
        NAF.connection.broadcastDataGuaranteed("askPermission", "");
        //change color for the person asking for permission yellow
        askedPermission = true;
    }
}

//call when someone clicked the revoke permissions button
function RevokeSpeakingPermission() {
    if (isPresenter) {
        NAF.connection.broadcastDataGuaranteed("revokePermission", "");
    } 
}

function CheckIfCanSpeak() {
    if (askedPermission) {
        if (!hasPermission) {
            console.log("has talking permission");
            //change color for the person granted permission to green
            //speakingPopUp.setAttribute('visible', true);
            //questionPopup.setAttribute('visible', false);
            hasPermission = true;
        } else {
            console.log("has no permission");
            //speakingPopUp.setAttribute('visible', false);
            //questionPopup.setAttribute('visible', false);
            //change color for the person back to blue
            hasPermission = false;
            askedPermission = true;
        }
    }
}

function RevokeRightToSpeak() {
    console.log("has no permission");
    hasPermission = false;
    askedPermission = true;
}

function GatherPoints() {
    for (i = 0; i <= 9; i++) {
        tps[i] = document.querySelector("#tp0" + i.toString());
    }
}

/*****
Key Bindings
*****/

window.onkeyup = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 38) {
        //console.log("turn mic on");
        ToggleMic(true);
        //NAF.connection.broadcastDataGuaranteed(dataType, data);
    } else if (key == 40) {
        //console.log("turn mic off");
        ToggleMic(false);
    } else if (key == 75) {
        ClickedOnOther();
    } else if (key == 79) {
        RevokeSpeakingPermission();
    }
}