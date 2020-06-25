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

    clear() {
        this.group.forEach($c => {
            $c.removeClasses(TableSelection.className);
        });
    }

    selectGroup($group = []) {
        this.clear();
        this.group = $group;
        this.group.forEach(($el) => {
            $el.addClasses(TableSelection.className);
        })
    }

}