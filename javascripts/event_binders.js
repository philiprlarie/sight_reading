// new melody button
// play button
// pressing pitch names along with up/down arrows for sharp/flats
// SightReading.curMelody
$(function () {
	if (typeof SightReading === "undefined") {
		window.SightReading = {};
	}
	$("#new-melody").on("click", function (event) {
		event.preventDefault();
		SightReading.curMelody = new SightReading.Melody();
		SightReading.drawMelody(SightReading.curMelody);
	});
	$("#play").on("click", function (event) {
		event.preventDefault();
		SightReading.playMelodySound(SightReading.curMelody);
		SightReading.noteIndentification(SightReading.curMelody);
	});
	$(".sight-reading-holder").keypress(handleKeyPress);
	$(".sight-reading-holder").keydown(handleKeyDown);
	$(".sight-reading-holder").keyup(handleKeyUp);

	// pressing pitch names along with up/down arrows for sharp/flats
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
