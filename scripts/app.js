const width = 10
const squares = []
let playerIndex = Math.floor(width * width - width) // will keep player at the bottom of the gameBoard
let enemyIndex = 0
let enemyMoveCount = 0
let enemyShouldMove = true



function movePlayer() {
  squares.forEach(square => square.classList.remove('player')) // removing the classList associated to the player image
  squares[playerIndex].classList.add('player') // adding the classList associated to the player image
}

function moveEnemy() {
  squares.forEach(square => square.classList.remove('enemy')) // removing the classList associated to the enemy image
  // console.log(squares)
  squares[enemyIndex].classList.add('enemy') // adding the classList associated to the enemy image
}

let enemyMoveTimer = null
const startIt = () => {
  enemyMoveTimer = setInterval(enemyMovementFlow, 500)
}

function stopIt() {
  clearInterval(enemyMoveTimer)
}

function enemyMovementFlow() {

  if (enemyShouldMove) {
    // move right
    enemyIndex ++
    moveEnemy()
    enemyMoveCount ++
  } else if (!enemyShouldMove) {
    // move left
    enemyIndex --
    moveEnemy()
    enemyMoveCount --
  }

  if (enemyMoveCount === 9) {
    enemyIndex += width
    enemyShouldMove = false
  } else if (enemyMoveCount === 0) {
    enemyIndex += width
    enemyShouldMove = true
  } else {
    // console.log('no movement')
  }
}


// function enemyMoveLR(){
//   if (enemyIndex % width < width - 1) {
//     enemyIndex++
//     squares.forEach(square => square.classList.remove('enemy')) // removing the classList associated to the enemy image
//     squares[enemyIndex].classList.add('enemy') // adding the classList associated to the enemy image
//   } else if (enemyIndex % width === width - 1) {
//     enemyIndex += width
//     squares.forEach(square => square.classList.remove('enemy'))
//     squares[enemyIndex].classList.add('enemy')
//     enemyMoveRL()
//   }
// }


function handleKeyDown(e) {
  let playerShouldMove = true
  switch(e.keyCode) {
    case 39:
      if (playerIndex % width < width -1) {
        playerIndex++
      }
      break
    case 37:
      if (playerIndex % width > 0) {
        playerIndex--
      }
      break
    default:
      playerShouldMove = false
  }
  if (playerShouldMove) movePlayer()
}


function init() {
  // get hold of that parent grid div
  const grid = document.querySelector('.grid')

  // get hold of the start button
  const startBtn = document.querySelector('#start')

  //get hold of the stop button
  const stopBtn = document.querySelector('#stop')

  // used a for loop to fill my grid with individual squares, as many as the width times the width
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    square.innerHTML = i
    squares.push(square)
    grid.append(square)
  }

  // adds the player image to the grid squares
  squares[playerIndex].classList.add('player')

  // add the alien image to the grid squares
  squares[enemyIndex].classList.add('enemy')


  startBtn.addEventListener('click', startIt)
  stopBtn.addEventListener('click', stopIt)


  window.addEventListener('keydown', handleKeyDown)

}

window.addEventListener('DOMContentLoaded', init)
// window.addEventListener('DOMContentLoaded', () => console.log('test'))
