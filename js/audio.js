//**************************************
// Dragos Rotaru April 20, 2016
// Visualization code using Web Audio API
// DoctorBondage.com
//**************************************

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var audio = document.getElementById("sound");
var source = audioCtx.createMediaElementSource(audio);
var gainNode = audioCtx.createGain();
var analyser = audioCtx.createAnalyser();
var threshold = 0;
var decay = 0.998;

analyser.fftSize = 2048;
analyser.smoothingTimeConstant = 0.1;
var frequencyBinCount = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);

source.connect(analyser);
analyser.connect(gainNode);
gainNode.connect(audioCtx.destination);

//number of images in each category, respectively.
var nImages = 82;
var nTops = 97;
var nbackgrounds = 175;

backgroundsrc = [];
//extended range for foreground gifs

var extendedNImages = Math.floor(nImages * nothingnessFactor);
var extendedNTops = Math.floor(nTops * nothingnessFactor);

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function updateBackground() {
if (backgroundsrc.length < 5) {
    for (var i = 0; i < 5; i++) {
        var background = getRandomInt(nbackgrounds);
        backgroundsrc.push("url(backgrounds/background" + background.toString() + ".gif)");
        $('#preload').css("background-image", "url(backgrounds/background" + background.toString() + ".gif)");
    }
    $('#background').css("background-image", backgroundsrc.shift());

} else {
    $('#background').css("background-image", backgroundsrc.shift());
}
}

function updateTop() {
  var top = getRandomInt(extendedNTops);
  if (top <= nTops) {
    $('#top').css("background-image", "url(top/image" + top.toString() + ".gif)");
  }
}

function updateLeft() {
  var left = getRandomInt(extendedNImages);
  if (left <= nImages) {
    $('#left').css("background-image", "url(images/image" + left.toString() + ".gif)");
  }
}

function updateRight() {
  var right = getRandomInt(extendedNImages);
  if (right <= nImages) {
    $('#right').css("background-image", "url(images/image" + right.toString() + ".gif)");
  }
}

function draw() {
  analyser.getByteFrequencyData(frequencyData);
  var bass = 0;
  for (var i = 0; i < frequencyBinCount; i++) {
    bass = bass + frequencyData[i];
  }
  var bassmean = bass / frequencyBinCount;
  if (bassmean * bassmean > threshold) {
    preloadStop = true;
    threshold = bassmean * bassmean;
    updateBackground();
    updateRight();
    updateTop();
    updateLeft();
  } else {
    threshold = threshold * decay;
  }
}
