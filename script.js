let modes, currentModeIndex
let game
let bgImage

// The frame rate
const fr = 10

// This function is automatically run before setup to do things
// that may take a little while to finish
function preload() {
	modes = [
		new GameMode('Grade One', '', loadImage('assets/candy.jpg'), () => {
			let game = new Game(gradeOnePhrases, '🍪', 5)
			game.render()
		}),
		new GameMode('Grade Ten+', '', loadImage('assets/candy.jpg'), () => {
			let game = new Game(standardPhrases, '_', 3)
			game.render()
		}),
	]
	preLoadSoundFiles()
}

const SELECT_MODE_STATE = 0
const PLAY_STATE = 1
let state = SELECT_MODE_STATE

function setup() {
	// Make the drawing canvase as big as the window
	createCanvas(windowWidth, windowHeight)

	// Set the frame rate
	frameRate(fr)
}

function draw() {
	switch (state) {
		case SELECT_MODE_STATE:
			selectMode()
			break
		case PLAY_STATE:
			modes[currentModeIndex].run()
			break
	}
	currentMode.run()
}

const BUTTON_WIDTH = 100
const BUTTON_HEIGHT = 70
const BUTTON_GAP = 20
function selectMode() {
	// Create buttons for mode selection
	for (let i = 0; i < modes.length; i++) {
		let mode = modes[i]
		let button = createButton(mode.name, i)
		button.size(BUTTON_WIDTH, BUTTON_HEIGHT)
		button.position(
			(width - BUTTON_WIDTH) / 2,
			(height + BUTTON_HEIGHT + BUTTON_GAP * (modes.length - i)) / 2
		)
		button.mousePressed(() => {
			currentModeIndex = this.value()
		})
	}
}

function keyPressed() {
	// Allow the user to reset the game via a special button
	if (key === 'F2') state = SELECT_MODE_STATE
	// Otherwise we ignore the shift key and pass the input to the game for processing.
	else if (key !== 'Shift') game.processKeyInput(key)
}
