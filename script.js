// Pre-game state controls
const SELECT_MODE_STATE = 0
const PLAY_STATE = 1
let state = SELECT_MODE_STATE

// Mode selection buttons stuff
let modes, currentMode, optionsButton
let modeSelectButtons = []
const BUTTON_WIDTH = 200
const BUTTON_HEIGHT = 50
const BUTTON_GAP = 1

// The frame rate
const fr = 10

// This function is automatically run before setup to do things
// that may take a little while to finish
function preload() {
	modes = [
    new GameMode('☰', '', new Options()),
		new GameMode('Grade One', '', new Game(gradeOnePhrases, '🍪', 5, loadImage('assets/candy.jpg'))),
		new GameMode('Grade Ten+', '', new Game(standardPhrases, '_', 3, loadImage('assets/candy.jpg')))
	]
	preLoadSoundFiles()
}

function setup() {
	// Make the drawing canvas as big as the window
	createCanvas(windowWidth, windowHeight)
  file_input.addEventListener('change', (event) => {addNewCsvPhraseList(event)})

	// Set the frame rate
	frameRate(fr)

	// Create buttons for mode selection
	for (let i = 0; i < modes.length; i++) {
		let mode = modes[i]
		let button = createButton(mode.name)
    button.attribute('name', mode.name)
		button.size(BUTTON_WIDTH, BUTTON_HEIGHT)
		button.style('font-size', '24px')
		button.position(
			(width - BUTTON_WIDTH) / 2,
      //700 was originally "height", but it messes up on smaller viewports. Not entirely sure why.
			(700 - modes.length * (BUTTON_HEIGHT + BUTTON_GAP) * i) / 2 - BUTTON_GAP
		)
    button.mousePressed(() => {
      currentMode = modes[i]
      modeSelectButtons.forEach((b) => b.hide())
      state = PLAY_STATE
    })
		button.hide()
		modeSelectButtons.push(button)
	}
  
}

function draw() {
	switch (state) {
		case SELECT_MODE_STATE:
			showMainScreen()
			break
		case PLAY_STATE:
			currentMode.run()
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
}

function keyPressed() {
	// Allow the user to reset the game via a special button
	if (key === 'F2') {
    state = SELECT_MODE_STATE
    file_input.style.display = "none"
    file_selector.style.display = "none"
	// Otherwise we ignore the shift key and pass the input to the game for processing.
	} else if (key !== 'Shift' && currentMode) currentMode.processKeyInput(key)
}
