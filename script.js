const ANIMAL = "Animal";
const MATH = "Math";
const RHYMES = "Rhymes";
const SONG = "Song";

let phrases = [
  new Phrase("fox in a box", "starts with f", RHYMES),
  new Phrase("cat in the hat", "Dr. Seuss", RHYMES),
  new Phrase("all you need is love", "Beatles", SONG),
  new Phrase("zombie", "Cranberries", SONG),
  new Phrase("dog", "woof", ANIMAL),
  new Phrase("cat", "meow", ANIMAL),
  new Phrase("pig", "oink", ANIMAL),
  new Phrase("2 + 3 = 5", "math!", MATH),
  new Phrase("2 - 2 = 0", "math!", MATH),
];

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
  game = new Game(phrases, '☠️', 5, bgImage);
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
