import {ExcelComponent} from '@core/ExcelComponent'
import { $ } from '@core/dom';
import { changeTitle } from '@/redux/actions';
import { DEFAULT_TITLE } from '@/const';

export class Header extends ExcelComponent {

  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  toHTML() {
    const title = this.store.getState().title || DEFAULT_TITLE
    return `
    <input type="text" class="input" value="${title}" />

    <div>

      <div class="button">
        <i class="material-icons">delete</i>
      </div>

      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>

    </div>
    `
  }

  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(changeTitle($target.text));
  }
}
