
//What will change in the game
let squares = [];
let width = 8;
let gameHasEnded = false;
let minesInGame = 10;
let flagsInGame = 0;


//Display Variables
const resetButton = document.querySelector("#reset");
const displayText = document.querySelector(".text");

//Board Variables
const board = document.querySelector(".board");
const mines = Array(minesInGame).fill("mine");
const clearSquares = Array(width*width - minesInGame).fill("clear");
const boardArray = clearSquares.concat(mines);
const randomizeMine = boardArray.sort(() => Math.random() -0.5);


//Function to create board 

const createBoard = () => {
    //creates divs and randomizes mine placement on board
    for (i = 0; i < width*width; i++){
        const square = document.createElement("div");
        square.setAttribute("id", i);
        square.classList.add(randomizeMine[i]);
        board.appendChild(square);
        squares.push(square);
       
       
        square.addEventListener("click", (e) => {
            playerChoice(square);
        })

        square.oncontextmenu = ((e) => {
            e.preventDefault();
            placeFlag(square);
       }
    )}


    //adds numbers to clear squares for amount of mines nearby based on position
    for (i = 0; i < squares.length; i++) {
        let mineTotal = 0;
        const boardLeft = (i % width === 0);
        const boardRight = (i % width === width -1);


        if (squares[i].classList.contains("clear")){

            // checks left side
            if (i > 0 && !boardLeft && squares[i -1].classList.contains("mine")) mineTotal ++;
            // checks top right side
            if (i > 7 && !boardRight && squares[i +1 -width].classList.contains("mine")) mineTotal ++;
            // checks top side 
            if (i > 7 && squares[i -width].classList.contains("mine")) mineTotal ++;
            // cheks top left side
            if (i > 7 && !boardLeft && squares[i -1 -width].classList.contains("mine")) mineTotal ++;
            //checks right side
            if (i < 64 && !boardRight && squares[i +1].classList.contains("mine")) mineTotal ++;
            // checks bottom left side
            if (i < 56 && !boardLeft && squares[i -1 +width].classList.contains("mine")) mineTotal ++;
            // checks bottom right 
            if (i < 56 && !boardRight && squares[i +1 +width].classList.contains("mine")) mineTotal ++;
            // checks bottom side 
            if (i < 56 && squares[i +width].classList.contains("mine")) mineTotal ++;
            
            squares[i].setAttribute("minesNearby", mineTotal);
    }
}
}
createBoard();



// Function for playerChoice 

const playerChoice = (square) => {
    let squareID = square.id;
    if (gameHasEnded) return;
    if (square.classList.contains("clicked") || square.classList.contains("flag")) return;
    if (square.classList.contains("mine")){
        gameIsOver(square);
    } else {
        let mineNumber = square.getAttribute("minesNearby");
        if (mineNumber != 0) {
            square.classList.add("clicked");
            square.innerText = mineNumber;
            return
        }
        verifyPlayerChoice(square, squareID);
    }
    square.classList.add("clicked");

}


// Function verifys the status of near by squares once the player makes a choice 

const verifyPlayerChoice = (square , squareID) => {
    const boardLeft = (squareID % width === 0);
    const boardRight = (squareID % width === width -1);

    setTimeout (() => {
        if (squareID > 0 && !boardLeft) {
            const newSquareID = squares[parseInt(squareID) -1].id;
            const newSquare = document.getElementById(newSquareID);
            playerChoice(newSquare, newSquareID);
        }
        if (squareID > 7 && !boardRight) {
            const newSquareID = squares[parseInt(squareID) +1 -width].id;
            const newSquare = document.getElementById(newSquareID);
            playerChoice(newSquare, newSquareID);
        }
        if (squareID > width) {
            const newSquareID = squares[parseInt(squareID) -width].id;
            const newSquare = document.getElementById(newSquareID);
            playerChoice(newSquare, newSquareID);
        }
        if (squareID > 9 && !boardLeft) {
            const newSquareID = squares[parseInt(squareID) -1 -width].id;
            const newSquare = document.getElementById(newSquareID);
            playerChoice(newSquare, newSquareID);
        }
        if (squareID < 62 && !boardRight) {
            const newSquareID = squares[parseInt(squareID) +1].id;
            const newSquare = document.getElementById(newSquareID);
            playerChoice(newSquare, newSquareID);
        }
        if (squareID < 54 && !boardLeft) {
            const newSquareID = squares[parseInt(squareID) -1 +width].id;
            const newSquare = document.getElementById(newSquareID);
            playerChoice(newSquare, newSquareID);
        }
        if (squareID < 52 && !boardRight) {
            const newSquareID = squares[parseInt(squareID) +1 +width].id;
            const newSquare = document.getElementById(newSquareID);
            playerChoice(newSquare, newSquareID);
        }
        if (squareID < 53) {
            const newSquareID = squares[parseInt(squareID) +width].id;
            const newSquare = document.getElementById(newSquareID);
            playerChoice(newSquare, newSquareID);
        }
    }, 30)
}


// Function ends game if square with mine is chosen

const gameIsOver = (square) => {
    displayText.innerText = "BOOM!!!!";
    gameHasEnded = true;


    // Show all mines if player chooses square with mine 
    squares.forEach(square => {
        if (square.classList.contains("mine")){
            square.style.backgroundImage = "url('data:image/png;base64,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')";
        }
    })
}


// Function to add flag on board

const placeFlag = (square) => {
    if (gameHasEnded) return;
    if (!square.classList.contains("clicked") && (flagsInGame < minesInGame)){
        if (!square.classList.contains("flagsInGame")){
            square.classList.add("flagsInGame");
            square.innerText = "🚩"            
            flagsInGame ++
            minesweeperVictory();
        } else {
            square.classList.remove("flagsInGame");
            square.innerText = "";
            flagsInGame --
        }
    }
}


// Function to check if the game has been won and all mines have been found 
const minesweeperVictory = () => {
    let found = 0;
    for (i = 0; i < squares.length; i++){
        if (squares[i].classList.contains("flagsInGame") && squares[i].classList.contains("mine")) {
            found ++
        }
        if (found === minesInGame){
            displayText.innerText = "You Won!";
            gameHasEnded = true;
        }
    }
}

// Function to reset the game from begining, reloads page

const resetBoard = () => {
    location.reload();
    
}
resetButton.addEventListener("click", resetBoard);

