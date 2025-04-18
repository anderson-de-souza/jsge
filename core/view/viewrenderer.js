import expect from '../../util/expect.js'
import ContextProxy from '../contextproxy.js'
import View from './view.js'

class ViewRenderer {
    
    #context
    #viewSet = new Set()
    #clearBefore = false

    constructor(context) {
        this.context = context
    }
    
    addView(view) {
        this.viewSet.add(expect(View, view))
    }
    
    removeView(view) {
        this.viewSet.delete(view)
    }

    get context() {
        return this.#context
    }

    set context(value) {
        this.#context = expect(ContextProxy, value)
    }
    
    get viewSet() {
        return this.#viewSet
    }
    
    set viewSet(value) {
        this.#viewSet = expect(Set, value)
    }
    
    get clearBefore() {
        return this.#clearBefore
    }
    
    set clearBefore(value) {
        this.#clearBefore = expect('boolean', value)
    }
    
    run() {

        if (this.clearBefore) {
            this.clearContext()
        }

        for (const view of this.viewSet) {
            view.draw()
        }

    }

    clearContext() {
        const width = this.context.canvas.width
        const height = this.context.canvas.height
        this.context.clearRect(0, 0, width, height)
    }
    
}

export default ViewRenderer
