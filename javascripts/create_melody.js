$(function () {
	Array.prototype.sample = function () {
		return this[Math.floor(Math.random() * this.length)];
	};

	// two constants. ALL_PITCHES and NOTE_POS
	var letters = ["C", "D", "E", "F", "G", "A", "B"];
	var numbers = ["2", "3", "4", "5"];
	window.ALL_PITCHES = [];
	numbers.forEach(function (num) {
		letters.forEach(function (letter) {
			ALL_PITCHES.push(letter + num);
		});
	});
	// the position of the note pitches relative to middle c
	window.NOTE_POS = {};
	for (var i = 0; i < ALL_PITCHES.length; i++) { // jshint ignore:line
		NOTE_POS[ALL_PITCHES[i]] = i - ALL_PITCHES.length / 2;
	}

	window.Melody = function () {
		this.notes = [];
		this.totDur = 0;
	};
	window.Melody.prototype..

	window.Note = function (pitch, dur, timing) {
		this.pitch = pitch;
		this.dur = dur;
		this.timing = timing;
	};


	window.newMelody = function () {
		window.currentMelody = new Melody();

		var i;
		for (i = 0; i <= 15; i++) {
			var note = new Note(ALL_PITCHES.sample(), 1/4, currentMelody.dur);
			currentMelody.notes.push(note);

		}
		for (i = 0; i <= 15; i++) {
			melody.notes.push(ALL_PITCHES.sample(), 1/4, );
		}
	};
});
