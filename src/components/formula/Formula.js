import {ExcelComponent} from '@core/ExcelComponent'
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }
  init() {
    super.init();

    this.formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.formula.text = $cell.text;
    })
    this.$on('table:input', ($cell) => {
      this.formula.text = $cell.text;
    })
  }
  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }
  onKeydown(e) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(e.key)) {
      e.preventDefault();
      this.$emit('formula:done');
    }
  }
  onInput(e) {
    this.$emit('formula:input', $(e.target).text)
  }
}
