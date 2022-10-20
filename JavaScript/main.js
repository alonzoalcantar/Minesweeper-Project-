console.log("hello")

//Constant variables
const squares = Array.from(document.querySelectorAll(".square"));
const resetButton = document.querySelector("#reset");
const timeElapsed = document.querySelector(".timer");
const board = document.querySelector(".board")

const hiddenSquare = "Hidden";
const mineOnSquare = "Mine On Square";
const mineNearSquare = "Number On Square";
const flaggedSquare = "Flag on Square";

const setAttribute = () => document.createAttribute("Mine");

//What will change in the game
// let board = 
// ["","","","","","","","",
// "","","","","","","","",
// "","","","","","","","",
// "","","","","","","","",
// "","","","","","","","",
// "","","","","","","","",
// "","","","","","","","",
// "","","","","","","","",];

let gameIsActive = true;
let plantingFlag = false;




//Function to create board 

const createBoard = () => {
    for(i = 0; i < 8*8; i++){
        const square = document.createElement("div")
        square.setAttribute("empty", i)
        board.appendChild(square)
    }
}






//Function to randomize mine placement on board array



const randomizeMine = () => {
    for(i = 0; i < 10; i++) {
        Math.floor(Math.random() * 64);
        squares.setAttribute("Mine",true);
    }
}

randomizeMine();