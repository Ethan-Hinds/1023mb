const rows = 10;
const cols = 10;

const squareSize = 50;

let walls = [];

let usedVertices = [];


function setup() {
    createCanvas(cols*squareSize, rows*squareSize);
    stroke(0);
    strokeWeight(5);
    createMap();
}

function draw() {
    background(200);
    for (let wall of walls) {
        wall.show();
    }
}

function createMap() {
    walls = [];
    usedVertices = [];
    // Border
    for (let i = 0; i < cols; i++) {
        walls.push(new Wall(0, i, 0, i+1));
        usedVertices.push([0, i]);
        usedVertices.push([0, i+1]);
        walls.push(new Wall(rows, i, rows, i+1));
        usedVertices.push([rows, i]);
        usedVertices.push([rows, i+1]);
    }

    for (let i = 0; i < rows; i++) {
        walls.push(new Wall(i, 0, i+1, 0));
        usedVertices.push([i, 0]);
        usedVertices.push([i+1, 0]);
        walls.push(new Wall(i, cols, i+1, cols));
        usedVertices.push([i, cols]);
        usedVertices.push([i+1, cols]);
    }

    let tries = 0;
    let startRow = -1;
    let startCol = -1;
    let endRow = -1;
    let endCol = -1;

    while (true) {
        if (tries == 100) {
            break;
        }

        tries ++;
        if (startRow == -1) {
            startRow = floor(random(0, rows));
            startCol = floor(random(0, cols));
        } else {
            startRow = endRow;
            startCol = endCol;
        }
        endRow = startRow;
        endCol = startCol;
        let dir = floor(random(0, 4));
        // Dir is 0-4 starting up, going clockwise
        if (dir == 0) {
            endRow--;
        } else if (dir == 1) {
            endCol++;
        } else if (dir == 2) {
            endRow++;
        } else if (dir == 3) {
            endCol--;
        }

        if (endRow < 0 || endRow > rows || endCol < 0 || endCol > cols || usedVerticesIncludes([endRow, endCol])) {
            tries++;
            startRow = -1;
            startCol = -1;
            endRow = -1;
            endCol = -1;
            continue;
        }

        walls.push(new Wall(startRow, startCol, endRow, endCol));
        if (!usedVerticesIncludes([startRow, startCol])) {
            usedVertices.push([startRow, startCol]);
        }
        usedVertices.push([endRow, endCol]);
        tries = 0;
    }
}

function usedVerticesIncludes(vertex) {
    for (let i = 0; i < usedVertices.length; i++) {
        if (usedVertices[i][0] == vertex[0] && usedVertices[i][1] == vertex[1]) {
            return true;
        }
    }
    return false;
}