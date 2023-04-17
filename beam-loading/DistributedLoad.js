function DistributedLoad(beam, startMagnitude, endMagnitude, xVal, length) {
    this.beam = beam;
    this.startMagnitude = startMagnitude;
    this.endMagnitude = endMagnitude;
    this.xVal = xVal;
    this.length = length;

    this.xCoord1 = this.beam.xCoord + this.xVal*this.beam.xScale;
    this.yCoord1 = this.beam.yCoord - this.beam.verticalDrawSpace*(this.startMagnitude/this.beam.maxLoad);
    this.xCoord2 = this.beam.xCoord + (this.xVal + this.length)*this.beam.xScale;
    this.yCoord2 = this.beam.yCoord - this.beam.verticalDrawSpace*(this.endMagnitude/this.beam.maxLoad);

    this.show = function() {
        this.xCoord1 = this.beam.xCoord + this.xVal*this.beam.xScale;
        this.yCoord1 = this.beam.yCoord - this.beam.verticalDrawSpace*(this.startMagnitude/this.beam.maxLoad);
        this.xCoord2 = this.beam.xCoord + (this.xVal + this.length)*this.beam.xScale;
        this.yCoord2 = this.beam.yCoord - this.beam.verticalDrawSpace*(this.endMagnitude/this.beam.maxLoad);
        noFill();``
        stroke(255, 0, 0);
        strokeWeight(5);
        beginShape();
        vertex(this.xCoord1, this.yCoord1);
        vertex(this.xCoord2, this.yCoord2);
        vertex(this.xCoord2, this.beam.yCoord);
        vertex(this.xCoord1, this.beam.yCoord);
        endShape(CLOSE);
    }
}