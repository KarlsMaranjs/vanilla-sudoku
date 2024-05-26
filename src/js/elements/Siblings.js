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
     * @param rowIndex {number}
     * @param colIndex {number}
     */
    constructor(board, rowIndex, colIndex) {
        this.board = board;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.row = this.rowSiblings();
        this.column = this.colSiblings(board, rowIndex);
        this.block = this.blockSiblings();

        this.previous = {
            row: this.row.find((cell) => cell.colIndex === colIndex - 1 && cell.rowIndex === this.rowIndex),
            column: this.column.find((cell) => cell.rowIndex === rowIndex - 1 && cell.colIndex === this.colIndex)
        }

        this.next = {
            row: this.row.find((cell) => cell.colIndex === colIndex + 1 && cell.rowIndex === this.rowIndex),
            column: this.column.find((cell) => cell.rowIndex === rowIndex + 1 && cell.colIndex === this.colIndex)
        }

        this.all = this.row.concat(this.column).concat(this.block)

    }

    blockSiblings() {
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

    colSiblings() {
        return this.findColSiblings(this.board, this.rowIndex, true)
            .reverse()
            .concat(this.findColSiblings(this.board, this.rowIndex))
    }

    /**
     * @return {Cell[]}
     */
    rowSiblings() {
        return this.board.cells.filter((cell) => cell.rowIndex === this.rowIndex && cell.colIndex !== this.colIndex);
    }

    /**
     * @param board {Board}
     * @param rowIndex {number}
     * @param backwards {boolean}
     */
    findColSiblings(board, rowIndex, backwards = false) {
        const nextIndex = backwards ? rowIndex - 1 : rowIndex + 1;

        if ((backwards && nextIndex >= 0) || (!backwards && nextIndex < 9)) {
            const columnSibling = board.cells.find((cell) => {
                return cell.rowIndex === nextIndex && cell.colIndex === this.colIndex;
            });

            if (!columnSibling) return [];

            return [columnSibling].concat(this.findColSiblings(board, nextIndex, backwards));
        }

        return [];
    }

    highlight(color){
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
}