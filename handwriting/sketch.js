let letters;

let letterWidth;
let letterHeight = 50;

async function setup() {
    noStroke(255);
    fill(255);
    createCanvas(800, 300);
    background(255);
}

function draw() {
    if (!letters) { return };
    x = 0;
    y = 0;
    let _letterWidth = parseInt(document.getElementById("letterWidth").value);
    if (!isNaN(_letterWidth) && _letterWidth > 0) {
        letterWidth = _letterWidth;
    }
    background(0);
    let text = document.getElementById("text").value;
    for (let char of text) {
        if (char == " ") {
            x += letterWidth;
        } else if (char in letters) {
            for (let coord of letters[char]) {
                ellipse(coord[0]+x, coord[1]+y, 3, 3);
            }
            x += letterWidth;
        }
        if (x > width-2*letterWidth) {
            x = 0;
            y += letterHeight;
        }
    }
}

function uploadFile() {
    document.getElementById("prompt").style.display = "none";
    document.getElementById("type").style.display = "block";
    let file = document.getElementById("fileUpload").files[0];
    let reader = new FileReader();
    reader.onload = () => {
        letters = JSON.parse(reader.result);
    }
    reader.readAsText(file);

}
