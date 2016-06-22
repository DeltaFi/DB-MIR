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
var decay = 0.9993;

analyser.fftSize = 1024;
analyser.smoothingTimeConstant = 0.8;
var frequencyBinCount = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);

source.connect(analyser);
analyser.connect(gainNode);
gainNode.connect(audioCtx.destination);

//number of images
var nbackgrounds = 176;
var imageUrls = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function loadImage()
{
    var url = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".gif";
    var img = new Image();
    img.src = url;
    imageUrls.push(url);
    console.log("GIF Buffer Length: " + imageUrls.length + " New URL: " + url);
}


function display(){
    $('#background').css("background-image", "url(" + imageUrls.shift().toString() + ")");
}

function draw() {
  analyser.getByteFrequencyData(frequencyData);
  var subSum = 0;
  var bassSum = 0;
  var midSum = 0;
  var trebSum = 0;
  subSum = frequencyData[0] + frequencyData[1];
  bassSum = frequencyData[2] + frequencyData[3] + frequencyData[4] + frequencyData[5];
  for (var i = 6; i < 100; i++) {
    midSum = midSum + frequencyData[i];
  }
  for (var i = 100; i < frequencyBinCount; i++) {
    midSum = midSum + frequencyData[i];
  }
  var freqsubMean = subSum / 2;
  var freqbassMean = bassSum / 4;
  var freqmidMean = midSum / 93;
  var freqtrebMean = trebSum / 412;
  var freqweightedMean = freqsubMean + 2 * freqbassMean + freqmidMean + freqtrebMean;
  if (freqweightedMean * freqweightedMean > threshold) {
    threshold = freqweightedMean * freqweightedMean;
    loadImage();
    display();
  }
  threshold = threshold * decay;
}


for (var i = 0; i < 4; i++){
    loadImage();
}
