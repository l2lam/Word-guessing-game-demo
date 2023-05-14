//let synth;
let synth = new p5.PolySynth()
let newPuzzleSound,
	puzzleSolvedSound,
	puzzleFailedSound,
	gameOverSound,
	explosionSound

function preLoadSoundFiles() {
	newPuzzleSound = loadSound("assets/positive-logo-opener-13622.mp3")
	newPuzzleSound.setVolume(0.2)
	puzzleSolvedSound = loadSound("assets/goodresult-82807.mp3")
	puzzleFailedSound = loadSound("assets/wah-wah-sad-trombone-6347.mp3")
	gameOverSound = loadSound("assets/10-seconds-loop-2-97528.mp3")
	explosionSound = loadSound("assets/huge-explosion-in-distance-100604.mp3")
}

function playSpinSound(durationSeconds) {
	synth.play("C4", 0.5, 0, durationSeconds)
}

function playScoreSelectedSound() {
	synth.play("C5", 0.8, 0, 1 / 2)
}

function playDuplicateGuessSound() {
	synth.play("B4", 0.8, 0, 1 / 2)
}

function playCorrectGuessSound() {
	synth.play("C5", 0.5, 0, 0.1)
	synth.play("G5", 0.5, 0.2, 0.1)
}

function playIncorrectGuessSound() {
	synth.play("D5", 0.5, 0, 0.3)
	synth.play("C#5", 0.5, 0.3, 0.3)
	synth.play("C5", 0.5, 0.6, 0.3)
	synth.play("B5", 0.5, 0.9, 1.5)
}

function playNewPuzzleSound() {
	if (!newPuzzleSound.isPlaying()) newPuzzleSound.play()
}

function playPuzzleSolvedSound() {
	if (!puzzleSolvedSound.isPlaying()) puzzleSolvedSound.play()
}

function playPuzzleFailedSound() {
	if (!puzzleFailedSound.isPlaying()) puzzleFailedSound.play()
}

function playGameOverSound() {
	if (!gameOverSound.isPlaying()) gameOverSound.play()
}

function playExplosionSound(volume = 1.0) {
	//if (!explosionSound.isPlaying()) {
	explosionSound.setVolume(volume)
	explosionSound.play()
	//}
}
