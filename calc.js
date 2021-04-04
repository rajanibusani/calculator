console.log("i am here");
const numberButtons = document.querySelectorAll('.calc-numbers');
const operationButtons = document.querySelectorAll('.calc-operation');
const deleteButton = document.querySelector('.calc-delete');
const equalButton = document.querySelector('.calc-equals');
const allClearButton = document.querySelector('.calc-all-clear');
const previousNumbersDiv = document.querySelector('.prev-numbers');
const currentNumbersDiv = document.querySelector('.current-numbers');


class Calculator {
    constructor(previousNumbersDiv, currentNumbersDiv) {
        this.previousNumbersDiv = previousNumbersDiv;
        this.currentNumbersDiv = currentNumbersDiv;
        this.clear();
    }
    clear() {
        this.prevNumbers = "";
        this.currentNumbers = "";
        this.operation = undefined;
    }
    delete() {
        this.currentNumbers = this.currentNumbers.toString().slice(0, -1);
    }
    appendNumbers(number) {
        if (number === "." && this.currentNumbers.includes(".")) {
            return
        } else {
            this.currentNumbers = this.currentNumbers.toString() + number.toString();

        }
    }
    choosingOperation(operation) {
        if (this.currentNumbers === "") {
            return
        } else if (this.prevNumbers !== "") {
            this.calculation();
        } else {
            this.operation = operation;
            // this.currentNumbers = this.currentNumbers + this.operation;
            console.log(this.currentNumbers, this.operation)
            this.prevNumbers = this.currentNumbers;
            this.currentNumbers = "";
        }
    }
    calculation() {

        let result;
        let previous = parseFloat(this.prevNumbers);
        let current = parseFloat(this.currentNumbers);
        if (isNaN(previous) || isNaN(current)) {
            return
        } else {
            switch (this.operation) {
                case "+":
                    result = previous + current;
                    break;
                case "-":
                    result = previous - current;
                    break;
                case "×":
                    result = previous * current;
                    break;
                case "÷":
                    result = previous / current;
                    break;
                default:
                    return;

            }
            this.currentNumbers = result;
            this.prevNumbers = "";
            this.operation = undefined;
        }
    }
    updateDisplay() {
        this.currentNumbersDiv.innerText = this.currentNumbers;
        this.previousNumbersDiv.innerText = this.prevNumbers;
    }
}

const calculator = new Calculator(previousNumbersDiv, currentNumbersDiv)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("numbers", button.innerText);
        calculator.appendNumbers(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("operation", button.innerText);
        calculator.choosingOperation(button.innerText);
    })
})

equalButton.addEventListener("click", () => {
    calculator.calculation();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})





