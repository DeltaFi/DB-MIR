//**************************************
// Dragos Rotaru April 20, 2016
// Visualization code using Web Audio API
// DoctorBondage.com
//**************************************

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var audio = document.getElementById("sound");
audio.crossOrigin = "anonymous";
var source = audioCtx.createMediaElementSource(audio);
var gainNode = audioCtx.createGain();
var analyser = audioCtx.createAnalyser();
var threshold = 1;
var decay = 0.9995;

var subSum = 0;
var bassSum = 0;
var midSum = 0;
var trebSum = 0;

analyser.fftSize = 512;
analyser.smoothingTimeConstant = 0.8;
var frequencyBinCount = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);

source.connect(analyser);
analyser.connect(gainNode);
gainNode.connect(audioCtx.destination);

//number of videos
var nbackgrounds = 175;
var videoUrls = [];
var uniqueUrls = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function preLoadVideo(){
  var url = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".mp4";
  videoUrls.push(url);
  $("#background > source").attr("src", "http://www.DoctorBondage.com/" + url );
  $("#background").load();
}

function loadVideo(){
  var url = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".mp4";
  $("#background > source").attr("src", "http://www.DoctorBondage.com/" + videoUrls.shift().toString() );
  $("#background").load();
  videoUrls.push(url);
}


function draw() {
  analyser.getByteFrequencyData(frequencyData);
  subSum = 0;
  bassSum = 0;
  midSum = 0;
  trebSum = 0;
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
  if ( freqweightedMean * freqweightedMean  > threshold) {
    loadVideo();
    threshold = freqweightedMean * freqweightedMean;
  }
  threshold = threshold * decay;
}

audio.ontimeupdate = function() {
    if (audio.currentTime >= (audio.duration - 1)){
        play($(".isPlaying").next());
    }
    $("#skip").val(Math.floor(1000 * audio.currentTime/audio.duration));
}

$("#skip").click( function () {
    audio.currentTime = ($("#skip").val()/1000) * audio.duration;
});


preLoadVideo();
preLoadVideo();
preLoadVideo();
preLoadVideo();
