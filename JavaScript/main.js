console.log("hello");


//What will change in the game
let squares = [];
let width = 8;
let gameHasEnded = false;
let minesInGame = 10;
let flagsInGame = 0;

//Constant variables

//Display Variables
const resetButton = document.querySelector("#reset");


//Board Variables
const board = document.querySelector(".board");
const mines = Array(minesInGame).fill("mine");
const clearSquares = Array(width*width - minesInGame).fill("clear");
const boardArray = clearSquares.concat(mines);
const randomizeMine = boardArray.sort(() => Math.random() -0.5);


//Text Variables
const hiddenSquare = "Hidden";
const mineOnSquare = "Mine On Square";
const mineNearSquare = "Number On Square";
const flaggedSquare = "Flag on Square";






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
            square.innerHTML = mineNumber;
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
    alert("boom!");
    gameHasEnded = true;


    // Show all mines if player chooses square with mine 
    squares.forEach(square => {
        if (square.classList.contains("mine")){
            square.innerHTML = "🧨";
        }
    })
}




// Function to add flag on board

const placeFlag = (square) => {
    if (gameHasEnded) return;
    if (!square.classList.contains("clicked") && (flagsInGame < minesInGame)){
        if (!square.classList.contains("flagsInGame")){
            square.classList.add("flagsInGame");
            square.innerHTML = "🏴‍☠️";
            flagsInGame ++
            minesweeperVictory();
        } else {
            square.classList.remove("flagsInGame");
            square.innerHTML = "";
            flagsInGame --
        }
    }
}


// Function to check if the game has been won and all mines have been found 
const minesweeperVictory = () => {
    let rounds = 0;
    for (i = 0; i < squares.length; i++){
        if (squares[i].classList.contains("flagsInGame") && squares[i].classList.contains("mine")) {
            rounds ++
        }
        if (rounds === minesInGame){
            alert("You Won!");
            gameHasEnded = true;
        }
    }
}

// Function to reset the game from begining, reloads page
const resetBoard = () => {
    location.reload();
    
}

resetButton.addEventListener("click", resetBoard);

//Test constant variable values 
// console.log(clearSquares);
// console.log(mines);
// console.log(boardArray);
// console.log(randomizeMine);
//console.log(squares[i]);

// Illerdon is the goat