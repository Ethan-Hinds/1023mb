class Leg {
    constructor(joint, targetYOff) {
        this.position = joint;
        this.targetYOff = targetYOff;

        this.segments = [new Segment(this, undefined)];
        for (let i = 0; i < numSegments - 1; i += 1) {
            this.segments.push(new Segment(this, this.segments[this.segments.length-1]));
        }
        this.target = createVector(this.position.x - 1, this.position.y + this.targetYOff, floor.z);
        this.target.x -= random(0, 80);

        this.isStepping = false;

    }

    show() {
        for (let segment of this.segments) {
            segment.show();
        }

        push();
        translate(this.target);
        sphere(5);
        pop();
    }

    getTarget() {
        if (this.isStepping) {
            this.target.x += 10;

            if (this.target.x < this.position.x) {
                this.target.z += 1;
            } else {
                this.target.z -= 1;
            }

            if(this.target.x > this.position.x + 20) {
                this.isStepping = false;
                this.target.z = floor.position.z;
            }
            return;
        }
        if (this.target.dist(this.position) >= numSegments*segmentLength*0.9) {
            this.isStepping = true;
            //this.target = createVector(this.position.x+20, this.position.y, floor.z);
        }
    }

    solve() {
        //this.target = createVector(0, 0, 0);
        this.getTarget();
        let maxIterations = 10;
        for (let i = 0; i < maxIterations; i += 1) {
            if (i%2 == 0) {
                let target = this.target.copy();
                for (let i = this.segments.length - 1; i >= 0; i -= 1) {
                    let segment = this.segments[i];
                    segment.b = target;
                    let dir = segment.a.sub(segment.b).normalize();
                    segment.a = segment.b.copy().add(dir.mult(segment.length));
                    target = segment.a.copy();
                }
            } else {
                let target = this.position.copy();
                for (let i = 0; i < this.segments.length; i += 1) {
                    let segment = this.segments[i];
                    segment.a = target;
                    let dir = segment.b.sub(segment.a).normalize();
                    segment.b = segment.a.copy().add(dir.mult(segment.length));
                    target = segment.b.copy();
                }
            }
        }
    }
}