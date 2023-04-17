function Moment(beam, magnitude, xVal) {
    this.beam = beam;
    this.magnitude = magnitude;
    this.xVal = xVal;

    this.xCoord = this.beam.xCoord + this.xVal*this.beam.xScale;
    this.yCoord = this.beam.yCoord + this.beam.heightCoord/2;

    this.show = function() {
        noStroke();
        fill("red");
        arc(this.xCoord, this.yCoord, 30, 30, 0, PI);
        fill("tan");
        arc(this.xCoord, this.yCoord, 20, 20, 0, PI);
        let arrowX = this.magnitude > 0 ? this.xCoord + 25/2 : this.xCoord - 25/2;
        fill("red");
        triangle(arrowX - 7, this.yCoord, arrowX + 7, this.yCoord, arrowX, this.yCoord - 7);
    }
}