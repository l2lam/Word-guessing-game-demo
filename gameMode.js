class GameMode extends Screen {
  constructor(name, desc, game) {
    super();
    this.name = name;
    this.description = desc;
    this.game = game;
  }

  render() {
    this.game.render();
  }

  paintedButtons() {
    return this.game.paintedButtons();
  }

  processKeyInput(key) {
    this.game.processKeyInput(key);
  }
}
