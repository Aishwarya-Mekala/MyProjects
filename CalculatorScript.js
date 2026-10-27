
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentInput = "0";
let previousInput = null;
let operator = null;
let resetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function calculate() {
    if (operator === null || previousInput === null) {
        return;
    }

    const a = Number(previousInput);
    const b = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if (b === 0) {
                currentInput = "Cannot divide by zero";
                previousInput = null;
                operator = null;
                resetDisplay = true;
                updateDisplay();
                return;
            }
            result = a / b;
            break;
    }

    if (!Number.isFinite(result)) {
        currentInput = "Error";
    } else {
        currentInput = String(
            Number(result.toPrecision(10))
        );
    }

    previousInput = null;
    operator = null;
    resetDisplay = true;
    updateDisplay();
}

buttons.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) return;

    if (button.dataset.number !== undefined) {
        const number = button.dataset.number;

        if (resetDisplay || currentInput === "Error" ||
            currentInput === "Cannot divide by zero") {
            currentInput = number;
            resetDisplay = false;
        } else if (currentInput === "0") {
            currentInput = number;
        } else if (currentInput.length < 15) {
            currentInput += number;
        }

        updateDisplay();
        return;
    }

    if (button.dataset.operator !== undefined) {
        if (currentInput === "Error" ||
            currentInput === "Cannot divide by zero") {
            return;
        }

        if (operator !== null && !resetDisplay) {
            calculate();
        }

        previousInput = currentInput;
        operator = button.dataset.operator;
        resetDisplay = true;
        return;
    }

    const action = button.dataset.action;

    if (action === "clear") {
        currentInput = "0";
        previousInput = null;
        operator = null;
        resetDisplay = false;
        updateDisplay();
    }

    if (action === "delete") {
        if (resetDisplay) return;

        currentInput = currentInput.slice(0, -1) || "0";
        updateDisplay();
    }

    if (action === "decimal") {
        if (resetDisplay || currentInput === "Error" ||
            currentInput === "Cannot divide by zero") {
            currentInput = "0.";
            resetDisplay = false;
        } else if (!currentInput.includes(".")) {
            currentInput += ".";
        }

        updateDisplay();
    }

    if (action === "calculate") {
        calculate();
    }
});
