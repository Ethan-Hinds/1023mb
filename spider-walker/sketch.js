let floor;
let spider;

let numSegments = 2;
let segmentLength = 40;


function setup() {
    createCanvas(700, 700, WEBGL);  
    noStroke();
    rectMode(CENTER);
    init();
    camera(400, 400, 100, 0, 0, 0, 1, 1, 0);
}

function draw() {

    orbitControl();
    background(50);
    floor.show();
    spider.show();
    spider.move();
    // arm.solve(100, 100, 100);
    // arm.show();
}

function init() {
    floor = new Floor(createVector(0, 0, 0), 800);
    spider = new Spider(floor);

    for(let joint of spider.joints) {
        let yOff = (joint.y > spider.position.y) ? 10 : -10;
        spider.legs.push(new Leg(joint, yOff));
    }
    
}