

function fileUpload() {
    let open = document.getElementById("open").value;
    let close = document.getElementById("close").value;

    let files = document.getElementById("fileUpload").files;
    for(let file of files) {
        let reader = new FileReader();
        reader.onload = () => {
            // letters = JSON.parse(reader.result);
            parseFile(reader.result, open, close, file.name);
        }
        reader.readAsText(file);
    }
}

function parseFile(text, open, close, filename) {
    let lines = text.split("\n");

    // Loop backward to delete lines and timestamps
    for (let i = lines.length-1; i >= 0; i--) {
        lines[i] = lines[i].replaceAll("\r", "");
        let line = lines[i];
        if (line.length == 0) { // Line is blank
            continue;
        }
        if (!isNaN(line)) { // Line is just a number
            continue;
        }
        if (line.includes(open) && line.includes(close)) {  // Line includes a CC
            lines.splice(i, 1);
            if(lines[i-2] && !isNaN(lines[i-2])) {    // 2 lines above is a number, delete the whole timestamp
                lines.splice(i-2,2);
            }
        }
    }
    // Loop backward again to remove duplicate blank lines
    for (let i = lines.length-1; i >= 0; i--) {
        if (lines[i].length == 0 && i > 0 && lines[i-1].length == 0) {
            lines.splice(i, 1);
        }
    }

    // Delete any blank lines at the beginning
    while (lines[0].length == 0) {
        lines.splice(0, 1);
    }

    // Loop forward to redo numbering
    let num = 1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length == 0) { // Line is blank
            continue;
        }
        if (i == 0 || (!isNaN(lines[i]) && lines[i-1].length==0) ){
            lines[i] = num;
            num++;
        }
    }

    let newText = lines.join("\n");
    newText += "\n";
    download(filename, newText);
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
