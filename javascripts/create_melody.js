// SightReading.Melody class. Creates a random melody with 'new Melody();'
// SightReading.Note class

var SightReading = window.SightReading;

var Melody = SightReading.Melody = function (cleff) {
  this.notes = [];
  this.totDur = 0;

  for (var i = 0; i <= 15; i++) {
    cleff = cleff || 'both';
    var note;
    switch (cleff) {
      case 'treble':
        note = new Note(SightReading.ALL_PITCHES.slice(13).sample(), 1 / 4);
        break;
      case 'bass':
        note = new Note(SightReading.ALL_PITCHES.slice(0, 16).sample(), 1 / 4);
        break;
      default:
        note = new Note(SightReading.ALL_PITCHES.sample(), 1 / 4);
    }
    this.addNote(note);
  }
};

var Note = SightReading.Note = function (pitch, dur, timing) {
  this.pitch = pitch;
  this.dur = dur;
  this.timing = undefined; // set when Melody adds note
  this.isPlayedCorrectly = undefined; // set when user plays note
};

Melody.prototype.addNote = function (note) {
  note.timing = this.totDur;
  this.notes.push(note);
  this.totDur += note.dur;
};
