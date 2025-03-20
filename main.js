"use strict";

function add(num1, num2) {

    if(typeof(num1) === "number" && typeof(num2) === "number") {
        return num1 + num2;
    } else {
        return null
    }
}

function subtract(num1, num2) {
    if(typeof(num1) === "number" && typeof(num2) === "number") {
        return num1 - num2;
    } else {
        return null
    }
}


function multiply(num1, num2) {
        if(typeof(num1) === "number" && typeof(num2) === "number") {
            return num1 * num2;
        } else {
            return null
        }
}

function divide(num1, num2) {
        if(typeof(num1) === "number" && typeof(num2) === "number") {
            if(num2 === 0){
                throw new Error("DIVISION BY ZERO");
            }
            return num1 / num2;
        } else {
            return null;
        }
}


function operate(n1, op, n2) {
    let operation = {
        "+": add(n1, n2),
        "-": subtract(n1, n2),
        "*": multiply(n1, n2),
        "/": divide(n1, n2),
    };


    if (op in operation) {
        return operation[op];
    } else {
        throw new Error("NO OPERATOR FOUND");
    }
}

function changeColorBtn(obj,color1, color2) {
    // color1 is the original color
    // color2 color presented when the key is pressed
    obj.style["background-color"] = color2;
    setTimeout(() => obj.style["background-color"] = color1,200);
}

function checkStatus() {
    let isAnOperation = keyboardOperationsName.includes(input);
    let isAnEdit = keyboardEditName.includes(input);

    if(input === "CLEAR" && isAnEdit) {
        sequence = [];
        input = "";
        screenResult.innerText = "";
    } else if(sequence.length === 0 && !isAnOperation) {
        sequence.push(input);
        screenResult.innerText = sequence[0];
    } else if(sequence.length === 1 && !isAnOperation)  {
       sequence[0] += input;
        screenResult.innerText = sequence[0];
    } else if(sequence.length === 1 && isAnOperation){
        sequence.push(input);
        screenResult.innerText = `${sequence[0]} ${sequence[1]}`;
    } else if(sequence.length === 2 && !isAnOperation) {
        sequence.push(input);
        screenResult.innerText = `${sequence[0]} ${sequence[1]} ${sequence[2]}`;
    } else if(sequence.length === 3 && !isAnOperation && !isAnEdit) {
       sequence[2] += input;
        screenResult.innerText = `${sequence[0]} ${sequence[1]} ${sequence[2]}`;
    } else if(sequence.length === 3 && input === "=" && isAnEdit) {
        let operationHolder = operate(+sequence[0], sequence[1], +sequence[2]);
        sequence = [];
        sequence.push(operationHolder);
        screenResult.innerText = sequence[0] ;
    } else if(sequence.length === 3 && isAnOperation && !isAnEdit) {
        let operationHolder = operate(+sequence[0], sequence[1], +sequence[2]);
        sequence = [];
        sequence.push(operationHolder);
        sequence.push(input);
        screenResult.innerText = `${sequence[0]} ${sequence[1]}`;
    }


}
// let num1 ="", operator = "";
let input = "";
let sequence = [];

let screenResult = document.querySelector("#screen > #result");
let keyboardNumbersName = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0",".",  ""]
let keyboardNumbers = document.querySelector("#keyboard > #numbers");
let keyboardOperationsName = ["/", "*", "+", "-"];
let keyboardOp = document.querySelector("#keyboard > #operations");
let keyboardEditName = [ "CLEAR", "DEL" , "="]
let bgColor = ["red","yellow" , "green"]
let keyboardEd = document.querySelector("#keyboard > #edit");

for (let x = 0 ; x < 12; x++) {
    let btn = document.createElement("div");
    btn.innerText = keyboardNumbersName[x];
    btn.style["background-color"] = "gray"
    btn.style["text-align"] = "center"
    btn.style["align-content"] = "center"
    btn.style["color"] = "white"
    btn.setAttribute("id", "key-"+ x);
    if (x < 10) {
        btn.addEventListener("click", () => {
            // Si presionamos el igual
            input = keyboardNumbersName[x];
            checkStatus();
            changeColorBtn(btn,"gray", "green");
        });
    } else if (x === 10) {
        // Si presionamos el punto
            btn.addEventListener("click", () => !(num1.includes(".")) ? num1 += ".": null);
    }

    keyboardNumbers.appendChild(btn);
}

for (let x = 0; x < 4; x++) {
    let btn = document.createElement("div");
    btn.innerText = keyboardOperationsName[x];
    btn.style["background-color"] = "gray"
    btn.style["text-align"] = "center"
    btn.style["align-content"] = "center"
    btn.style["color"] = "white"
    btn.setAttribute("id", "op"+ x);
    btn.addEventListener("click", () => {
        input = keyboardOperationsName[x];
        checkStatus();

        changeColorBtn(btn, "gray", "green");
    });
    keyboardOp.appendChild(btn);

}

for (let x= 0; x < 3; x++) {
    let btn = document.createElement("div");
    btn.innerText = keyboardEditName[x];
    btn.style["background-color"] = bgColor[x];
    btn.style["text-align"] = "center";
    btn.style["align-content"] = "center";
    btn.style["color"] = "black";
    btn.setAttribute("id", "edit-"+ x);

    if (x === 2) {
        btn.addEventListener("click", () => {
        changeColorBtn(btn, "green", "grey");
        try {
            input = keyboardEditName[x]
            checkStatus();


        } catch (error) {
            screenResult.innerText = error;
            console.log(error);
        }
        });
    } else if(x === 0) {
        btn.addEventListener("click", () => {
            changeColorBtn(btn, "red", "grey");
            input = keyboardEditName[x]
            checkStatus();
        });
    }

    keyboardEd.appendChild(btn);
}
