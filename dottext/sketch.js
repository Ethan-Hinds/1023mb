let font;

let pts = [];
let words = ["TRU", "SIMULATION", "AND", "TRAINING"];

let info = {
    animating: false,
    from: 0,
    percent: 0
}

function preload() {
     font = loadFont("AvenirLTStd-Black.otf")
}

function setup() {
    createCanvas(1300, 700);
    textFont(font);
    fill(255);
    noStroke();

    let maxLen = 0;
    for (let word of words) {
        let points = font.textToPoints(word, 60, 200, 192);
        maxLen = max(maxLen, points.length);
    }

    for (let i = 0; i < maxLen; i++) {
        pts.push(new Pt());
    }

    let firstPoints = font.textToPoints(words[0], 60, 200, 192);
    for (let i = 0; i < firstPoints.length; i++) {
        pts[i].x = firstPoints[i].x;
        pts[i].y = firstPoints[i].y;
        pts[i].addDestination({x: firstPoints[i].x, y: firstPoints[i].y})
    }
    for (let i = firstPoints.length; i < pts.length; i++) {
        let randomPoint = random(firstPoints);
        pts[i].addDestination({x: randomPoint.x, y: randomPoint.y});
    }

    for (let i = 1; i < words.length; i++) {
        let points = font.textToPoints(words[i], 60, 200, 192);
        for (let j = 0; j < points.length; j++) {
            pts[j].addDestination({x: points[j].x, y: points[j].y});
        }
        for (let j = points.length; j < pts.length; j++) {
            let minDist = width;
            let minIndex = -1;
            for (let k = 0; k < points.length; k++) {
                let pt = points[k];
                let _dist = dist(pt.x, pt.y, pts[j].destinations[pts[j].destinations.length-1].x, pts[j].destinations[pts[j].destinations.length-1].y);
                if (_dist < minDist) {
                    minDist = _dist;
                    minIndex = k;
                }
            }
            pts[j].addDestination({x: points[minIndex].x, y: points[minIndex].y})
        }
    }
}

function keyPressed() {
    if (keyCode == 32 && !info.animating) { // Spacebar
        info.animating = true;
        info.percent = 0;
    }
}

function draw() {
    background(51);
    for (let pt of pts) {
        pt.show();
    }   
    if (info.animating) {
        for (let pt of pts) {
            pt.x = map(info.percent, 0, 100, pt.destinations[info.from].x, pt.destinations[(info.from+1)%pt.destinations.length].x);
            pt.y = map(info.percent, 0, 100, pt.destinations[info.from].y, pt.destinations[(info.from+1)%pt.destinations.length].y);
        }
        info.percent ++;
        if (info.percent == 100) {
            info.animating = false;
            for (let pt of pts) {
                pt.x = pt.destinations[(info.from+1)%pt.destinations.length].x;
                pt.y = pt.destinations[(info.from+1)%pt.destinations.length].y;
            }
            info.from += 1;
            if (info.from > words.length - 1) {
                info.from = 0;
            }
        }
    }
}

class Pt {
    constructor() {
        this.destinations = [];
    }

    show() {
        ellipse(this.x, this.y, 5, 5);
    }

    addDestination(destination) {
        this.destinations.push(destination);
    }
}