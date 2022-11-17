//let synth;
let synth = new p5.PolySynth();
function playSpinSound() {
  synth.play('C4', 0.5, 0, 1/8);
}

function playScoreSelectedSound() {
  synth.play('C5', 0.8, 0, 1/2);
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
