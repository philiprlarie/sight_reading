// so a melody apears on page load
$(function () {
	SightReading.curMelody = new SightReading.Melody();
	SightReading.drawMelody(SightReading.curMelody);
});
