class Curve {
    constructor() {
        this.points = [];
        this.subCurve;
    }

    interpolate(t) {
        if (this.points.length > 1) {
            this.subCurve = new Curve();
            for (let i = 0; i < this.points.length-1; i++) {
                let x = lerp(this.points[i].x, this.points[i+1].x, t);
                let y = lerp(this.points[i].y, this.points[i+1].y, t);
                this.subCurve.points.push(new B_Point(x, y));
            }
            return this.subCurve.interpolate(t);
        } else {
            return {x: this.points[0].x, y: this.points[0].y};
        }
    }

    show() {
        stroke(100);
        for (let i = 0; i < this.points.length-1; i++) {
            this.points[i].show();
            line(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y)
        }
        
        this.points[this.points.length-1].show();

        if (this.subCurve) {
            this.subCurve.show();
        }
    }

    drawCurve() {
        let xVals = [];
        let yVals = [];

        for (let t = 0; t < 1; t += 0.01) {
            let coords = this.interpolate(t);
            xVals.push(coords.x);
            yVals.push(coords.y);
        }

        stroke(255);
        for (let i = 0; i < xVals.length-1; i++) {
            line(xVals[i], yVals[i], xVals[i+1], yVals[i+1]);
        }
    }
}