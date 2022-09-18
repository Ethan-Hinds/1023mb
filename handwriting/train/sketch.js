const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let index = 0;

let pixels = {};

function setup() {
    createCanvas(50, 50);
    background(0);
    stroke(255);
    strokeWeight(5);
    setLetter(alphabet[index]);
}

function setLetter(letter) {
    document.getElementById("letter").innerText = letter;
    pixels[letter] = [];
}

function clearLetter() {
    background(0);
    pixels[alphabet[index]] = [];
}

function next() {
    if (index == alphabet.length-1) {
        let link = document.getElementById("downloadLink");
        link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(pixels)));
        link.setAttribute('download', "handwriting.json");
        let button = document.getElementById("downloadButton");
        button.style.visibility = "visible";
        return;
    }
    index++;
    background(0);
    setLetter(alphabet[index]);
}

function draw() {
    if (mouseIsPressed) {
        let x = mouseX;
        let y = mouseY;
        if (x > 0 && x < width && y > 0 && y < height) {
            point(x, y);
            pixels[alphabet[index]].push([floor(x), floor(y)]);
        }
    }
}
