import Cell from "./Cell.js";
import Siblings from "./Siblings.js";

export default class Board {

    /**
     * @type {number[][]}
     */
    grid;

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
        this.grid = grid;
        this.cells = this.initCells();
        this._activeCell = null;
        this.setSiblings()
    }

    /**
     * @return {Cell[][]}
     */
    initCells() {
        const rows = this.board.getElementsByTagName('tr');
        return Array.from(rows).map((row, rowIndex) => {
            const cells = row.getElementsByTagName('td');
            return Array.from(cells)
                .map((cell, colIndex)=> new Cell(cell, this.grid[rowIndex][colIndex], rowIndex, colIndex, this));
        });
    }

    setSiblings(){
        this.cells.forEach((row) => {
            row.forEach((cell) => cell.siblings = new Siblings(this, cell.rowIndex, cell.colIndex))
        });
    }

    /**
     * @param value
     * @param row
     * @param col
     */
    updateGrid(value, row, col){
        this.grid[row][col] = value;
        // TODO Check if the puzzle is solved after updating the value
    }

    /**
     * @param cell {Cell}
     */
    set activeCell(cell) {
        if (cell === null) {
            this._activeCell.selected = false;
        } else {
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
     * @description Validates if the board is solved
     */
    validate() {

    }

    solve() {

    }

}