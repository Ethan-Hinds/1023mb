class B_Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        ellipse(this.x, this.y, 10, 10);
    }
}