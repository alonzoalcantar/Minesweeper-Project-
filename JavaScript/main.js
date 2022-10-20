console.log("hello");


//What will change in the game
let squares = [];
let gameIsActive = true;
let plantingFlag = false;
let minesInGame = 10;
let i = 0;

//Constant variables

//Display Variables
const resetButton = document.querySelector("#reset");
const timeElapsed = document.querySelector(".timer");

//Board Variables
const board = document.querySelector(".board");
const mines = Array(minesInGame).fill("mine");
const clearSquares = Array(8*8 - minesInGame).fill("clear");
const boardArray = clearSquares.concat(mines);
const randomizeMine = boardArray.sort(() => Math.random() -0.5);
const boardLeft = (i % 8 === 0);
const boardRight = (i % 8 === 8 - 1);

//Text Variables
const hiddenSquare = "Hidden";
const mineOnSquare = "Mine On Square";
const mineNearSquare = "Number On Square";
const flaggedSquare = "Flag on Square";




//Function to create board 

const createBoard = () => {
    //creates divs and randomizes mine placement on board
    for (i = 0; i < 8*8; i++){
        const square = document.createElement("div");
        square.setAttribute("empty", i);
        square.classList.add(randomizeMine[i]);
        board.appendChild(square);
        squares.push(square);
    }
    //adds numbers to clear squares for amount of mines nearby based on position
    for (i = 0; i < squares.length; i++) {
        let mineTotal = 0;
        if (squares[i].classList.contains("clear")){
            if (i > 0 && !boardLeft && squares[i -1].classList.contains("mine")) mineTotal ++;
            if (i > 7 && !boardRight && squares[i +1 -8].classList.contains("mine")) mineTotal ++;


            squares[i].setAttribute("minesNearby", mineTotal);
    }
}

}
createBoard();












//Test constant variable values 
// console.log(clearSquares);
// console.log(mines);
// console.log(boardArray);
// console.log(randomizeMine);
console.log(squares[i]);