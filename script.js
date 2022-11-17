let phrases = [
  new Phrase("fox in a box", "starts with f", "saying"),
  new Phrase("dog", "woof!", "thing"),
  new Phrase("cat", "meow!", "thing"),
];

let curPhrase;
let guess, wrongGuesses;
let score, perLetterPoints = 100;
let pausePointsDisplay = 0, spinCount = 0, pauseFinalPointsDisplay = 0;
let monoSynth;

// The frame rate
const fr = 10;

function setup() {
  // Make the drawing canvase as big as the window
  createCanvas(windowWidth, windowHeight);

  // Set the RGB background colour
  background(250, 250, 250);

  // Set the frame rate
  frameRate(fr);

  // Setup sound
  monoSynth = new p5.MonoSynth();

  // initiate game
  selectRandomPhrase();
}

function selectRandomPhrase() {
  // Choose a phrase at random from the phrase bank
  let phraseIndex = Math.floor(random(0, phrases.length));
  print("index is ", phraseIndex);
  curPhrase = phrases[phraseIndex];

  // Initialize global game values
  guess = [];
  wrongGuesses = [];
  score = 0;
  perLetterPoints
  // Fill the guess array with underscores corresponding to the phrase
  for (let i = 0; i < curPhrase.phrase.length; i++) {
    guess.push(curPhrase.phrase[i] == " " ? " " : "_");
    print(i, guess[i]);
  }
}

async function draw() {
  // Score spinner display
  if (pauseFinalPointsDisplay > 0) {
    fill(255, 0, 255);
    rect(0, 0, 200, 200);
    fill(0, 255, 0);
    textSize(70);
    text(perLetterPoints, 50, 100);
    pauseFinalPointsDisplay--;
  }
  else if (pausePointsDisplay > 0) {
    fill(0, 255, 0);
    rect(0, 0, 200, 200);
    fill(255, 0, 255);
    textSize(50);
    text(perLetterPoints, 50, 100);
    pausePointsDisplay--;

    if (spinCount <= 0 && pausePointsDisplay <= 0) {
      pauseFinalPointsDisplay = fr * 5;
      playScoreSelectedSound();
    }
  }
  else if (spinCount > 0) {
    pausePointsDisplay = Math.ceil(fr * 2 / Math.pow(spinCount, 2));
    perLetterPoints = Math.ceil(random(100, 500));
    spinCount--;
    playSpinSound();
  }
  else {
    drawMainScreen();
  }
}

function playSpinSound() {
  monoSynth.play('C4', 0.5, 0, 1/8);
}
function playScoreSelectedSound() {
  monoSynth.play('C5', 0.8, 0, 1/2);
}

function drawMainScreen() {
  clear();
  fill(0, 0, 0); // black
  textSize(50);
  //text(curPhrase, 100, 60);
  text(guess.join(" "), 100, 150);

  textSize(30);
  fill(255, 0, 0); // red
  text(`${wrongGuesses.length} wrong guesses: ${wrongGuesses.join(" ")}`, 100, 200);

  text(`Category: ${curPhrase.category}`, 100, 250);

  if (wrongGuesses.length > 1) {
    text(`Hint: ${curPhrase.hint}`, 100, 300);
  }

  text(`Points per letter: ${perLetterPoints}`, 100, 350);
}

function keyPressed() {
  // print("key pressed is", key);
  if (key >= 'a' && key <= 'z') {
    processGuess(key);
  }
  else if (key === '1') {
    //await spinForPoints();
    spinCount = Math.ceil(random(10, 50));
  }
}

function processGuess(letter) {
  print("You guessed", letter);

  // Find all instances of key in curPhrase
  let result = [];
  let phrase = curPhrase.phrase;
  for (var i = 0; i < phrase.length; i++) {
    if (phrase[i] === letter) {
      result.push(i);
      guess[i] = letter;
    }
  }

  // Check results for matches
  if (result.length > 0) {
    // we found a match
    print("Found matches at indices", result);
  }
  else if (wrongGuesses.includes(letter)) {
    print("You already guessed that!");
  }
  else {
    wrongGuesses.push(letter);
    print("NO MATCH!");
  }
}