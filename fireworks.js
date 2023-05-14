let fireworks = []

class Firework {
	constructor(intensity = 1.0) {
		this.intensity = intensity
		this.hu = random(255)
		this.firework = new Particle(random(width), height, this.hu, true)
		this.exploded = false
		this.particles = []
		this.gravity = createVector(0, 0.3)
	}

	done() {
		if (this.exploded && this.particles.length === 0) {
			return true
		} else {
			return false
		}
	}
	update() {
		//firstUpdate
		if (!this.exploded) {
			this.firework.applyForce(this.gravity)
			this.firework.update()
			if (this.firework.vel.y >= 0) {
				this.exploded = true
				this.explode()
			}
		}
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].applyForce(this.gravity)
			this.particles[i].update()
			if (this.particles[i].done()) {
				this.particles.splice(i, 1)
			}
		}
	}

	explode() {
		playExplosionSound(this.intensity)
		for (var i = 0; i < 100; i++) {
			var p = new Particle(
				this.firework.pos.x,
				this.firework.pos.y,
				this.hu,
				false
			)
			this.particles.push(p)
		}
	}
	show() {
		if (!this.exploded) {
			this.firework.show()
		}
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].show()
		}
	}
}

function drawFireworks(message = "", intensity = 1.0, volume = 0.03) {
	colorMode(RGB)
	background(0, 0, 0, 25)
	if (message) {
		textAlign(CENTER, CENTER)
		textSize(50)
		text(message, width / 2, height / 2)
	}

	if (random(1) < volume) {
		fireworks.push(new Firework(intensity))
	}

	for (var i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update()
		fireworks[i].show()
		if (fireworks[i].done()) fireworks.splice(i, 1)
	}
}

class Particle {
	constructor(x, y, hu, firework) {
		this.pos = createVector(x, y)
		this.firework = firework
		this.lifespan = 255
		this.hu = hu

		if (this.firework) {
			this.vel = createVector(0, random(-12, -22))
		} else {
			this.vel = p5.Vector.random2D()
			this.vel.mult(random(2, 10))
		}
		this.acc = createVector(0, 0)
	}

	applyForce(force) {
		this.acc.add(force)
	}

	update() {
		//second update
		if (!this.firework) {
			this.vel.mult(0.9)
			this.lifespan -= 4
		}
		this.vel.add(this.acc)
		this.pos.add(this.vel)
		this.acc.mult(0)
	}
	done() {
		if (this.lifespan < 0) {
			return true
		} else {
			return false
		}
	}
	show() {
		push()
		colorMode(HSB)
		if (!this.firework) {
			strokeWeight(2)
			stroke(this.hu, 255, 255, this.lifespan)
		} else {
			strokeWeight(4)
			stroke(this.hu, 255, 255)
		}
		point(this.pos.x, this.pos.y)
		pop()
	}
}
