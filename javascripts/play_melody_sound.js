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
		var ticksCount = 1;
		// play 20 clicks. 4 four count off. 16 for duration of melody
		var metronomeID = window.setInterval(function () {
			if (ticksCount >= 20) {
				clearInterval(metronomeID);
			} else {
				tick.play();
				ticksCount++;
			}
		}, wholeNoteLength / 4);

		// time for count off (4 clicks)
		setTimeout(playNextNote, wholeNoteLength);

		var j = 0;
		function playNextNote() {
			if (j === melody.notes.length) {
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
