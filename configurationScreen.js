let customPhrases = []

class ConfigurationScreen extends Screen {
	constructor(name, description, bgColor) {
		super(name, description, bgColor)
		this.createControls()
		this.createButtons()
	}

	init() {
		this._returnToPreviousScreen = false
	}

	createControls() {
		this.fileInput = createInput("", "file")
		this.fileInput.elt.accept = ".csv"
		this.fileInput.changed((event) => {
			let importer = new CsvPhraseImporter(event.target.files[0])
			customPhrases = importer.phrases
		})
		this.fileInput.hide()

		// this.controls.push(fileInput)
		// this.constrols.forEach((c, i) => {
		// 	c.position(width/2, LINE_SPACING * i + 100)

		// }
		// )
	}

	createButtons() {
		const buttonRadius = 30
		this.buttons = [
			// CSV file inport
			new PaintedButton(
				"Import Phrases",
				0,
				0,
				buttonRadius * 2,
				() => {
					this.fileInput.elt.click()
				},
				() => {}
			),
			// The button to return to the main menu
			new PaintedButton(
				"↩",
				0,
				0,
				buttonRadius,
				() => {
					this._returnToPreviousScreen = true
					this.onReturnToPreviousScreen()
				},
				() => {
					fill("grey")
					textSize(40)
				}
			),
		]
		const n = this.buttons.length
		this.buttons.forEach((button, i) => {
			button.y = height * (i / n) + 300
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
