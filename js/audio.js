//**************************************
// Dragos Rotaru April 20, 2016
// Visualization code using Web Audio API
// DoctorBondage.com
//**************************************

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio = document.getElementById("sound");
audio.crossOrigin = "anonymous";
var source = audioCtx.createMediaElementSource(audio);
var gainNode = audioCtx.createGain();
var analyser = audioCtx.createAnalyser();
var threshold = 1;
var highThreshold = 1;
var decay = 0.9995;

var subSum = 0;
var bassSum = 0;
var midSum = 0;
var trebSum = 0;

analyser.fftSize = 1024;
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

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function preLoadVideo() {
  var url =
    "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".mp4";
  videoUrls.push(url);
  $("#background > source").attr(
    "src",
    "file:///Users/dado/Projects/soundcloud-music-visualizer/" + url
  );
  $("#background").load();
}

function loadVideo() {
  var url =
    "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".mp4";
  $("#background > source").attr(
    "src",
    "file:///Users/dado/Projects/soundcloud-music-visualizer/" +
      videoUrls.shift().toString()
  );
  $("#background").load();
  videoUrls.push(url);
}

function changeColor() {
  var colorList = [
    "#FFFFFF",
    "#FFFF00",
    "#FFFF33",
    "#F2EA02",
    "#E6FB04",
    "#FF0000",
    "#FD1C03",
    "#FF3300",
    "#FF6600",
    "#00FF00",
    "#00FF33",
    "#00FF66",
    "#33FF00",
    "#00FFFF",
    "#099FFF",
    "#0062FF",
    "#0033FF",
    "#FF00FF",
    "#FF00CC",
    "#FF0099",
    "#CC00FF",
    "#9D00FF",
    "#CC00FF",
    "#6E0DD0",
    "#9900FF"
  ];
  $("#wrapper").css(
    "background-color",
    colorList[getRandomInt(colorList.length)]
  );
}

function draw() {
  analyser.getByteFrequencyData(frequencyData);
  subSum = 0;
  bassSum = 0;
  midSum = 0;
  trebSum = 0;
  subSum = frequencyData[0] + frequencyData[1];
  bassSum =
    frequencyData[2] + frequencyData[3] + frequencyData[4] + frequencyData[5];
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
  var freqweightedMean =
    freqsubMean + 2 * freqbassMean + freqmidMean + freqtrebMean;
  if (freqweightedMean * freqweightedMean > threshold) {
    loadVideo();
    changeColor();
    threshold = freqweightedMean * freqweightedMean;
  }
  if (freqtrebMean * freqtrebMean > highThreshold) {
    changeColor();
  }
  threshold = threshold * decay;
  highThreshold = highThreshold * decay;
}

audio.ontimeupdate = function() {
  if (audio.currentTime >= audio.duration - 1) {
    play($(".isPlaying").next());
  }
  $("#skip").val(Math.floor((1000 * audio.currentTime) / audio.duration));
};

$("#skip").click(function() {
  audio.currentTime = ($("#skip").val() / 1000) * audio.duration;
});

preLoadVideo();
