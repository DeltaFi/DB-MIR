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


//**************************************
// Soundcloud streaming
//**************************************

SC.initialize({
  client_id: 'f779495a78ca840a61a1f499d830f11e',
});

SC.get('/tracks', {
  genres: 'punk', bpm: { from: 120 }
}).then(function(tracks) {
  console.log(tracks);
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
