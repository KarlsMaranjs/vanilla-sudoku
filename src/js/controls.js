/**
 * @param cell {Cell}
 * @param board {Board}
 * @return Cell
 */
function selectCell(cell, board) {
    if (board.activeCell !== null) board.activeCell.siblings.highlight('')

    if (board.activeCell) board.activeCell.selected = false
    board.activeCell = cell;

    cell.siblings.highlight('rgb(234,234,234)')

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
            if (isNaN(value) || value === null) return
            break
    }

    selectedCell.value = value !== undefined ? value : selectedCell.value;
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

/**
 *
 * @param board {Board}
 */
export function initControls(board) {

    board.cells.forEach((row) => {
        row.forEach((cell) => {
            cell.DOMElement.addEventListener('click', () => selectCell(cell, board));
        })
    })

    document.addEventListener('keydown', (e) => updateCellValue(e.key, board))
}
