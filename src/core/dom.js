class Dom {
    constructor(selector) {
        this.$el = typeof selector === "string"
            ? document.querySelector(selector)
            : selector;
    }
    set html(html) {
        if (typeof html === "string") {
            this.$el.innerHTML = html;
        }
    }
    set text(text) {
        this.$el.textContent = text;
    }

    get text() {
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }
    closest(selector) {
        return $(this.$el.closest(selector));
    }
    getCoords() {
        return this.$el.getBoundingClientRect();
    }
    get data() {
        return this.$el.dataset;
    }
    find(selector) {
        return $(this.$el.querySelector(selector));
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }
    css(styles = {}) {
        Object
            .keys(styles)
            .forEach((key) => {
                this.$el.style[key] = styles[key];
            })
    }
    addClasses(...classes) {
        classes.forEach((className) => {
            this.$el.classList.add(className)
        });
        return this;
    }
    removeClasses(...classes) {
        classes.forEach((className) => {
            this.$el.classList.remove(className);
        });
        return this;
    }
    id(parce) {
        if (parce) {
            const parced = this.id().split(':');
            return {
                row: +parced[0],
                col: +parced[1],
            }
        }
        return this.data.id;
    }
    focus() {
        this.$el.focus();
        return this;
    }
    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s];
            return res;
        }, {});
    }
    attr(name, value) {
        if (value || value === '') {
            this.$el.setAttribute(name, value);
            return this;
        }
        return this.$el.getAttribute(name);
    }
    clear() {
        this.html = '';
        return this;
    }
}
export function $(selector) {
    return new Dom(selector);
}
$.create = (tagName, ...classes) => {
    const $el = document.createElement(tagName);
    if (classes) {
        classes.forEach((className) => {
            $el.classList.add(className);
        })
    }
    return $($el);
}