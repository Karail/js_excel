import { ExcelComponent } from "@core/ExcelComponent";

export class ExelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }
    get template() {
        throw new Error('getter template returns nothing')
    }
    initState(state = {}) {
        this.state = { ...state };
    }
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.$root.html = this.template;
    }
}