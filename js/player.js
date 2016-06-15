//**************************************
// Dragos Rotaru April 20, 2016
// Audio Player Controls
// DoctorBondage.com
//**************************************

var lastVolume = 1.0;
var muted = false;

function updateTrackInfo(track_id) {
  $('#track-info').text("Playing : " + track_id);
  $('#player').toggleClass("hide");
  setTimeout(function () {
    $("#player").toggleClass("hide");
  }, 3000);
}


$("#sound-btn").on("click", function toggleSound() {
  if (muted) {
    muted = false;
    gainNode.gain.value = lastVolume;
    $("#sound-btn").removeClass('muted');
  } else {
    muted = true;
    gainNode.gain.value = 0.0;
    $("#sound-btn").addClass('muted');
  }
});

volume.onchange = function () {
    lastVolume = volume.value/100;
    gainNode.gain.value = lastVolume;
}
