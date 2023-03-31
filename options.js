
const file_input = document.getElementById("file-input")
const file_selector = document.getElementById("file-selector")

class Options {

  constructor() {
    this.backButton = createButton('back')
    this.backButton.size(BUTTON_WIDTH, BUTTON_HEIGHT)
		this.backButton.style('font-size', '24px')
    //TODO: add better button positioning
		this.backButton.position(0, 400)
    this.backButton.center('horizontal')
    this.backButton.mousePressed(() => {
      state = SELECT_MODE_STATE
      file_input.style.display = "none"
      file_selector.style.display = "none"
      this.backButton.hide()
    })
		this.backButton.hide()
  }
  
  render() {
    background(50, 150, 150)
  	fill(0, 50, 50)
  	textAlign(CENTER, CENTER)
  	textSize(30)
  	text('Please select a .csv file', width / 2, 60)
    file_input.style.display = "block"
    file_selector.style.display = "block"
    this.backButton.show()
  }
}