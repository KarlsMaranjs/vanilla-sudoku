export default class Cell {
    /**
     * @type {Siblings}
     */
    siblings;

    /**
     * @type {ParentNode}
     */
    parent;

    /**
     * @type number
     */
    index;

    /**
     * @param cell {HTMLTableCellElement}
     */
    constructor(cell) {
        this.parent = cell.parentNode;
        this.index = Array.prototype.indexOf.call(this.parent.children, cell);
        this.siblings = new Siblings(this.parent, this.index);
    }
}

class Siblings {
    /**
     * @type {ChildNode[]}
     */
    column;

    /**
     * @type {HTMLCollection}
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
        return this.findColSiblings(parent, index).reverse().concat(this.findColSiblings(parent, index, false))
    }

    rowSiblings(parent, index) {
        const siblings = Array.from(parent.children);
        siblings.splice(index, 1);
        return siblings;
    }

    /**
     * @param parent {ParentNode}
     * @param index {number}
     * @param backwards {boolean}
     */
    findColSiblings(parent, index, backwards = true) {
        const parentSiblings = backwards ? parent.previousSibling : parent.nextSibling
        if (!parentSiblings) return [];

        /**
         * @type {ChildNode[]}
         */
        let colSiblings= [];

        const columnSibling = parentSiblings.children[index];
        colSiblings.push(columnSibling);
        return colSiblings.concat(this.findColSiblings(parentSiblings, index, backwards));
    }
}