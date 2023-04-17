// Pre-game state controls
const MAIN_SCREEN_STATE = 0
const PLAY_STATE = 1
let state = MAIN_SCREEN_STATE

// Mode selection buttons stuff
let modes, currentMode, optionsButton, targetScoreInput 
let modeSelectButtons = []

// The frame rate
const fr = 10

// This function is automatically run before setup to do things
// that may take a little while to finish
function preload() {
	preLoadSoundFiles()
}

function setup() {
	// Make the drawing canvas as big as the window
	createCanvas(windowWidth, windowHeight)

	// Setup all the supported modes here so that p5js lib facilities are made available to the constructors
	modes = [
		new ConfigurationScreen('☰', '', color(50, 150, 150)),
		new Game('Grade One', '', gradeOnePhrases, '🍪', 5, loadImage('assets/candy.jpg'), Screen.BgHorizontalAlign.CENTER, Screen.BgVerticalAlign.BOTTOM),
		new Game('Grade Ten+', '', standardPhrases, '_', 3, loadImage('assets/candy.jpg'), Screen.BgHorizontalAlign.CENTER, Screen.BgVerticalAlign.BOTTOM),
	]

	file_input.addEventListener('change', (event) => {
		addNewCsvPhraseList(event)
	})

	// Set the frame rate
	frameRate(fr)
	targetScoreInput = createInput(targetScore)
	targetScoreInput.position((width / 2) - 50, 120)
	targetScoreInput.size(100)
	targetScoreInput.input(scoreInput)
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
			
			if (Number.isInteger(+targetScore) == true && targetScore > 0 && targetScore <= 1000000) {
				inValidScore = false
				currentMode = modes[i]
				currentMode.init()
				modeSelectButtons.forEach((b) => b.hide())
      			targetScoreInput.hide()
				state = PLAY_STATE
			}
			else {
				inValidScore = true
			}
		})
		button.hide()
		modeSelectButtons.push(button)
	}
}

function draw() {
	clear(); // clear previous screen contents
	switch (state) {
		case MAIN_SCREEN_STATE:
			showMainScreen()
			break
		case PLAY_STATE:
			currentMode.render()
			if (currentMode.returnToPreviousScreen()) state = MAIN_SCREEN_STATE
			break
	}
}

// TODO encapsulate the main screen into a proper class that extends Screen
function showMainScreen() {
	background(50, 150, 150)
	fill(0, 50, 50)
	textAlign(CENTER, CENTER)
	textSize(30)
	text('Char Char Bang!', width / 2, 60)
	textSize(30)
	if(inValidScore) {
		fill(255, 0, 0)
		text('Invalid target score', width / 2, 90)
	}
	else {
		fill(150, 150, 150)
		text('Please select a game mode and enter target score', width / 2, 90)
	}
	modeSelectButtons.forEach((b) => b.show())
	targetScoreInput.show()
}

function keyPressed() {
	// Allow the user to reset the game via a special button
	if (key === 'F2') {
		state = MAIN_SCREEN_STATE
		currentMode.onReturnToPreviousScreen()
	// Otherwise we ignore the shift key and pass the input to the game for processing.
	} else if (key !== 'Shift' && currentMode) currentMode.processKeyInput(key)
}

let targetScore = 2000
let inValidScore = false

function scoreInput() {
  targetScore = this.value()
}

function mousePressed() {
	if (currentMode) {
		let paintedButtons = currentMode.paintedButtons()
		paintedButtons.forEach((b) => b.checkForClick(mouseX, mouseY))
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (currentMode) {
		currentMode.resizeBackground()
	}
}
