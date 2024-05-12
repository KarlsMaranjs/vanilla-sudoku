import Cell from "./Cell.js";

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
     */
    constructor(board) {
        this.board = board;
        this.cells = this.initCells();
        this._activeCell = null;
    }

    /**
     * @return {Cell[]}
     */
    initCells() {
        const cells = this.board.getElementsByTagName('td')
        return Array.from(cells).map(cell => new Cell(cell));
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

}