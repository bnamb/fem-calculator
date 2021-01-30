let runningTotal = 0;
let buffer = "0";
let previousOperation = null;
const screen = document.querySelector(".calc-screen");

document.querySelector('.buttons').addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
    buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperation = null;
            break;
        case '=':
            if (previousOperation === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperation = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
                break;
            }
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperation = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperation === "+") {
        runningTotal += intBuffer;
    } else if (previousOperation === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperation === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}