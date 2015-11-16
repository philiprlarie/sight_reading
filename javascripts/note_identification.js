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

		var pressedNotes = SightReading.pressedNotes;
		var notes = melody.notes;
		for (var i = 0; i < notes.length; i++) {
			notes[i].isPlayedCorrectly = undefined;
		}
		var wholeNoteLength = 4000; // TODO get this from form
		var countOffTime = wholeNoteLength;
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
			return note.isPlayedCorrectly;
		}
		function clearNotesPressed() {
			for (var pitch in pressedNotes) {
				pressedNotes[pitch] = false;
			}
		}
	};
});
