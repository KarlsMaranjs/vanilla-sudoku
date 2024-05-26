import { EMPTY_CELL } from "./constants.js";
import Board from "./elements/Board.js";
import { initControls } from "./controls.js";

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
    return Array.from({ length: length }, () =>
        Array.from({ length: length }, () => generator(0, 0))
    );
}

/**
 * @param number {number}
 * @returns {string}
 */
function cell(number) {
    return `<td class="board-cell">
                <span class="board-cell-value">
                    ${number === 0 ? EMPTY_CELL : number}
                </span>
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
function printBoard(grid){
    return grid.map(row).join('');
}

function sudoku() {
    let sudoku = document.getElementById('board');
    // const grid = generateGrid(9, randomInt);

    // EXTREME
    const grid = [
        [0, 0, 0, 0, 2, 0, 7, 0, 0],
        [0, 0, 0, 6, 1, 9, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 2, 5, 0],
        [0, 0, 9, 0, 0, 4, 0, 1, 0],
        [0, 6, 1, 0, 0, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 2, 0, 0, 0, 8, 0, 0, 0],
        [5, 0, 0, 0, 0, 0, 3, 0, 8],
        [4, 0, 0, 9, 0, 0, 0, 0, 0]
    ]

    // const grid = [
    //     [0, 6, 0, 3, 7, 8, 0, 0, 5],
    //     [0, 0, 4, 0, 0, 1, 9, 2, 0],
    //     [0, 8, 5, 4, 0, 0, 7, 0, 3],
    //     [0, 3, 0, 0, 0, 4, 0, 7, 0],
    //     [6, 4, 9, 2, 0, 7, 8, 0, 0],
    //     [0, 0, 7, 6, 0, 0, 0, 0, 0],
    //     [2, 0, 8, 7, 0, 5, 0, 9, 6],
    //     [4, 0, 0, 0, 0, 0, 0, 5, 0],
    //     [0, 5, 3, 1, 9, 0, 2, 0, 0]
    // ]
    sudoku.innerHTML = printBoard(grid);

    const board = new Board(document.getElementById('board'), grid);
    initControls(board)

}

sudoku();

