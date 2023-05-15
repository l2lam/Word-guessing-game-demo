// This function is automatically run before setup to do things
// that may take a little while to finish
function preload() {
	preLoadSoundFiles()
}

function setup() {
	// Make the drawing canvas as big as the window
	createCanvas(windowWidth, windowHeight)

	// Set the frame rate
	frameRate(20)

	// Add the main screen to the screen stack
	pushScreen(
		new MainScreen("Main", "", loadImage("assets/snowman-background.jpeg"))
	)
}

function draw() {
	currentScreen.render()
}

function keyPressed() {
	// Allow the user to goto the previous screen via a special button
	if (key === "Escape") {
		popScreen()
		// Otherwise we ignore the shift key and pass the input to the game for processing.
	} else if (key !== "Shift" && currentMode) currentScreen.processKeyInput(key)
}

function mousePressed() {
	currentScreen.processMousePressed()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	currentScreen.resizeBackground()
}
