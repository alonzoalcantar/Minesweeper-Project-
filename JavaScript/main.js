console.log("hello")


//What will change in the game
let squares = [];
let gameIsActive = true;
let plantingFlag = false;
let minesInGame = 10;



//Constant variables
//const squares = Array.from(document.querySelectorAll(".square"));


const resetButton = document.querySelector("#reset");
const timeElapsed = document.querySelector(".timer");


const board = document.querySelector(".board");
const mines = Array(minesInGame).fill("mine");
const clearSquares = Array(8*8 - minesInGame).fill("clear");
const boardArray = clearSquares.concat(mines);


const hiddenSquare = "Hidden";
const mineOnSquare = "Mine On Square";
const mineNearSquare = "Number On Square";
const flaggedSquare = "Flag on Square";




//Function to create board 

const createBoard = () => {
    for(i = 0; i < 8*8; i++){
        const square = document.createElement("div")
        square.setAttribute("empty", i)
        board.appendChild(square)
        squares.push(square)
    }
}
createBoard();




//Function to randomize mine placement on squares array


const randomizeMine = boardArray.sort(() => Math.random() -0.5)
//randomizeMine();





console.log(clearSquares);
console.log(mines);
console.log(boardArray);
console.log(randomizeMine);