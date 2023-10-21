function createKeyPad() {
    const keys =   ["7", "8", "9", "C",
                    "4", "5", "6", "/",
                    "1", "2", "3", "X",
                    "0", "-", "+", "="];
    const keypadElem = document.querySelector("#keypad");

    keys.forEach((item) => {
        let div = document.createElement("div");
        div.className = "key";
        div.id = item;

        let textNode = document.createTextNode(item);
        div.append(textNode);

        keypadElem.append(div);
    });

    setDisplay(0);
    sessionStorage.clear();
}


function onClick(e) {
    if (e.target.className != "key") return;

    const operators = ["C", "/", "X", "-", "+", "="];

    const input = e.target.id;
    
    if (!operators.includes(input)) onClickNum(input);
    else onClickOperator(input);
}


function onClickNum(input) {
    if (getTrigger()) {
        if(getOperator()) {
            let num = +getDisplay();
            setNum(num);
            setDisplay(0);
            setTrigger(false);
        } else {
            setDisplay(0);
            setTrigger(false);
        }
    }

    let num = +getDisplay() * 10 + +input;

    setDisplay(num);
}


function onClickOperator(input) {
    const currNum = +getDisplay();

    switch (input) {
        case "C":
            setDisplay(0);
            sessionStorage.clear();
            setReset(false);
            break;
        case "=":
            result(currNum);
            break;
        default:
            if (getNum()) {
                result(currNum);
                sessionStorage.clear();
            }
            setOperator(input);
            setTrigger(true);
    }
}


function result(secondNum) {
    const firstNum = getNum();
    const operator = getOperator();
    
    let result = 0;

    switch (operator) {
        case "+":
            result = firstNum + secondNum;
            break;
        case "-":
            result = firstNum - secondNum;
            break;
        case "X":
            result = firstNum * secondNum;
            break;
        case "/":
            if (secondNum == 0) showDivZeroError();
            else result = firstNum / secondNum;
            break;
        default:
            result = secondNum;
    }

    setDisplay(result);
    setTrigger(true);
}


function setNum(num) {
    sessionStorage.setItem("num", JSON.stringify(num));
}

function getNum() {
    return JSON.parse(sessionStorage.getItem("num"));
}

function setOperator(operator) {
    sessionStorage.setItem("operator", JSON.stringify(operator))
}

function getOperator() {    
    return JSON.parse(sessionStorage.getItem("operator"));
}

function setDisplay(input) {
    const display = document.querySelector("#display").firstElementChild;

    display.textContent = input;
}

function getDisplay() {
    return document.querySelector("#display").firstElementChild.textContent;
}

function setTrigger(value) {
    if (value) sessionStorage.setItem("trigger", JSON.stringify(value));
    else sessionStorage.setItem("trigger", JSON.stringify(value));
}   

function getTrigger() {
    return JSON.parse(sessionStorage.getItem("trigger"));
}

function showDivZeroError() {
    const error = document.querySelector("#error");
    error.style.display = "block";

    setDisplay(0);
    sessionStorage.clear();

    setTimeout(() => {
        error.style.display = "none";
    }, 2500);
}


function init() {    
    document.addEventListener("DOMContentLoaded", createKeyPad);
    document.querySelector("#keypad").addEventListener("click", onClick);
}

init();
