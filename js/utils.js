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
  clearInterval(gWatchInterval);
  gWatchInterval = null;
}

function clearTimer() {
  document.querySelector('.timer').innerText = '0';
}
//////////////////////

function updateLives() {
  var elLives = document.querySelector('.lives');
  elLives.innerText = '';
  for (var i = 0; i < gLives; i++) {
    elLives.innerText += '🛸';
  }
}

function setNewBoard(i, j) {
  placeMines(i, j);
  expandShown(i, j);
  setMinesNegsCount();
  renderBoard(gBoard);
}

function setLevel(size, numOfMines) {
  endStopWatch();
  // highlightLevel(size, numOfMines);
  gLevel.size = size;
  gLevel.mines = numOfMines;
  gGame.markedCount = gLevel.mines;
  gLives = 3;
  updateLives();
  gIsFirstClick = true;
  init();
}

function markCell(i, j) {
  var currCell = gBoard[i][j];
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  // change to toggle class later
  if (!currCell.isMarked) {

    // check if there are enough flags
    if (gGame.markedCount < 1) return;

    currCell.isMarked = true;
    elCell.classList.add('marked');
    elCell.innerText = FLAG;
    gGame.markedCount--;
  } else {
    currCell.isMarked = false;
    elCell.classList.remove('marked');
    elCell.innerText = '';
    gGame.markedCount++;
  }
  document.querySelector('.flags span').innerText = gGame.markedCount;
}


function expandShown(rowIdx, colIdx) {
  // build an array of negs

  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > gBoard[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      var currCell = gBoard[i][j];
      if (currCell.isMarked || currCell.isMine) continue;
      currCell.isShown = true;
    }
  }
}


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
  return;
}

function victory() {
  endStopWatch();
  document.querySelector('.smily').innerText = '😀';
  document.querySelector('.lives').innerText = 'You Saved Earth 🌍 Go have some beer.';
  console.log('victory');
}

function highlightLevel(size, numOfMines) {
  return;
}