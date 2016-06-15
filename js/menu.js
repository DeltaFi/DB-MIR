//**************************************
// Dragos Rotaru April 20, 2016
// DoctorBondage.com
// Menu overlay and settings code
//**************************************

/* Preload Images*/
$(window).load(function () {
  var background = getRandomInt(nbackgrounds);
  var temp = new Image();
  temp.src = "backgrounds/background" + background.toString() + ".gif)";
  image = temp;
});

$("#info-btn").on("click", function toggleInfo() {
  $("#info-overlay").toggleClass("show");
  $("#info-btn").toggleClass("show");
});

//**************************************
// User visualization settings
//**************************************

//Extend the range of the random function past the number of images available by the nothingness factor to produce emptiness
var nothingness = document.getElementById("nothingness");
var nothingnessFactor = 2.0;

nothingness.onchange = function () {
  var nothingnessValue = nothingness.value;
  switch (true) {
  case (nothingnessValue == 0):
    nothingnessFactor = 1.0;
    break;
  case (nothingnessValue == 1):
    nothingnessFactor = 1.1;
    break;
  case (nothingnessValue == 2):
    nothingnessFactor = 1.2;
    break;
  case (nothingnessValue == 3):
    nothingnessFactor = 1.3;
    break;
  case (nothingnessValue == 4):
    nothingnessFactor = 1.4;
    break;
  case (nothingnessValue == 5):
    nothingnessFactor = 1.5;
    break;
  case (nothingnessValue == 6):
    nothingnessFactor = 1.6;
    break;
  case (nothingnessValue == 7):
    nothingnessFactor = 1.7;
    break;
  case (nothingnessValue == 8):
    nothingnessFactor = 1.8;
    break;
  case (nothingnessValue == 9):
    nothingnessFactor = 1.9;
    break;
  case (nothingnessValue == 10):
    nothingnessFactor = 2.0;
    break;
  case (nothingnessValue == 11):
    nothingnessFactor = 2.1;
    break;
  case (nothingnessValue == 12):
    nothingnessFactor = 2.2;
    break;
  case (nothingnessValue == 13):
    nothingnessFactor = 2.3;
    break;
  case (nothingnessValue == 14):
    nothingnessFactor = 2.4;
    break;
  case (nothingnessValue == 15):
    nothingnessFactor = 2.5;
    break;
  case (nothingnessValue == 16):
    nothingnessFactor = 2.6;
    break;
  case (nothingnessValue == 17):
    nothingnessFactor = 2.7;
    break;
  case (nothingnessValue == 18):
    nothingnessFactor = 2.8;
    break;
  case (nothingnessValue == 19):
    nothingnessFactor = 2.9;
    break;
  case (nothingnessValue == 20):
    nothingnessFactor = 3.0;
    break;
  default:
    nothingnessFactor = 2.0;
    break;
  }
  var extendedNImages = Math.floor(nImages * nothingnessFactor);
  var extendedNTops = Math.floor(nTops * nothingnessFactor);
};

//BPM Multipliers for gif timing.
var multiplierBackground = document.getElementById("multiplierBackground");
var multiplierBackgroundFactor = 1.0;
var multiplierTop = document.getElementById("multiplierTop");
var multiplierTopFactor = 1.0;
var multiplierLeft = document.getElementById("multiplierLeft");
var multiplierLeftFactor = 1.0;
var multiplierRight = document.getElementById("multiplierRight");
var multiplierRightFactor = 1.0;

multiplierBackground.onchange = function () {
  var multiplierBackgroundValue = multiplierBackground.value;
  switch (true) {
  case (multiplierBackgroundValue == 0):
    multiplierBackgroundFactor = 0.25;
    break;
  case (multiplierBackgroundValue == 1):
    multiplierBackgroundFactor = 0.5;
    break;
  case (multiplierBackgroundValue == 2):
    multiplierBackgroundFactor = 1.0;
    break;
  case (multiplierBackgroundValue == 3):
    multiplierBackgroundFactor = 2.0;
    break;
  case (multiplierBackgroundValue == 4):
    multiplierBackgroundFactor = 4.0;
    break;
  case (multiplierBackgroundValue == 5):
    multiplierBackgroundFactor = 8.0;
    break;
  }
};
multiplierTop.onchange = function () {
  var multiplierTopValue = multiplierTop.value;
  switch (true) {
  case (multiplierTopValue == 0):
    multiplierTopFactor = 0.25;
    break;
  case (multiplierTopValue == 1):
    multiplierTopFactor = 0.5;
    break;
  case (multiplierTopValue == 2):
    multiplierTopFactor = 1.0;
    break;
  case (multiplierTopValue == 3):
    multiplierTopFactor = 2.0;
    break;
  case (multiplierTopValue == 4):
    multiplierTopFactor = 4.0;
    break;
  case (multiplierTopValue == 5):
    multiplierTopFactor = 8.0;
    break;
  }
};
multiplierLeft.onchange = function () {
  var multiplierLeftValue = multiplierLeft.value;
  switch (true) {
  case (multiplierLeftValue == 0):
    multiplierLeftFactor = 0.25;
    break;
  case (multiplierLeftValue == 1):
    multiplierLeftFactor = 0.5;
    break;
  case (multiplierLeftValue == 2):
    multiplierLeftFactor = 1.0;
    break;
  case (multiplierLeftValue == 3):
    multiplierLeftFactor = 2.0;
    break;
  case (multiplierLeftValue == 4):
    multiplierLeftFactor = 4.0;
    break;
  case (multiplierLeftValue == 5):
    multiplierLeftFactor = 8.0;
    break;
  }
};
multiplierRight.onchange = function () {
  var multiplierRightValue = multiplierRight.value;
  switch (true) {
  case (multiplierRightValue == 0):
    multiplierRightFactor = 0.25;
    break;
  case (multiplierRightValue == 1):
    multiplierRightFactor = 0.5;
    break;
  case (multiplierRightValue == 2):
    multiplierRightFactor = 1.0;
    break;
  case (multiplierRightValue == 3):
    multiplierRightFactor = 2.0;
    break;
  case (multiplierRightValue == 4):
    multiplierRightFactor = 4.0;
    break;
  case (multiplierRightValue == 5):
    multiplierRightFactor = 8.0;
    break;
  }
};

//**************************************
// Soundcloud streaming
//**************************************

SC.initialize({
  client_id: 'f779495a78ca840a61a1f499d830f11e'
});

$("soundcloud-connect-btn").on("click", function soundcloudConnect() {
  SC.connect().then(function () {
    $("#soundcloudconnectmessage").toggleClass("show");
    $("#soundcloud-connect-btn").toggleClass("hide");
  });
});

$("soundcloud-disconnect-btn").on("click", function soundcloudDisconnect() {

});

//**************************************
// File Upload
//**************************************

var dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

fileselect.onchange = function () {
  var files = this.files;
  handleFiles(files);
};

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var objectURL = URL.createObjectURL(file);
    addToPlaylist(file.name, objectURL);
  }
  $("#uploadComplete").toggleClass("show");
}
