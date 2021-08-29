var table;
var cue;
var initialComputerTurnFrame;

function setup() {
    angleMode(DEGREES);
    createCanvas(1000, 500);
    newGame();
}

function newGame() {
    table = new Table();
    cue = new Cue();
}

function mousePressed() {
    if (table.turn == "player") {
        cue.origMouseDist = dist(mouseX, mouseY, table.cueBall.x, table.cueBall.y);
        cue.power = 0;
    }
}

function mouseReleased() {
    if (cue.power > 0) {
        table.allStationary = false;
        cue.shoot();
    }
}

function draw() {
    background("#000033");
    table.checkStationary();
    table.show();
    if (table.allStationary) { 
        cue.show();
    }
    for (let ball of table.balls) {
        ball.show();
        ball.move();
        ball.checkCollision();
        ball.checkBounce();
        ball.checkHole();
    }

    if (mouseIsPressed) {
        if (table.allStationary && table.turn == "player") {
            let distance = dist(mouseX, mouseY, table.cueBall.x, table.cueBall.y);
            if (distance > cue.origMouseDist) {
                cue.power = min((distance - cue.origMouseDist)/2,120);
            }
        }
    }

    if (table.allStationary && table.turn == "computer") {
        if (initialComputerTurnFrame == undefined) {
            initialComputerTurnFrame = frameCount;
            cue.aim();
        } else {
            if (frameCount - initialComputerTurnFrame > 100) {
                initialComputerTurnFrame = undefined;
                cue.shoot();
            }
        }
    }
}