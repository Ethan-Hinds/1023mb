class Mirror {
    constructor(position, size) {
        this.position = position.copy();
        this.size = size.copy();
        this.normal = createVector(0, 0, 0);

        this.theta;
        this.phi;
    }

    show() {
        if (this.normal.x == 0 && this.normal.y == 0) {
            this.theta = 90;
        } else {
            this.theta = atan(this.normal.y/this.normal.x);
        }
        this.phi = atan(sqrt(this.normal.x**2 + this.normal.y**2)/this.normal.z);
        //print (theta, phi)
        push();
        translate(this.position);
        rotateY(this.phi)
        rotateX(this.theta);
        fill(0);
        plane(this.size);
        pop();
    }

    aimAt(point) {
        this.normal = createVector(point.y + sqrt(point.x**2 + point.y**2), point.x, point.z).normalize();
    }
}