const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const playAgainBtn = document.querySelector("#playAgain");

const startCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    });
    document.querySelector("#playAgain").style.display = 'none';  // Hide the Play Again button when board is created
}
createBoard();

function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "it is now " + go + "'s go.";
    e.target.removeEventListener("click", addGo);
    checkScore();
}

let circleScore = 0;
let crossScore = 0;

function checkScore() {
    const allSquares = document.querySelectorAll(".square");

    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let combo of winningCombos) {
        if (combo.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))) {
            circleScore++;  // Increase circle's score
            document.getElementById("circleScore").textContent = circleScore;  // Update the displayed score
            infoDisplay.textContent = "Circle Wins!";
            endGame();
            return;
        }
        if (combo.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))) {
            crossScore++;  // Increase cross's score
            document.getElementById("crossScore").textContent = crossScore;  // Update the displayed score
            infoDisplay.textContent = "Cross Wins!";
            endGame();
            return;
        }
    }

    // Check for Draw
    if (Array.from(allSquares).every(square => square.firstChild)) {
        infoDisplay.textContent = "Draw!";
        endGame();
    }
}


function endGame() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        square.removeEventListener('click', addGo);  // Remove event listeners to prevent further moves
    });
    document.querySelector("#playAgain").style.display = 'block';  // Show the Play Again button
}

// Event Listener for the Play Again button
playAgainBtn.addEventListener("click", () => {
    gameBoard.innerHTML = '';  // Clear the game board
    createBoard();  // Recreate the game board
    infoDisplay.textContent = "Circle goes first";  // Reset the info display
});

const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    gameBoard.innerHTML = ''; // Clear the game board
    createBoard();           // Recreate the game board
    go = "circle";           // Reset the starting player
    infoDisplay.textContent = "Circle goes first"; // Reset the info display

    circleScore = 0;
    crossScore = 0;
    document.getElementById("circleScore").textContent = circleScore;
    document.getElementById("crossScore").textContent = crossScore;
}