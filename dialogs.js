function drawMessage(commentary, highlight) {
	//this.drawBackground();

	fill(50, 50, 50)
	rect(MARGIN, height / 2 - LINE_SPACING * 4, width - MARGIN * 2, LINE_SPACING * 6, 70)

	fill(0, 150, 150)
	textAlign(CENTER, CENTER)
	textSize(30)
	text(commentary, MARGIN, height / 2 - 100, width - 2 * MARGIN)

	textSize(70)
	fill(255, 55, 55)
	text(highlight, MARGIN, height / 2, width - 2 * MARGIN)
}
