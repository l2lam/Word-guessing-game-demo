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
		this.label = label
		this.x = xCenterPosition
		this.y = yCenterPosition
		this.radius = radius
		this.onClickHandler = onClickHandler
		this.customStylerCallback = customStylerCallback
	}

	render() {
		push()
		textSize(16)
		stroke("black")
		fill("pink")
		if (this.customStylerCallback) this.customStylerCallback()
		circle(this.x, this.y, this.radius * 2)
		textAlign(CENTER)
		fill("black")
		text(this.label, this.x, this.y)
		pop()
	}

	checkForClick(x, y) {
		let distance = dist(x, y, this.x, this.y)
		if (distance < this.radius) {
			this.onClickHandler()
		}
	}
}

class RectangularPaintedButton extends PaintedButton {
	constructor(
		label,
		xCenterPosition,
		yCenterPosition,
		radius,
		onClickHandler,
		customStylerCallback = null
	) {
		super(
			label,
			xCenterPosition,
			yCenterPosition,
			radius,
			onClickHandler,
			customStylerCallback
		)
		this.height = 50
	}

	render() {
		push()
		textSize(16)
		stroke("black")
		fill(250, 150, 150)
		if (this.customStylerCallback) this.customStylerCallback()
		let rectX = this.x - this.radius
		let rectY = this.y - this.height / 2
		rect(rectX, rectY, this.radius * 2, this.height, 20)
		textAlign(CENTER)
		fill("black")
		text(this.label, this.x, this.y)
		pop()
	}

	checkForClick(x, y) {
		if (
			x > this.x - this.radius &&
			x < this.x + this.radius &&
			y > this.y - this.height / 2 &&
			y < this.y + this.height / 2
		) {
			this.onClickHandler()
		}
	}
}
