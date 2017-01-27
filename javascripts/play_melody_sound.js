// SightReading.playMelodySound(melody). plays the melody audio
var SightReading = window.SightReading;

SightReading.disablePlay = false;
SightReading.playMelodySound = function (melody) {
  if (SightReading.disablePlay) {
    return;
  }
  SightReading.disablePlay = true;
  $('#audio-els').empty();
  var wholeNoteLength = SightReading.wholeNoteLength;

  // tick from http://www.webmetronome.com/audio/tick.mp3
  var tick = $('#audio-click audio')[0];
  var notesEls = [];
  for (var i = 0; i < melody.notes.length; i++) {
    var note = melody.notes[i];
    $('#audio-els').append('<audio src="note_mp3s/' + note.pitch + '.mp3" data-note="' + note.pitch + '"></audio>');
    notesEls.push($('#audio-els :last-child')[0]);
  }

  var ticksCount = 0;
  var startTime = new Date().getTime();
  function playNextNote () {
    var elapsedTime = ticksCount * 1 / 4 * wholeNoteLength;
    // https://www.sitepoint.com/creating-accurate-timers-in-javascript/
    var diff = (new Date().getTime() - startTime) - elapsedTime;

    if (ticksCount >= melody.notes.length + 4) {
      SightReading.disablePlay = false;
      return;
    } else if (ticksCount < 4) {
      tick.play();
      ticksCount++;
      setTimeout(playNextNote, 1 / 4 * wholeNoteLength - diff);
    } else {
      // var note = melody.notes[ticksCount - 4];
      notesEls[ticksCount - 4].play();
      ticksCount++;
      setTimeout(playNextNote, note.dur * wholeNoteLength - diff);
    }
  }

  playNextNote();
};
