let floor;
let arm;
let segment;
let segmentLength = 100;


function setup() {
    createCanvas(700, 700, WEBGL);  
    noStroke();
    rectMode(CENTER);
    init(5);
    camera(500, 500, 500, 0, 0, 0, 1, 1, 0);
}

function draw() {

    // orbitControl();
    background(50);
    floor.show();
    push();
    fill(0, 0, 255);
    let x = mouseX*cos(PI/4) - width/2;
    let y = mouseY*sin(PI/4) - height/2;
    let z = 30;
    translate(x, y, z);
    normalMaterial();
    box();
    pop();
    arm.solve(x, y, z);
    arm.show();
}

function init(numSegments) {
    floor = new Floor(createVector(0, 0, 0), 400);
    arm = new Arm(floor, numSegments);
}