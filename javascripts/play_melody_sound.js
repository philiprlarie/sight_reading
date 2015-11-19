// SightReading.playMelodySound(melody). plays the melody audio
$(function () {
	if (typeof SightReading === "undefined") {
		window.SightReading = {};
	}
	SightReading.disablePlay = false;
	SightReading.playMelodySound = function (melody) {
		if (SightReading.disablePlay) { return; }
		SightReading.disablePlay = true;
		$("#audio-els").empty();
		var wholeNoteLength = SightReading.wholeNoteLength;


		var notesEls = [];
		for (var i = 0; i < melody.notes.length; i++) {
			var note = melody.notes[i];
			$("#audio-els").append("<audio src='note_mp3s/" + note.pitch + ".mp3' data-note='" + note.pitch + "'></audio>");
			notesEls.push($("#audio-els :last-child")[0]);
		}

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

		var j = 0;
		function playNextNote() {
			if (j === melody.notes.length) {
				clearInterval(metronomeID);
				SightReading.disablePlay = false;
				return;
			} else {
				var note = melody.notes[j];
				notesEls[j].play();
				setTimeout(playNextNote, note.dur * wholeNoteLength);
			}
			j++;
		}
	};
});
