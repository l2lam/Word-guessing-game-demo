class Phrase {
  constructor(phrase, hint, category, mass) {
    this.phrase = phrase;
    this.hint = hint;
    this.category = category;
    this.atomicMass = mass;
  }
}

let phrases = [
  new Phrase("fox in a box", "starts with f", "saying"),
  new Phrase("dog", "woof!", "thing"),
  new Phrase("cat", "meow!", "thing"),
];

let curPhrase;
let guess, wrongGuesses;

function setup() {
	// Make the drawing canvase as big as the window
	createCanvas(windowWidth, windowHeight);
	
	// Set the RGB background colour
	background(250,250,250);
	
	// Set the frame rate
	frameRate(1);
	
	// initiate game
	selectRandomPhrase();
}

function selectRandomPhrase() {
	let phraseIndex = Math.floor(random(0, phrases.length));
	print("index is ", phraseIndex);
	curPhrase = phrases[phraseIndex];
	guess = [];
	wrongGuesses = [];
	for(let i = 0; i < curPhrase.phrase.length; i++) {
		guess.push(curPhrase.phrase[i] == " " ? " " : "_"); 
		print(i, guess[i]);
	}
}

function draw() {
	clear();
	fill(0,0,0); // black
	textSize(50);
	//text(curPhrase, 100, 60);
	text(guess.join(" "), 100, 150);	

  textSize(30);
	fill(255,0,0); // red
	text(`${wrongGuesses.length} wrong guesses: ${wrongGuesses.join(" ")}`, 100, 200);

  text(`Category: ${curPhrase.category}`, 100, 250);
  
    if (wrongGuesses.length > 1) {
      text(`Hint: ${curPhrase.hint}`, 100, 300);
    }
}

function keyPressed() {
	// print("key pressed is", key);
  if (key >= 'a' && key <= 'z') { 
		print("You guessed", key);
		
		// Find all instances of key in curPhrase
		let result = [];
    let phrase = curPhrase.phrase;
		for(var i=0; i < phrase.length; i++) {
    	if (phrase[i] === key) {
				result.push(i);
				guess[i] = key;
			}
		}
		
		// Check results for matches
		if (result.length > 0) {
			// we found a match
			print("Found matches at indices", result);
		}
		else if (wrongGuesses.includes(key)) {
			print("You already guessed that!");
		}
		else {
			wrongGuesses.push(key);
			print("NO MATCH!");
		}
  }
}
