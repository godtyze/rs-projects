const result = document.querySelector('.game-result');
const stepCount = document.querySelector('.step-count');
const resetGameBtn = document.querySelector('.reset');
const resultBoard = document.querySelector('.result-board');
const spaces = document.querySelectorAll('.space');
const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const listeners = Array(9);

let circle = `<svg class="circle">
                <circle r="50" cx="65" cy="65" stroke="blue" stroke-width="5" fill="none" stroke-linecap="round"></circle>
            </svg>`;
let cross = `<svg class="cross">
                <line class="first" x1="15" y1="15" x2="110" y2="110" stroke="red" stroke-width="5" stroke-linecap="round"></line>
                <line class="second" x1="110" y1="15" x2="15" y2="110" stroke="red" stroke-width="5" stroke-linecap="round"></line>
            </svg>`;
let count = 0;
let resultArray = [];
let field = Array(9);
let winner = 'Tie';
let winnerCombination;
let currentWidth = window.innerWidth;


if (currentWidth <= 420) {
    circle = `<svg class="circle">
                <circle r="40" cx="50" cy="50" stroke="blue" stroke-width="5" fill="none" stroke-linecap="round"></circle>
            </svg>`;
    cross = `<svg class="cross">
                <line class="first" x1="10" y1="10" x2="90" y2="90" stroke="red" stroke-width="5" stroke-linecap="round"></line>
                <line class="second" x1="90" y1="10" x2="10" y2="90" stroke="red" stroke-width="5" stroke-linecap="round"></line>
            </svg>`;
}

function init() {
    spaces.forEach((space, idx) => {
        listeners[idx] = (event) => onSpaceClick(event.target, idx);
        space.addEventListener('click', listeners[idx]);
    });
}

function cleanSpaceListeners() {
    spaces.forEach((space, idx) => {
        space.removeEventListener('click', listeners[idx]);
    });
}

const setLocalStorage = () => {
    localStorage.setItem('result', JSON.stringify(resultArray));
}

const getLocalStorage = () => {
    if (!JSON.parse(localStorage.getItem('result'))) {
        return;
    }
    resultArray = JSON.parse(localStorage.getItem('result'));
    renderBoard();
}

const renderBoard = () => {
    while (resultBoard.children.length > 1) {
        resultBoard.removeChild(resultBoard.lastChild);
    }
    for (let i = 0; i < resultArray.length; i++) {
        if (resultArray.length > 10) {
            resultArray.pop();
        }
        const p = document.createElement('p');
        p.textContent = resultArray[i];
        p.classList.add('result');
        resultBoard.append(p);
    }
}

const turn = (target, child) => {
    target.insertAdjacentHTML('beforeend', child);
}

const resetGame = () => {
    count = 0;
    winner = 'Tie';
    field = Array(9);
    result.textContent = '';
    result.classList.remove('red', 'blue');
    stepCount.textContent = '';
    spaces.forEach(el => {
        el.innerHTML = '';
        el.classList.remove('x', 'o', 'winner');
    })
    init();
}

function onSpaceClick(target, idx) {
    if (field[idx]) return;
    field[idx] = count % 2 === 0 ? 'x' : 'o';
    turn(target, count % 2 === 0 ? cross : circle);
    count++;
    stepCount.textContent = `Step count: ${count}`;
    if (count >= 5) {
        if (checkWinCondition()) {
            setTimeout(renderWinner, 1000);
            cleanSpaceListeners();
        }
    }
}

function renderWinner() {
    resultArray.unshift(`${winner}, step count: ${count}`);
    result.textContent = winner;
    if (winner !== 'Tie') {
        winner === 'Player X won' ? result.classList.add('red') : result.classList.add('blue');
        winnerCombination.forEach(el => spaces[el].classList.add('winner'));
    }
    renderBoard();
}

function checkWinCondition() {
    const win = winCombination.map((row) => {
        const mapped = row.map(el => field[el]);
        const crossWin = mapped.every(x => x === 'x');
        const circleWin = mapped.every(o => o === 'o');
        if (crossWin) winner = 'Player X won';
        if (circleWin) winner = 'Player O won';
        if (crossWin || circleWin) {
            winnerCombination = row;
        }
        return crossWin || circleWin;
    }).includes(true);
    return win || count === 9;
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);
resetGameBtn.addEventListener('click', resetGame);
