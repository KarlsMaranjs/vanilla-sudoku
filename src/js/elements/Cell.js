import { EMPTY_CELL, SELECTED_CELL_CLASS } from "../constants.js";


export default class Cell {

    /**
     * @type {Siblings}
     */
    siblings;

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
    solution;

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
     * @private
     * @type {boolean}
     */
    _editable;

    /**
     * @param cell {HTMLTableCellElement}
     * @param value {number}
     * @param rowIndex {number}
     * @param colIndex {number}
     * @param board {Board}
     * @param editable {boolean}
     * @param solution {number}
     */
    constructor(cell, value = 0, rowIndex, colIndex, board, editable = true, solution = solution) {
        this.DOMElement = cell;
        this._value = value;
        this.solution = solution;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.board = board;
        this.siblings = null;
        this.#valueHolder = this.DOMElement.querySelector('span.board-cell-value')
        this._selected = false;
        this.editable = editable;
    }

    /**
     * @param number
     */
    set value(number) {
        if (number === this._value || !this._editable) return;

        let htmlContent = EMPTY_CELL;
        let newValue = 0;
        let repeated = this.siblings.sameValue(this._value);

        if (number > 0) {
            newValue = number < 10 ? number : 0;
            htmlContent = number;
            repeated = this.siblings.sameValue(number);
        }

        if (repeated.length > 0) {
            repeated.map((cell) => cell.highlight(number > 0 ? '#fba2a2' : ''))
        }

        this.#valueHolder.innerHTML = htmlContent;
        this._value = newValue;
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
            this.siblings.highlight('rgb(228,210,185)')
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

    set editable(editable) {
        this.DOMElement.classList.add(editable ? 'editable' : 'given-solution');
        this._editable = editable;
    }

    get editable() {
        return this._editable
    }

    highlight(color) {
        this.DOMElement.style.background = color
    }
}