const file_input = document.getElementById("file-input")
const file_selector = document.getElementById('file-selector')

class ConfigurationScreen extends Screen {
	constructor(name, description, bgColor) {
		super(name, description, bgColor)
		this.createButtons()
	}

	init() {
		this._returnToPreviousScreen = false
		file_input.style.display = 'block'
		file_selector.style.display = 'block'
	}

	createButtons() {
		const buttonRadius = 30
		this.buttons = [
			// The button to return to the main menu
			new PaintedButton(
				'↩',
				0,
				0,
				buttonRadius,
				() => {this._returnToPreviousScreen = true
					this.onReturnToPreviousScreen()},
				() => {fill('grey')
					textSize(40)}
			)
		]
		this.buttons.forEach((button, i) => {
			button.y = height * (5/8)
			button.x = width / 2
		})
	}

	onReturnToPreviousScreen() {
		file_input.style.display = 'none'
		file_selector.style.display = 'none'
	}

	paintedButtons() {
		return this.buttons
	}

	render() {
		this.drawBackground()
		fill(0, 50, 50)
		textAlign(CENTER, CENTER)
		textSize(30)
		text('Please select a .csv file', width / 2, 60)
		this.buttons.forEach((b) => b.render())
	}
}
