class Wall {
    constructor(r1, c1, r2, c2) {
        this.r1 = r1;
        this.c1 = c1;
        this.r2 = r2;
        this.c2 = c2;
    }

    show() {
        line(this.c1*squareSize, this.r1*squareSize, this.c2*squareSize, this.r2*squareSize)
    }
}