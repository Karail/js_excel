class Dom {
    constructor(selector) {
        this.$el = typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
    }
    html(html) {
        if (typeof html === "string") {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML;
    }
    clear() {
        this.html('');
        return this;
    }
    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        this.$el.append(node);
        return this;
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
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