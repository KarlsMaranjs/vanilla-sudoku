export default class Annotations {

    /**
     * @param annotations {number[]}
     */
    constructor(annotations = []) {
        this._annotations = new Set(annotations);
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
    }

    /**
     * @param number
     */
    remove(number) {
        this._annotations.delete(number);
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
    }
}