import { $ } from '@core/dom';
import { createToolbar } from './toolbar.template';
import { ExelStateComponent } from '../../core/ExelStateComponent';
import { DEFAULT_STYLES_CELL } from '../../const';

export class Toolbar extends ExelStateComponent {
  static className = 'excel__toolbar';
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }
  prepare() {
    this.initState(DEFAULT_STYLES_CELL);
  }
  storeChanged(changed) {
    this.setState(changed.currentStyles);
  }
  get template() {
    return createToolbar(this.state);
  }
  toHTML() {
    return this.template;
  }
  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}
