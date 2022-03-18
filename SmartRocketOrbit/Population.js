class Population {

    constructor(n, lifeSpan) {
        this.n = n;
        this.lifeSpan = lifeSpan;
        this.age = 0;
	    this.matingPool = [];

        this.rockets = [];
        for (let i = 0; i < n; i += 1) {
            this.rockets.push(new Rocket(undefined, this, magnitude));
        }
    }

	evaluate() {
		this.matingPool = [];
		var maxFit = 0;
		for (let rocket of this.rockets) {
			rocket.calcFitness();
			if (rocket.fitness > maxFit) {
				maxFit = rocket.fitness;
			}
		}

        let avgFitness = 0;

		for (let rocket of this.rockets) {
            avgFitness += rocket.fitness;
			rocket.fitness /= maxFit;
			let n = rocket.fitness * 100;
			for (let i = 0; i < n; i += 1) {
				this.matingPool.push(rocket);
			}
		}
        avgFitness /= this.rockets.length;
        averageFitness.push(avgFitness);
        chart.update();
	}

	selection() {
		for (let i = 0; i < this.rockets.length; i += 1) {
			let p1 = random(this.matingPool);
			let p2 = random(this.matingPool);
			let childDna = p1.crossover(p2);
			this.rockets[i] = new Rocket(childDna, this, magnitude);
		}
	}
}