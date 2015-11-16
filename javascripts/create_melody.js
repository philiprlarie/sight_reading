// SightReading.Melody class. Creates a random melody with "new Melody();"
// SightReading.Note class
$(function () {
	if (typeof SightReading === "undefined") {
		window.SightReading = {};
	}

	var Melody = SightReading.Melody = function () {
		this.notes = [];
		this.totDur = 0;
		var i;
		for (i = 0; i <= 15; i++) {
			var note = new Note(SightReading.ALL_PITCHES.sample(), 1/4);
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
