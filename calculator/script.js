class Calculator {
    constructor(style = "default") {
        this.buttons = [7, 8, 9, '-', 3, 4, 5, '+', 1, 2, 3, 'x', 0,
            '/', '='];
        this.style = style;
        this.visor = 0;
        this.mem = null;
        this.mem_op = null;
        this.flag = 0;
    }

    showProps() {
        console.log(this.buttons);
        console.log(this.style);
        return
    }
}

document.addEventListener('click', function (e) {
    let value;
    if (e.target.classList.contains('button')) {
        // this div has been clicked
        clicked = e.target.id;
        console.log(clicked)
        button = parseInt(clicked)
        if (!isNaN(button)) {
            if (calc.visor == 0 || calc.flag == 1) {
                calc.visor = button;
                calc.flag = 0;
            }
            else {
                calc.visor = calc.visor + '' + button;
            }
        }
        else {
            if (clicked === 'C') {
                reset(calc);
            }
            else if (clicked === '=') {
                if (calc.mem_op !== null && calc.mem !== null) {
                    let operation = dict_function[calc.mem_op];
                    calc.visor = operation(calc.mem, calc.visor);
                    calc.mem_op = null;
                }
            }
            else {
                if (calc.mem_op === null) {
                    value = 0;
                    calc.mem = calc.visor;
                }
                else {
                    let operation = dict_function[calc.mem_op];
                    value = operation(calc.mem, calc.visor);
                    calc.mem = value;
                    calc.flag = 1;
                }

                calc.mem_op = clicked;
                calc.visor = value;
            }
        }
        renderCalc(calc);
    }
});

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return parseInt(a) - parseInt(b);
}

function divide(a, b) {
    return parseInt(a) / parseInt(b);
}

function multiplicate(a, b) {
    return parseInt(a) * parseInt(b);
}

function reset() {
    calc.visor = 0;
    calc.mem = null;
    calc.mem_op = null;
}

const dict_function = {
    '+': add,
    '-': subtract,
    '/': divide,
    'x': multiplicate,
    'C': reset
}

function renderCalc(calc) {
    let div = '', curr = '';
    div = `<div class="header" id="header">${calc.visor}</div>`
    for (i = 0; i < calc.buttons.length; i++) {
        curr = `<div class="button ${(!isNaN(calc.buttons[i]) ? 'number' : 'operation')}" id="${calc.buttons[i]}">${calc.buttons[i]}</div>`
        div = div + curr;
    }
    curr = `<div class="button C" id="C">C</div>`
    div = div + curr;
    document.getElementById("buttons").innerHTML = div;
    return;
}

const calc = new Calculator();
document.addEventListener('DOMContentLoaded', renderCalc(calc));
