console.log("hello")
let minesInGame = 10;
//Constant variables
//const squares = Array.from(document.querySelectorAll(".square"));
const resetButton = document.querySelector("#reset");
const timeElapsed = document.querySelector(".timer");


const board = document.querySelector(".board");
const mines = Array(minesInGame).fill("mine");
const emptySquares = Array(8*8 - minesInGame).fill("clear");

const hiddenSquare = "Hidden";
const mineOnSquare = "Mine On Square";
const mineNearSquare = "Number On Square";
const flaggedSquare = "Flag on Square";




//What will change in the game
let squares = [];



let gameIsActive = true;
let plantingFlag = false;

//let minesInGame = 10;



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

console.log(emptySquares)
console.log(mines)




//Function to randomize mine placement on squares array



const randomizeMine = () => {
    for(i = 0; i < 10; i++) {
        Math.floor(Math.random() * 64);
        squares.setAttribute("Mine",true);
    }
}

randomizeMine();