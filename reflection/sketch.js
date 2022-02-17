
let mirror;

let source;
let target;
let normalLine;

// let laser;
// let reflection;

function setup() {
	createCanvas(700, 700, WEBGL); 
	noStroke();
	rectMode(CENTER);
	angleMode(DEGREES);

	source = createVector(0, -1000, 0);
	target = createVector(800, 300, 0);

	let position = createVector(0, 0, 0);
	let size = createVector(100, 100);
	mirror = new Mirror(position, size);

	laser = new Line(source, position);
	reflection = new Line(position, target);
	normalLine = new Line(position, mirror.normal.mult(100));
}

function draw() {
	orbitControl();
	background(200);
	mirror.aimAt(target);
	mirror.show();
	laser.show();
	reflection.show();
	normalLine.p2 = mirror.normal.mult(400);
	//normalLine.show();
	target.y --;
}