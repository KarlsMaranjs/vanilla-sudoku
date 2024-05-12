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