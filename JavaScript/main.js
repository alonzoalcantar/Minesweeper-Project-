console.log("hello");


//What will change in the game
let squares = [];
let gameIsActive = true;
let plantingFlag = false;
let minesInGame = 10;

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
        square.addEventListener("click", (e) => {
            playerChoice(square);
        })
    }
    //adds numbers to clear squares for amount of mines nearby based on position
    for (i = 0; i < squares.length; i++) {
        let mineTotal = 0;
        const boardLeft = (i % 8 === 0);
        const boardRight = (i % 8 === 8 - 1);


        if (squares[i].classList.contains("clear")){

            // checks left side
            if (i > 0 && !boardLeft && squares[i -1].classList.contains("mine")) mineTotal ++;
            // checks top right side
            if (i > 7 && !boardRight && squares[i +1 -8].classList.contains("mine")) mineTotal ++;
            // checks top side 
            if (i > 8 && squares[i -8].classList.contains("mine")) mineTotal ++;
            // checks bottom side 
            if (i < 53 && squares[i +8].classList.contains("mine")) mineTotal ++;
            // cheks top left side
            if (i > 9 && !boardLeft && squares[i -1 -8].classList.contains("mine")) mineTotal ++;
            //checks right side
            if (i < 62 && !boardRight && squares[i +1].classList.contains("mine")) mineTotal ++;
            // checks bottom left side
            if (i < 54 && !boardLeft && squares[i -1 +8].classList.contains("mine")) mineTotal ++;
            // checks bottom right 
            if (i < 52 && !boardRight && squares[i +8].classList.contains("mine")) mineTotal ++;
            
            squares[i].setAttribute("minesNearby", mineTotal);
    }
}

}
createBoard();


// Function for playerChoice 

const playerChoice = (square) => {
    if (square.classList.contains("mine")){
        console.log("oops!!Boom!!");
    } else {
        let mineNumber = square.getAttribute("minesNearby");
        if (mineNumber != 0) {
            square.classList.add("clicked");
            square.innerHTML = mineNumber;
            return
        }
    }

}











//Test constant variable values 
// console.log(clearSquares);
// console.log(mines);
// console.log(boardArray);
// console.log(randomizeMine);
console.log(squares[i]);