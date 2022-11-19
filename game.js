const GameStates = {
  GUESSING: "Guessing",
  CORRECT_GUESS: "A letter is guessed correctly",
  GAME_OVER: "Game over",
  SPINNING: "Spinning for points",
  //  PAUSE_POINT_SELECTION: "Pause to show point currently selected",
  //  PAUSE_FINAL_POINT_SELECTION: "Pause to show final points selected",
  SOLVED: "Puzzle solved",
};

class Game {
  constructor(phrases, noGuessChar = '_', frameRate = 30) {
    this.noGuessChar = noGuessChar;
    this.frameRate = frameRate;
    this.guess = [];
    this.wrongGuesses = [];
    this.score = 0;
    this.perLetterPoints = 100;
    this.spinCount = 0; // The number of times to spin for points
    this.level = 1; // The current level
    this.phrases = phrases; // The total number of phrases in the game
    this.numPhrases = this.phrases.length;
    this.correctLetterIndices = [];
    this.pauseUntilMilliSecond = 0; // The # of ms since the program started to pause until

    this.selectRandomPhrase();
  }

  gameState() {
    if (this.level > this.numPhrases) return GameStates.GAME_OVER;
    if (this.spinCount > 0) return GameStates.SPINNING;
    if (!this.guess.includes(this.noGuessChar)) return GameStates.SOLVED;
    if (this.correctLetterIndices.length > 0) return GameStates.CORRECT_GUESS;
    return GameStates.GUESSING;
  }

  pause(ms) {
    this.pauseUntilMilliSecond = millis() + ms;
  }

  isGameOver() {
    return this.level > this.numPhrases;
  }
  isPhraseComplete() {
    return !this.guess.includes(this.noGuessChar);
  }

  // Draw the game screen(s)
  render() {
    if (this.pauseUntilMilliSecond > millis()) {
      // Do nothing - ie. pause rendering
    }
    else {
      switch (this.gameState()) {
        case GameStates.GAME_OVER:
          this.drawGameOver();
          break;
          
        case GameStates.SPINNING:
          this.perLetterPoints = Math.ceil(random(100, 500));
          let pauseMS = Math.ceil((this.spinCount * 500) / Math.pow(this.spinCount, 2));

          this.spinCount--;
          if (this.spinCount == 0) {
            this.drawFinalSpinPoints();
            pauseMS = 3000;
            playScoreSelectedSound();
          }
          else {
            this.drawSpinPoints();
            playSpinSound(0.1);
          }
          this.pause(pauseMS);
          break;
          
        case GameStates.SOLVED:
          this.drawSolvedMessage();
          this.level++;
          this.selectRandomPhrase();
          this.pause(3000);
          break;
          
        case GameStates.CORRECT_GUESS:
          let index = this.correctLetterIndices.shift();
          this.guess[index] = this.curPhrase.phrase[index];
          this.score += this.perLetterPoints;
          playCorrectGuessSound();
          this.pause(1000);
          // Intentionally pass through to draw the main screen.
          
        default:
          this.drawMainScreen();
          break;
      }
    }
  }

  drawMainScreen() {
    clear();
    textAlign(LEFT, BOTTOM);
    textWrap(WORD);

    // Show level
    fill(0, 0, 200); // black
    textSize(20);
    text(`Level ${this.level} - ${this.curPhrase.category}`, 100, 40);

    // Show the puzzle
    fill(0, 200, 200); // black
    textSize(15);
    text("Guess what's hidden!", 100, 80);
    fill(0, 0, 0); // black
    textSize(50);
    text(this.guess.join(" "), 100, 150);

    // Show the other information
    textSize(20);
    fill(255, 0, 0); // red
    text(`${this.wrongGuesses.length} wrong guesses: ${this.wrongGuesses.join(" ")}`, 100, 200);

    if (this.wrongGuesses.length > 1) {
      text(`Hint: ${this.curPhrase.hint}`, 100, 300);
    }

    text(`Points per letter: ${this.perLetterPoints}`, 100, 350);
    this.drawScore();
  }

  drawSpinPoints() {
    clear();
    fill(255, 0, 255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Spinning...", width / 2, height / 2 - 100);
    textSize(50);
    text(this.perLetterPoints, width / 2, height / 2);
  }

  drawFinalSpinPoints() {
    clear();
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Done!", width / 2, height / 2 - 100);
    textSize(70);
    text(this.perLetterPoints, width / 2, height / 2);
  }

  drawSolvedMessage() {
    clear();
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    textSize(30);
    let message = random(["Way to go!", "Yes, you so good yo!", "I love you!", "Well done!"]);
    text(message, width / 2, height / 2 - 100);

    textSize(70);
    text(this.curPhrase.phrase, width / 2, height / 2);
  }

  drawGameOver() {
    clear();
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(70);
    text("Game Over", width / 2 + random(2), height / 2 + random(2));
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
    this.correctLetterIndices = [];
    let phrase = this.curPhrase.phrase;
    for (let i = 0; i < phrase.length; i++) {
      if (phrase[i] === letter) {
        if (this.guess[i] === letter) {
          // Already guessed that!
          playIncorrectGuessSound();
          break;
        }
        else
          this.correctLetterIndices.push(i);
      }
    }

    // Check results for matches
    if (this.correctLetterIndices.length == 0) {
      if (this.wrongGuesses.includes(letter)) {
        print("You already guessed that!");
        playIncorrectGuessSound();
      }
      else {
        this.wrongGuesses.push(letter);
        this.score -= this.perLetterPoints;
        print("NO MATCH!");
        playIncorrectGuessSound();
      }
    }
  }
}