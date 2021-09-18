let points = [];

let scl = 10;
let rows;
let cols;

function setup() {
  createCanvas(700, 700, WEBGL);
    // rows = height/scl;
    // cols = width/scl;
    rows = 20;
    cols = 20;
    scl = width/rows;

    let sizeEl = document.querySelector("#sizeInput");
    sizeEl.addEventListener("change", (event) => {
        let s = parseInt(sizeEl.value);
        rows = s;
        cols = s;
        scl = width/rows;
        setPoints();
    });

    setPoints();
}

function setPoints() {
    points = [];
    let n = 1;

    for (let r = 0; r < rows; r += 1) {
        points[r] = [];
        for (let c = 0; c < cols; c += 1) {
            points[r][c] = isPrime(n)*100;
            n += 1;
        }
    }
}

function draw() {
  background(80);
  orbitControl();
  stroke(25);
  for (let y = 0; y < rows - 1; y += 1) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x += 1) {
        fill(150, 100, 100);
        vertex(x * scl - width/2, y * scl - height/2, points[x][y]);
        vertex(x * scl - width/2, (y + 1) * scl - height/2, points[x][y + 1]);
    }
    endShape();
  }
}

function isPrime(n) {
    for(var i = 2; i < n; i++)
      if(n % i === 0) return false;
    return n > 1;
  }