function PointLoad(beam, magnitude, xVal, isSupport) {
    this.beam = beam;
    this.magnitude = magnitude;
    this.xVal = xVal;
    this.isSupport = isSupport;
    this.xCoord = this.beam.xCoord + this.xVal*this.beam.xScale;
    this.yCoord = this.beam.yCoord - this.beam.verticalDrawSpace*(this.magnitude/this.beam.maxLoad);
    this.height = this.beam.yCoord - this.yCoord - 20*(this.magnitude/this.beam.maxLoad)
    this.width = 10;


    this.show = function() {
        this.yCoord = this.beam.yCoord - this.beam.verticalDrawSpace*(this.magnitude/this.beam.maxLoad);
        this.height = this.beam.yCoord - this.yCoord - 20*(this.magnitude/this.beam.maxLoad);
        noStroke();
        fill("red");
        rect(this.xCoord, this.yCoord, this.width, this.height);
        triangle(this.xCoord - 10*(this.magnitude/this.beam.maxLoad), this.yCoord + this.height, this.xCoord + this.width + 10*(this.magnitude/this.beam.maxLoad), this.yCoord + this.height, this.xCoord + this.width/2, this.yCoord + this.height + 20*(this.magnitude/this.beam.maxLoad))
    }
}