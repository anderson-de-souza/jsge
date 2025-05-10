import expect from '../../util/expect.js'
import View from './view.js'

class ViewRenderer {
    
    #context
    #viewSet = new Set()
    #clearBefore = true

    constructor(context) {
        this.context = context
    }
    
    addView(view) {
        expect(View, view)
        this.viewSet.add(view)
    }
    
    removeView(view) {
        this.viewSet.delete(view)
    }

    get context() {
        return this.#context
    }

    set context(value) {
        this.#context = expect(CanvasRenderingContext2D, value)
    }
    
    get viewSet() {
        return this.#viewSet
    }
    
    set viewSet(value) {
        expect(Set, value)
        
        for (let view of value) {
            expect(View, view)
        }
        
        this.#viewSet = value
        
    }
    
    get clearBefore() {
        return this.#clearBefore
    }
    
    set clearBefore(value) {
        expect('boolean', value)
        
        this.#clearBefore = value
        
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
