function DataPoint(value, xCoord, yCoord) {
    this.value = value;
    this.xCoord = xCoord;
    this.yCoord = yCoord;

    this.show = function() {
        textAlign(RIGHT);
        text(value.toFixed(2), xCoord, yCoord);
    }

}