$(function () {
	// ALL_NOTES.forEach(function (note) {
	// 	$("#audio-els").append("<audio src='note_mp3s/" + note + ".mp3' data-note='" + note + "'>");
	// });

	window.playMelodySound = function () {
		// debugger;
		$("#audio-els").empty();
		var i = 0;
		var wholeNoteLength = 4000; // TODO get this from form
		playNextNote();
		function playNextNote() {
			if (i === melody.notes.length) {
				return;
			} else {
				$("#audio-els").append("<audio src='note_mp3s/" + melody.notes[i] + ".mp3' data-note='" + melody.notes[i] + "'>");
				var curNote = $("#audio-els :last-child")[0];
				curNote.play();
				setTimeout(playNextNote, melody.durations[i] * wholeNoteLength);
			}
			i++;
		}
	};
});
