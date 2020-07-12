import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.unsubs = [];
    this.prepare();
  }
  prepare() {
    
  }
  init() {
    this.initDOMListeners();
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub);
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  $dispatch(action) {
    this.store.dispatch(action);
  }
  storeChanged() {
    
  }
  isWatching(key) {
    return this.subscribe.includes(key);
  }
  toHTML() {
    return '';
  }
  destroy() {
    this.unsubs.forEach((unsub) => unsub());
    this.removeDOMListeners();
  }
}
