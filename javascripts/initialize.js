// so a melody apears on page load
$(function () {
  var SightReading = window.SightReading;
  SightReading.curMelody = new SightReading.Melody();
  SightReading.drawMelody(SightReading.curMelody);
  $('#audio-click').append('<audio src="note_mp3s/tick.mp3"></audio>');
});
