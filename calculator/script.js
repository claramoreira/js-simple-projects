class Calculator {
    constructor(style = "default") {
        this.buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            '-', '+', 'x', '/', '=', 'C'];
        this.style = style;
    }

    showProps() {
        console.log(this.buttons);
        console.log(this.style);

        return
    }
}

function renderCalc(calc) {
    let div = '', curr = '';
    for (i = 0; i < calc.buttons.length - 1; i++) {
        curr = `<div class="button">${calc.buttons[i]}</div><br>`
        div = div + curr;
    }
    document.getElementById("buttons").innerHTML = div;
    return;
}

const calc = new Calculator();
document.addEventListener('DOMContentLoaded', renderCalc(calc));
