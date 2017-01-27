// new melody button
// play button
// pressing pitch names along with up/down arrows for sharp/flats
// SightReading.curMelody
// SightReading.wholeNoteLength in miliseconds
$(function () {

  var SightReading = window.SightReading;
  SightReading.canvas = $('#canvas')[0];
  // click the new melody button
  $('#new-melody').on('click', function (event) {
    event.preventDefault();
    var cleff = $(':radio:checked')[0].value;
    SightReading.curMelody = new SightReading.Melody(cleff);
    SightReading.drawMelody(SightReading.curMelody);
  });
  // click the play button
  $('#play').on('click', function (event) {
    event.preventDefault();
    SightReading.playMelodySound(SightReading.curMelody);
    SightReading.noteIndentification(SightReading.curMelody);
  });
  $('#stop').on('click', function (event) {
    event.preventDefault();
    stopTimeouts();
  });

  function stopTimeouts () {
    var id = window.setTimeout(function () {}, 0);

    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    SightReading.disablePlay = false;
    SightReading.disableNoteIndentification = false;
  }

  // change the tempo and set its initial value. whole note length in miliseconds
  SightReading.wholeNoteLength = 4 * 60 * 1000 / parseInt($('#tempo')[0].value, 10);
  $('#tempo').change(function (event) {
    SightReading.wholeNoteLength = 4 * 60 * 1000 / parseInt($('#tempo')[0].value, 10);
  });


  // pressing pitch names along with up/down arrows for sharp/flats
  $(window).keypress(handleKeyPress);
  $(window).keydown(handleKeyDown);
  $(window).keyup(handleKeyUp);

  SightReading.pressedNotes = {
    Cb: false,
    C: false,
    Cs: false,
    Db: false,
    D: false,
    Ds: false,
    Eb: false,
    E: false,
    Es: false,
    Fb: false,
    F: false,
    Fs: false,
    Gb: false,
    G: false,
    Gs: false,
    Ab: false,
    A: false,
    As: false,
    Bb: false,
    B: false,
    Bs: false
  };

  function handleKeyPress (event) {
    $('button').blur();
    if (event.charCode === 32) { // start/stop playback on spacebar
      event.preventDefault();
      if (SightReading.disablePlay) { // it is currently playing
        stopTimeouts();
      } else {
        SightReading.playMelodySound(SightReading.curMelody);
        SightReading.noteIndentification(SightReading.curMelody);
      }
    }
    var letter = String.fromCharCode(event.charCode).toUpperCase();
    if (arrowsUpDown.upArrow) {
      letter += 's';
    } else if (arrowsUpDown.downArrow) {
      letter += 'b';
    }
    if (letter in SightReading.pressedNotes) {
      SightReading.pressedNotes[letter] = true;
    }
  }

  // functionality for sharps and flats
  var arrowsUpDown = window.arrowsUpDown = {
    downArrow: false,
    upArrow: false
  };

  function handleKeyDown (event) {
    if (event.which === 38) {
      event.preventDefault();
      arrowsUpDown.upArrow = true;
    }
    if (event.which === 40) {
      event.preventDefault();
      arrowsUpDown.upArrow = true;
    }
  }

  function handleKeyUp (event) {
    if (event.which === 38) {
      event.preventDefault();
      arrowsUpDown.upArrow = true;
    }
    if (event.which === 40) {
      event.preventDefault();
      arrowsUpDown.upArrow = true;
    }
  }
});
