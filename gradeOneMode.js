class gradeOneGame extend game(){
  constructor(phrases, noGuessChar = '_', lives = 5, bgImage = null){
    super(phrases, noGuessChar, lives, bgImage)
  }
  
  gameStatSolved(){
  if (this.score > 300){
    
  }
  this.drawSolvedMessage()
	this.level++
	this.gotoNextLevel()
	playPuzzleSolvedSound()
	this.pause(3000)
  }
}
