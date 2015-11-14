$(function () {
	window.playMelodySound = function () {
		$("#audio-els").empty();
		var i = 0;
		var wholeNoteLength = 4000; // TODO get this from form

		// metronome
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
				return;
			} else {
				$("#audio-els").append("<audio src='note_mp3s/" + melody.notes[i] + ".mp3' data-note='" + melody.notes[i] + "'></audio>");
				var curNote = $("#audio-els :last-child")[0];
				curNote.play();
				setTimeout(playNextNote, melody.durations[i] * wholeNoteLength);
			}
			i++;
		}
	};
});
