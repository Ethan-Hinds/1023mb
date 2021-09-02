class Floor {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }

    show() {
        fill(150);
        push();
        translate(this.position);
        rect(0, 0, this.size, this.size);
        pop();
    }
}