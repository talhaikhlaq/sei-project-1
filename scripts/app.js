// GRID VARIABLES ---------------------------------------------------------------------------------------------------
const width = 10

// PLAYER VARIABLES -------------------------------------------------------------------------------------------------
const squares = []
let playerIndex = Math.floor(width * width - width) // will keep player at the bottom of the gameBoard
let score = 0
let scoreDisplay = null

// ENEMY VARIABLES ---------------------------------------------------------------------------------------------------
const allEnemies = []
let enemyMoveCount = 0 // used for single enemy movement
let enemyShouldMove = true // used for single enemy movement


// PLAYER MISSILE VARIABLES -----------------------------------------------------------------------------------------
let missilePosition = null
let missileMoveTimer = null

// ENEMY BOMB VARIABLES ---------------------------------------------------------------------------------------------

const bombs = []
let bombPosition = null
let bombFallTimer = null
let bombShouldDrop = false

// PLAYER KEYBOARD COMMANDS FOR MOVEMENT AND FIRING -----------------------------------------------------------------
function handleKeyDown(e) {
  let playerShouldMove = true
  let missileShouldFire = false
  switch(e.keyCode) {
    case 39:
      if (playerIndex % width < width) {
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


// BOMB CONSTRUCTOR ------------------------------------------------------------------------------------------
class Bomb {
  constructor(position) {
    this.position = position
    this.initBomb()
  }
  initBomb() {
    squares[this.position].classList.add('bomb')
    this.dropBomb()
    this.bombFallTimer = setInterval( () => this.dropBomb(), 300)
  }
  dropBomb() {
    squares[this.position].classList.remove('bomb')
    this.position += width
    if (this.position > width * width) {
      clearInterval(this.bombFallTimer)
      // squares[this.position].classList.remove('bomb')
    } else {
      if (squares[this.position].classList.contains('player')) {
        console.log(`HIT ON ${this.position}`, squares[this.position])
        const hitPlayer = playerIndex // re-write for hit playerIndex
        console.log(hitPlayer)
        this.playerCollision()
        clearInterval(this.bombFallTimer)
      } else if (squares[this.position]) {
        squares[this.position].classList.add('bomb')
      } else {
        clearInterval(this.bombFallTimer)
      }
    }
  }

  playerCollision() {
    // this.enemyHit = true
    squares[this.position].classList.remove('bomb')
    console.log('Game Over')
    // console.log('before splice', allEnemies)
    // const allEnemiesIndex = allEnemies.indexOf(this)
    // console.log('allEnemiesIndex', allEnemiesIndex)
    // allEnemies.splice(allEnemiesIndex, 1) // how to choose the hitEnemy for splicing
    // console.log('after splice', allEnemies)
    // console.log(this.enemyIndex, squares[this.enemyIndex])
  }


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
    if (this.enemyShouldMove && !this.enemyHit) {
      // console.log('should move right')
      this.enemyIndex ++ // move right
      this.enemyMoveCount ++
    } else if (!this.enemyShouldMove && !this.enemyHit) {
      // console.log('should move left')
      this.enemyIndex -- // move left
      this.enemyMoveCount --
    }
    if (!this.enemyHit) squares[this.enemyIndex].classList.add('enemy')
    // console.log(this.enemyMoveCount)
    setTimeout(() => {
      this.dropLine()
    }, 250)
  }

  dropLine() {
    if (this.enemyMoveCount === 2 && !this.enemyHit) {
      squares[this.enemyIndex].classList.remove('enemy')
      this.enemyIndex += width // move down a row when width end is reached
      squares[this.enemyIndex].classList.add('enemy')
      this.enemyShouldMove = false
    } else if (this.enemyMoveCount === -1 && !this.enemyHit) {
      squares[this.enemyIndex].classList.remove('enemy')
      this.enemyIndex += width // move down a row when width end is reached
      squares[this.enemyIndex].classList.add('enemy')
      this.enemyShouldMove = true
    }
  }


  enemyCollision() {
    this.enemyHit = true
    score = score + 100
    squares[this.enemyIndex].classList.remove('enemy')
    scoreDisplay.innerHTML = score
    // console.log('before splice', allEnemies)
    const allEnemiesIndex = allEnemies.indexOf(this)
    // console.log('allEnemiesIndex', allEnemiesIndex)
    allEnemies.splice(allEnemiesIndex, 1) // how to choose the hitEnemy for splicing
    // console.log('after splice', allEnemies)
    // console.log(this.enemyIndex, squares[this.enemyIndex])
  }

  kaboom(position) {
    bombs.push(new Bomb(position))
  }
  enemyShoot() {
    // selects a random enemy and calls kaboom(bomb drop) function
    if (!this.enemyhit) {
      this.kaboom(allEnemies[Math.floor(Math.random() * allEnemies.length)].enemyIndex)
    }
  }
}


allEnemies.push(new Enemy(1, 2, 0, false, true))
allEnemies.push(new Enemy(1, 4, 0, false, true))
allEnemies.push(new Enemy(1, 6, 0, false, true))

allEnemies.push(new Enemy(2, 11, 0, false, true))
allEnemies.push(new Enemy(2, 13, 0, false, true))
allEnemies.push(new Enemy(2, 15, 0, false, true))
allEnemies.push(new Enemy(2, 17, 0, false, true))

allEnemies.push(new Enemy(3, 22, 0, false, true))
allEnemies.push(new Enemy(3, 24, 0, false, true))
allEnemies.push(new Enemy(3, 26, 0, false, true))

// console.log('allEnemies', allEnemies)


// let enemies = [{
//   alienName: 'alienOne',
//   alienIndx: 2
// }, {
//   alienName: 'alien',
//   alienIndx: 4
// }, {
//   alienName: 'alien',
//   alienIndx: 6
// }
// ]
//
// enemies.forEach(element => allEnemies.push(element))


// function updateScore() {
//   scoreDisplay.innerHTML = score
// }








// FUNCTION FOR INITIATING MISSILE -------------------------------------------------------
function fireMissile() {
  squares[missilePosition].classList.add('missile')
  missileMoveTimer = setInterval(moveMissile, 60) // speed of missile movement
}

// FUNCTION FOR MOVING MISSILE VERTICALLY UP THE GAMEBOARD -------------------------------------
function moveMissile() {
  squares[missilePosition].classList.remove('missile')
  missilePosition -= width
  // console.log(missilePosition)
  if (missilePosition <= 0) {
    clearInterval(missileMoveTimer)
    console.log('missile has been cleared')
  } else if (squares[missilePosition].classList.contains('enemy')) {
    console.log(`HIT ON ${missilePosition}`, squares[missilePosition])
    const hitEnemy = allEnemies.find(enemy => enemy.enemyIndex === missilePosition)
    hitEnemy.enemyCollision()
    clearInterval(missileMoveTimer)
  } else {
    squares[missilePosition].classList.add('missile')
  }
}




// INITIALISING THE GAMEBOARD ELEMENTS-----------------------------------------------------------
function init() {
  // get hold of that parent grid div
  const grid = document.querySelector('.grid')

  // get hold of the start button
  const startBtn = document.querySelector('#start')

  //get hold of the stop button
  const resetBtn = document.querySelector('#reset')

  // get hold of the score display
  scoreDisplay = document.querySelector('.score')

  // used a for loop to fill my grid with individual squares, as many as the width times the width
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    // square.innerHTML = i
    squares.push(square)
    grid.append(square)
  }

  // adds the player image to the grid squares
  squares[playerIndex].classList.add('player')

  // add the enemy image to the grid squares
  // squares[enemyIndex].classList.add('enemy')
  allEnemies.forEach(enemy => squares[enemy.enemyIndex].classList.add('enemy'))

  // add the bomb image to the grid squares



  let enemyMoveTimer = null
  function startIt() {
    enemyMoveTimer = setInterval(() => {
      allEnemies.forEach(enemy => enemy.enemyMovementFlow())
    }, 1300) // speed of enemy movement
    bombFallTimer = setInterval(() => {
      allEnemies[Math.floor(Math.random() * allEnemies.length)].enemyShoot()
    }, 1500)
  }

  function resetIt() {
    clearInterval(enemyMoveTimer) // resetting of enemy movement via button
    clearInterval(bombFallTimer)
    window.location.reload()
  }

  startBtn.addEventListener('click', startIt) // click event listener for start button
  resetBtn.addEventListener('click', resetIt) // click event listener for reset button

  // KEYDOWN EVENT LISTENERS FOR PLAYER ACTIONS
  window.addEventListener('keydown', handleKeyDown)

}

window.addEventListener('DOMContentLoaded', init)
// window.addEventListener('DOMContentLoaded', () => console.log('test'))
