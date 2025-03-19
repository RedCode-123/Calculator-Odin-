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
            throw new Error("Division by zero");
        }
        return num1 / num2;
    } else {
        return null;
    }
}

let num1, num2, operator;

function operate(n1, op, n2) {
    let operation = {
        "+": add(n1, n2),
        "-": subtract(n1, n2),
        "*": multiply(n1, n2),
        "/": divide(n1, n2),
    };
    return op in operation ? operation[op]: null;
}

let keyboardNumbersName = [7, 8, 9, 4, 5, 6, 1, 2, 3,0,".",  ""]
for (let x = 0 ; x < 12; x++) {
    let keyboardNumbers = document.querySelector("#keyboard > #numbers");
    let btn = document.createElement("div");
    btn.innerText = keyboardNumbersName[x];
    btn.style["background-color"] = "gray"
    btn.style["text-align"] = "center"
    btn.style["align-content"] = "center"
    btn.style["color"] = "white"
    btn.setAttribute("id", "key-"+ x);
    keyboardNumbers.appendChild(btn);
}
// let clear = document.querySelector("#keyboard > #numbers > #key-11");
// clear.style["background-color"] = "red"

let keyboardOperationsName = ["/", "*", "+", "-"]
for (let x= 0; x < 4; x++) {
    let keyboardOp = document.querySelector("#keyboard > #operations");
    let btn = document.createElement("div");
    btn.innerText = keyboardOperationsName[x];
    btn.style["background-color"] = "gray"
    btn.style["text-align"] = "center"
    btn.style["align-content"] = "center"
    btn.style["color"] = "white"
    btn.setAttribute("id", "op"+ x);
    keyboardOp.appendChild(btn);

}

let keyboardEditName = [ "CLEAR", "DEL" , "="]
let bgColor = ["red","yellow" , "green"]
for (let x= 0; x < 3; x++) {
    let keyboardEd = document.querySelector("#keyboard > #edit");
    let btn = document.createElement("div");
    btn.innerText = keyboardEditName[x];
    btn.style["background-color"] = bgColor[x];
    btn.style["text-align"] = "center";
    btn.style["align-content"] = "center";
    btn.style["color"] = "black";
    btn.setAttribute("id", "edit-"+ x);
    keyboardEd.appendChild(btn);

}
