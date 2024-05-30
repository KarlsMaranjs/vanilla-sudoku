import { EMPTY_CELL } from "../constants.js";

export default class Annotations {
    /**
     * @type {Cell}
     */
    cell;

    /**
     * @param cell {Cell}
     * @param annotations {number[]}
     */
    constructor(cell, annotations = []) {
        this.cell = cell;
        this.annotations = annotations;
    }

    /**
     * @return {number[]}
     */
    get annotations() {
        return Array.from(this._annotations);
    }

    /**
     * @param annotations {number[]}
     */
    set annotations(annotations) {
        this._annotations = new Set(annotations);
        this.updateDOM();
    }

    /**
     * @param number
     */
    add(number) {
        this._annotations.add(number);
        this.updateDOMElement(number, number)
    }

    /**
     * @param number
     */
    remove(number) {
        this._annotations.delete(number);
        this.updateDOMElement(number, EMPTY_CELL);
    }

    /**
     * @param number
     * @return {boolean}
     */
    has(number) {
        return this._annotations.has(number);
    }

    clear() {
        this._annotations.clear();
        this.updateDOM();
    }

    update(number) {
        if (number > 0 && number < 10) {
            this.has(number) ? this.remove(number) : this.add(number);
        } else {
            this.clear();
        }
    }

    getValueHolders() {
        if (!this.cell.getAnnotationsHolder()) return;
        return this.cell.getAnnotationsHolder().querySelectorAll('div.annotation-square');
    }

    /**
     * Updates a specific DOM element.
     * @param index {number}
     * @param content {number | string}
     * @private
     */
    updateDOMElement(index, content) {
        const htmlElements = this.getValueHolders();
        if (!htmlElements) return;
        htmlElements[index - 1].innerHTML = content;
    }

    /**
     * Updates the DOM elements based on the current annotations.
     * @private
     */
    updateDOM() {
        const htmlElements = this.getValueHolders();
        if (!htmlElements) return;

        htmlElements.forEach((element, index) => {
            const number = index + 1;
            element.innerHTML = this.has(number) ? number : EMPTY_CELL;
        });
    }
}