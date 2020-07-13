import { $ } from "@core/dom";
import { Emitter } from '@core/Emitter';
import { StoreSubscriber } from "../../core/StoreSubscriber";
import * as actions from "@/redux/actions";
import { preventDefault } from "@core/utils";

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.emitter = new Emitter();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }
  getRoot() {

    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }

    this.components = this.components.map(Component => {
      const $elRoot = $.create('div', Component.className);
      const component = new Component($elRoot, componentOptions);
      $elRoot.html = component.toHTML();
      $root.append($elRoot);
      return component;
    });
 
    return $root;

  }
  init() {
    this.store.dispatch(actions.updateDate())
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }
  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
