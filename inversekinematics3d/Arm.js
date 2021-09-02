class Arm {
    constructor(floor, numSegments) {
        let x = floor.position.x - floor.size*0.4;
        let y = floor.position.y + floor.size*0.4;
        let z = floor.position.z;
        this.position = createVector(x, y, z);

        this.segments = [new Segment(this, undefined)];
        for (let i = 0; i < numSegments - 1; i += 1) {
            this.segments.push(new Segment(this, this.segments[this.segments.length-1]));
        }

    }

    show() {
        for (let segment of this.segments) {
            segment.show();
        }
    }

    solve(targetX, targetY, targetZ) {
        let maxIterations = 2;
        for (let i = 0; i < maxIterations; i += 1) {
            if (i%2 == 0) {
                let target = createVector(targetX, targetY, targetZ);
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