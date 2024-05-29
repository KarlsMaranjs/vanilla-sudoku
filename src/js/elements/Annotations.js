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
        this._annotations = new Set(annotations);
        this.cell = cell;
    }

    /**
     * @return {number[]}
     */
    get annotations() {
        return Array.from(this._annotations);
    }

    /**
     * @param number
     */
    add(number) {
        this._annotations.add(number);
        const selector = this.cell.getAnnotationsHolder().querySelectorAll('div.annotation-square');
        selector[number - 1].innerHTML = number
    }

    /**
     * @param number
     */
    remove(number) {
        this._annotations.delete(number);
        const selector = this.cell.getAnnotationsHolder().querySelectorAll('div.annotation-square');
        selector[number].innerHTML = EMPTY_CELL
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
        const selector = this.cell.getAnnotationsHolder()?.querySelectorAll('div.annotation-square');
        if (!selector) return
        selector.forEach((element) => element.innerHTML = EMPTY_CELL);
    }
}