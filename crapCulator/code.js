let tex = "";
let arr = [];
let rst = false;
let lastIsNum = false;

// button values
let bVals = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '+', '0', '.', '=', '-']

function lol(){
    document.getElementById("back").innerHTML = "🤣🤣";
}

function evalArr() {
    while(arr.length > 1) {
        // get index of high priority / * + -
        let order = 1;
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            let elem = arr[i];
            if ((elem === "+") && (order < 2)) {
                order = 2;
                index = i;
            } else if ((elem === "*") && (order < 3)) {
                order = 3;
                index = i;
            } else if ((elem === "/") && (order < 4)) {
                order = 4;
                index = i;
            } else if ((elem === "-") && (order = 1)) {
                order = 1;
                index = i;
            } else {
                // pass
            }
        }
        // getting result
        let result = 0;
        if (order == 1) {
            result = Number(arr[index-1]) - Number(arr[index+1]);
        } else if (order == 2) {
            result = Number(arr[index-1]) + Number(arr[index+1]);
        } else if (order == 3) {
            result = Number(arr[index-1]) * Number(arr[index+1]);
        } else {
            if (arr[index+1] == 0) {
                result = "error";
            } else {
                result = arr[index-1] / arr[index+1];
            }
        }
        if (result === "error") {
            arr = ["error"];
        } else {
            // purifying the array
            let newArr = [];
            for (let j = 0; j < arr.length; j++) {
                if ((j < index-1) || (j > index+1)){
                    newArr.push(arr[j]);
                }
                if (j == index) {
                    newArr.push(result);
                }
            }
            arr = newArr;
        }
        console.log(arr);
    }
}

function shuffleBvals() {
    let tmpArr = bVals;
    let newArr = [];
    while (tmpArr.length > 0) {
        let i = Math.floor(Math.random() * (tmpArr.length - 0.01));
        newArr.push(tmpArr[i]);
        tmpArr.splice(i,1);
    }

    // set bvals array
    bVals = newArr;

    // set the keyCaps
    for (let i = 0; i < 16; i++) {
        document.getElementById("b" + String(i+1)).innerHTML = bVals[i];
    }
}

function display(){
    let tex = "";
    for (let i = 0; i < arr.length; i++) {
        let m = String(arr[i]);
        if ((m == "+") || (m == "-") || (m == "*") || (m == "/")) {
            tex += " " + m + " ";
        } else {
            tex += m;
        }
    }
    document.getElementById("display").innerHTML = tex;
}

function inpClick(butId) {
    console.log(rst, arr);
    if (rst) {
        arr = [];
        rst = false;
        lastIsNum = false;
    }
    let inp = bVals[butId-1]
    if ((inp == "=")) {
        rst = true;
        evalArr();
    } else if ((inp == "+") || (inp == "-") || (inp == "*") || (inp == "/")) {
        arr.push(inp);
        lastIsNum = false;
    } else {
        if (lastIsNum) {
            arr[arr.length-1] += inp;
        } else {
            arr.push(inp);
            lastIsNum = true;
        }
    }
    display();
    shuffleBvals();
}