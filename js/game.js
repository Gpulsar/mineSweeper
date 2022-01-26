'use strict';

var gBoard;

var gLevel = {
    size: 4,
    mines: 2,
};


function init() {
    gBoard = buildBord();
    placeTestMines();
    console.table(gBoard);
    renderBoard(gBoard);
}


function placeTestMines() {
    gBoard[0][0].isShown = true;
    gBoard[0][0].isMine = true;

    gBoard[2][1].isShown = true;
    gBoard[2][1].isMine = true;

}

function renderBoard() {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < gLevel.size; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gLevel.size; j++) {
            strHTML += `<td class="cell cell-${i}-${j}"></td>`
        }
        '</tr>'
    }
    '</tbody></table>'
    var elBoard = document.querySelector('.game-board')
    elBoard.innerHTML = strHTML
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

