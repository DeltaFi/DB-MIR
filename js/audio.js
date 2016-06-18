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
var decay = 0.995;

analyser.fftSize = 1024;
analyser.smoothingTimeConstant = 0.1;
var frequencyBinCount = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);

source.connect(analyser);
analyser.connect(gainNode);
gainNode.connect(audioCtx.destination);

//number of images
var nbackgrounds = 195;

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function updateBackground() {
  var background = getRandomInt(nbackgrounds);
  $('#background').css("background-image", "url(backgrounds/background" + background.toString() + ".gif)");

}

function draw() {
  analyser.getByteFrequencyData(frequencyData);
  var freqSum = 0;
  for (var i = 0; i < frequencyBinCount; i++) {
    freqSum = freqSum + frequencyData[i];
  }
  var freqMean = freqSum / frequencyBinCount;
  if (freqMean * freqMean > threshold) {
    threshold = freqMean * freqMean;
    updateBackground();
  }
  threshold = threshold * decay;
}
