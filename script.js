// Pre-game state controls
const SELECT_MODE_STATE = 0
const PLAY_STATE = 1
const OPTIONS_STATE = 2
let state = SELECT_MODE_STATE

// Mode selection buttons stuff
let modes, currentMode, optionsButton
let modeSelectButtons = []
const BUTTON_WIDTH = 200
const BUTTON_HEIGHT = 100
const BUTTON_GAP = 20

// The frame rate
const fr = 10

// This function is automatically run before setup to do things
// that may take a little while to finish
function preload() {
	modes = [
		new GameMode('Grade One', '', new Game(gradeOnePhrases, '🍪', 5, loadImage('assets/candy.jpg'))),
		new GameMode('Grade Ten+', '', new Game(standardPhrases, '_', 3, loadImage('assets/candy.jpg'))),
	]
	preLoadSoundFiles()
}

function setup() {
	// Make the drawing canvas as big as the window
	createCanvas(windowWidth, windowHeight)
  document.getElementById("file-selector").setAttribute("hidden", true)
  document.getElementById("file-selector").addEventListener('change', (event) => {readFile(event)})

	// Set the frame rate
	frameRate(fr)

	// Create buttons for mode selection
	for (let i = 0; i < modes.length; i++) {
		let mode = modes[i]
		let button = createButton(mode.name)
		button.size(BUTTON_WIDTH, BUTTON_HEIGHT)
		button.style('font-size', '24px')
		button.position(
			(width - BUTTON_WIDTH) / 2,
			(height - modes.length * (BUTTON_HEIGHT + BUTTON_GAP) * i) / 2 - BUTTON_GAP
		)
		button.mousePressed(() => {
			currentMode = modes[i]
			modeSelectButtons.forEach((b) => b.hide())
			state = PLAY_STATE
		})
		button.hide()
		modeSelectButtons.push(button)
	}
  //TODO: make this code cleaner
  optionsButton = createButton("Options")
  optionsButton.size(BUTTON_WIDTH, BUTTON_HEIGHT)
  optionsButton.style('font-size', '24px')
  //TODO: fix button gap
  optionsButton.position(
			(width - BUTTON_WIDTH) / 2,
			(height - modes.length * (BUTTON_HEIGHT + BUTTON_GAP) / 2 - BUTTON_GAP))
  optionsButton.mousePressed(() => {
			modeSelectButtons.forEach((b) => b.hide())
      optionsButton.hide()
			state = OPTIONS_STATE
		})
  optionsButton.hide()
  
}

function draw() {
	switch (state) {
		case SELECT_MODE_STATE:
			showMainScreen()
			break
		case PLAY_STATE:
			currentMode.run()
			break
    case OPTIONS_STATE:
      showOptionsScreen()
      break
	}
}

function showMainScreen() {
	background(50, 150, 150)
	fill(0, 50, 50)
	textAlign(CENTER, CENTER)
	textSize(30)
	text('Char Char Bang!', width / 2, 60)
	textSize(30)
	fill(150, 150, 150)
	text('Please select a game mode', width / 2, 120)
	modeSelectButtons.forEach((b) => b.show())
  optionsButton.show()
}

function showOptionsScreen() {
  background(50, 150, 150)
	fill(0, 50, 50)
	textAlign(CENTER, CENTER)
	textSize(30)
	text('Please select a .csv file', width / 2, 60)
  document.getElementById("file-selector").setAttribute("hidden", false)
}

function keyPressed() {
	// Allow the user to reset the game via a special button
	if (key === 'F2') state = SELECT_MODE_STATE
	// Otherwise we ignore the shift key and pass the input to the game for processing.
	else if (key !== 'Shift' && currentMode) currentMode.processKeyInput(key)
}
