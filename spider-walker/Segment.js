class Segment {
    constructor(leg, parent) {
        if (parent) {
            this.parent = parent;
            this.a = parent.a.copy().sub(0, 0, -segmentLength);
            this.b = parent.b.copy().sub(0, 0, -segmentLength);
        } else {
            this.parent = undefined;
            this.a = leg.position.copy();
            this.b = createVector(150, 30, 100);
        }
        this.length = segmentLength;
        this.angle = 0;
    }

    show() {

        normalMaterial();
        let v = this.b.copy().sub(this.a);
        let rho = v.mag();
        let phi = asin(v.z / rho);
        let theta = atan2(v.y, v.x);

        this.angle = createVector(0, phi, theta);

        this.off = this.b.copy().sub(this.a).normalize().mult(rho/2);

        push();
        translate(this.a.copy().add(this.off));
        rotateZ(PI/2 + theta);
        rotateX(-phi);
        cylinder(2, rho);
        pop();
    }
}