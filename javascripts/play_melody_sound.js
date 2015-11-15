// SightReading.playMelodySound(melody). plays the melody audio
$(function () {
	SightReading.disablePlay = false;
	SightReading.playMelodySound = function (melody) {
		if (SightReading.disablePlay) { return; }
		SightReading.disablePlay = true;
		$("#audio-els").empty();
		var i = 0;
		var wholeNoteLength = 4000; // TODO get this from form

		// metronome
		// tick from http://www.webmetronome.com/audio/tick.mp3
		$("#audio-els").append("<audio src='note_mp3s/tick.mp3'></audio>");
		var tick = $("#audio-els :last-child")[0];
		tick.play();
		var metronomeID = window.setInterval(function () {
			tick.play();
		}, wholeNoteLength / 4);

		// four ticks before notes then play notes
		setTimeout(playNextNote, wholeNoteLength);

		function playNextNote() {
			if (i === melody.notes.length) {
				clearInterval(metronomeID);
				SightReading.disablePlay = false;
				return;
			} else {
				var note = melody.notes[i];
				$("#audio-els").append("<audio src='note_mp3s/" + note.pitch + ".mp3' data-note='" + note.pitch + "'></audio>");
				var curNote = $("#audio-els :last-child")[0];
				curNote.play();
				setTimeout(playNextNote, note.dur * wholeNoteLength);
			}
			i++;
		}
	};
});
