document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restartButton");
    const message = document.getElementById("message");

    let currentPlayer = "X";
    let gameActive = true;
    let boardState = Array(9).fill("");

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

    // Audio elements
    const clickSound = new Audio('click.mp3'); // Replace with your click sound file
    const winSound = new Audio('win.mp3'); // Replace with your win sound file

    function playClickSound() {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    function playWinSound() {
        winSound.currentTime = 0;
        winSound.play();
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute("data-index");

        if (boardState[index] !== "" || !gameActive) {
            return;
        }

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("occupied");

        playClickSound(); // Play click sound

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            playWinSound(); // Play win sound
            gameActive = false;
        } else if (boardState.every(cell => cell !== "")) {
            message.textContent = "It's a tie!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    }

    function restartGame() {
        currentPlayer = "X";
        gameActive = true;
        boardState = Array(9).fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("occupied");
        });
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
});
