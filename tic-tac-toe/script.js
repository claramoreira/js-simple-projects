const moves = {
    "col-11": "-",
    "col-12": "-",
    "col-13": "-",
    "col-21": "-",
    "col-22": "-",
    "col-23": "-",
    "col-31": "-",
    "col-32": "-",
    "col-33": "-",
};
let curr_player, curr_mark = "O", target_id, type_of_win;

const img = {
    "O": "<img class='board-img' src='img/O.png'/>",
    "X": "<img class='board-img' src='img/X.png'/>",
    "-": ""
}


const win_img = {
    "O": "<img class='win-img' src='img/O.png'/>",
    "X": "<img class='win-img' src='img/X.png'/>",
}


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('col')) {
        // this div has been clicked
        target_id = e.target.id;
        if (moves[target_id] == "-") {
            moves[target_id] = curr_mark;
        }
        type_of_win = check_win();
        if (type_of_win) {
            if (type_of_win[1]) {
                document.getElementById("game-result").innerHTML = `
                <h2>We have a winner! The winner is: ${win_img[moves["col-" + type_of_win[1]]]}</h2>
                <p>Type of win: ${type_of_win[0]}</p>
                <button class="btn" onclick={reset()}>Reset game!</reset>
                `;
            }
            else {
                document.getElementById("game-result").innerHTML = `
                <h2>Nobody wins!</h2>
                <p>Type of win: ${type_of_win[0]}</p>
                <button class="btn" onclick={reset()}>Reset game!</reset>
                `;
            }
        }
        curr_mark = (curr_mark == "O") ? "X" : "O";
        document.getElementById("board-game").innerHTML = render()
    }
});

function reset() {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            moves["col-" + i + j] = "-"
        }
    }
    document.getElementById("game-result").innerHTML = ""
    document.getElementById("board-game").innerHTML = render()
}

function render() {
    const board = `
    <p>Next to play: ${win_img[curr_mark]} </p>
    <div class="board" id="board-game">
        <div class="row border-under" id="row-1">
            <div class="col border-right" id="col-11">${img[moves["col-11"]]}</div>
            <div class="col-draw col-draw-1"></div>
            <div class="col border-right" id="col-12">${img[moves["col-12"]]}</div>
            <div class="col-draw col-draw-1"></div>
            <div class="col" id="col-13">${img[moves["col-13"]]}</div>
        </div>
        <div class="row-draw"></div>
        <div class="row border-under" id="row-2">
            <div class="col border-right" id="col-21">${img[moves["col-21"]]}</div>
            <div class="col-draw col-draw-2"></div>
            <div class="col border-right" id="col-22">${img[moves["col-22"]]}</div>
            <div class="col-draw col-draw-2"></div>
            <div class="col" id="col-23">${img[moves["col-23"]]}</div>
        </div>
        <div class="row-draw"></div>
        <div class="row" id="row-3">
            <div class="col border-right" id="col-31">${img[moves["col-31"]]}</div>
            <div class="col-draw col-draw-3"></div>
            <div class="col border-right" id="col-32">${img[moves["col-32"]]}</div>
            <div class="col-draw col-draw-3"></div>
            <div class="col" id="col-33">${img[moves["col-33"]]}</div>
        </div>
    </div>
    `;
    return board;
}

function check_win() {
    // row combination
    for (let i = 1; i <= 3; i++) {
        if (moves["col-" + i + "1"] == moves["col-" + i + "2"] && moves["col-" + i + "2"] == moves["col-" + i + "3"] && moves["col-" + i + "2"] != '-') {
            return ["Row win", i + "1"]
        }
    }
    // column combination
    for (let i = 1; i <= 3; i++) {
        if (moves["col-1" + i] == moves["col-2" + i] && moves["col-2" + i] == moves["col-3" + i] && moves["col-2" + i] != '-') {
            return ["Column win", "1" + i]
        }
    }
    if (moves["col-11"] == moves["col-22"] && moves["col-22"] == moves["col-33"] && moves["col-22"] != '-') {
        return ["Diagonal win", "22"]
    }
    if (moves["col-13"] == moves["col-22"] && moves["col-22"] == moves["col-31"] && moves["col-22"] != '-') {
        return ["Back diagonal win", "22"]
    }
    if (!Object.values(moves).includes('-')) {
        return ["None, it's a draw!", 0]
    }
}