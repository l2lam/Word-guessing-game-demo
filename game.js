const GameStates = {
	GUESSING: 'Guessing',
	CORRECT_GUESS: 'A letter is guessed correctly',
	INCORRECT_GUESS: 'A letter is guessed incorrectly',
	GAME_OVER: 'Game over',
  GAME_WIN: 'You win',
	PUZZLE_UNSUCCESSFUL: 'Failed to complete the puzzle',
	SPINNING: 'Spinning for points',
	SPINNING_FINISHED: 'Spinning completed',
	SOLVED: 'Puzzle solved',
}

const targetScore = 1000;


class Game {
	constructor(phrases, noGuessChar = '_', lives = 3, bgImage = null) {
		this.bgImage = bgImage
		this.noGuessChar = noGuessChar
		this.livesPerRound = lives
		this.livesRemaining = 0
		this.guess = []
		this.wrongGuesses = []
		this.score = 0
		this.currentSpinOption = new SpinOption(100)
		this.spinCount = 0 // The number of times to spin for points
		this.spinResultSequence = 0
		this.level = 1 // The current level
		this.phrases = phrases.slice() // Copy the original list of phrases
		this.numPhrases = this.phrases.length // The total number of phrases in the game
		this.correctLetterIndices = []
		this.incorrectGuessChar = null
		this.pauseUntilMilliSecond = 0 // The # of ms since the program started to pause until
		this.puzzleRevealCountdown = 0
    this.buttonReturnMenu = createButton('Return to menu')
    this.buttonReturnMenu.hide()
    this.buttonReturnMenu.mousePressed(() => {state = SELECT_MODE_STATE
    this.buttonReturnMenu.hide()                                    
    this.resetGame()
                                              })
		this.spinOptions = [
			new SpinOption(100),
			new SpinOption(200),
			new SpinOption(300),
			new SpinOption(500),
			new SpinOption(1000),
			new BankruptSpinOption(100),
		]

		this.gotoNextLevel()
	}

	gameState() {
		if (this.level > this.numPhrases) return GameStates.GAME_OVER
		if (this.spinCount > 0) return GameStates.SPINNING
		if (this.spinResultSequence > 0) return GameStates.SPINNING_FINISHED
		if (!this.guess.includes(this.noGuessChar)) return GameStates.SOLVED
		if (this.correctLetterIndices.length > 0) return GameStates.CORRECT_GUESS
		if (this.incorrectGuessChar != null) return GameStates.INCORRECT_GUESS
		if (this.livesRemaining <= 0) return GameStates.PUZZLE_UNSUCCESSFUL
    if (this.score >= targetScore) return GameStates.GAME_WIN
		return GameStates.GUESSING
	}

	pause(ms) {
		this.pauseUntilMilliSecond = millis() + ms
	}

	// Draw the game screen(s)
  resetGame() {
    this.livesRemaining = 0
		this.guess = []
		this.wrongGuesses = []
		this.score = 0
		this.currentSpinOption = new SpinOption(100)
		this.spinCount = 0 // The number of times to spin for points
		this.spinResultSequence = 0
		this.level = 1 // The current level
		this.phrases = phrases.slice() // Copy the original list of phrases
		this.numPhrases = this.phrases.length // The total number of phrases in the game
		this.correctLetterIndices = []
		this.incorrectGuessChar = null
		this.pauseUntilMilliSecond = 0 // The # of ms since the program started to pause until
		this.puzzleRevealCountdown = 0
  }
  
	render() {
		if (this.pauseUntilMilliSecond > millis()) {
			// Do nothing - ie. pause rendering
		} else {
			switch (this.gameState()) {
				case GameStates.GAME_OVER:
					this.drawGameOver()
					playGameOverSound()
					break

        case GameStates.GAME_WIN:
          this.drawWinScreen()
          break

				case GameStates.SPINNING:
					let option = random(this.spinOptions)
					let pauseMS = Math.ceil((this.spinCount * 400) / Math.pow(this.spinCount, 1.5))

					this.spinCount--
					if (this.spinCount == 0) {
						this.currentSpinOption = option
						this.spinResultSequence = millis() // Start the spin-finished process
					} else {
						option.displaySpinValue()
					}
					this.pause(pauseMS)
					break

				case GameStates.SPINNING_FINISHED:
					if (this.currentSpinOption.displayResult(millis() - this.spinResultSequence, this.score)) {
						this.spinResultSequence = 0
						this.score = this.currentSpinOption.newScore(this.score)
					} else this.pause(100)
					break

				case GameStates.SOLVED:
					this.drawSolvedMessage()
					this.level++
					this.gotoNextLevel()
					playPuzzleSolvedSound()
					this.pause(3000)
					break

				case GameStates.PUZZLE_UNSUCCESSFUL:
					this.drawFailedMessage()
					playPuzzleFailedSound()
					this.score = 0
					this.gotoNextLevel()
					this.pause(5000)
					break

				case GameStates.INCORRECT_GUESS:
					this.drawIncorrectGuessMessage()
					this.wrongGuesses.push(this.incorrectGuessChar)
					this.livesRemaining--
					this.incorrectGuessChar = null
					playIncorrectGuessSound()
					this.pause(2000)
					break

				case GameStates.CORRECT_GUESS:
					let index = this.correctLetterIndices.shift()
					this.guess[index] = this.curPhrase.phrase[index]
					this.score += this.currentSpinOption.perLetterScore
					playCorrectGuessSound()
					this.pause(1000)
				// Intentionally pass through to draw the main screen.

				default:
					this.drawMainScreen()
					break
			}
		}
	}

	drawBackground() {
		if (this.bgImage) background(this.bgImage, 100)
	}

	drawMainScreen() {
		this.drawBackground()
		this.drawTopBar()
		this.drawPuzzle()
		this.drawBottomBar()
	}

  drawWinScreen() {
    this.buttonReturnMenu.size(BUTTON_WIDTH, BUTTON_HEIGHT)
		this.buttonReturnMenu.style('font-size', '24px')
		this.buttonReturnMenu.position((width - BUTTON_WIDTH) / 2, height / 2)
    this.buttonReturnMenu.show()
  }

	drawSolvedMessage() {
		drawMessage(
			random(['Way to go!', 'Awesome', 'Wonderful', 'Yes, you so good yo!', 'I love you!', 'Well done!']),
			this.curPhrase.phrase
		)
	}

	drawFailedMessage() {
		drawMessage(
			random(['Too bad, so sad', 'Nope, better luck next time!', 'Booo!', 'Nope, fail', 'Oh poop']),
			this.curPhrase.phrase
		)
	}

	drawGameOver() {
		this.drawBackground()
		fill(255, 0, 0)
		textAlign(CENTER, CENTER)
		textSize(70)
		text('Game Over', width / 2 + random(2), height / 2 + random(2))
	}

	drawIncorrectGuessMessage() {
		drawMessage('There is no...', this.incorrectGuessChar)
	}

	drawPuzzle() {
		textAlign(LEFT, CENTER)
		textWrap(WORD)
		fill(0, 0, 0)
		textSize(50)
		let puzzle = this.guess
		if (this.puzzleRevealCountdown > 0) {
			puzzle = []
			this.guess.forEach((c, i) =>
				puzzle.push(c === ' ' ? c : ['Ò', 'Ó', 'Ô', 'Õ', 'Ö'][(i + this.puzzleRevealCountdown) % 5])
			)
			this.puzzleRevealCountdown--
			playNewPuzzleSound()
			//this.pause(100);
		}
		text(puzzle.join(' '), MARGIN, LINE_SPACING * 4, width - 2 * MARGIN)
	}

	drawBottomBar() {
		this.drawInstructions()
		fill(50, 50, 50, 180)
		rect(5, LINE_SPACING * 6, width - 10, LINE_SPACING * 12, 70)
		textSize(20)
		fill(255, 100, 100)
		text(
			`${this.wrongGuesses.length} wrong guesses: ${this.wrongGuesses.join(' ')}`,
			width / 2,
			LINE_SPACING * 8
		)

		text(`Points per letter: ${this.currentSpinOption.perLetterScore}`, width / 2, LINE_SPACING * 9)

		if (this.wrongGuesses.length > 1) {
			text(`Hint: ${this.curPhrase.hint}`, width / 2, LINE_SPACING * 10)
		}
		this.drawTargetScore()
	}

	drawTopBar() {
		// Show level, score, lives
		fill(50, 50, 50, 180)
		rect(5, 5, width - 10, LINE_SPACING * 2, 70)
		this.drawLevel()
		this.drawScore()
		this.drawLivesRemaining()
		this.drawCategory()
	}

	drawInstructions() {
		textAlign(CENTER, CENTER)
		fill(0, 200, 200)
		textSize(15)
		text(
			"Guess what's hidden!  Press <F4> to spin for points, <F2> to restart the game",
			width / 2,
			LINE_SPACING * 6.5
		)
	}

	drawCategory() {
		textAlign(CENTER, CENTER)
		fill(0, 200, 200)
		textSize(20)
		text(this.curPhrase.category, width / 2, LINE_SPACING * 1.7)
	}

	drawLevel() {
		textAlign(CENTER, CENTER)
		fill(150, 150, 200)
		textSize(10)
		text('LEVEL', MARGIN * 2, LINE_SPACING - 25)
		textSize(30)
		fill(255, 255, 250)
		strokeWeight(4)
		text(this.level, MARGIN * 2, LINE_SPACING)
	}

	drawScore() {
		textAlign(CENTER, CENTER)
		fill(150, 150, 200)
		textSize(10)
		text('SCORE', width / 2, LINE_SPACING - 25)
		textSize(30)
		fill(255, 255, 250)
		strokeWeight(4)
		text(this.score, width / 2, LINE_SPACING)
	}

	drawTargetScore() {
		textAlign(CENTER, CENTER)
		textSize(30)
		fill(255, 255, 250)
		strokeWeight(4)
		text('You need a total of ' + targetScore + ' points to win.', width / 2, LINE_SPACING * 10)
		text('Only ' + (targetScore - this.score) + ' points to go!', width / 2, LINE_SPACING * 11)
	}

	drawLivesRemaining() {
		textAlign(CENTER, CENTER)
		fill(150, 150, 200)
		textSize(10)
		text('LIVES', width - MARGIN * 2, LINE_SPACING - 25)
		textSize(32)
		fill(255, 30, 30)
		strokeWeight(4)
		text('❤️'.repeat(this.livesRemaining), width - MARGIN * 2, LINE_SPACING)
	}

	gotoNextLevel() {
		if (this.phrases.length > 0) {
			// Choose a phrase at random from the phrase bank
			let phraseIndex = Math.floor(random(0, this.phrases.length))
			this.curPhrase = this.phrases[phraseIndex]
			// Remove the selected phrase from the options so it is not choosen again.
			this.phrases.splice(phraseIndex, 1)

			// Initialize global game values
			this.guess = []
			this.wrongGuesses = []
			this.livesRemaining = this.livesPerRound

			// Fill the guess array with underscores corresponding to the phrase
			for (let i = 0; i < this.curPhrase.phrase.length; i++) {
				this.guess.push(this.curPhrase.phrase[i] == ' ' ? ' ' : this.noGuessChar)
			}
			this.puzzleRevealCountdown = this.curPhrase.phrase.length
		}
	}

	// React to an input character
	processKeyInput(keyPressed) {
		if (this.gameState() == GameStates.GUESSING) {
			if (keyPressed.match(/^[a-z0-9+-=?']$/i)) {
				this.processGuess(keyPressed)
			} else if (keyPressed === 'F4') {
				//await spinForPoints();
				this.spinCount = Math.ceil(random(30, 60))
			}
		}
	}

	processGuess(letter) {
		// Find all instances of key in curPhrase
		this.correctLetterIndices = []
		let phrase = this.curPhrase.phrase
		for (let i = 0; i < phrase.length; i++) {
			if (phrase[i] === letter) {
				if (this.guess[i] === letter) {
					// Already guessed that!
					playDuplicateGuessSound()
					return
				} else this.correctLetterIndices.push(i)
			}
		}

		// Check results for matches
		if (this.correctLetterIndices.length == 0) {
			if (this.wrongGuesses.includes(letter)) {
				playDuplicateGuessSound()
			} else {
				this.incorrectGuessChar = letter
			}
		}
	}
}


