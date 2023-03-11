let curve;
let t;
let showConstruction = false;

function setup() {
    createCanvas(700, 700);
    stroke(255);
    fill(255);
    let points = [];
    curve = new Curve();
    curve.points.push(new B_Point(250, 400));
    curve.points.push(new B_Point(400, 250));
    curve.points.push(new B_Point(550, 400));
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        curve.points.push(new B_Point(mouseX, mouseY));
    }
}

function draw() {
    background(0);
    
    t = parseFloat(document.getElementById("t").value);
    
    if (curve.points.length > 0) {
        curve.show();
    }
    if (curve.points.length > 1) {
        curve.drawCurve();
        curve.interpolate(t);
    }
}

function updateShow() {
    showConstruction = document.getElementById("show").checked;
}