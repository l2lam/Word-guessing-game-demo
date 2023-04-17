const BUTTON_WIDTH = 200
const BUTTON_HEIGHT = 50
const BUTTON_GAP = 10

/** A base class for a screen: analogous to a page, scene, etc. */
class Screen {
	static BgHorizontalAlign = {
		LEFT: 'Left',
		CENTER: 'Center',
		RIGHT: 'Right',
	}

	static BgVerticalAlign = {
		TOP: 'Top',
		CENTER: 'Center',
		BOTTOM: 'Bottom',
	}

	constructor(
		name,
		description,
		bgColor = null,
		bgImage = null,
		bgHorizontalAlign = Screen.BgHorizontalAlign.CENTER,
		bgVerticalAlign = Screen.BgVerticalAlign.CENTER
	) {
		this._returnToPreviousScreen = false
		this.name = name
		this.bgColor = bgColor
		this.bgImage = bgImage
		this.bgHorizontalAlign = bgHorizontalAlign
		this.bgVerticalAlign = bgVerticalAlign
		this.formattedBgImage = null
		this.description = description
	}

	/** Initialization of elements/components/states in the screen */
	init() {}

	/**
	 * Draw the background to the screen.
	 * Will set a color or image depending on whether {@link bgColor} or
	 * {@link bgImage} are non-null. If both are non-null, sets the background
	 * to {@link bgColor}.
	 */
	drawBackground() {
		if (this.bgColor && this.bgImage) {
			background(this.bgColor)
		} else if (this.bgColor) {
			background(this.bgColor)
		} else if (this.bgImage) {
			// try formatting the background if it isn't null
			if (!this.formattedBgImage) {
				this.formattedBgImage = this.formatBackground()
			}
			// only set the background if the resulting image is non-null
			if (this.formattedBgImage) {
				background(this.formattedBgImage, 100)
			} else {
				print(
					'Error: Screen::drawBackground(): Formatting background image failed.'
				)
			}
		}
	}

	/** Fit the background to the current canvas */
	formatBackground() {
		if (this.bgImage) {
			var modifiedBackground = this.bgImage
			// screen too tall
			if (height > modifiedBackground.height) {
				// scale image proportionally to screen height
				modifiedBackground.resize(0, height)
			}
			// screen too short
			else if (height < modifiedBackground.height) {
				var yPos
				switch (this.bgVerticalAlign) {
					case Screen.BgVerticalAlign.TOP:
						yPos = 0
						break
					case Screen.BgVerticalAlign.CENTER:
						yPos = Math.floor(modifiedBackground.height / 2.0 - height / 2.0)
						break
					case Screen.BgVerticalAlign.BOTTOM:
						yPos = modifiedBackground.height - height
						break
					default:
						print(
							'Invalid vertical alignment specified for background, defaulting to top'
						)
						yPos = 0
				}
				// crop image to screen height and keep width
				modifedBackground = modifiedBackground.get(
					0,
					yPos,
					modifiedBackground.width,
					height
				)
			}
			// screen too wide
			if (width > modifiedBackground.width) {
				// scale image proportionally to screen width
				modifiedBackground.resize(width, 0)
			}
			// screen too thin
			else if (width < modifiedBackground.width) {
				var xPos
				switch (this.bgHorizontalAlign) {
					case Screen.BgHorizontalAlign.LEFT:
						xPos = 0
						break
					case Screen.BgHorizontalAlign.CENTER:
						xPos = Math.floor(modifiedBackground.width / 2.0 - width / 2.0)
						break
					case Screen.BgHorizontalAlign.RIGHT:
						xPos = modifiedBackground.width - width
						break
					default:
						print(
							'Invalid horizontal alignment specified for background, defaulting to left'
						)
						xPos = 0
				}
				// crop image to screen width and keep height
				modifiedBackground = modifiedBackground.get(
					xPos,
					0,
					width,
					modifiedBackground.height
				)
			}
			return modifiedBackground
		} else {
			// perform no operation to the background
			return this.bgImage
		}
	}

	/** Renders the content on the canvas to represent the current screen */
	render() {}

	/** Get the list of painted buttons that should be monitored for activity */
	paintedButtons() {
		return []
	}

	/** To be called when returning to previous screen */
	onReturnToPreviousScreen() {}

	returnToPreviousScreen() {
		return this._returnToPreviousScreen
	}

	/** Reformat background image to current canvas size. */
	resizeBackground() {
		this.formattedBgImage = this.formatBackground()
		this.drawBackground()
	}
}
