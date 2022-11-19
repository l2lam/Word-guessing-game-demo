const ANIMAL = "Animal";
const MATH = "Math";
const RHYMES = "Rhymes";

let phrases = [
  new Phrase("fox in a box", "starts with f", RHYMES),
  new Phrase("dog", "woof!", ANIMAL),
  new Phrase("cat", "meow!", ANIMAL),
  new Phrase("2 + 3 = 5", "math!", MATH),
  new Phrase("2 - 2 = 0", "math!", MATH),
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
  game = new Game(phrases, '▓', fr);
}

function draw() {
  game.render();
}


function keyPressed() {
  // print("key pressed is", key);
  if (key === 'F2')
    startNewGame();
  else if (key !== 'Shift') game.processKeyInput(key);
}
