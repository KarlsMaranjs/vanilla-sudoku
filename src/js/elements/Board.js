import Cell from "./Cell.js";
import Siblings from "./Siblings.js";
import { storage } from "./Storage.js";
import { PLAY } from "../constants.js";

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
     * @type {Cell[][]}
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
     * @param grid {StoredCell[][]}
     */
    constructor(board, grid) {
        this.board = board;
        this._activeCell = null;
        this.cells = [];
        this.mode = PLAY;
        this.initCells(grid);
        this.setSiblings();
        this.solve();
    }

    /**
     * @param grid {StoredCell[][]}
     * @return {Cell[]}
     */
    initCells(grid) {
        const rows = this.board.getElementsByTagName('tr');
        this.grid = Array.from(rows).map((row, rowIndex) => {
            const cells = row.getElementsByTagName('td');
            return Array.from(cells)
                .map((cell, colIndex) => {
                    const storedCell = grid[rowIndex][colIndex];
                    let value = storedCell.value;
                    let editable = storedCell.editable;
                    let annotations = storedCell.annotations;

                    const newCell = new Cell(cell, value, rowIndex, colIndex, this, editable, value, annotations);
                    this.cells.push(newCell);
                    return newCell;
                });
        });

        storage.board = this.grid;
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