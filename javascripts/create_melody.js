// SightReading.Melody class. Creates a random melody with "new Melody();"
// SightReading.Note class
$(function () {
	if (typeof SightReading === "undefined") {
		window.SightReading = {};
	}

	var Melody = SightReading.Melody = function (cleff) {
		this.notes = [];
		this.totDur = 0;
		var i;
		for (i = 0; i <= 15; i++) {
			// TODO make options for which notes to use.
			cleff = cleff || "both";
			var note;
			switch (cleff) {
				case "treble":
					note = new Note(SightReading.ALL_PITCHES.slice(13).sample(), 1/4);
					break;
				case "bass":
					note = new Note(SightReading.ALL_PITCHES.slice(0,16).sample(), 1/4);
					break;
				default:
					note = new Note(SightReading.ALL_PITCHES.sample(), 1/4);
			}
			this.addNote(note);
		}
	};

	var Note = SightReading.Note = function (pitch, dur, timing) {
		this.pitch = pitch;
		this.dur = dur;
		this.timing = timing;
		this.isPlayedCorrectly = undefined;
	};

	Melody.prototype.addNote = function (note) {
		note.timing = this.totDur;
		this.notes.push(note);
		this.totDur += note.dur;
	};
});
