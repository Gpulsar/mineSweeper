'use strict';

var gWatchInterval;
var gStartTime;


// timer //////////////
function startStopWatch() {
  gWatchInterval = setInterval(updateWatch, 1);
  gStartTime = Date.now();
}

function updateWatch() {
  var now = Date.now();
  var time = ((now - gStartTime) / 1000).toFixed(0);
  var elTime = document.querySelector('.timer');
  elTime.innerText = time;
}

function endStopWatch() {
  document.querySelector('.timer').innerText = '0';
  clearInterval(gWatchInterval);
  gWatchInterval = null;
}
//////////////////////

function updateLives() {
  var elLives = document.querySelector('span');
  elLives.innerText = '';
  for (var i = 0; i < gLives; i++) {
      elLives.innerText += '💪';
  }
}

function setLevel(size, numOfMines) {
  endStopWatch()
  gLevel.size = size
  gLevel.mines = numOfMines
  gLives = 3
  updateLives()
  gIsFirstClick = true
  init()
}

// function arrangeBoard() {
//   placeMines(gLevel.mines);
//   setMinesNegsCount();
//   renderBoard(gBoard);
// }


function countMinesAround(board, rowIdx, colIdx) {
  var count = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > board[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      if (gBoard[i][j].isMine) count++;
    }
  }
  return count;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function tableSizing() {
  return
}