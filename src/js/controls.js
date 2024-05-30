import { ANNOTATE, PLAY } from "./constants.js";
import { storage } from "./elements/Storage.js";

/**
 * @param cell {Cell}
 * @param board {Board}
 * @return Cell
 */
function selectCell(cell, board) {
    board.activeCell = !cell.selected ? cell : null;
    return cell;
}

/**
 * @param key {string}
 * @param board {Board}
 */
function updateCellValue(key, board) {

    const selectedCell = board.activeCell;
    if (!selectedCell) return

    let value;
    switch (key) {
        case 'Backspace':
        case 'Delete':
            value = 0;
            break;
        case 'ArrowUp':
            if (!selectedCell.siblings.previous.column) return
            selectCell(selectedCell.siblings.previous.column, board)
            break;
        case 'ArrowDown':
            if (!selectedCell.siblings.next.column) return
            selectCell(selectedCell.siblings.next.column, board)
            break;
        case 'ArrowRight':
            if (!selectedCell.siblings.next.row) return
            selectCell(selectedCell.siblings.next.row, board)
            break;
        case 'ArrowLeft':
            if (!selectedCell.siblings.previous.row) return
            selectCell(selectedCell.siblings.previous.row, board)
            break;
        default:
            value = validateNumericKey(key)
            break
    }

    if (Number.isNaN(value) || value === undefined || !selectedCell.editable) return

    if (board.mode === PLAY) {
        selectedCell.value = value;
    } else if (board.mode === ANNOTATE && selectedCell.value === 0) {
        selectedCell.annotations.update(value);
    }

    storage.board = board.grid;
}

/**
 * @param current {HTMLButtonElement}
 * @param others {HTMLButtonElement[]}
 * @param board {Board}
 */
export function selectMode(current, others, board) {
    others.forEach(toggle => toggle.classList.remove('active-toggle-option'))
    current.classList.add('active-toggle-option')
    board.mode = current.getAttribute('data-mode')
}

/**
 * @param key {string}
 * @return {number | NaN}
 */
function validateNumericKey(key) {
    if (parseInt(key) && parseInt(key) >= 0 && parseInt(key) <= 9) {
        return parseInt(key)
    }

    return NaN
}

/**
 *
 * @param board {Board}
 */
export function initControls(board) {
    /**
     * @type {HTMLButtonElement[]}
     */
    const selectors = Array.from(document.getElementsByClassName('mode-selector'));
    ['click', 'touchend'].forEach(key => {
        board.cells.forEach((cell) => {
            cell.DOMElement.addEventListener(key, (event) => {
                if (key !== 'click') event.preventDefault();
                selectCell(cell, board)
            });
        });

        selectors.forEach(toggle => toggle.addEventListener(key,
            (event) => {
                if (key !== 'click') event.preventDefault();
                selectMode(toggle, selectors, board)
            }));
    })

    document.addEventListener('keydown', (e) => updateCellValue(e.key, board))

}
