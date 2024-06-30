import { updateCellValue } from "../controls.js";

export default class Button {
    /**
     * @type HTMLButtonElement
     */
    element;

    /**
     * @type number
     */
    value;

    /**
     * @type Board
     */
    board;


    /**
     * @param {HTMLButtonElement} element
     * @param {number} value
     * @param {Board} board
     */
    constructor(element, value, board) {
        this.element = element;
        this.value = value;
        this.board = board;

        ['click', 'touchend'].forEach(type => {
            this.element.addEventListener(type, (event) => {
                if (type !== 'click') event.preventDefault();
                this.eventHandler()
            })
        })
    }

    eventHandler() {
        updateCellValue(this.value.toString(), this.board);
    }
}
