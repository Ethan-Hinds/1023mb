function Support(beam, xVal) {
    this.beam = beam;
    this.xVal = xVal;
    this.xCoord = this.xVal*this.beam.xScale + this.beam.xCoord;
    this.yCoord = this.beam.yCoord + this.beam.heightCoord;

    this.show = function() {
        noStroke();
        fill("tan");
        triangle(this.xCoord, this.yCoord, this.xCoord - 10, this.yCoord + 10, this.xCoord + 10, this.yCoord + 10);
    }
}