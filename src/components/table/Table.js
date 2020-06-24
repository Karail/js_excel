import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { souldResize } from './table.func';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(100);
  }
  onMousedown(e) {
    if (souldResize(e)) {
      resizeHandler(this.$root, e)
    }
  }
}