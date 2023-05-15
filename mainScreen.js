class MainScreen extends Screen {
	constructor(name, description, bgColor) {
		super(name, description, bgColor)

		this.createButtons()
	}

	createButtons() {
		this.buttons = [
			new RectangularPaintedButton("Grade One Mode", 0, 0, BUTTON_WIDTH, () => {
				this.gotoScreen(
					new Game(
						"Grade One Mode",
						"",
						gradeOnePhrases,
						"🍪",
						5,
						loadImage("assets/candy.jpg"),
						Screen.BgHorizontalAlign.CENTER,
						Screen.BgVerticalAlign.BOTTOM
					)
				)
			}),
			new RectangularPaintedButton("General Mode", 0, 0, BUTTON_WIDTH, () => {
				this.gotoScreen(
					new Game(
						"General Mode",
						"",
						standardPhrases,
						"_",
						3,
						loadImage("assets/candy.jpg"),
						Screen.BgHorizontalAlign.CENTER,
						Screen.BgVerticalAlign.BOTTOM
					)
				)
			}),
			// The button to return to the main menu
			new RectangularPaintedButton(
				"☰ Configuration",
				0,
				0,
				BUTTON_WIDTH,
				() => {
					this.gotoScreen(new ConfigurationScreen("☰", "", color(50, 150, 150)))
				}
			),
		]
		const n = this.buttons.length
		this.buttons.forEach((button, i) => {
			button.y = i * (BUTTON_HEIGHT + BUTTON_GAP) + 200
			button.x = width / 2
		})
	}

	gotoScreen(screen) {
		screen.init()
		pushScreen(screen)
	}

	paintedButtons() {
		return this.buttons
	}

	render() {
		this.drawBackground()
		fill(0, 50, 50)
		textAlign(CENTER, CENTER)
		textSize(50)
		text("Char Char Bang!", width / 2, 60)
		textSize(30)
		this.buttons.forEach((b) => b.render())
	}
}
