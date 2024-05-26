import Cell from "./Cell.js";
import Siblings from "./Siblings.js";

export default class Board {

    /**
     * @type {Cell[]}
     */
    cells;

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
        this._activeCell = null;
        this.cells = [];
        this.initCells(grid);
        this.setSiblings()
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
                    const value = grid[rowIndex][colIndex];
                    this.cells.push(new Cell(cell, value, rowIndex, colIndex, this, value === 0, value));
                });
        });
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