$(function () {
	if (typeof SightReading === "undefined") {
		window.SightReading = {};
	}
	var canvas = $("#canvas")[0];
	var context = canvas.getContext("2d");

	var LINE_SPACING = 15; // pixels
	var SIG_SPACE = 100; // pixels. this is space for key sig, time sig, cleffs

	SightReading.drawMelody = function (melody) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawStaff();
		drawNotes(melody);
	};

	function drawStaff () {
		context.beginPath();
		// lines and spaces
		for (var i = -5; i <= 5; i++) {
			if (i === 0) { continue; }
			context.moveTo(0, canvas.height / 2 + LINE_SPACING * i);
			context.lineTo(canvas.width, canvas.height / 2 + LINE_SPACING * i);
		}
		// measure bars
		context.moveTo(0, canvas.height / 2 + LINE_SPACING * 5);
		context.lineTo(0, canvas.height / 2 - LINE_SPACING * 5);
		for (var i = 1; i <= 4; i++) { // jshint ignore:line
			var xPos = SIG_SPACE + (canvas.width - SIG_SPACE) * i / 4;
			context.moveTo(xPos, canvas.height / 2 + LINE_SPACING * 5);
			context.lineTo(xPos, canvas.height / 2 - LINE_SPACING * 5);
		}
		context.stroke();
		// treble cleff
		context.fillStyle = "black";
		context.textAlign = "center";
		context.font = (10 * LINE_SPACING) + "px Ariel";
		context.fillText("\uD834\uDD1E", 2 * LINE_SPACING, canvas.height / 2);
		// base cleff
		context.font = (5 * LINE_SPACING) + "px Ariel";
		context.fillText("\uD834\uDD22", 2 * LINE_SPACING, canvas.height / 2 + 4.25 * LINE_SPACING);
	}

	function drawNotes (melody) {
		var numNotes = melody.notes.length;
		context.fillStyle = "black";
		context.textAlign = "center";
		context.font = (4 * LINE_SPACING) + "px Ariel";
		for (var i = 0; i < numNotes; i++) { // jshint ignore:line
			var note = melody.notes[i];
			var xPos = SIG_SPACE + (canvas.width - SIG_SPACE) * (i + 0.5) / numNotes;
			var yPos = canvas.height / 2 - SightReading.NOTE_POS[note.pitch] * LINE_SPACING / 2 + 0.245 * LINE_SPACING;
			context.fillText("\u2669", xPos, yPos);

			drawLedgerLines(note, xPos);
		}
	}

	function drawLedgerLines (note, xPos) {
		context.beginPath();
		var notePos = SightReading.NOTE_POS[note.pitch];
		xStart = xPos - LINE_SPACING * 1.2;
		xStop = xPos + LINE_SPACING * 0.8;
		// middle C
		if (notePos === 0) {
			context.moveTo(xStart, canvas.height / 2);
			context.lineTo(xStop, canvas.height / 2);
		}
		// notes above the staff
		if (notePos > 11) {
			for (var i = 12; i <= notePos; i++) {
				if ((i % 2) !== 0) { continue; }
				context.moveTo(xStart, canvas.height / 2 - LINE_SPACING * i / 2);
				context.lineTo(xStop, canvas.height / 2 - LINE_SPACING * i / 2);
			}
		}
		// notes below the staff
		if (notePos < -11) {
			for (var i = -12; i >= notePos; i--) { // jshint ignore:line
				if ((i % 2) !== 0) { continue; }
				context.moveTo(xStart, canvas.height / 2 - LINE_SPACING * i / 2);
				context.lineTo(xStop, canvas.height / 2 - LINE_SPACING * i / 2);
			}
		}
		context.stroke();
	}
});
