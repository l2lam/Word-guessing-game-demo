/** A base class for a screen: analogous to a page, scene, etc. */
class Screen {
  /** Renders the content on the canvas to represent the current screen */
  render() {}

  /** Get the list of painted buttons that should be monitored for activity */
  paintedButtons() {
    return [];
  }
}
