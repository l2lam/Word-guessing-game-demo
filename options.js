class Options {
  render() {
    background(50, 150, 150)
  	fill(0, 50, 50)
  	textAlign(CENTER, CENTER)
  	textSize(30)
  	text('Please select a .csv file', width / 2, 60)
    document.getElementById("file-selector").style.display = "block"
  }
}