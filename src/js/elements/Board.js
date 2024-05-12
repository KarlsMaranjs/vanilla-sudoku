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
     * @param cells {Cell[]}
     */
    constructor(cells) {
        this.cells = cells;
        this._activeCell = null;
    }

    set activeCell(cell) {
        this._activeCell = cell;
    }

    /**
     * @return {Cell | null}
     */
    get activeCell() {
        return this._activeCell;
    }

}