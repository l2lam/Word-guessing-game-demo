const BUTTON_WIDTH = 200;
const BUTTON_HEIGHT = 50;
const BUTTON_GAP = 10;

/** A base class for a screen: analogous to a page, scene, etc. */
class Screen {
  constructor(name, description) {
    this._returnToPreviousScreen = false;
	  this.name = name;
	  this.description = description;
  }

  /** Initialization of elements/components/states in the screen */
  init() {}

  /** Renders the content on the canvas to represent the current screen */
  render() {}

  /** Get the list of painted buttons that should be monitored for activity */
  paintedButtons() {
    return [];
  }

  returnToPreviousScreen() {
    return this._returnToPreviousScreen;
  }
}
