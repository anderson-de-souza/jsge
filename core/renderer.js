import View from './view/view.js'

class Renderer {
    
    constructor(context) {
        this.context = context
        this.viewSet = new Set()
        this.clearBefore = false
    }
    
    add(view) {
        if (view instanceof View) {
            this.viewSet.add(view)
        }
    }
    
    remove(view) {
        this.viewSet.delete(view)
    }
    
    run() {

        if (this.clearBefore) {
            this.clearCanvas()
        }

        for (const view of this.viewSet) {
            try {
                view.draw()
            } catch (e) {
                console.log(e)
            }
        }

    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    }
    
}

export default Renderer
