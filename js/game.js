'use strict';

const BOMB = '💣';
const FLAG = '🚩';

var gBoard;
var gLevel = {
    size: 6,
    mines: 3,
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

// init() ///////
function init() {
    gBoard = buildBord();
    placeMines(gLevel.mines);
    setMinesNegsCount();
    renderBoard(gBoard);
    console.table(gBoard);
    console.log('currTable:', gBoard);
}
/////////////////

function expandShown(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            var currCell = gBoard[i][j];
            if (currCell.isMarked || currCell.isMine) continue;
            currCell.isShown = true;

        }
    }
}

function blockLeftClicks(i, j) {
    return;
}

function markCell(i, j) {
    var currCell = gBoard[i][j];
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    // change to toggle class later
    if (!currCell.isMarked) {
        currCell.isMarked = true;
        elCell.classList.add('marked');
        elCell.innerText = FLAG;
    } else {
        currCell.isMarked = false;
        elCell.classList.remove('marked');
        elCell.innerText = '';
    }

}


function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine && !currCell.isShown) return
        };
        console.log('victory');
    }
}

function cellClicked(event, i, j) {
    
    //right click:
    if (event.button === 2) {
        markCell(i, j);
        checkVictory();
    // left click:
    } else {
        if (gBoard[i][j].isMarked) return;
        else if (gBoard[i][j].isMine) {
            gameOver();
        }
        else {
            expandShown(i, j);
            renderBoard();
            checkVictory();
        }
    }
}

function setMinesNegsCount() {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j].minesAroundCount = countMinesAround(gBoard, i, j);
        };
    }
}

function placeMines(numOfMines) {
    var counter = 0;
    while (gLevel.mines > counter) {
        var randCell = gBoard[getRandomInt(0, gBoard.length - 1)][getRandomInt(0, gBoard[0].length - 1)];
        if (!randCell.isMine) {
            randCell.isMine = true;
            counter++;
        }
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
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j}"></td>`;
            }
            else if (currCell.isMine) {
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j} mine">${BOMB}</td>`;
            }
            else if (!currCell.isMine && currCell.minesAroundCount > 0) {
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j} counter">${currCell.minesAroundCount}</td>`;
            }
            else if (!currCell.isMine && currCell.minesAroundCount === 0) {
                strHTML += `onmousedown="cellClicked(event, ${i}, ${j})" class="cell-${i}-${j} counter" ></td>`;
            }
        }
        '</tr>';
    }
    '</tbody></table>';
    var elBoard = document.querySelector('.game-board');
    elBoard.innerHTML = strHTML;
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
    renderBoard();
}
