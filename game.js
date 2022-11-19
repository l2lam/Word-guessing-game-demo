class Game {
  constructor(phrases, noGuessChar = '_', frameRate = 30) {
    this.noGuessChar = noGuessChar;
    this.frameRate = frameRate;
    this.guess = [];
    this.wrongGuesses = [];
    this.score = 0;
    this.perLetterPoints = 100;
    this.pausePointsDisplay = 0;
    this.spinCount = 0;
    this.pauseFinalPointsDisplay = 0;
    this.phraseCompleteLoop = 0;
    this.level = 1;
    this.phrases = phrases;
    this.numPhrases = this.phrases.length;

    this.selectRandomPhrase();
  }

  isGameOver() {
    return this.level > this.numPhrases;
  }

  // Draw the game screen(s)
  render() {
    if (this.isGameOver()) {
      clear();
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      textSize(70);
      text("Game Over", width / 2 + random(2), height / 2 + random(2));
    }
    // Score spinner display
    else if (this.pauseFinalPointsDisplay > 0) {
      clear();
      fill(0, 255, 0);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("Done!", width / 2, height / 2 - 100);
      textSize(70);
      text(this.perLetterPoints, width / 2, height / 2);
      this.pauseFinalPointsDisplay--;
    }
    else if (this.pausePointsDisplay > 0) {
      clear();
      fill(255, 0, 255);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("Spinning...", width / 2, height / 2 - 100);
      textSize(50);
      text(this.perLetterPoints, width / 2, height / 2);
      this.pausePointsDisplay--;

      // We want to pause the display of the final points selected at the end of the spin cycle.
      if (this.spinCount <= 0 && this.pausePointsDisplay <= 0) {
        this.pauseFinalPointsDisplay = this.frameRate * 3;
        playScoreSelectedSound();
      }
    }
    else if (this.spinCount > 0) {
      this.pausePointsDisplay = Math.ceil((this.spinCount * this.frameRate) / Math.pow(this.spinCount, 2));
      this.perLetterPoints = Math.ceil(random(100, 500));
      this.spinCount--;
      playSpinSound(0.1);
      print('pausepointsdisplay', this.pausePointsDisplay);
    }
    else if (this.phraseCompleteLoop > 0) {
      clear();
      fill(0, 255, 0);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("Yes, way to go!", width / 2, height / 2 - 100);

      textSize(70);
      text(this.curPhrase.phrase, width / 2, height / 2);
      this.phraseCompleteLoop--;
      if (this.phraseCompleteLoop <= 0) {
        // Increment the level and select a new phrase
        this.level++;
        this.selectRandomPhrase();
      }
    }
    else {
      this.renderMainScreen();
    }
  }

  renderMainScreen() {
    clear();
    textAlign(LEFT, BOTTOM);
    textWrap(WORD);

    // Show level
    fill(0, 0, 200); // black
    textSize(20);
    text(`Level ${this.level}`, 100, 40);

    // Show the puzzle
    fill(0, 0, 0); // black
    textSize(50);
    text(this.guess.join(" "), 100, 150);

    // Show the other information
    textSize(20);
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
    if (this.phrases.length > 0) {
      // Choose a phrase at random from the phrase bank
      let phraseIndex = Math.floor(random(0, this.phrases.length));
      this.curPhrase = this.phrases[phraseIndex];
      // Remove the selected phrase from the options so it is not choosen again.
      this.phrases.splice(phraseIndex, 1);

      // Initialize global game values
      this.guess = [];
      this.wrongGuesses = [];

      // Fill the guess array with underscores corresponding to the phrase
      for (let i = 0; i < this.curPhrase.phrase.length; i++) {
        this.guess.push(this.curPhrase.phrase[i] == " " ? " " : this.noGuessChar);
      }
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
    for (let i = 0; i < phrase.length; i++) {
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
      if (this.isPhraseComplete()) {
        this.phraseCompleteLoop = fr * 5;
      }
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

  isPhraseComplete() {
    return !this.guess.includes(this.noGuessChar);
  }
}