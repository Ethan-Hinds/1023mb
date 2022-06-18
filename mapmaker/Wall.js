class Wall {
    constructor(r1, c1, r2, c2) {
        this.r1 = r1;
        this.c1 = c1;
        this.r2 = r2;
        this.c2 = c2;

        this.start = createVector(c1*squareSize, r1*squareSize);
        this.end = createVector(c2*squareSize, r2*squareSize);
    }

    show() {
        line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
}