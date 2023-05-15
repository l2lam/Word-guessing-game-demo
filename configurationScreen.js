let customPhrases = []
let targetScore = 3000

class ConfigurationScreen extends Screen {
	constructor(name, description, bgColor) {
		super(name, description, bgColor)
		this.createControls()
		this.createButtons()
	}

	createControls() {
		this.fileInput = createInput("", "file")
		this.fileInput.elt.accept = ".csv"
		this.fileInput.changed((event) => {
			let importer = new CsvPhraseImporter(event.target.files[0])
			customPhrases = importer.phrases
		})
		this.fileInput.hide()
	}

	createButtons() {
		this.buttons = [
			// CSV file inport
			new RectangularPaintedButton(
				"Import Phrases",
				0,
				0,
				BUTTON_WIDTH,
				() => {
					this.fileInput.elt.click()
				},
				() => {}
			),
			new RectangularPaintedButton(
				"Set Target Score",
				0,
				0,
				BUTTON_WIDTH,
				() => {
					let result = parseInt(prompt("Set target score", str(targetScore)))
					if (!isNaN(result)) targetScore = result
				}
			),
			// The button to return to the main menu
			new RectangularPaintedButton("↩ Back", 0, 0, BUTTON_WIDTH, () => {
				popScreen()
			}),
		]
		const n = this.buttons.length
		this.buttons.forEach((button, i) => {
			button.y = i * (BUTTON_HEIGHT + BUTTON_GAP) + 200
			button.x = width / 2
		})
	}

	paintedButtons() {
		return this.buttons
	}

	render() {
		this.drawBackground()
		fill(0, 50, 50)
		textAlign(CENTER, CENTER)
		textSize(30)
		text("Configuration", width / 2, 60)
		this.buttons.forEach((b) => b.render())
	}
}
