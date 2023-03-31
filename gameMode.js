class GameMode {
	constructor(name, desc, game) {
		this.name = name
		this.description = desc
		this.game = game
	}

	run() {
		this.game.render()
	}

  setup(phrases) {
    this.game.setup(phrases)
  }
  
	processKeyInput(key) {
		this.game.processKeyInput(key)
	}
}
