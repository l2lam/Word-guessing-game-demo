class Game {
  constructor(phrases, noGuessChar = '_') {
    this.noGuessChar = noGuessChar;
    this.guess = [];
    this.wrongGuesses = [];
    this.score = 0;
    this.perLetterPoints = 100;
    this.pausePointsDisplay = 0;
    this.spinCount = 0;
    this.pauseFinalPointsDisplay = 0;

    this.phrases = phrases;
    this.selectRandomPhrase();
  }

  // Draw the game screen(s)
  render() {
    // Score spinner display
    if (this.pauseFinalPointsDisplay > 0) {
      fill(255, 0, 255);
      rect(0, 0, 200, 200);
      fill(0, 255, 0);
      textSize(70);
      text(this.perLetterPoints, 50, 100);
      this.pauseFinalPointsDisplay--;
    }
    else if (this.pausePointsDisplay > 0) {
      fill(0, 255, 0);
      rect(0, 0, 200, 200);
      fill(255, 0, 255);
      textSize(50);
      text(this.perLetterPoints, 50, 100);
      this.pausePointsDisplay--;

      // We want to pause the display of the final points selected at the end of the spin cycle.
      if (this.spinCount <= 0 && this.pausePointsDisplay <= 0) {
        this.pauseFinalPointsDisplay = fr * 5;
        playScoreSelectedSound();
      }
    }
    else if (this.spinCount > 0) {
      this.pausePointsDisplay = Math.ceil(fr / Math.pow(this.spinCount, 3));
      this.perLetterPoints = Math.ceil(random(100, 500));
      this.spinCount--;
      playSpinSound();
    }
    else {
      this.renderMainScreen();
    }
  }

  renderMainScreen() {
    clear();
    fill(0, 0, 0); // black
    textSize(50);
    //text(curPhrase, 100, 60);
    text(this.guess.join(" "), 100, 150);

    textSize(30);
    fill(255, 0, 0); // red
    text(`${this.wrongGuesses.length} wrong guesses: ${this.wrongGuesses.join(" ")}`, 100, 200);

    text(`Category: ${this.curPhrase.category}`, 100, 250);

    if (this.wrongGuesses.length > 1) {
      text(`Hint: ${this.curPhrase.hint}`, 100, 300);
    }

    text(`Points per letter: ${this.perLetterPoints}`, 100, 350);
    this.drawScore();
  }

  drawScore() {
    fill(0, 0, 0); // black
    text(`Total Score: ${this.score}`, 100, 400);
  }

  selectRandomPhrase() {
    // Choose a phrase at random from the phrase bank
    let phraseIndex = Math.floor(random(0, this.phrases.length));
    this.curPhrase = this.phrases[phraseIndex];

    // Initialize global game values
    this.guess = [];
    this.wrongGuesses = [];
    this.score = 0;

    // Fill the guess array with underscores corresponding to the phrase
    for (let i = 0; i < this.curPhrase.phrase.length; i++) {
      this.guess.push(this.curPhrase.phrase[i] == " " ? " " : this.noGuessChar);
    }
  }
  // React to an input character
  processKeyInput(keyPressed) {
    if (keyPressed.match(/^[a-z0-9+-=]+$/i)) {
      this.processGuess(keyPressed);
    }
    else if (keyPressed === '`') {
      //await spinForPoints();
      this.spinCount = Math.ceil(random(10, 50));
    }
  }

  processGuess(letter) {
    // Find all instances of key in curPhrase
    let result = [];
    let phrase = this.curPhrase.phrase;
    for (var i = 0; i < phrase.length; i++) {
      if (phrase[i] === letter) {
        result.push(i);
        if (this.guess[i] === letter) {
          // Already guessed that!
          playIncorrectGuessSound();
        }
        else {
          this.score += this.perLetterPoints;
          this.guess[i] = letter;
          playCorrectGuessSound();
        }
      }
    }

    // Check results for matches
    if (result.length > 0) {
      // we found a match
      //print("Found matches at indices", result);
    }
    else if (this.wrongGuesses.includes(letter)) {
      print("You already guessed that!");
      playIncorrectGuessSound();
    }
    else {
      this.wrongGuesses.push(letter);
      print("NO MATCH!");
      playIncorrectGuessSound();
    }
  }
}