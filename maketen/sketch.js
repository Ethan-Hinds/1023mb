
function go() {
    document.getElementById("results").innerHTML = "";
    let nums = document.getElementById("nums").value.split(",").map(el => {return el.trim()});
    let permutations = permutator(nums);
    let result = parseInt(document.getElementById("result").value);
    let operations = ["+", "-", "*", "/"];

    let opOrders = [];
    for (let i = 0; i < operations.length**(nums.length-1); i++) {
        let n = i.toString(operations.length);

        while (n.length < nums.length-1) {
            n = "0" + n;
        }
        let arr = [];
        for (let j = 0; j < nums.length-1;j++) {
            arr.push(parseInt(n[j]));
        }
        opOrders.push(arr);
    }

    for (let i = 0; i < permutations.length; i++) {
        for (let j = 0; j < opOrders.length; j++) {
            let ex = "";
            for (let k = 0; k < permutations[i].length; k++) {
                ex += permutations[i][k];
                if (k < opOrders[j].length) {
                    ex += operations[opOrders[j][k]];
                }
            }
            if (math.evaluate(ex) == result) {
                let p = document.createTextNode(ex);
                document.getElementById("results").appendChild(p);
                return;
            }
        }
    }
    let p = document.createTextNode("No answers found!");
    document.getElementById("results").appendChild(p);
}



const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
  }