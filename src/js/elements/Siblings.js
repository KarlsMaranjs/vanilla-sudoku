export default class Siblings {
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

    next;
    previous;

    // TODO Siblings should be of type Cell
    constructor(parent, index) {
        this.row = this.rowSiblings(parent, index);
        this.column = this.colSiblings(parent, index);

        this.next = {
            row: this.row[index],
        }
        this.previous = {
            row: this.row[index - 1],
        }
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