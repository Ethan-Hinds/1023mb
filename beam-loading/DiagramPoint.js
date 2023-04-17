function DiagramPoint(xVal, yVal, xCoord, yCoord, heightCoord) {
    this.xVal = xVal;
    this.yVal = yVal;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.heightCoord = heightCoord;

    this.show = function() {
        stroke("red");
        strokeWeight(1);
        line(this.xCoord, this.yCoord, this.xCoord, this.yCoord + this.heightCoord);
    }
}