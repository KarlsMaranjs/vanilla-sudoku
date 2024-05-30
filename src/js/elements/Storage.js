class Storage {

    /**
     * @typedef {Object} StoredCell
     * @property {number} value
     * @property {boolean} editable
     * @property {number[]} annotations
     */

    /**
     * @type {Storage}
     */
    static instance;

    static init() {
        if (!Storage.instance) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }

    /**
     * @param cells {Cell[][]}
     */
    set board(cells) {
        /**
         * @type {StoredCell[][]}
         */
        const storedCells = cells.map((row, rowIndex) => {
            return row.map(cell => {
                return {
                    value: cell.value,
                    editable: cell.editable,
                    annotations: cell.annotations.annotations,
                }
            })
        });
        localStorage.setItem('board', JSON.stringify(storedCells));
    }

    /**
     * @return {StoredCell[] || []}
     */
    get board() {
        return Array.from(JSON.parse(localStorage.getItem('board')) || []);
    }

    remove(key = 'board') {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }

    /**
     * @param grid {number[][]}
     * @return {StoredCell[][]}
     */
    initBoard(grid) {
        return grid.map((row, rowIndex) => {
            return row.map((value) => ({
                value: value,
                editable: value === 0,
                annotations: [],
            }));
        })
    }

    /**
     * @param grid {StoredCell[][]}
     * @return {*}
     */
    toGrid(grid) {
        return grid.map(row => {
            return row.map((value) => value.value)
        })
    }
}

export const storage = Storage.init();