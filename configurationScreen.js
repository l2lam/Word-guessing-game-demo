const file_selector = document.getElementById('file-selector')

class ConfigurationScreen extends Screen {
	constructor(name, description, bgColor) {
		super(name, description, bgColor)
	}

	render() {
		this.drawBackground()
		fill(0, 50, 50)
		textAlign(CENTER, CENTER)
		textSize(30)
		text('Please select a .csv file', width / 2, 60)
		file_selector.style.display = 'block'
	}
}
