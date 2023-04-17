function Diagram(beam, x, y, width, verticalHeight, type) {
    this.beam = beam;
    this.x = x;
    this.y = y;
    this.width = width;
    this.verticalHeight = verticalHeight;
    this.type = type;

    this.points = [];
    this.maxLoad = 0;
    this.increment= beam.lengthVal/sections;

    this.dataPoints = [];

    this.addPoint = function(xVal, yVal) {
        let xCoord = xVal*beam.xScale + beam.xCoord;
        this.points.push(new DiagramPoint(xVal, yVal, xCoord, 0, 0));
    }

    this.showPoints = function() {
        for (let point of this.points) {
            point.show();
        }
    }

    this.show = function() {
        stroke("gray");
        strokeWeight(4);
        line(this.x, this.y, this.x + this.width, this.y);
        line(this.x, this.y - this.verticalHeight, this.x, this.y + this.verticalHeight);
        noStroke();
        fill("white");
        textSize(16);
        textAlign(CENTER, CENTER);
        if (this.type == "shear") {
            text("V(x)", this.x - 30, this.y);
        } else {
            text("M(x)", this.x - 30, this.y);
        }
    }

    this.calculatePointYCoords = function() {
        for (let point of this.points) {
            point.yCoord = this.y - point.yVal/this.maxLoad*this.verticalHeight;
            point.heightCoord = this.y - point.yCoord;
        }
    }

    this.calculateDataPoints = function() {
        let xValues = [];
        for (let load of beam.pointLoads) {
            xValues.push(load.xVal);
        }
        for (let load of beam.distributedLoads) {
            xValues.push(load.xVal);
            xValues.push(load.xVal + load.length)
        }
        if (this.type == "bending") {
            for (let moment of beam.moments) {
                xValues.push(moment.xVal);
            }
        }

        for (let x of xValues) {
            let pointAtXVal = this.getPointAtXVal(x);
            if (pointAtXVal && pointAtXVal.xVal != 0) {
                this.dataPoints.push(new DataPoint(pointAtXVal.yVal, pointAtXVal.xCoord, pointAtXVal.yCoord));
            }
        }
    }

    this.showDataPoints = function() {
        for (let point of this.dataPoints) {
            point.show();   
        }
    }

    this.getPointAtXVal = function(x) {
        for (let point of this.points) {
            if (abs(point.xVal - x) <= this.increment) {
                return point;
            }
        }
    }
}