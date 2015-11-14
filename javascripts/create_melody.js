$(function () {
	Array.prototype.sample = function () {
		return this[Math.floor(Math.random() * this.length)];
	};

	// two constants. ALL_NOTES and NOTE_POS
	var letters = ["C", "D", "E", "F", "G", "A", "B"];
	var numbers = ["2", "3", "4", "5"];
	window.ALL_NOTES = [];
	numbers.forEach(function (num) {
		letters.forEach(function (letter) {
			ALL_NOTES.push(letter + num);
		});
	});
	// the position of the note relative to middle c
	window.NOTE_POS = {};
	for (var i = 0; i < ALL_NOTES.length; i++) { // jshint ignore:line
		NOTE_POS[ALL_NOTES[i]] = i - ALL_NOTES.length / 2;
	}

	window.melody = {
		"notes": [],
		"durations": []
	};

	window.newMelody = function () {
		melody.notes = [];
		melody.durations = [];

		var i;
		for (i = 0; i <= 15; i++) {
			melody.durations.push(1/4);
		}
		for (i = 0; i <= 15; i++) {
			melody.notes.push(ALL_NOTES.sample());
		}
	};
});
