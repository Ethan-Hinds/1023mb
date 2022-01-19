let minX = -10;
let maxX = 10;
let minY = -10;
let maxY = 10;

let vals = [];

let derivIndex = undefined;
let derivIndexStep = 3;

let goofy;

function preload() {
    goofy = loadImage("goofy.gif")
}

function setup() {
    createCanvas(500, 500);
    strokeWeight(1);
    imageMode(CENTER);
}

function draw() {
    background(255);
    stroke(0);
    drawAxes();

    stroke(0);

    for (let i = 0; i < vals.length - 1; i++) {

        let x1 = map(vals[i].x, minX, maxX, 0, width);
        let y1 = map(vals[i].y, minY, maxY, height, 0);
        let x2 = map(vals[i+1].x, minX, maxX, 0, width);
        let y2 = map(vals[i+1].y, minY, maxY, height, 0);

        line(x1, y1, x2, y2);

    }

    if (derivIndex != undefined) {

        if (document.getElementById("goofyCheckbox").checked) {
            let x = map(vals[derivIndex].x, minX, maxX, 0, width);
            let y = map(vals[derivIndex].y, minY, maxY, height, 0);
            let slope = vals[derivIndex].derivative.slope;
            let angle = -atan(slope);
            push();
            translate(x, y);
            rotate(angle);
            image(goofy, 0, -80*0.45, 80, 80);
            pop();
        } else {

            stroke("green");
            let deriv = vals[derivIndex].derivative;
            let x1 = map(deriv.x1, minX, maxX, 0, width);
            let y1 = map(deriv.y1, minY, maxY, height, 0);
            let x2 = map(deriv.x2, minX, maxX, 0, width);
            let y2 = map(deriv.y2, minY, maxY, height, 0);
            line(x1, y1, x2, y2);

            fill("red");
            let x = map(vals[derivIndex].x, minX, maxX, 0, width);
            let y = map(vals[derivIndex].y, minY, maxY, height, 0);
            ellipse(x, y, 5, 5);
        }

        if (derivIndex < vals.length - derivIndexStep) {
            derivIndex += derivIndexStep;
        } else {
            derivIndex = undefined;
        }
    }

    if (document.getElementById("dragDerivative").checked) {

        let _mouseX = constrain(mouseX, 0, width);

        let x = map(_mouseX, 0, width, minX, maxX);
        let minDx = maxX;
        let closestVal;
        for (let val of vals) {
            let dx = abs(val.x - x);
            if (dx < minDx) {
                minDx = dx;
                closestVal = val;
            }
        }

        if (document.getElementById("goofyCheckbox").checked) {
            let _x = map(closestVal.x, minX, maxX, 0, width);
            let y = map(closestVal.y, minY, maxY, height, 0);
            let slope = closestVal.derivative.slope;
            let angle = -atan(slope);
            push();
            translate(_x, y);
            rotate(angle);
            image(goofy, 0, -80*0.45, 80, 80);
            pop();

        } else {

            stroke("green");
            let deriv = closestVal.derivative;
            let x1 = map(deriv.x1, minX, maxX, 0, width);
            let y1 = map(deriv.y1, minY, maxY, height, 0);
            let x2 = map(deriv.x2, minX, maxX, 0, width);
            let y2 = map(deriv.y2, minY, maxY, height, 0);
            line(x1, y1, x2, y2);

            fill("red");
            let _x = map(closestVal.x, minX, maxX, 0, width);
            let y = map(closestVal.y, minY, maxY, height, 0);
            ellipse(_x, y, 5, 5);
        }

    }
}

function drawAxes() {

    stroke("#aaaaaa");
    fill(0);
    let numLines = 9;

    let dx = (width-1)/(numLines - 1);
    let dy = (height-1)/(numLines - 1);

    let dxVal = (maxX - minX)/(numLines - 1);
    let dyVal = (maxY - minY)/(numLines - 1)

    for(let i = 0; i < numLines; i++) {
        let x = dx*i
        let y = dy*i;
        line(x, 0, x, height);
        line(0, y, width, y);  
        textAlign("left");
        if (i != 0) {
            text(`${(dyVal*i + minY).toFixed(0)}`, 2, y-2);
            text(`${(dxVal*i + minX).toFixed(0)}`, x+2, 12);
        }
    }
    let zeroX = map(0, minX, maxX, 0, width);
    let zeroY = map(0, minY, maxY, height, 0);

    stroke(0);
    strokeWeight(2);
    line(0, zeroY, width, zeroY);
    line(zeroX, 0, zeroX, height);
    strokeWeight(1);
}

function setVals() {

    minX = parseFloat(document.getElementById("minX").value);
    maxX = parseFloat(document.getElementById("maxX").value);
    minY = parseFloat(document.getElementById("minY").value);
    maxY = parseFloat(document.getElementById("maxY").value);

    let eqInput = document.getElementById("equation").value;
    if (eqInput.length == 0) {
        return;
    }

    let derivative = math.format(math.derivative(eqInput, "x"));

    document.getElementById("hiddenTillEq").style.visibility = "visible";

    vals = [];
    for (let x = minX; x < maxX; x += (maxX - minX)/1000) {
        let yVal = math.evaluate(eqInput.replace(/x/g, `(${x})`));
        let slope = math.evaluate(derivative.replace(/x/g, `(${x})`));
        vals.push(
            {
                "x": x,
                "y": yVal,
                "derivative": {
                    "slope": slope,
                    "x1": minX,
                    "y1": slope*(minX - x) + yVal,
                    "x2": maxX,
                    "y2": slope*(maxX - x) + yVal
                }
            }
        );
    }
}

function showDerivative() {
    derivIndex = 0;
    document.getElementById("dragDerivative").checked = false;
}