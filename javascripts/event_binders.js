// new melody button
// play button
// pressing pitch names along with up/down arrows for sharp/flats
// SightReading.curMelody
// SightReading.wholeNoteLength in miliseconds
$(function () {
	if (typeof SightReading === "undefined") {
		window.SightReading = {};
	}
	// clikc the new melody button
	$("#new-melody").on("click", function (event) {
		event.preventDefault();
		var cleff = $("form :radio:checked")[0].value;
		SightReading.curMelody = new SightReading.Melody(cleff);
		SightReading.drawMelody(SightReading.curMelody);
	});
	// click the play buttong
	$("#play").on("click", function (event) {
		event.preventDefault();
		SightReading.playMelodySound(SightReading.curMelody);
		SightReading.noteIndentification(SightReading.curMelody);
	});
	// change the tempo and set its initial value. whole note length in miliseconds
	SightReading.wholeNoteLength = 4 * 60 * 1000 / parseInt($("#tempo")[0].value);
	$("#tempo").change(function(event) {
		SightReading.wholeNoteLength = 4 * 60 * 1000 / parseInt($("#tempo")[0].value);
	});


	// pressing pitch names along with up/down arrows for sharp/flats
	$(".sight-reading-holder").keypress(handleKeyPress);
	$(".sight-reading-holder").keydown(handleKeyDown);
	$(".sight-reading-holder").keyup(handleKeyUp);

	SightReading.pressedNotes = {
		Cb: false,
		C: false,
		Cs: false,
		Db: false,
		D: false,
		Ds: false,
		Eb: false,
		E: false,
		Es: false,
		Fb: false,
		F: false,
		Fs: false,
		Gb: false,
		G: false,
		Gs: false,
		Ab: false,
		A: false,
		As: false,
		Bb: false,
		B: false,
		Bs: false,
	};

	function handleKeyPress (event) {
		var letter = String.fromCharCode(event.charCode).toUpperCase();
		if (arrowsUpDown.upArrow) {
			letter += "s";
		} else if (arrowsUpDown.downArrow) {
			letter += "b";
		}
		if (letter in SightReading.pressedNotes) {
			SightReading.pressedNotes[letter] = true;
		}
	}

	// functionality for sharps and flats
	window.arrowsUpDown = {
		downArrow: false,
		upArrow: false
	};
	function handleKeyDown (event) {
		if (event.which === 38) {
			event.preventDefault();
			arrowsUpDown.upArrow = true;
		}
		if (event.which === 40) {
			event.preventDefault();
			arrowsUpDown.upArrow = true;
		}
	}
	function handleKeyUp (event) {
		if (event.which === 38) {
			event.preventDefault();
			arrowsUpDown.upArrow = true;
		}
		if (event.which === 40) {
			event.preventDefault();
			arrowsUpDown.upArrow = true;
		}
	}
});
