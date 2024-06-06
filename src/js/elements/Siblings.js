export default class Siblings {

    /**
     * @typedef {Object} Neighbors
     * @property {Cell|null} row
     * @property {Cell|null} column
     */

    /**
     * @type {Board}
     */
    board;

    /**
     * @type {Cell}
     */
    parentCell;

    /**
     * @type {number}
     */
    rowIndex;

    /**
     * @type {number}
     */
    colIndex;

    /**
     * @type {Cell[]}
     */
    column;

    /**
     * @type {Cell[]}
     */
    all;

    /**
     * @type {Cell[]}
     */
    row

    /**
     * @type {Cell[]}
     */
    block;

    /**
     * @type {Neighbors}
     */
    next;

    /**
     * @type {Neighbors}
     */
    previous;


    /**
     * @param board {Board}
     * @param cell {Cell}
     */
    constructor(board, cell) {
        this.board = board;
        this.parentCell = cell;
        this.rowIndex = cell.rowIndex;
        this.colIndex = cell.colIndex;
        this.row = this.#rowSiblings();
        this.column = this.#colSiblings(board, this.rowIndex);
        this.block = this.#blockSiblings();

        this.previous = {
            row: this.row.find((cell) => cell.colIndex === this.colIndex - 1 && cell.rowIndex === this.rowIndex),
            column: this.column.find((cell) => cell.rowIndex === this.rowIndex - 1 && cell.colIndex === this.colIndex)
        }

        this.next = {
            row: this.row.find((cell) => cell.colIndex === this.colIndex + 1 && cell.rowIndex === this.rowIndex),
            column: this.column.find((cell) => cell.rowIndex === this.rowIndex + 1 && cell.colIndex === this.colIndex)
        }

        this.all = this.row.concat(this.column).concat(this.block)

    }

    #blockSiblings() {
        const board = this.board;
        const blockSize = 3;
        const blockRow = Math.floor(this.rowIndex / blockSize) * blockSize;
        const blockCol = Math.floor(this.colIndex / blockSize) * blockSize;
        const siblings = [];

        for (let row = blockRow; row < blockRow + blockSize; row++) {
            for (let col = blockCol; col < blockCol + blockSize; col++) {
                if (row !== this.rowIndex || col !== this.colIndex) {
                    siblings.push(board.cells.find((cell) => cell.rowIndex === row && cell.colIndex === col));
                }
            }
        }

        return siblings;
    }

    #colSiblings() {
        return this.#findColSiblings(this.board, this.rowIndex, true)
            .reverse()
            .concat(this.#findColSiblings(this.board, this.rowIndex))
    }

    /**
     * @return {Cell[]}
     */
    #rowSiblings() {
        return this.board.cells.filter((cell) => cell.rowIndex === this.rowIndex && cell.colIndex !== this.colIndex);
    }

    /**
     * @param board {Board}
     * @param rowIndex {number}
     * @param backwards {boolean}
     */
    #findColSiblings(board, rowIndex, backwards = false) {
        const nextIndex = backwards ? rowIndex - 1 : rowIndex + 1;

        if ((backwards && nextIndex >= 0) || (!backwards && nextIndex < 9)) {
            const columnSibling = board.cells.find((cell) => {
                return cell.rowIndex === nextIndex && cell.colIndex === this.colIndex;
            });

            if (!columnSibling) return [];

            return [columnSibling].concat(this.#findColSiblings(board, nextIndex, backwards));
        }

        return [];
    }

    highlight(color) {
        this.all.map((cell) => cell.highlight(color))
    }

    /**
     * @param number
     * @return {Cell[]}
     */
    sameSolution(number) {
        return this.all.filter((cell) => cell.solution === number);
    }

    /**
     * @param number
     * @return {Cell[]}
     */
    sameValue(number) {
        return this.all.filter((cell) => cell.value === number);
    }

    get values() {
        return new Set(this.all.map(sibling => sibling.value));
    }

    get hidden() {
        return this.hiddenInRow.concat(this.hiddenInCol).concat(this.hiddenInBlock);
    }

    get hiddenInRow() {
        return this.#findHiddenSingle(this.row)
    }

    get hiddenInCol() {
        return this.#findHiddenSingle(this.column)
    }

    get hiddenInBlock() {
        return this.#findHiddenSingle(this.block)
    }

    get naked() {
        return this.nakedInRow.concat(this.nakedInCol).concat(this.nakedInBlock);
    }

    get nakedInRow() {
        return this.#findNakedSingle(this.row)
    }

    get nakedInCol() {
        return this.#findNakedSingle(this.column)
    }

    get nakedInBlock() {
        return this.#findNakedSingle(this.block)
    }

    #findHiddenSingle(cells) {
        const possibleValuesMap = new Map();
        const allCells = [...cells, this.parentCell];

        for (const cell of allCells) {
            if (cell.value !== 0) continue;

            for (const value of cell.possibleValues()) {
                if (!possibleValuesMap.has(value)) {
                    possibleValuesMap.set(value, []);
                }
                possibleValuesMap.get(value).push(cell);
            }
        }

        const hiddenSingles = [];
        for (const [value, cells] of possibleValuesMap.entries()) {
            if (cells.length === 1) {
                hiddenSingles.push(cells[0]);
            }
        }

        return hiddenSingles;
    }

    #findNakedSingle(cells) {
        return [...cells, this.parentCell].filter((cell) => cell.possibleValues().length === 1 && cell.value === 0 && !cell.possibleValues().includes(0));
    }
}