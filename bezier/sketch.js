let curve;

let t;

function setup() {
    createCanvas(700, 700);
    stroke(255);
    fill(255);
    let points = [];
    curve = new Curve();
    curve.points.push(new B_Point(200, 400));
    curve.points.push(new B_Point(350, 250));
    curve.points.push(new B_Point(500, 400));
    // curve.points.push(new B_Point(650, 400));

}

function draw() {
    background(0);
    
    t = parseFloat(document.getElementById("t").value);
    
    curve.show();
    curve.drawCurve();
    curve.interpolate(t);
}