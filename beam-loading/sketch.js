// Supports only vertical forces
// Also only supports two supports

var beam;
var shearDiagram;
var bendingDiagram;
var drawDiagrams = false;

var diagramHeight = 100;

var sections = 1000; // How small the increment should be when looking for loads

function setup() {
    beamLength = 10;
    addInitialValuesMenu();
    $("#tableContainer").css("visibility", "hidden");
    createCanvas(1000, 750);
    // beam = new Beam(8);
    // beam.addSupport(0);
    // beam.addSupport(5);
    //$("#tableContainer").css("height", "auto");
}

function initialValuesSubmitted() {
    let beamLength = parseFloat($("#beamLengthInput").val());
    let support1Pos = parseFloat($("#support1Input").val());
    let support2Pos = parseFloat($("#support2Input").val());
    if (isNaN(beamLength) || isNaN(support1Pos) || isNaN(support2Pos) || support1Pos < 0 || support1Pos > beamLength || support2Pos < 0 || support2Pos > beamLength) {
        alert("Please enter valid numbers!");
    } else {
        $("#beamLengthInput").remove();
        $("#support1Input").remove();
        $("#support2Input").remove();
        $("#beamLengthLabel").remove();
        $("#support1Label").remove();
        $("#support2Label").remove();
        $("#submitInitialValues").remove();
        beam = new Beam(beamLength);
        beam.addSupport(support1Pos);
        beam.addSupport(support2Pos);
        $("#tableContainer").css("visibility", "visible");
        $("#tableContainer").css("height", "auto");
    }
}

function draw() {
    background(0);
    if (beam) {
        beam.show();
        beam.showSupports();
        beam.showPointLoads();
        beam.showDistributedLoads();
        beam.showMoments();
    }

    if (drawDiagrams) {
        shearDiagram.showPoints();
        shearDiagram.show();
        shearDiagram.showDataPoints();

        bendingDiagram.showPoints();
        bendingDiagram.show();
        bendingDiagram.showDataPoints();
    }
}

function addInitialValuesMenu() {
    $("body").append("<label id = 'beamLengthLabel'> Beam Length </label> <input type = 'text' id = 'beamLengthInput'> </input> <br>")
    $("body").append("<label id = 'support1Label'> Support 1 Pos. (From left) </label> <input type = 'text' id = 'support1Input'> </input> <br>")
    $("body").append("<label id = 'support2Label'> Support 2 Pos. (From left) </label> <input type = 'text' id = 'support2Input'> </input> <br>")
    $("body").append("<button id = 'submitInitialValues' onclick = 'initialValuesSubmitted()'> Ok </button> <br>")
}
function addPointLoadButtonPressed() {
    $("#firstColumn").css("visibility", "visible");
    $("#secondColumn").css("visibility", "hidden");
    $("#thirdColumn").css("visibility", "hidden");
}
function addPointLoad() {
    let magnitude = parseFloat($("#pointMagnitude").val());
    let distance = parseFloat($("#pointDistance").val());
    if (distance >= 0 && distance <= beam.lengthVal) {
        $("#pointMagnitude").val("");
        $("#pointDistance").val("");
        $("#firstColumn").css("visibility", "hidden");
        $("#pointLoadsList").append("<li> Mag: " + magnitude + "<br> Dist: " + distance + "</li>")
        beam.addPointLoad(magnitude, distance, false);
    } else {
        alert("Please enter valid numbers!");
    }
}
function addDistributedLoadButtonPressed() {
    $("#secondColumn").css("visibility", "visible");
    $("#firstColumn").css("visibility", "hidden");
    $("#thirdColumn").css("visibility", "hidden");
}
function addDistributedLoad() {
    let startMagnitude = parseFloat($("#startMagnitude").val());
    let endMagnitude = parseFloat($("#endMagnitude").val());
    let xVal = parseFloat($("#distributedDistance").val());
    let length = parseFloat($("#distributedLength").val());
    if (xVal >= 0 && xVal + length <= beam.lengthVal) {
        $("#startMagnitude").val("");
        $("#endMagnitude").val("");
        $("#distributedDistance").val("");
        $("#distributedLength").val("");
        $("#secondColumn").css("visibility", "hidden");
        $("#distributedLoadsList").append("<li> Start Mag: " + startMagnitude + "<br> End Mag: " + endMagnitude + "<br> Distance: " + xVal + "<br> Length: " + length + "</li>")
        beam.addDistributedLoad(startMagnitude, endMagnitude, xVal, length);
    } else {
        alert("Please enter valid numbers!");
    }
}

function addMomentButtonPressed() {
    $("#firstColumn").css("visibility", "hidden");
    $("#secondColumn").css("visibility", "hidden");
    $("#thirdColumn").css("visibility", "visible");
}
function addMoment() {
    let magnitude = parseFloat($("#momentMagnitude").val());
    let distance = parseFloat($("#momentDistance").val());
    if (distance >= 0 && distance <= beam.lengthVal) {
        $("#momentMagnitude").val("");
        $("#momentDistance").val("");
        $("#thirdColumn").css("visibility", "hidden");
        $("#momentsList").append("<li> Mag: " + magnitude + "<br> Dist: " + distance + "</li>")
        beam.addMoment(magnitude, distance);
    } else {
        alert("Please enter valid numbers!");
    }
}

function startCalculations() {
    beam.calculateSupportReactions(); // Also adds them as point forces to the system
    calculateShearForces();
    calculateBendingForces();
    drawDiagrams = true;
}

function calculateShearForces() {

    let diagramY = beam.yCoord + beam.verticalDrawSpace + diagramHeight + 50;
    shearDiagram = new Diagram(beam, beam.xCoord, diagramY, beam.widthCoord, 100, "shear");

    let unpassedPointLoads = beam.pointLoads.slice(0);
    let unpassedDistributedLoads = beam.distributedLoads.slice(0);

    let v = 0;
    for (let x = 0; x < beam.lengthVal; x += beam.lengthVal/sections) {

        for (let i = unpassedPointLoads.length - 1; i >= 0; i -= 1) {
            let load = unpassedPointLoads[i];
            if (x >= load.xVal) {
                v += -load.magnitude;
                let index = unpassedPointLoads.indexOf(load);
                unpassedPointLoads.splice(index, 1);
            }
        }
        
        for (let i = unpassedDistributedLoads.length - 1; i >=0; i -= 1) {
            let load = unpassedDistributedLoads[i];
            if (x >= load.xVal) {
                let m = (load.endMagnitude - load.startMagnitude) / (load.length);
                let fAtPoint = m*(x - load.xVal) + load.startMagnitude;
                v += -beam.lengthVal/sections*fAtPoint;
            }

            if (x > load.xVal + load.length) {
                let index = unpassedDistributedLoads.indexOf(load);
                unpassedDistributedLoads.splice(index, 1);
            }
        }
        if (abs(v) > shearDiagram.maxLoad) {
            shearDiagram.maxLoad = abs(v);
        }
        shearDiagram.addPoint(x, v);
    }

    shearDiagram.calculatePointYCoords();
    shearDiagram.calculateDataPoints();
}

function calculateBendingForces() {
    let diagramY = shearDiagram.y + 2*shearDiagram.verticalHeight + 50;
    bendingDiagram = new Diagram(beam, beam.xCoord, diagramY, beam.widthCoord, 100, "bending");

    let unpassedMoments = beam.moments.slice(0);

    let v = 0;

    for (let point of shearDiagram.points) {


        for (let i = unpassedMoments.length - 1; i >= 0; i -= 1) {
            let load = unpassedMoments[i];
            if (point.xVal >= load.xVal) {
                v += -load.magnitude;
                let index = unpassedMoments.indexOf(load);
                unpassedMoments.splice(index, 1);
            }
        }

        v += point.yVal*shearDiagram.increment;
        bendingDiagram.addPoint(point.xVal, v);


        if (abs(v) > bendingDiagram.maxLoad) {
            bendingDiagram.maxLoad = abs(v);
        }
    }

    bendingDiagram.calculatePointYCoords();
    bendingDiagram.calculateDataPoints();
}