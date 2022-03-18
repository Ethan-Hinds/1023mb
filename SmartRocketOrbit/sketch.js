let  n = 200; // Number of rockets per population
let lifeSpan = 10000; // Lifespan of the population
let magnitude = 0.02; // Magnitude of force a rocket can make
let mutationChance = 0.005 / 10; // Chance of mutation
let r = 200; // Target orbital radius

let population;
let generation = 1;

let hole;

let speed = 10;

let averageFitness = [];

function setup() {

    createCanvas(700, 700);

	hole = {
        position: createVector(width/2, height/2),
        mass: 200
	}

	reset();
}

function reset() {
	generation = 1;
	population = new Population(n, lifeSpan);
}
function draw() {
    for(let i = 0; i < speed; i++) {
        background(0);

        fill(20, 0, 255);
        textSize(20);
        textAlign(LEFT, TOP);
        text("Gen: " + generation, 10, 10);

        fill(0, 255, 0);
        ellipse(hole.position.x, hole.position.y, 15, 15);

        population.age += 1;
        let shouldReset = true;
        for (let rocket of population.rockets) {
            rocket.show();
            if (!rocket.crashed) {
                shouldReset = false;
                rocket.applyForce(rocket.dna[population.age]);
                rocket.applyGravity();
                rocket.update();
                //rocket.setMaxDist();
            }
        }

        if (shouldReset || population.age == lifeSpan - 1) {
            if (!shouldReset) {
                console.log("Someone went all the way!")
            }
            population.evaluate();
            population.selection();
            population.age = 0;
            generation += 1;
        }
    }
}

function setSpeed() {
    speed = parseInt(document.getElementById("speed").value);
}