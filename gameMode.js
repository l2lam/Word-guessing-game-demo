class GameMode extends Screen {
  constructor(name, desc, game) {
    super();
    this.name = name;
    this.description = desc;
    this.game = game;
  }

  init() {
    this.game.init();
  }

  render() {
    this.game.render();
  }

  paintedButtons() {
    return this.game.paintedButtons();
  }

  returnToPreviousScreen() {
    return this.game.returnToPreviousScreen();
  }

  processKeyInput(key) {
    this.game.processKeyInput(key);
  }
}
