import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }
  storeChanged({ currentText }) {
    this.formula.text = currentText;
  }
  init() {
    super.init();

    this.formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.formula.text = $cell.data.value;
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
    this.$emit('formula:input', $(e.target).text);
  }
}
