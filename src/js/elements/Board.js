import Cell from "./Cell.js";
import Siblings from "./Siblings.js";
import { storage } from "./Storage.js";
import { ANNOTATE, PLAY } from "../constants.js";

export default class Board {

    /**
     * @typedef {'play' | 'annotate'} Mode
     */

    /**
     * @type {Cell[]}
     */
    cells;

    /**
     * @type {HTMLTableElement}
     */
    board;

    /**
     * @type {number[][]}
     */
    grid;

    /**
     * @type {Mode}
     */
    mode;

    /**
     * @type {Cell | null}
     */
    _activeCell;

    /**
     * @param board {HTMLTableElement}
     * @param grid {number[][]}
     */
    constructor(board, grid) {
        this.board = board;
        this.grid = grid;
        this._activeCell = null;
        this.cells = [];
        this.mode = PLAY;
        this.initCells(grid);
        this.setSiblings();
        this.solve();
    }

    /**
     * @param grid {number[][]}
     * @return {Cell[]}
     */
    initCells(grid) {
        const rows = this.board.getElementsByTagName('tr');
        Array.from(rows).map((row, rowIndex) => {
            const cells = row.getElementsByTagName('td');
            return Array.from(cells)
                .map((cell, colIndex) => {
                    let value = grid[rowIndex][colIndex];
                    let editable = value === 0;

                    if (storage.grid.length > 0) {
                        value = storage.grid[rowIndex][colIndex];
                        editable = storage.grid[rowIndex][colIndex] !== grid[rowIndex][colIndex] || value === 0
                    }

                    this.cells.push(new Cell(cell, value, rowIndex, colIndex, this, editable, value));
                });
        });
    }

    /**
     * @param value
     * @param row
     * @param col
     */
    updateGrid(value, row, col) {
        this.grid[row][col] = value;
        storage.grid = this.grid;
    }

    setSiblings(){
        this.cells.forEach((cell) => cell.siblings = new Siblings(this, cell.rowIndex, cell.colIndex));
    }

    /**
     * @param cell {Cell}
     */
    set activeCell(cell) {
        if (this._activeCell !== null) this._activeCell.selected = false;
        this._activeCell = cell;
        if (cell !== null) cell.selected = true;
    }

    /**
     * @return {Cell | null}
     */
    get activeCell() {
        return this._activeCell;
    }

    /**
     * @description Validates if the board is isSolved
     * @return {boolean}
     */
    isSolved() {
        return !this.cells.some((cell) => cell.value !== cell.solution);
    }

    solve() {
        for (let cell of this.cells) {
                if (cell.solution !== 0) continue;
                for (let number = 1; number < 10; number++) {
                    if (!cell.siblings.sameSolution(number).length) {
                        cell.solution = number
                        if (this.solve()) return true;
                        cell.solution = 0;
                    }
                }
                return false;
            }
        return true;
    }

}