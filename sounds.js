//let synth;
let synth = new p5.PolySynth();
let puzzleSolvedSound, puzzleFailedSound, gameOverSound;

function preLoadSoundFiles() {
  puzzleSolvedSound = loadSound('assets/goodresult-82807.mp3');
  puzzleFailedSound = loadSound('assets/wah-wah-sad-trombone-6347.mp3');
  gameOverSound = loadSound('assets/10-seconds-loop-2-97528.mp3');
}

function playSpinSound(durationSeconds) {
  synth.play('C4', 0.5, 0, durationSeconds);
}

function playScoreSelectedSound() {
  synth.play('C5', 0.8, 0, 1 / 2);
}

function playDuplicateGuessSound() {
  synth.play('B4', 0.8, 0, 1 / 2);
}

function playCorrectGuessSound() {
  synth.play('C5', 0.5, 0, 0.1);
  synth.play('G5', 0.5, 0.2, 0.1);
}

function playIncorrectGuessSound() {
  synth.play('D5', 0.5, 0, 0.3);
  synth.play('C#5', 0.5, 0.3, 0.3);
  synth.play('C5', 0.5, 0.6, 0.3);
  synth.play('B5', 0.5, 0.9, 1.5);
}

function playPuzzleSolvedSound() {
  if (!puzzleSolvedSound.isPlaying())
    puzzleSolvedSound.play();
}

function playPuzzleFailedSound() {
  if (!puzzleFailedSound.isPlaying())
    puzzleFailedSound.play();
}

function playGameOverSound() {
  if (!gameOverSound.isPlaying())
    gameOverSound.play();
}
