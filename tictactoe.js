
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] || isGameOver) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} wins!`;
        isGameOver = true;
        return;
    }

    if (board.every(cell => cell)) {
        message.textContent = "It's a tie!";
        isGameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (currentPlayer === 'O') {
        aiMove();
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameOver = false;
    message.textContent = '';
}

function aiMove() {
    let emptyCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell] = 'O';
    cells[randomCell].textContent = 'O';

    if (checkWin('O')) {
        message.textContent = "O It's wins!";
        isGameOver = true;
        return;
    }

    if (board.every(cell => cell)) {
        message.textContent = "It's a tie!";
        isGameOver = true;
        return;
    }

    currentPlayer = 'X';
}
