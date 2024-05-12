import { EMPTY_CELL, SELECTED_CELL_CLASS } from "../constants.js";
import Siblings from "./Siblings.js";


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
    element;

    /**
     * @type {HTMLSpanElement}
     */
    #valueHolder;

    /**
     * @param cell {HTMLTableCellElement}
     */
    constructor(cell) {
        this.element = cell;
        this._value = 0;
        this.index = Array.from(this.element.parentNode.children).findIndex((element) => element === cell);
        this.siblings = new Siblings(this.element.parentNode, this.index);
        this.#valueHolder = cell.querySelector('span.board-cell-value')
        this._selected = false;
    }

    set value(number) {
        this.#valueHolder.innerHTML = number > 0 ? number : EMPTY_CELL;
        this._value = number;
    }

    get value() {
        return this._value;
    }

    /**
     * @param selected {boolean}
     */
    set selected(selected) {
        selected
            ? this.element.classList.add(SELECTED_CELL_CLASS)
            : this.element.classList.remove(SELECTED_CELL_CLASS);
        this._selected = selected;
    }

    get selected() {
        return this._selected;
    }
}