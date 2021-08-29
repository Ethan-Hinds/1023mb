class Hole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 10;
    }

    show() {
        noStroke();
        fill(10);
        ellipse(this.x, this.y, 2*this.r, 2*this.r);
    }
}