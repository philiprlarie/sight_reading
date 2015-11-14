$(function () {
	$("#new-melody").on("click", function (event) {
		event.preventDefault();
		window.newMelody();
		window.drawMelody();
	});
	$("#play").on("click", function (event) {
		event.preventDefault();
		window.playMelodySound();
	});
});
