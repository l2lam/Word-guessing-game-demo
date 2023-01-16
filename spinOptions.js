class SpinOption {
	constructor(perLetterScore) {
		this.perLetterScore = perLetterScore
	}

	// Returns the new per-letter score
	newPerLetterScore(currentPerLetterScore) {
		return this.perLetterScore
	}

	// Returns a modified score based on the current score
	newScore(currentScore) {
		return currentScore
	}

	// Displays the final result and returns true if end of sequence (milliseconds)
	displayResult(sequenceMS, currentScore) {
		drawMessage(`New Per-Letter Score`, this.perLetterScore)
		return sequenceMS > 3000
	}
}

const BANKRUPT_PHASE1_MS = 1500
const BANKRUPT_PHASE2_MS = 5000
class BankruptSpinOption extends SpinOption {
	constructor(perLetterScore) {
		super(perLetterScore)
	}

	newScore(currentScore) {
		return 0
	}

	displayResult(sequenceMS, currentScore) {
		if (sequenceMS < BANKRUPT_PHASE1_MS) drawMessage('Oh Nooose', currentScore)
		else if (sequenceMS < BANKRUPT_PHASE2_MS) {
			drawMessage(
				'Your Score',
				Math.ceil(
					currentScore -
						(currentScore / (BANKRUPT_PHASE2_MS - BANKRUPT_PHASE1_MS)) * (sequenceMS - BANKRUPT_PHASE1_MS)
				)
			)
		}
		return sequenceMS > BANKRUPT_PHASE2_MS
	}
}
