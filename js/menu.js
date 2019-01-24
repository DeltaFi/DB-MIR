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
  client_id: "f779495a78ca840a61a1f499d830f11e"
});

function processSoundcloud(soundCloudJSON) {
  if (soundCloudJSON.streamable == true && soundCloudJSON.kind === "track") {
    addToPlaylist(
      soundCloudJSON.title,
      soundCloudJSON.stream_url + "?client_id=f779495a78ca840a61a1f499d830f11e"
    );
    $("#soundcloudComplete").show();
    setTimeout(function() {
      $("#soundcloudComplete").hide();
    }, 2000);
  } else if (soundCloudJSON.kind == "playlist") {
    var addedCount = 0;
    for (var i = 0; i < soundCloudJSON.tracks.length; i++) {
      var track = soundCloudJSON.tracks[i];
      if (track.streamable) {
        addToPlaylist(
          track.title,
          track.stream_url + "?client_id=f779495a78ca840a61a1f499d830f11e"
        );
        addedCount++;
      }
    }
    if (addedCount > 0) {
      $("#soundcloudComplete").text(
        addedCount.toString() + " Tracks Sucessfully Added!"
      );
      $("#soundcloudComplete").show();
      setTimeout(function() {
        $("#soundcloudComplete").hide();
        $("#soundcloudComplete").text("Music Added!");
      }, 2000);
    } else {
      $("#notstreamable").show();
      setTimeout(function() {
        $("#notstreamable").hide();
      }, 2000);
    }
  } else {
    $("#notstreamable").show();
    setTimeout(function() {
      $("#notstreamable").hide();
    }, 2000);
  }
}

$("#soundcloudSource").click(function() {
  var url = $("#soundcloudurl").val();
  if (!url.includes("soundcloud")) {
    $("#badurl").show();
    setTimeout(function() {
      $("#badurl").hide();
    }, 2000);
  } else if (!url.includes("http")) {
    $("#notaurl").show();
    setTimeout(function() {
      $("#notaurl").hide();
    }, 2000);
  } else {
    SC.resolve(url).then(processSoundcloud);
  }
});

//**************************************
// File Upload
//**************************************

var dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

fileselect.onchange = function() {
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
  $("#uploadComplete").show();
  setTimeout(function() {
    $("#uploadComplete").hide();
  }, 2000);
}
