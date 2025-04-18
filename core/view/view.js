import expect from '../../util/expect.js'
import ContextProxy from '../contextproxy.js'
import Rectangle from '../shape/rectangle.js'
import Shape from '../shape/shape.js'

class View {

    #context
    #shape
    #style

    constructor(context, shape = new Rectangle()) {
        this.context = context
        this.shape = shape
        this.style = { 
            color: 'black',
            filled: true,
            visible: true 
        }
    }

    get context() {
        return this.#context
    }
    
    set context(value) {
        this.#context = expect(ContextProxy, value)
    }
    
    get shape() {
        return this.#shape
    }
    
    set shape(value) {
        this.#shape = expect(Shape, value)
    }
    
    get style() {
        return this.#style
    }
    
    set style(value) {
        this.#style = value
    }

    draw() {

        if (this.style.visible) {

            const path = expect(Path2D, this.shape.getDrawingPath())

            if (this.style.filled) {

                this.context.fillStyle = this.style.color || 'black' 
                this.context.fill(path)

            } else {

                this.context.strokeStyle = this.style.color || 'black'
                this.context.stroke(path)
                
            }
        }

    }

}

export default View