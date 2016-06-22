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
var threshold = 0;
var decay = 0.9993;

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

//number of images
var nbackgrounds = 176;
var imageUrls = [];
var uniqueUrls = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function loadImage()
{
    var url = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".gif";
    var url2 = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".gif";
    var url3 = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".gif";
    var url4 = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".gif";
    var url5 = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".gif";
    var url6 = "backgrounds/background" + getRandomInt(nbackgrounds).toString() + ".gif";
    var preload = new Image();
    var preload2 = new Image();
    var preload3 = new Image();
    var preload4 = new Image();
    var preload5 = new Image();
    var preload6 = new Image();

    preload.onload = function () {
        if (uniqueUrls.length > nbackgrounds){
            loadImage();
        }
    };
    preload2.onload = function () {
        if (uniqueUrls.length > nbackgrounds){
            loadImage();
        }
    };
    preload3.onload = function () {
        if (uniqueUrls.length > nbackgrounds){
            loadImage();
        }
    };

    preload4.onload = function () {
        if (uniqueUrls.length > nbackgrounds){
            loadImage();
        }
    };
    preload5.onload = function () {
        if (uniqueUrls.length > nbackgrounds){
            loadImage();
        }
    };
    preload6.onload = function () {
        if (uniqueUrls.length > nbackgrounds){
            loadImage();
        }
    };
    preload.src = url;
    imageUrls.push(url);
    if(uniqueUrls.indexOf(url) >= 0 ){
    uniqueUrls.push(url);
    }
    preload2.src = url2;
    imageUrls.push(url2);
    if(uniqueUrls.indexOf(url2) >= 0 ){
    uniqueUrls.push(url2);
    }
    preload3.src = url3;
    imageUrls.push(url3);
    if(uniqueUrls.indexOf(url3) >= 0 ){
    uniqueUrls.push(url3);
    }
    preload4.src = url4;
    imageUrls.push(url4);
    if(uniqueUrls.indexOf(url4) >= 0 ){
    uniqueUrls.push(url4);
    }
    preload5.src = url5;
    imageUrls.push(url5);
    if(uniqueUrls.indexOf(url5) >= 0 ){
    uniqueUrls.push(url5);
    }
    preload6.src = url6;
    imageUrls.push(url6);
    if(uniqueUrls.indexOf(url6) >= 0 ){
    uniqueUrls.push(url6);
    }
    console.log("GIF Buffer Length: " + imageUrls.length + " New URL: " + url);
}


function display(){
    $('#background').css("background-image", "url(" + imageUrls.shift().toString() + ")");
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
  if (freqweightedMean * freqweightedMean > threshold) {
    threshold = freqweightedMean * freqweightedMean;
    display();
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



//preload images
loadImage();
