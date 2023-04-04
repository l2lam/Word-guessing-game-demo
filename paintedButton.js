/** Fake button (painted on the canvas) */
class PaintedButton {
  constructor(
    label,
    xCenterPosition,
    yCenterPosition,
    radius,
    onClickHandler,
    customStylerCallback = null
  ) {
    this.label = label;
    this.x = xCenterPosition;
    this.y = yCenterPosition;
    this.radius = radius;
    this.onClickHandler = onClickHandler;
    this.customStylerCallback = customStylerCallback;
  }

  render() {
    push();
    textSize(16);
    stroke("black");
    fill("red");
    if (this.customStylerCallback) this.customStylerCallback();
    circle(this.x, this.y, this.radius * 2);
    textAlign(CENTER);
    text(this.label, this.x, this.y);
    pop();
  }

  checkForClick(x, y) {
    let distance = dist(x, y, this.x, this.y);
    if (distance < this.radius) {
      this.onClickHandler();
    }
  }
}
