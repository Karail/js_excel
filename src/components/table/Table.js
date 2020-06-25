import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { souldResize, isCell, nextSelector, matrix } from './table.func';
import { TableSelection } from './TableSelection';

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

    this.$on('formula:input', (text) => {
      this.selection.current.text = text;
    })

    this.$on('formula:done', () => {
      this.selection.current.focus();
    })

  }

  toHTML() {
    return createTable(100);
  }

  onMousedown(e) {
    if (souldResize(e)) {
      resizeHandler(this.$root, e);
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

    const {key} = e

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next);
    }
  }

  onInput(e) {
    const $target = $(e.target);
    this.$emit('table:input', $target);
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell);
  }
}
