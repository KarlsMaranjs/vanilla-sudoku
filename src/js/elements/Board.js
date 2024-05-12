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

    /**
     * @param cell {Cell}
     */
    set activeCell(cell) {
        this._activeCell = cell;
        cell.selected = this._activeCell !== null;
    }

    /**
     * @return {Cell | null}
     */
    get activeCell() {
        return this._activeCell;
    }

}