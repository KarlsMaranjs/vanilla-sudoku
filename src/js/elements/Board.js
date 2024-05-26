import Cell from "./Cell.js";
import Siblings from "./Siblings.js";

export default class Board {

    /**
     * @type {Cell[][]}
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
        this.cells = this.initCells(grid);
        this._activeCell = null;
        this.setSiblings()
        this.solve();
    }

    /**
     * @param grid {number[][]}
     * @return {Cell[][]}
     */
    initCells(grid) {
        const rows = this.board.getElementsByTagName('tr');
        return Array.from(rows).map((row, rowIndex) => {
            const cells = row.getElementsByTagName('td');
            return Array.from(cells)
                .map((cell, colIndex) => {
                    const value = grid[rowIndex][colIndex];
                    return new Cell(cell, value, rowIndex, colIndex, this, value === 0, value);
                });
        });
    }

    setSiblings(){
        this.cells.forEach((row) => {
            row.forEach((cell) => cell.siblings = new Siblings(this, cell.rowIndex, cell.colIndex))
        });
    }

    /**
     * @param cell {Cell}
     */
    set activeCell(cell) {
        if (this._activeCell === null && cell === null) return

        if (cell === null) {
            this._activeCell.selected = false;
        } else {
            if (this._activeCell !== null) this._activeCell.selected = false;
            cell.selected = true;
        }

        this._activeCell = cell;
    }

    /**
     * @return {Cell | null}
     */
    get activeCell() {
        return this._activeCell;
    }

    /**
     * @description Generate a new game
     */
    generate() {

    }

    /**
     * @description Validates if the board is isSolved
     * @return {boolean}
     */
    isSolved() {
        return !this.cells.flat(1).some((cell) => cell.value !== cell.solution);
    }

    solve() {
        for (let row of this.cells) {
            for (let cell of row) {
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
        }
        return true;
    }

}