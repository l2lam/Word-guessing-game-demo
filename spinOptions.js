class SpinOption {
	constructor(perLetterScore) {
		this.perLetterScore = perLetterScore
	}

	// Returns a modified score based on the current score
	newScore(currentScore) {
		return currentScore
	}

	// Display the value that represents this spin option
	displaySpinValue() {
		drawMessage('Spinning', this.perLetterScore)
		playSpinSound(0.1)
	}

	// Displays the final result and returns true if end of sequence (milliseconds)
	displayResult(sequenceMS, currentScore) {
		if (sequenceMS < 1000) playScoreSelectedSound()
		drawMessage(`New Per-Letter Score`, this.perLetterScore)
		return sequenceMS > 3000
	}
}

const BANKRUPT_PHASE1_MS = 3000
const BANKRUPT_PHASE2_MS = 6000
class BankruptSpinOption extends SpinOption {
	constructor(name, perLetterScore) {
		super(perLetterScore)
		this.name = name
		// this.image = random(['💩', '☠️', '😵', '👼'])
	}

	newScore(currentScore) {
		return 0 // wipe out all the score!
	}

	displaySpinValue() {
		drawMessage('Spinning', this.image)
		playSpinSound(0.1)
	}

	displayResult(sequenceMS, currentScore) {
		if (sequenceMS < 1000) playIncorrectGuessSound()
		if (sequenceMS < BANKRUPT_PHASE1_MS) {
			drawMessage('Oh Noooose...', this.image)
		} else if (sequenceMS < BANKRUPT_PHASE2_MS) {
			drawMessage('Your Score', 0)
		}
		return sequenceMS > BANKRUPT_PHASE2_MS
	}
}

class LooseTurnSpinOption extends SpinOption {
	constructor() {
		super(0) // A per letter score indicates loose your turn
	}

	displaySpinValue() {
		drawMessage('Spinning', 'Lose Turn')
		playSpinSound(0.1)
	}
}
