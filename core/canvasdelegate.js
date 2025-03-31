class CanvasDelegate {

    constructor(selector) {
        this.canvas = document.querySelector(selector)
    }

    fullScreen() {
        this.width = innerWidth
        this.height = innerHeight
    }

    getContext(value) {
        return this.canvas.getContext(value)
    }

    addEventListener(eventType, callback, options = {}) {
        this.canvas.addEventListener(eventType, callback, options);
    }

    getBoundingClientRect() {
        return this.canvas.getBoundingClientRect()
    }

    set width(value) {
        this.canvas.width = value
    }

    get width() {
        return this.canvas.width
    }

    set height(value) {
        this.canvas.height = value
    }

    get height() {
        return this.canvas.height
    }

}

export default CanvasDelegate