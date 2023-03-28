
let X_CLASS = 'x'
let CIRCLE_CLASS = 'circle'
let cellElements = document.querySelectorAll('[data-cell]')
let board = document.getElementById('board')
let circleTurn
let WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], 
]

let winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let winningMessageElement = document.getElementById('winningMessage')
let restartbutton = document.getElementById('restartButton')


startGame()


function startGame(){
circleTurn = false
cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true})
})
setBoardHoverClass()
winningMessageElement.classList.remove('show')
}

restartbutton.addEventListener('click', startGame)

function handleClick(e) {
 console.log('clicked')
 let cell = e.target
 let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
 placeMark(cell, currentClass)   //placeMark
 if (checkWin(currentClass)){   
     console.log('winner')
     endGame(false)
 } else if( isDraw()) {
    endGame(true)
 } else {
    swapTurns()                 //switch turns
    setBoardHoverClass()
   }

 }
    //check win
    //check draw 
   


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function endGame(draw) {
    if (draw){
        winningMessageTextElement.innerText = 'Draw!'
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X 's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}
function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)     
  })
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    } 
    
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

