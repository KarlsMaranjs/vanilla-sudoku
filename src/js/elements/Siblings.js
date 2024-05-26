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
            row: this.row[colIndex - 1],
            column: this.column[rowIndex - 1],
        }

        this.next = {
            row: this.row[colIndex],
            column: this.column[rowIndex],
        }

        this.all = this.row.concat(this.column)
            .concat(this.block.filter((cell) => !this.row.includes(cell) && !this.column.includes(cell)))

    }

    blockSiblings() {
        const board = this.board;
        const blockRow = Math.floor(this.rowIndex / 3) * 3;
        const blockCol = Math.floor(this.colIndex / 3) * 3;
        const siblings = [];

        for (let row = blockRow; row < blockRow + 3; row++) {
            for (let col = blockCol; col < blockCol + 3; col++) {
                if (row !== this.rowIndex || col !== this.colIndex) {
                    siblings.push(board.cells[row][col]);
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
        const siblings = this.board.cells[this.rowIndex].slice();
        siblings.splice(this.colIndex, 1);
        return siblings;
    }

    /**
     * @param board {Board}
     * @param rowIndex {number}
     * @param backwards {boolean}
     */
    findColSiblings(board, rowIndex, backwards = false) {
        /**
         * @type {Cell}
         */
        let columnSibling;
        let nextIndex = backwards ? rowIndex - 1 : rowIndex + 1;

        if (backwards && nextIndex >= 0) {
            columnSibling = board.cells[nextIndex][this.colIndex];
        } else if (!backwards && nextIndex < board.cells.length) {
            columnSibling = board.cells[nextIndex][this.colIndex];
        } else {
            return [];
        }

        /**
         * @type {Cell[]}
         */
        let siblings = [];
        siblings.push(columnSibling);
        return siblings.concat(this.findColSiblings(board, nextIndex, backwards));
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