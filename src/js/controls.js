import Cell from "./elements/Cell.js";
import Board from "./elements/Board.js";

/**
 * @param cell {Cell}
 * @param board {Board}
 * @return Cell
 */
function selectCell(cell, board) {

    if (cell.selected) {
        board.activeCell = null;
    } else {
        if (board.activeCell) board.activeCell.selected = false
        board.activeCell = cell;
    }

    return cell
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
        case ' ':
            value = 0;
            break;
        case 'ArrowUp':
            break;
        case 'ArrowDown':
            break;
        case 'ArrowRight':
            selectCell(selectedCell.siblings.previous.row, board)
            break;
        case 'ArrowLeft':
            selectCell(selectedCell.siblings.next.row, board)
            break;
        default:
            value = validateNumericKey(key)
            if (isNaN(value) || value === null) return
            break
    }


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