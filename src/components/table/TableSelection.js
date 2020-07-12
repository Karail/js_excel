export class TableSelection {

    static className = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el) {
        this.clear();
        this.group.push($el);
        $el.focus().addClasses(TableSelection.className);
        this.current = $el;
    }

    get selectedIds() {
        return this.group
            .map(($el) => $el.id())
    }

    clear() {
        this.group.forEach($c => {
            $c.removeClasses(TableSelection.className);
        });
        this.group = [];
    }

    selectGroup($group = []) {
        this.clear();
        this.group = $group;
        this.group.forEach(($el) => {
            $el.addClasses(TableSelection.className);
        })
    }

    applyStyle(style) {
        this.group.forEach(($el) => {
            $el.css(style);
        })
    }

}