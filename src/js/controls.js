import { ANNOTATE, PLAY } from "./constants.js";
import Button from "./elements/Button.js";
import { storage } from "./elements/Storage.js";

/**
 * @param cell {Cell}
 * @param board {Board}
 * @return Cell
 */
function selectCell(cell, board) {
    board.activeCell = !cell.selected ? cell : null;
    if (board.activeCell) {
        document.getElementById('controls').classList.remove('hidden');
        board.activeCell.annotations = board.activeCell.possibleValues();
        // cell.siblings.hiddenInCol.map((cell) => cell.highlight('green'))
        // cell.siblings.hiddenInRow.map((cell) => cell.highlight('blue'))
        // cell.siblings.hiddenInBlock.map((cell) => cell.highlight('pink'))
        cell.siblings.hidden.map((cell) => cell.highlight('blue'))
        cell.siblings.naked.map((cell) => cell.highlight('yellow'))

        // cell.siblings.nakedInRow.map((cell) => cell.highlight('yellow'))
        // cell.siblings.nakedInCol.map((cell) => cell.highlight('yellow'))
        // cell.siblings.nakedInBlock.map((cell) => cell.highlight('yellow'))
    } else {
        document.getElementById('controls').classList.add('hidden');
    }

    return cell;
}

/**
 * @param key {string}
 * @param board {Board}
 */
export function updateCellValue(key, board) {

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

export function renderControls(board) {
    const controls = document.getElementById('controls');

    for (let i = 1; i < 10; i++) {
        const button = document.createElement('button');
        button.className = 'button';
        button.innerText = i.toString();
        button.setAttribute('data-value', i.toString());
        new Button(button, i, board)
        controls.append(button)
    }
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
