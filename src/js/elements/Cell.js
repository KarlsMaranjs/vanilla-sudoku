import { EMPTY_CELL, SELECTED_CELL_CLASS } from "../constants.js";


export default class Cell {

    /**
     * @type {Siblings}
     */
    siblings;

    /**
     * @type number
     * @description Represents the numeric index, starting from zero, for the current element
     * relative to the list of children in the parent
     */
    index;

    /**
     * @type HTMLTableCellElement
     */
    DOMElement;

    /**
     * @type {HTMLSpanElement}
     */
    #valueHolder;

    /**
     * @type {number}
     */
    rowIndex;

    /**
     * @type {number}
     */
    colIndex;

    /**
     * @type {Board}
     */
    board;

    /**
     * @param cell {HTMLTableCellElement}
     * @param value {number}
     * @param rowIndex {number}
     * @param colIndex {number}
     * @param board {Board}
     */
    constructor(cell, value = 0, rowIndex, colIndex, board) {
        this.DOMElement = cell;
        this._value = value;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.board = board;
        this.index = Array.from(this.DOMElement.parentNode.children).findIndex((element) => element === cell);
        this.siblings = null;
        this.#valueHolder = this.DOMElement.querySelector('span.board-cell-value')
        this._selected = false;
    }

    /**
     * @param number
     */
    set value(number) {
        this.#valueHolder.innerHTML = number > 0 ? number : EMPTY_CELL;
        this._value = number > 0 ? number : 0;
        this.board.updateGrid(this._value, this.rowIndex, this.colIndex);
    }

    get value() {
        return this._value;
    }

    /**
     * @param selected {boolean}
     */
    set selected(selected) {
        if (selected){
            this.DOMElement.classList.add(SELECTED_CELL_CLASS)
            this.siblings.highlight('rgb(234,234,234)')
        } else {
            this.DOMElement.classList.remove(SELECTED_CELL_CLASS)
            this.siblings.highlight('')
        }
        this._selected = selected;
    }

    /**
     * @return {boolean}
     */
    get selected() {
        return this._selected;
    }
}