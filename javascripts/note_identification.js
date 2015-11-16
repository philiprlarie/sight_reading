// SightReading.TIMING_WINDOW time when a note will register
$(function () {
	if (typeof SightReading === "undefined") {
		window.SightReading = {};
	}

	SightReading.TIMING_WINDOW = 500; // miliseconds
	SightReading.disableNoteIndentification = false;
	SightReading.noteIndentification = function (melody) {
		if (SightReading.disableNoteIndentification) { return; }
		SightReading.disableNoteIndentification = true;

		// variables used in this function
		var pressedNotes = SightReading.pressedNotes;
		var notes = melody.notes;
		var wholeNoteLength = SightReading.wholeNoteLength;
		var countOffTime = wholeNoteLength;

		// set initial state
		for (var i = 0; i < notes.length; i++) {
			notes[i].isPlayedCorrectly = undefined;
		}
		SightReading.drawMelody(melody);
		SightReading.utils.updateScore(melody);

		// set callbacks for the note event functions for each note
		for (var i = 0; i < notes.length; i++) { // jshint ignore:line
			setTimeout(checkNotePressed, countOffTime + notes[i].timing * wholeNoteLength + SightReading.TIMING_WINDOW / 2, notes[i]); // jshint ignore:line
			setTimeout(clearNotesPressed, countOffTime + notes[i].timing * wholeNoteLength - SightReading.TIMING_WINDOW / 2);
		}
		// after the melody is done playing, let the play button work again
		setTimeout(function () {
			SightReading.disableNoteIndentification = false;
		}, countOffTime + melody.totDur * wholeNoteLength + SightReading.TIMING_WINDOW / 2);

		function checkNotePressed(note) {
			note.isPlayedCorrectly = !!pressedNotes[note.pitch.substr(0, note.pitch.length - 1)];
			SightReading.utils.updateScore(melody);
			SightReading.drawMelody(melody);
		}
		function clearNotesPressed() {
			for (var pitch in pressedNotes) {
				pressedNotes[pitch] = false;
			}
		}
	};
});
