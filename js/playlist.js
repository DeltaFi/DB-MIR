//**************************************
// Dragos Rotaru April 20, 2016
// Playlist Code
// DoctorBondage.com
//**************************************

function addToPlaylist(track_id, track_src) {
  $("#playlist").append('<li><div class=\"deleteTrack\"></div><div class=\"Track\" data-src=\"' + track_src + '\">' + track_id + '</div><div class=\"playTrack\"></div></li>');
}

function play(track) {
  $(".isPlaying").toggleClass("isPlaying");
  audio.src = track.children(".Track").attr("data-src");
  updateTrackInfo(track.children(".Track").text());
  track.toggleClass("isPlaying");
  audio.play();
}

$("#playlist-btn").on("click", function togglePlaylist() {
  $("#playlist-overlay").toggleClass("show");
  $("#playlist-btn").toggleClass("show");
});

$("#playlist").on("click",".deleteTrack", function deleteFromPlaylist() {
  $(this).parent().remove();
});

$("#playlist").on("click", ".playTrack", function playPlaylistTrack() {
  play($(this).parent());
});

$("#shuffle").on("click", function shufflePlaylist () {
    $('#playlist').randomize();
});

//$("#bpmSort").on("click", function bpmSort () {
//});
