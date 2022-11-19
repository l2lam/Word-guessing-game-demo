let phrases = [
  new Phrase("fox in a box", "starts with f", "saying"),
  new Phrase("dog", "woof!", "thing"),
  new Phrase("cat", "meow!", "thing"),
  //new Phrase("2 + 3 = 5", "math!", "addition"),
 // new Phrase("2 - 2 = 0", "math!", "addition"),
];

let game;

// The frame rate
const fr = 30;

function setup() {
  // Make the drawing canvase as big as the window
  createCanvas(windowWidth, windowHeight);

  // Set the RGB background colour
  background(250, 250, 250);

  // Set the frame rate
  frameRate(fr);

  startNewGame();
}

function startNewGame() {
  game = new Game(phrases, '_', fr);
}

function draw() {
  game.render();
}


function keyPressed() {
  // print("key pressed is", key);
  if (key === '~')
    startNewGame();
  else if (key !== 'Shift') game.processKeyInput(key);
}
