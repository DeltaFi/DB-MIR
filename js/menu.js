//**************************************
// Dragos Rotaru April 20, 2016
// DoctorBondage.com
// Menu overlay and settings code
//**************************************

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


$( "#lefton" ).change(function() {
    $("#left").toggle();
});
$( "#topon" ).change(function() {
      $("#top").toggle();
});
$( "#righton" ).change(function() {
    $("#right").toggle();
});

//**************************************
// Soundcloud streaming
//**************************************

SC.initialize({
  client_id: 'f779495a78ca840a61a1f499d830f11e',
  redirect_uri: 'http://doctorbondage.com/callback.html'
});

$("soundcloud-connect-btn").click( function soundcloudConnect(){
    SC.connect().then(function() {
        $("#soundcloudconnectmessage").toggleClass("show");
        $("#soundcloud-connect-btn").toggleClass("hide");
    });
});



$("soundcloud-disconnect-btn").on("click", function soundcloudDisconnect(){

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
