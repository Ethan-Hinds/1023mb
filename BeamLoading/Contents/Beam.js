function Beam(lengthVal) {
    this.lengthVal = lengthVal;

    this.xCoord = width/4;
    this.yCoord = 110;
    this.widthCoord = width*0.5;
    this.heightCoord = 40;

    this.supports = [];
    this.pointLoads = [];
    this.distributedLoads = [];
    this.moments = [];

    this.maxLoad = 0;

    this.xScale = this.widthCoord/this.lengthVal;

    this.verticalDrawSpace = 100; // Draw space above only.
    this.yScale = this.verticalDrawSpace/this.maxLoad; // Where 100 is the vertical distance allowed to draw

    this.show = function() {
        noStroke();
        fill("tan");
        rect(this.xCoord, this.yCoord, this.widthCoord, this.heightCoord);
    }

    this.addSupport = function(xVal) {
        this.supports.push(new Support(this, xVal));
    }
    this.showSupports = function() {
        for (let support of this.supports) {
            support.show();
        }
    }

    this.addPointLoad = function(magnitude, xVal, isSupport) {
        if (magnitude > this.maxLoad) {
            this.maxLoad = magnitude;
        }
        this.pointLoads.push(new PointLoad(this, magnitude, xVal, isSupport));

    }
    this.showPointLoads = function() {
        for (let load of this.pointLoads) {
            if (!load.isSupport) {
                load.show();
            }
        }
    }

    this.addDistributedLoad = function(startMagnitude, endMagnitude, xVal, length) {
        if (startMagnitude > this.maxLoad) {
            this.maxLoad = startMagnitude;
        }
        if (endMagnitude > this.maxLoad) {
            this.maxLoad = endMagnitude;
        }
        this.distributedLoads.push(new DistributedLoad(this, startMagnitude, endMagnitude, xVal, length));
    }
    this.showDistributedLoads = function() {
        for (let load of this.distributedLoads) {
            load.show();
        }   
    }

    this.addMoment = function(magnitude, xVal) {
        this.moments.push(new Moment(this, magnitude, xVal));
    }
    this.showMoments = function() {
        for (let moment of this.moments) {
            moment.show();
        }
    }

    this.calculateSupportReactions = function() {
        let x1 = this.supports[0].xVal;
        let moments = 0;
        for (let load of this.pointLoads) {
            moments += load.magnitude*(load.xVal - x1);
        }
        for (let load of this.distributedLoads) {
            let minLoad = Math.min(load.startMagnitude, load.endMagnitude);
            let maxLoad = Math.max(load.startMagnitude, load.endMagnitude);
            let loadA1 = load.length * minLoad;
            let loadX1 = load.xVal + load.length/2;
            let loadA2 = 0.5*load.length*(maxLoad - minLoad);
            let loadX2 = load.startMagnitude < load.endMagnitude ? load.xVal + 2/3*load.length : load.xVal + 1/3*load.length;
            moments += loadA1*(loadX1 - x1);
            moments += loadA2*(loadX2 - x1);
        }
        for (let moment of this.moments) {
            moments -= moment.magnitude;
        }
        let support2Magnitude = moments / (this.supports[1].xVal - this.supports[0].xVal);
        let support1Magnitude = -support2Magnitude;
        for (let load of this.pointLoads) {
            support1Magnitude += load.magnitude;
        }
        for (let load of this.distributedLoads) {
            let minLoad = Math.min(load.startMagnitude, load.endMagnitude);
            let maxLoad = Math.max(load.startMagnitude, load.endMagnitude);
            support1Magnitude += load.length * minLoad + 0.5*load.length*(maxLoad - minLoad);
        }

        this.addPointLoad(-support1Magnitude, this.supports[0].xVal, true);
        this.addPointLoad(-support2Magnitude, this.supports[1].xVal, true);
    }

}