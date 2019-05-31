const width = 10
const squares = []
let playerIndex = Math.floor(width * width - width) // will keep player at the bottom of the gameBoard


function movePlayer() {
  squares.forEach(square => square.classList.remove('player')) // removing the classList associated to the player image
  squares[playerIndex].classList.add('player') // adding the classList associated to the player image

}


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


  // used a for loop to fill my grid with individual squares, as many as the width times the width
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    square.innerHTML = i
    squares.push(square)
    grid.append(square)
  }

  // adds the player image to the squares
  squares[playerIndex].classList.add('player')

  window.addEventListener('keydown', handleKeyDown)

}

window.addEventListener('DOMContentLoaded', init)
