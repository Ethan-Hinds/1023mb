class Rocket {

    constructor(dna, population, magnitude) {
        this.population = population;
        this.magnitude = magnitude;
	    this.width = 10;
        this.height = 50;

        this.position = createVector(width/2, height/2 + r);

        this.velocity = {
            dx: 1,
            dy: 0
        }
        this.dna;

        this.crashed = false;
        this.crashedTime = 0;

        if (dna) {
            this.dna = dna;
        } else {
            this.dna = [];
            for (let i = 0; i < lifeSpan; i += 1) {
                let dx = random(-1, 1);
                let dy = random(-1, 1);

                let m = sqrt(dx**2 + dy**2);
                dx = dx/m * this.magnitude;
                dy = dy/m * this.magnitude;
                this.dna.push({dx: dx, dy: dy});
            }
        }

        this.maxDist = 0;
    }

	show() {
		fill(255, 255, 255, 150);
        ellipse(this.position.x, this.position.y, 10, 10);
		// push();
		// translate(this.position.x, this.position.y);
		// rotate(atan(-this.velocity.dx/this.velocity.dy));
		// rectMode(CENTER);
		// rect(0, 0, this.width, this.height);
		// pop();
	}

	applyForce(force) {
		this.velocity.dx += force.dx;
		this.velocity.dy += force.dy;
	}

	update() {

		this.position.x += this.velocity.dx;
		this.position.y += this.velocity.dy;


		if (random() < mutationChance) {
			this.mutate();
		}

		if (!this.crashed && this.didCrash()) {
			this.crashed = true;
		}
	}

	calcFitness() {
		this.fitness = this.crashedTime**2;

		if (this.crashed) {
			this.fitness /= 10;
		}
	}

	crossover(partner) {
		let newDna = [];
		let mid = floor(random(0, this.dna.length));
		for (let i = 0; i < this.dna.length; i += 1) {
			if (i > mid) {
				newDna[i] = this.dna[i];
			} else {
				newDna[i] = partner.dna[i];
			}
		}
		return newDna;
	}

	mutate() {
		let dx = random(-1, 1);
		let dy = random(-1, 1);

		let m = sqrt(dx**2 + dy**2);
		dx = dx/m * this.magnitude;
		dy = dy/m * this.magnitude;
		this.dna[this.population.age] = {dx: dx, dy: dy};
	}

	didCrash() {

		if (this.position.x < -50 || this.position.x > width + 50 || this.position.y < -50 || this.position.y > height + 50) {
            this.crashedTime = this.population.age;
			return true;
		}

        if (dist(this.position.x, this.position.y, hole.position.x, hole.position.y) > r + 50) {
            this.crashedTime = this.population.age;
            return true;
        }

        if (dist(this.position.x, this.position.y, hole.position.x, hole.position.y) < r - 50) {
            this.crashedTime = this.population.age;
            return true;
        }

        return false;
	}

    setMaxDist() {
        let d = abs(r - dist(this.position, hole.position));
        if (d > this.maxDist) {
            this.maxDist = d;
        }
    }

    applyGravity() {

        this.acc = createVector(0, 0);
        let force = p5.Vector.sub(hole.position, this.position);
        let distanceSq = force.magSq();
        let strength = hole.mass / distanceSq;
        force.setMag(strength);
        this.applyForce({dx: force.x, dy: force.y});
    }
}