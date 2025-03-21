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
    switch(op){
    case "+":
        return add(n1, n2);
        break;
    case "-":
        return subtract(n1, n2);
        break;
    case "*":
        return multiply(n1, n2);
        break;
    case "/":
        return divide(n1, n2);
        break;
    default:
        throw new Error("NO OPERATOR FOUND");
    }


}
function  roundNumberUntil(number, until) {
    // Redondea "number" hast "until" decimales
    number = +number;
  if(!Number.isInteger(number)){
      number = number.toString();
      let indexOfdot = number.indexOf(".");
    let decimalPart = number.slice(indexOfdot, -1);
    console.log(decimalPart.length)
     if(decimalPart.length >= until) {
       return Math.round(number);
     }
  }
    return number;
}
function changeColorBtn(obj,color1, color2) {
    // color1 is the original color
    // color2 color presented when the key is pressed
    obj.style["background-color"] = color2;
    setTimeout(() => obj.style["background-color"] = color1,200);
}

function delChar(list) {
  let prevItems = list.slice(0, list.length-1);
  let lastItem = list[list.length-1].toString();
  prevItems.push(lastItem.slice(0,lastItem.length-1));

   if((prevItems[prevItems.length-1] === "")) {
     return prevItems.slice(0, prevItems.length-1);
   }
   return prevItems;
}

function toStringSequence(list) {
  return  list.reduce((acc, item) => acc + " " + item, "")
}

function checkStatus() {
    let isAnOperation = keyboardOperationsName.includes(input);
    let isAnEdit = keyboardEditName.includes(input);
    if(input === "CLEAR" && isAnEdit) {
        sequence = [];
        input = "";
        screenResult.innerText = "";
    } else if (sequence.length === 0 && input === "." && !isAnOperation && !isAnEdit) {
        sequence.push("0" + input);
        screenResult.innerText = sequence[0];
    } else if (sequence.length === 1 && input === "." && !isAnOperation && !isAnEdit) {
        if (!sequence[0].includes(".")) {
            sequence[0] += input;
            screenResult.innerText = sequence[0];
        }
    } else if (sequence.length === 2 && input === "." && !isAnOperation && !isAnEdit) {
            sequence.push("0" + input);
            screenResult.innerText = toStringSequence(sequence);
    } else if (sequence.length === 3 && input === "." && !isAnOperation && !isAnEdit) {
        if (!sequence[2].includes(".")) {
            sequence[2] += input;
            screenResult.innerText = toStringSequence(sequence);
        }
    } else if(sequence.length === 0 && !isAnOperation && !isAnEdit) {
        sequence.push(input);
        screenResult.innerText = sequence[0];
    } else if(sequence.length === 1 && !isAnOperation && !isAnEdit)  {
       sequence[0] += input;
        screenResult.innerText = sequence[0];
    } else if(sequence.length === 1 && isAnOperation && !isAnEdit){
        sequence.push(input);
        screenResult.innerText = toStringSequence(sequence);
    } else if(sequence.length === 2 && !isAnOperation && !isAnEdit) {
        sequence.push(input);
        screenResult.innerText = toStringSequence(sequence);
    } else if(sequence.length === 3 && !isAnOperation && !isAnEdit) {
       sequence[2] += input;
        screenResult.innerText = toStringSequence(sequence);
    } else if(sequence.length === 3 && input === "=" && isAnEdit) {
        let operationHolder = operate(+sequence[0], sequence[1], +sequence[2]);
        sequence = [roundNumberUntil(operationHolder,10).toString()];
        // Redondeamos el numero que tenga hasta 10 decimales
        screenResult.innerText = sequence[0];
    } else if(sequence.length === 3 && isAnOperation && !isAnEdit) {
        let operationHolder = operate(+sequence[0], sequence[1], +sequence[2]);
        sequence = [];
        sequence.push(operationHolder.toString());
        sequence.push(input);
        screenResult.innerText = toStringSequence(sequence);
    } else if(input === "DEL") {
        let newSequence = delChar(sequence);
        sequence = newSequence;
        screenResult.innerText = toStringSequence(sequence);
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


document.addEventListener("keyup", (event) => {
    let keyPressed = event.key;
    console.log(keyPressed);
    if(keyboardNumbersName.includes(keyPressed)){
        // Si presionamos un numero
        // changeColorBtn(btn,"gray", "green");
        input = keyPressed;
        checkStatus();
        if(keyPressed === "."){
            changeColorBtn(document.querySelector("#key-dot"), "gray", "green");
        } else{
            changeColorBtn(document.querySelector("#key-"+keyPressed), "gray", "green");
        }
    } else if(keyboardOperationsName.includes(keyPressed)){

        try {
            input = keyPressed;
            checkStatus();
        } catch (error) {
            screenResult.innerText = error;
            console.log(error);
        }
        changeColorBtn(document.querySelector("#op-"+keyPressed), "gray", "green");
    } else if(keyPressed === "Enter"){
        try {
            input = "="
            checkStatus();

        } catch (error) {
            screenResult.innerText = error;
            console.log(error);
        }
        changeColorBtn(document.querySelector("#edit-eq"), "green", "grey");
    }else if(keyPressed === "Backspace") {
        // DEL button
        input = "DEL";
        checkStatus();

            changeColorBtn(document.querySelector("#edit-DEL"), "yellow", "grey");
    }else if(keyPressed === "Delete") {
      // CLEAR button
        input = "CLEAR";
        checkStatus();

        changeColorBtn(document.querySelector("#edit-CLEAR"), "red", "grey");
    }
});

for (let x = 0 ; x < 12; x++) {
    let btn = document.createElement("div");
    btn.innerText = keyboardNumbersName[x];
    btn.style["background-color"] = "gray"
    btn.style["text-align"] = "center"
    btn.style["align-content"] = "center"
    btn.style["color"] = "white"
    if(keyboardNumbersName[x] === "."){
        btn.setAttribute("id", "key-dot");
    }else{
        btn.setAttribute("id", "key-"+ keyboardNumbersName[x]);
    }
    if (x < 11) {
        btn.addEventListener("click", () => {
            // Si presionamos un numero
            input = keyboardNumbersName[x];
            checkStatus();
            changeColorBtn(btn,"gray", "green");
        });


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
    btn.setAttribute("id", "op-"+ keyboardOperationsName[x]);
    btn.addEventListener("click", () => {
        changeColorBtn(btn, "gray", "green");

        try {
            input = keyboardOperationsName[x];
            checkStatus();
        } catch (error) {
            screenResult.innerText = error;
            console.log(error);
        }

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
    if(keyboardEditName[x] === "=") {
        btn.setAttribute("id", "edit-eq");
    }else {
        btn.setAttribute("id", "edit-"+ keyboardEditName[x]);
    }

    if (x === 2) {
        // "=" button
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
        //Clear button
        btn.addEventListener("click", () => {
            changeColorBtn(btn, "red", "grey");
            input = keyboardEditName[x]
            checkStatus();
        });
    } else if(x === 1){
        // DEL button
        btn.addEventListener("click", () => {
            changeColorBtn(btn, "yellow", "grey");
            input = keyboardEditName[x]
            checkStatus();
        });

    }

    keyboardEd.appendChild(btn);
}

