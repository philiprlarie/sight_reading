$(function () {
	if (typeof SightReading === "undefined") {
		window.SightReading = {};
	}

	// two constants. ALL_PITCHES and NOTE_POS
	SightReading.ALL_PITCHES = [];
	var letters = ["C", "D", "E", "F", "G", "A", "B"];
	var numbers = ["2", "3", "4", "5"];
	numbers.forEach(function (num) {
		letters.forEach(function (letter) {
			SightReading.ALL_PITCHES.push(letter + num);
		});
	});

	// the position of the note pitches relative to middle c
	SightReading.NOTE_POS = {};
	for (var i = 0; i < SightReading.ALL_PITCHES.length; i++) { // jshint ignore:line
		SightReading.NOTE_POS[SightReading.ALL_PITCHES[i]] = i - SightReading.ALL_PITCHES.length / 2;
	}

	Array.prototype.sample = function () {
		return this[Math.floor(Math.random() * this.length)];
	};

});