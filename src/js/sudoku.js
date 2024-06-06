import Board from "./elements/Board.js";
import { initControls, selectMode } from "./controls.js";
import { storage } from "./elements/Storage.js";
import { EMPTY_CELL } from "./constants.js";

/**
 * @description Generates a random number in the interval delimited by `min` and `max` inclusively
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @param length {number} The length of the grid (number of rows/columns).
 * @param generator {(a: number, b: number) => number} A function that generates the values for the grid cells.
 * @returns {number[][]} 2D array representing the generated grid.
 */
function generateGrid(length, generator) {
    return Array.from({length: length}, () =>
        Array.from({length: length}, () => generator(0, 0))
    );
}


export function annotations() {
    const grid = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid.push(`<div class="annotation-square">${EMPTY_CELL}</div>`);
        }
    }
    return grid.join('');
}

/**
 * @param number {number}
 * @returns {string}
 */
function cell(number) {
    return `<td class="board-cell">
                <div class="board-cell-value ${number === 0 ? 'annotations' : ''}">
                    ${number === 0 ? annotations() : number}
                </div>
            </td>`
        ;
}

/**
 * @param values {number[]}
 * @returns {string}
 */
function row(values) {
    return `<tr class="board-row">
                ${values.map(cell).join('')}
            </tr>`;
}

/**
 * @param grid {number[][]}
 * @returns {string}
 */
function printBoard(grid) {
    return grid.map(row).join('');
}

function sudoku() {
    let sudoku = document.getElementById('board');
    // const grid = generateGrid(9, randomInt);

    // EXTREME
    // let grid = [
    //     [0, 0, 0, 0, 2, 0, 7, 0, 0],
    //     [0, 0, 0, 6, 1, 9, 0, 0, 0],
    //     [0, 0, 0, 0, 4, 0, 2, 5, 0],
    //     [0, 0, 9, 0, 0, 4, 0, 1, 0],
    //     [0, 6, 1, 0, 0, 0, 0, 0, 2],
    //     [0, 0, 0, 0, 0, 0, 0, 6, 0],
    //     [0, 2, 0, 0, 0, 8, 0, 0, 0],
    //     [5, 0, 0, 0, 0, 0, 3, 0, 8],
    //     [4, 0, 0, 9, 0, 0, 0, 0, 0]
    // ]

    // DIABOLICAL
    // let grid = [
    //     [0, 7, 4, 3, 0, 2, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 5, 0, 4, 0],
    //     [0, 0, 0, 6, 0, 7, 9, 0, 0],
    //     [0, 5, 6, 0, 0, 0, 7, 9, 0],
    //     [3, 0, 0, 0, 0, 0, 0, 0, 5],
    //     [0, 2, 7, 0, 0, 0, 6, 8, 0],
    //     [0, 0, 5, 7, 0, 1, 0, 0, 0],
    //     [0, 1, 0, 2, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 4, 0, 8, 1, 6, 0]
    // ]

    // EASY
    const grid = [
        [0, 6, 0, 3, 7, 8, 0, 0, 5],
        [0, 0, 4, 0, 0, 1, 9, 2, 0],
        [0, 8, 5, 4, 0, 0, 7, 0, 3],
        [0, 3, 0, 0, 0, 4, 0, 7, 0],
        [6, 4, 9, 2, 0, 7, 8, 0, 0],
        [0, 0, 7, 6, 0, 0, 0, 0, 0],
        [2, 0, 8, 7, 0, 5, 0, 9, 6],
        [4, 0, 0, 0, 0, 0, 0, 5, 0],
        [0, 5, 3, 1, 9, 0, 2, 0, 0]
    ]

    let storedGrid = storage.initBoard(grid);
    if (storage.board.length > 0) {
        storedGrid = storage.board;
    }

    sudoku.innerHTML = printBoard(storage.toGrid(storedGrid));
    const board = new Board(sudoku, storedGrid);
    const selectors = Array.from(document.getElementsByClassName('mode-selector'));
    const selected = selectors.find((selector) => selector.getAttribute('data-mode') === board.mode);
    selectMode(selected, selectors, board);

    initControls(board)
}

sudoku();

