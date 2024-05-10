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
    return Array.from({ length: length }, () =>
        Array.from({ length: length }, () => generator(0, 9))
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
function board(grid){
    return grid.map(row).join('');
}

function sudoku() {
    let sudoku = document.getElementById('board');
    const grid = generateGrid(9, randomInt);
    sudoku.innerHTML = board(grid);
}

sudoku();

