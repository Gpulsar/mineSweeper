'use strict';

const ALIEN = '👽';
const FLAG = '🌌';

var gBoard;
var gLevel = {
    size: 4,
    mines: 2,
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: gLevel.mines,
    // secsPassed: 0
};

var gLives = 3;

var gIsFirstClick = true;

// init() ///////
function init() {
    document.querySelector('.flags span').innerText = gGame.markedCount;
    document.querySelector('.smily').innerText = '🤨';
    clearTimer();
    gBoard = buildBord();
    renderBoard(gBoard);
    // console.table(gBoard);
    // console.log('currTable:', gBoard);
}
/////////////////


function cellClicked(event, i, j) {
    var currCell = gBoard[i][j]
    // check for firstclick
    if (gIsFirstClick && (event.button >= 0)) {
        startStopWatch();
        setNewBoard(i, j);
    }
    //if right click:
    if (event.button === 2) {
        markCell(i, j);

        //if left click:
    } else {
        //  ignor marked
        if (currCell.isMarked) return;
        // clicked unmarked mine
        else if (currCell.isMine) {
            if (gLives > 1) {
                // console.log('before', gLives);
                gLives--;
                updateLives();
                // console.log('after', gLives);
            }
            else {
                gameOver();
                return;
            }
        }
        else {
            currCell.isShown = true
            expandShown(i, j);
        }
    }
    // finally
    renderBoard();
    gIsFirstClick = false;
    checkVictory();
}


function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            if (elCell.classList.contains('hidden')) return;
        }
    }
    victory();
}




function setMinesNegsCount() {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j].minesAroundCount = countMinesAround(gBoard, i, j);
        };
    }
}

function placeMines(i, j) {
    var counter = 0;
    while (gLevel.mines > counter) {
        var randCell = gBoard[generateRandom(0, gBoard.length - 1, i)][generateRandom(0, gBoard[0].length - 1, j)];
        if (!randCell.isMine) {
            randCell.isMine = true;
            counter++;
        }
    }
    // mine is never on first click
    function generateRandom(min, max, exclude) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (num === exclude) ? generateRandom(min, max) : num;
    }
}


function renderBoard() {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < gLevel.size; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gLevel.size; j++) {
            strHTML += '<td oncontextmenu="return false;"';
            var currCell = gBoard[i][j];
            if (currCell.isMarked) {
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j}">${FLAG}</td>`;
            }
            else if (!currCell.isShown) {
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j} hidden"></td>`;
            }
            else if (currCell.isMine) {
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j} mine">${ALIEN}</td>`;
            }
            else if (!currCell.isMine && currCell.minesAroundCount > 0) {
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j} counter">${currCell.minesAroundCount}</td>`;
            }
            else if (!currCell.isMine && currCell.minesAroundCount === 0) {
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j} counter empty" ></td>`;
            }
        }
        '</tr>';
    }
    '</tbody></table>';
    var elBoard = document.querySelector('.game-board');
    elBoard.innerHTML = strHTML;
    tableSizing();
}

function buildBord() {
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }
    }
    return board;
}

function gameOver() {
    console.log('game over');
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].isShown = true;
        };
    }
    document.querySelector('.smily').innerText = '😵';
    document.querySelector('.lives').innerText = 'Bad job. Your\'re fired.';
    renderBoard();
    endStopWatch()
}
