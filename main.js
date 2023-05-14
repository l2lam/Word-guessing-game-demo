// Pre-game state controls
const MAIN_SCREEN_STATE = 0
const PLAY_STATE = 1
let state = MAIN_SCREEN_STATE

// Mode selection buttons stuff
let modes, currentMode, optionsButton
let modeSelectButtons = []

// The frame rate
const fr = 20

// This function is automatically run before setup to do things
// that may take a little while to finish
function preload() {
	preLoadSoundFiles()
}

function setup() {
	// Make the drawing canvas as big as the window
	const c = createCanvas(windowWidth, windowHeight)

	// Setup all the supported modes here so that p5js lib facilities are made available to the constructors
	modes = [
		new ConfigurationScreen("☰", "", color(50, 150, 150)),
		new Game(
			"Grade One",
			"",
			gradeOnePhrases,
			"🍪",
			5,
			loadImage("assets/candy.jpg"),
			Screen.BgHorizontalAlign.CENTER,
			Screen.BgVerticalAlign.BOTTOM
		),
		new Game(
			"Grade Ten+",
			"",
			standardPhrases,
			"_",
			3,
			loadImage("assets/candy.jpg"),
			Screen.BgHorizontalAlign.CENTER,
			Screen.BgVerticalAlign.BOTTOM
		),
	]

	// Set the frame rate
	frameRate(fr)
	// Create buttons for mode selection
	for (let i = 0; i < modes.length; i++) {
		let mode = modes[i]
		let button = createButton(mode.name)
		button.attribute("name", mode.name)
		button.size(BUTTON_WIDTH, BUTTON_HEIGHT)
		button.style("font-size", "24px")
		button.position(
			(width - BUTTON_WIDTH) / 2,
			//700 was originally 'height', but it messes up on smaller viewports. Not entirely sure why.
			(700 - modes.length * (BUTTON_HEIGHT + BUTTON_GAP) * i) / 2 - BUTTON_GAP
		)
		button.mousePressed(() => {
			currentMode = modes[i]
			currentMode.init()
			modeSelectButtons.forEach((b) => b.hide())
			state = PLAY_STATE
		})
		button.hide()
		modeSelectButtons.push(button)
	}
}

function draw() {
	switch (state) {
		case MAIN_SCREEN_STATE:
			showMainScreen()
			break
		case PLAY_STATE:
			currentMode.render()
			if (currentMode.returnToPreviousScreen()) {
				currentMode.onReturnToPreviousScreen()
				state = MAIN_SCREEN_STATE
			}
			break
	}
}

// TODO encapsulate the main screen into a proper class that extends Screen
function showMainScreen() {
	background(50, 150, 150)
	fill(0, 50, 50)
	textAlign(CENTER, CENTER)
	textSize(30)
	text("Char Char Bang!", width / 2, 60)
	textSize(30)
	modeSelectButtons.forEach((b) => b.show())
}

function keyPressed() {
	// Allow the user to reset the game via a special button
	if (key === "Escape") {
		state = MAIN_SCREEN_STATE
		currentMode.onReturnToPreviousScreen()
		// Otherwise we ignore the shift key and pass the input to the game for processing.
	} else if (key !== "Shift" && currentMode) currentMode.processKeyInput(key)
}

function mousePressed() {
	if (currentMode) {
		currentMode.processMousePressed()
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	if (currentMode) {
		currentMode.resizeBackground()
	}
}
