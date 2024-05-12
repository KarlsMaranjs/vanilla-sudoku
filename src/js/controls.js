import { EMPTY_CELL, SELECTED_CELL_CLASS } from "./constants.js";
import Cell from "./elements/Cell.js";
import Board from "./elements/Board.js";

/**
 * @param cell {Cell}
 * @param board {Board}
 * @return Cell
 */
function selectCell(cell, board) {
    const selectedCell = board.activeCell;
    const classList = cell.element.classList;

    if (classList.contains(SELECTED_CELL_CLASS)) {
        classList.remove(SELECTED_CELL_CLASS)
        board.activeCell = null;
    } else {
        if (selectedCell) selectedCell.element.classList.remove(SELECTED_CELL_CLASS)
        classList.add(SELECTED_CELL_CLASS);
        board.activeCell = cell;
    }

    return cell
}

/**
 * @param key {string}
 * @param board {Board}
 */
function updateCellValue(key, board) {

    let value;

    if (key === 'Backspace' || key === 'Delete' || key === ' ') {
        value = 0;
    } else {
        value = validateNumericKey(key)
        if (isNaN(value) || value === null) return
    }

    const selectedCell = board.activeCell;

    if (!selectedCell) return

    selectedCell.value = value;
}

/**
 * @param key {string}
 * @return {number | null}
 */
function validateNumericKey(key) {
    if (parseInt(key) && parseInt(key) >= 0 && parseInt(key) <= 9) {
        return parseInt(key)
    }

    return null
}

function initControls() {
    const cells = Array.from(
        document.getElementsByClassName('board-cell')).map(cell => new Cell(cell)
    );

    const board = new Board(cells);

    board.cells.forEach((cell) => {
        cell.element.addEventListener('click', () => selectCell(cell, board));
    })

    document.addEventListener('keyup', (e) => updateCellValue(e.key, board))
}

initControls();