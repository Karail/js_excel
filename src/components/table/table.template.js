import { toInlineStyles } from '@core/utils';
import { DEFAULT_STYLES_CELL } from '@/const';
import { parse } from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const width = getWidth(state.colState, col);
    const styles = toInlineStyles({
      ...DEFAULT_STYLES_CELL,
      ...state.stylesState[id]
    });
    return `
    <div 
      class="cell" 
      data-col="${col}" 
      data-type="cell" 
      data-id="${id}" 
      data-value="${data || ''}"
      style="${styles}; width: ${width}"
      contenteditable
    >
    ${parse(data) || ''}
    </div>
  `
  }
}

function toColumn({ col, i, width }) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${i}" 
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col">
      </div>
    </div>
  `
}

function createRow(i, content, state) {
  const height = getHeight(state, i)
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${i}"
      style="height: ${height}"
    >
      <div class="row-info">
        ${i ? i : ''}
        ${i ? `<div class="row-resize" data-resize="row"></div>` : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}
function getWidth(state, i) {
  return (state[i] || DEFAULT_WIDTH) + 'px';
}
function getHeight(state, i) {
  return (state[i] || DEFAULT_HEIGHT) + 'px';
}
function widthWidthForm(state) {
  return (col, i) => {
    return {
      col,
      i,
      width: getWidth(state, i)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthWidthForm(state.colState))
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, row))
      .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
