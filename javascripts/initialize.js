// so a melody apears on page load
$(function () {
  var SightReading = window.SightReading;
  SightReading.curMelody = new SightReading.Melody();
  SightReading.drawMelody(SightReading.curMelody);
  $('#audio-click').append('<audio src="note_mp3s/tick.mp3"></audio>');

  // http://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    alert('If you are viewing this on a mobile device, please instead view on a desktop with a proper keyboard.');
  }
});
