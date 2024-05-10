import { EMPTY_CELL, SELECTED_CELL_CLASS } from "./constants.js";
import Cell from "./elements/Cell.js";

/**
 * @param cell {HTMLTableCellElement}
 * @return HTMLTableCellElement
 */
function selectCell(cell) {
    const selectedCells = document.getElementsByClassName(SELECTED_CELL_CLASS);
    const classList = cell.classList;

    if (classList.contains(SELECTED_CELL_CLASS)) {
        classList.remove(SELECTED_CELL_CLASS)
    }
    else {
        const currentlySelected = Array.from(selectedCells).find(cell => cell.classList.contains(SELECTED_CELL_CLASS))
        if (currentlySelected) currentlySelected.classList.remove(SELECTED_CELL_CLASS)
        classList.add(SELECTED_CELL_CLASS);
    }
    const cellClass = new Cell(cell);
    console.log(cellClass);
    return cell
}

/**
 * @param key {string}
 */
function updateCellValue(key) {

    let value;

    if (key === 'Backspace' || key === 'Delete' || key === ' ') {
        value = -1;
    } else {
        value = validateNumericKey(key)
        if (isNaN(value) || value === null) return
    }

    const selectedCell = document.getElementsByClassName(SELECTED_CELL_CLASS)[0];

    if (!selectedCell) return

    selectedCell.querySelector('span.board-cell-value').innerHTML = value >= 0 ? value : EMPTY_CELL;
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
    const cells = document.getElementsByClassName('board-cell');

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.addEventListener('click', () => selectCell(cell));
    }

    document.addEventListener('keyup', (e) => updateCellValue(e.key))
}

initControls();