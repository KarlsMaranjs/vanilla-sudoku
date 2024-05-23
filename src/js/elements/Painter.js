import { EMPTY_CELL } from "../constants";

export default class Painter {

    /**
     * @param grid {number[][]}
     * @returns {string}
     */
     board(grid){
        return grid.map(this.row).join('');
    }

    /**
     * @param number {number}
     * @returns {string}
     */
    cell(number) {
        return `<td class="board-cell">
                <span class="board-cell-value">
                    ${number === 0 ? EMPTY_CELL : number}
                </span>
            </td>`
            ;
    }

    /**
     * @param values {number[]}
     * @returns {string}
     */
    row(values) {
        return `<tr class="board-row">
                ${values.map(this.cell).join('')}
            </tr>`;
    }
}