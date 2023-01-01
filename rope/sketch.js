let x1;
let y1;


function setup() {
    createCanvas(700, 700);
    x1 = width/2;
    y1 = height/2;
    noStroke();
}

function draw() {
    background(0);
    let x2 = mouseX - x1;
    let y2 = y1 - mouseY;
    let l = 200;

    let ropeEq = getRopeEq(x2, y2, l);

    fill("red");
    ellipse(x1, y1, 10, 10);
    ellipse(x1+x2, y1-y2, 10, 10);

    // fill("white");

    stroke(255);

    if (x2 > 0) {
        let prevX = x1;
        let prevY = y1 + math.evaluate(ropeEq.replace(/x/g, `(${0})`));
        for (let x = 0; x < x2; x += 0.5) {
            let y = math.evaluate(ropeEq.replace(/x/g, `(${x})`));
            // ellipse(x1+x, y1-y, 5, 5);
            line(prevX, prevY, x1+x, y1-y);
            prevX = x1+x;
            prevY = y1-y;
        }
    } else {
        let prevX = x2+x1;
        let prevY = y1-math.evaluate(ropeEq.replace(/x/g, `(${x2})`));
        for (let x = x2; x < 0; x += 0.5) {
            let y = math.evaluate(ropeEq.replace(/x/g, `(${x})`));
            // ellipse(x1+x, y1-y, 5, 5);
            line(prevX, prevY, x1+x, y1-y);
            prevX = x1+x;
            prevY = y1-y;

        }
    }


}


function getRopeEq(x2, y2, l) {
    let aEq = "1 / x * sinh(1 / 2 * x * abs(x2)) * sqrt(pow(x * y2 / sinh(1 / 2 * x * abs(x2)), 2) + 4) - l";
    aEq = aEq.replace(/x2/g, `(${x2})`);
    aEq = aEq.replace(/y2/g, `(${y2})`);
    aEq = aEq.replace(/l/g, `(${l})`);
    let a = newton(aEq, 1.01, 0.001);
    let A = Math.asinh(1 / 2 * a * y2 / Math.sinh(1 / 2 * a * x2)) - 1 / 2 * a * x2;
    let B = -Math.cosh(A);
    let ropeEq = "1 / a * (cosh(a * x + A) + B)";
    ropeEq = ropeEq.replace(/a/g, `(${a})`);
    ropeEq = ropeEq.replace(/A/g, `(${A})`);
    ropeEq = ropeEq.replace(/B/g, `(${B})`);
    return ropeEq;
}



function newton(f, guess, precision) {

    let iterationLimit = 100;
    let previous = 0;
    let current = guess;

    let i = 0;
    while (abs(previous - current) > precision) {
        let evaluated = math.evaluate(f.replace(/x/g, `(${current})`));
        let h = 0.001;
        let derivative = (math.evaluate(f.replace(/x/g, `(${current+h})`)) - math.evaluate(f.replace(/x/g, `(${current-h})`))) / (2*h);

        previous = current;
        current = current - evaluated/derivative;
        i++;
        if (i > iterationLimit) {
            break;
        }
    }
    return current;
}