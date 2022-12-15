let game;
let bgImage;

// The frame rate
const fr = 10;

// This function is automatically run before setup to do things 
// that may take a little while to finish
function preload() {
  bgImage = loadImage("assets/candy.jpg");  
  preLoadSoundFiles();
}

function setup() {
  // Make the drawing canvase as big as the window
  createCanvas(windowWidth, windowHeight);

  // Set the frame rate
  frameRate(fr);

  startNewGame();
}

function startNewGame() {
  game = new Game(standardPhrases, '🍪', 4, bgImage);
}

function draw() {
  game.render();
}

function keyPressed() {
  // Allow the user to reset the game via a special button
  if (key === 'F2')
    startNewGame();
  // Otherwise we ignore the shift key and pass the input to the game for processing.
  else if (key !== 'Shift') game.processKeyInput(key);
}
