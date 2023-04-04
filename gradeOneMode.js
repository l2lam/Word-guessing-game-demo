class gradeOneGame extends game(){
  constructor(phrases, noGuessChar = '_', lives = 5, bgImage = null){
    super(phrases, noGuessChar, lives, bgImage)
  }
  
  gameStatSolved(){
  if (this.score > 300){
    
  }else if (this.score >= 3000){
    
  }else if (this.score >= 700){
    
  }else if (this.score > 1500){
    
  }else if (this.score > 500){
    
  }
  this.drawSolvedMessage()
	this.level++
	this.gotoNextLevel()
	playPuzzleSolvedSound()
	this.pause(3000)
  }
}
