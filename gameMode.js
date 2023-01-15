class GameMode{
    constructor(name, desc, bg, game) {
        this.name = name;
        this.description = desc;
        this.bg = bg;
        this.game = game;
    }

    run() {
        background(this.bg, 100);
        this.game.render();
    }
  processKeyInput(key) {
    this.game.processKeyInput(key);
  }
}