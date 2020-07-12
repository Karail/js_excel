import { ExcelComponent } from '@core/ExcelComponent';
import { parse } from '@core/parse';
import { $ } from '@core/dom';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { souldResize, isCell, nextSelector, matrix } from './table.func';
import { TableSelection } from './TableSelection';
import * as actions from '@/redux/actions';
import { DEFAULT_STYLES_CELL } from '../../const';

export class Table extends ExcelComponent {

  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (value) => {
      this.selection.current.attr('data-value', value);
      this.selection.current.text = parse(value);
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    })
    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }))
    })
  }

  toHTML() {
    return createTable(100, this.store.getState());
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(this.$root, e);
      this.$dispatch(actions.tableResize(data))
    } catch (ex) {
      console.log(ex)
    }
  }

  onMousedown(e) {
    if (souldResize(e)) {
      this.resizeTable(e);
    } else if (isCell(e)) {
      const $target = $(e.target);
      if (e.shiftKey) {

        const $cells = matrix(
          $target,
          this.selection.current
        ).map((id) => (
          this.$root.find(`[data-id="${id}"]`)
        ));

        this.selection.selectGroup($cells);

      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const { key } = e

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next);
    }
  }

  onInput(e) {
    const value = $(e.target).text;
    this.updateTextInStore(value);
  }

  selectCell($cell) {
    const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES_CELL));
    this.selection.select($cell)
    this.$emit('table:select', $cell);
    this.$dispatch(actions.changeStyles(styles))
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }));
  }
}
