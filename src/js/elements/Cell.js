import { EMPTY_CELL } from "../constants.js";

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
    }

    set value(number) {
        this.#valueHolder.innerHTML = number >= 0 ? number : EMPTY_CELL;
        this._value = number;
    }
}

class Siblings {
    /**
     * @type {ChildNode[]}
     */
    column;

    /**
     * @type {Element[]}
     */
    row

    /**
     * @type {HTMLTableCellElement[]}
     */
    block;

    constructor(parent, index) {
        this.row = this.rowSiblings(parent, index);
        this.column = this.colSiblings(parent, index);
    }

    colSiblings(parent, index) {
        return this.findColSiblings(parent, index)
            .reverse()
            .concat(this.findColSiblings(parent, index, false))
    }

    rowSiblings(parent, index) {
        const siblings = Array.from(parent.children);
        siblings.splice(index, 1);
        return siblings;
    }

    /**
     * @param parent {ChildNode}
     * @param index {number}
     * @param backwards {boolean}
     */
    findColSiblings(parent, index, backwards = true) {
        const parentSiblings = backwards ? parent.previousSibling : parent.nextSibling
        if (!parentSiblings) return [];

        /**
         * @type {ChildNode[]}
         */
        let colSiblings = [];

        const columnSibling = parentSiblings.children[index];
        colSiblings.push(columnSibling);
        return colSiblings.concat(this.findColSiblings(parentSiblings, index, backwards));
    }
}