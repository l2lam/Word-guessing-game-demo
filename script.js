let modes, currentMode
let game
let bgImage

// The frame rate
const fr = 10

// This function is automatically run before setup to do things
// that may take a little while to finish
function preload() {
	modes = [
		new GameMode('Grade One', '', loadImage('assets/candy.jpg'), new Game(gradeOnePhrases, '🍪', 5)),
		new GameMode('Grade Ten+', '', loadImage('assets/candy.jpg'), new Game(standardPhrases, '_', 3)),
	]
	preLoadSoundFiles()
}

const SELECT_MODE_STATE = 0
const PLAY_STATE = 1
let state = SELECT_MODE_STATE
let modeSelectButtons = [];

function setup() {
	// Make the drawing canvase as big as the window
	createCanvas(windowWidth, windowHeight)

	// Set the frame rate
	frameRate(fr)

  // Create mode select buttons;
	// Create buttons for mode selection
	for (let i = 0; i < modes.length; i++) {
		let mode = modes[i]
		let button = createButton(mode.name)
		button.size(BUTTON_WIDTH, BUTTON_HEIGHT)
		button.position(
			(width - BUTTON_WIDTH) / 2,
			(height - modes.length * (BUTTON_HEIGHT + BUTTON_GAP) * i) / 2 - BUTTON_GAP
		)
		button.mousePressed(() => {
			currentMode = modes[i];
      modeSelectButtons.forEach(b => b.hide());
      state = PLAY_STATE
		})
    //button.hide();
    modeSelectButtons.push(button);
	}  
}

function draw() {
	switch (state) {
		case SELECT_MODE_STATE:
			selectMode()
			break
		case PLAY_STATE:
			currentMode.run()
			break
	}
}

const BUTTON_WIDTH = 100
const BUTTON_HEIGHT = 70
const BUTTON_GAP = 20
function selectMode() {
  //print(modeSelectButtons);
  modeSelectButtons.forEach(b => b.show());
}

function keyPressed() {
	// Allow the user to reset the game via a special button
	if (key === 'F2') state = SELECT_MODE_STATE
	// Otherwise we ignore the shift key and pass the input to the game for processing.
	else if (key !== 'Shift' && currentMode) currentMode.processKeyInput(key)
}
