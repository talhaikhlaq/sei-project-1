// GRID VARIABLES ---------------------------------------------------------------------------------------------------
const width = 10

// PLAYER VARIABLES -------------------------------------------------------------------------------------------------
const squares = []
let playerIndex = Math.floor(width * width - width) // will keep player at the bottom of the gameBoard

// ENEMY VARIABLES ---------------------------------------------------------------------------------------------------
const allEnemies = []
const deadEnemies = [] // push 'hit' enemies to deadEnemies array so that they can't drop further bombs
let enemyMoveCount = 0 // used for single enemy movement
let enemyShouldMove = true // used for single enemy movement


// PLAYER MISSILE VARIABLES -----------------------------------------------------------------------------------------
let missilePosition = null
let missileMoveTimer = null

// ENEMY BOMB VARIABLES ---------------------------------------------------------------------------------------------
let bombPosition = null
let bombMoveTimer = null

// PLAYER KEYBOARD COMMANDS FOR MOVEMENT AND FIRING -----------------------------------------------------------------
function handleKeyDown(e) {
  let playerShouldMove = true
  let missileShouldFire = false
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
    case 83:
      missileShouldFire = true
      missilePosition = playerIndex - width
      break
    default:
      playerShouldMove = false
      missileShouldFire = false
  }
  if (playerShouldMove) movePlayer()
  if (missileShouldFire) fireMissile()
}

// ADDING AND REMOVING CLASSLIST ASSOCIATED TO PLAYER IMAGE ----------------------------------------------------
function movePlayer() {
  squares.forEach(square => square.classList.remove('player')) // removing the classList associated to the player image
  squares[playerIndex].classList.add('player') // adding the classList associated to the player image
}

// ENEMY CONSTRUCTOR ------------------------------------------------------------------------------------------
class Enemy {
  constructor(enemyRank, enemyIndex, enemyMoveCount, enemyHit, enemyShouldMove) {
    this.enemyRank = enemyRank
    this.enemyIndex = enemyIndex
    this.enemyMoveCount = enemyMoveCount
    this.enemyHit = enemyHit
    this.enemyShouldMove = enemyShouldMove
  }


  // FUNCTION TO MAKE ALL ENEMY MOVE BASED ON THE TRUE/FALSE STATEMENT OF ENEMYSHOULDMOVE ----------------------------
  enemyMovementFlow() {
    squares[this.enemyIndex].classList.remove('enemy')
    if (enemyShouldMove) {
      this.enemyIndex ++ // move right
      // moveEnemy() no longer called, now embedded within function
      this.enemyMoveCount ++
    } else {
      this.enemyIndex -- // move left
      // moveEnemy() no longer called, now embedded within function
      this.enemyMoveCount --
    }
    squares[this.enemyIndex].classList.add('enemy')
  }

  dropLine() {
    if (enemyMoveCount === 1) {
      squares[this.enemyIndex].classList.remove('enemy')
      this.enemyIndex += width // move down a row when width end is reached
      enemyShouldMove = !enemyShouldMove
      squares[this.enemyIndex].classList.add('enemy')
    } else if (enemyMoveCount === 0) {
      squares[this.enemyIndex].classList.remove('enemy')
      this.enemyIndex += width // move down a row when width end is reached
      enemyShouldMove = !!enemyShouldMove
      squares[this.enemyIndex].classList.add('enemy')
    }
  }


  // INITIATING ENEMY BOMB DROP -----------------------------------------------------------
  // dropBomb() {
  //   let bombShouldDrop = false
  //   if (this.enemyRank === 3 || this.enemyRank === 2 || this.enemyRank === 1) {
  //     bombShouldDrop = true
  //     bombPosition = this.enemyRank.enemyIndex + width
  //     squares[]
  //   }
  // }

  enemyCollision() {
    squares[this.enemyIndex].classList.remove('enemy')
  }

}




// allEnemies.push(new Enemy(1, 0, 0, false, true))
allEnemies.push(new Enemy(1, 2, 0, false, true))
allEnemies.push(new Enemy(1, 4, 0, false, true))
allEnemies.push(new Enemy(1, 6, 0, false, true))
// allEnemies.push(new Enemy(1, 8, 0, false, true))

allEnemies.push(new Enemy(2, 11, 0, false, true))
allEnemies.push(new Enemy(2, 13, 0, false, true))
allEnemies.push(new Enemy(2, 15, 0, false, true))
allEnemies.push(new Enemy(2, 17, 0, false, true))

// allEnemies.push(new Enemy(3, 20, 0, false, true))
allEnemies.push(new Enemy(3, 22, 0, false, true))
allEnemies.push(new Enemy(3, 24, 0, false, true))
allEnemies.push(new Enemy(3, 26, 0, false, true))
// allEnemies.push(new Enemy(3, 28, 0, false, true))







// ORIGINAL function to make SINGLE ENEMY move based on the true/false statement of enemyShouldMove
// function enemyMovementFlow() {
//
//   if (enemyShouldMove) {
//     // move right
//     enemyIndex ++
//     moveEnemy()
//     enemyMoveCount ++
//   } else if (!enemyShouldMove) {
//     // move left
//     enemyIndex --
//     moveEnemy()
//     enemyMoveCount --
//   }
//
//   if (enemyMoveCount === 9) {
//     enemyIndex += width
//     enemyShouldMove = false
//   } else if (enemyMoveCount === 0) {
//     enemyIndex += width
//     enemyShouldMove = true
//   } else if (enemyIndex === 89) {
//     resetIt()
//   }
// }



// FUNCTION FOR INITIATING MISSILE -------------------------------------------------------
function fireMissile() {
  squares[missilePosition].classList.add('missile')
  missileMoveTimer = setInterval(moveMissile, 500) // speed of missile movement
  // setTimeout(() => {
  //   clearInterval(missileMoveTimer) // resetting of missile movement
  // }, 5000)
}

// FUNCTION FOR MOVING MISSILE VERTICALLY UP THE GAMEBOARD -------------------------------------
function moveMissile() {
  squares[missilePosition].classList.remove('missile')
  missilePosition -= width
  console.log(missilePosition)
  if (missilePosition <= 0) {
    clearInterval(missileMoveTimer)
    console.log('missile has been cleared')
  } else if (squares[missilePosition].classList.contains('enemy')) {
    console.log('hit')
    const hitEnemy = allEnemies.find(enemy => enemy.enemyIndex === missilePosition)
    hitEnemy.enemyCollision()
  } else {
    squares[missilePosition].classList.add('missile')
  }
}

// FUNCTION CHECKING MISSILE/ENEMY COLLISION ************DEBUG***************************
// function missileCollision() {
//   if (squares[missilePosition].classList.contains('enemy')) {
//     console.log('hit')
//     squares[missilePosition].classList.remove('missile')
//     squares[enemyIndex].classList.remove('enemy')
//     // push to new deadEnemies empty array
//   }
// }



// INITIALISING THE GAMEBOARD ELEMENTS-----------------------------------------------------------
function init() {
  // get hold of that parent grid div
  const grid = document.querySelector('.grid')

  // get hold of the start button
  const startBtn = document.querySelector('#start')

  //get hold of the stop button
  const resetBtn = document.querySelector('#reset')

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

  // add the enemy image to the grid squares
  // squares[enemyIndex].classList.add('enemy')
  allEnemies.forEach(enemy => squares[enemy.enemyIndex].classList.add('enemy'))


  function enemyMove() {
    if (enemyShouldMove) {
      allEnemies.forEach(enemy => {
        enemy.enemyMovementFlow()
      })
      enemyMoveCount ++
    } else if (!enemyShouldMove) {
      allEnemies.forEach(enemy => {
        enemy.enemyMovementFlow()
      })
      enemyMoveCount --
    }

    if (enemyMoveCount === 1) {
      allEnemies.forEach(enemy => {
        enemy.dropLine()
      })
    } else if (enemyMoveCount === 0) {
      allEnemies.forEach(enemy => {
        enemy.dropLine()
      })
    }
  }

  let enemyMoveTimer = null
  function startIt() {
    enemyMoveTimer = setInterval(enemyMove, 300) // speed of enemy movement
  }

  function resetIt() {
    clearInterval(enemyMoveTimer) // resetting of enemy movement via button
  }

  startBtn.addEventListener('click', startIt) // click event listener for start button
  resetBtn.addEventListener('click', resetIt) // click event listener for reset button

  // KEYDOWN EVENT LISTENERS FOR PLAYER ACTIONS
  window.addEventListener('keydown', handleKeyDown)

}

window.addEventListener('DOMContentLoaded', init)
// window.addEventListener('DOMContentLoaded', () => console.log('test'))
