class Renderer {
    
    #viewSet
    #context
    
    constructor(context) {
        this.#viewSet = new Set()
        this.#context = context
    }
    
    add(view) {
        this.#viewSet.add(view)
    }
    
    remove(view) {
        this.#viewSet.delete(view)
    }
    
    run() {
        this.#context.clearRect(0, 0, this.#context.canvas.width, this.#context.canvas.height)
        this.#viewSet.forEach(view => view.draw())
    }
    
}