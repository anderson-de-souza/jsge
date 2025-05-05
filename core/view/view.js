import expect from '../../util/expect.js'
import Rectangle from '../shape/rectangle.js'
import Shape from '../shape/shape.js'
import ShapeLinker from '../global/shapelinker.js';
import viewDefaultStyle from './json/view-default-style.js'

class View {

    #context
    #shape
    #style

    constructor(context, shape = new Rectangle()) {
        this.context = context
        this.shape = shape
        this.style = viewDefaultStyle
        
        const shapeLinker = ShapeLinker.instance
        shapeLinker.link(this.shape, { view: this })
        
    }

    get context() {
        return this.#context
    }
    
    set context(value) {
        this.#context = expect(CanvasRenderingContext2D, value)
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
        this.#style = { ...value }
    }

    draw() {

        if (this.style.visible) {

            const path = expect(Path2D, this.shape.getDrawingPath())

            if (this.style.filled) {

                this.context.fillStyle = this.style.fillColor
                this.context.fill(path)

            } else {

                this.context.strokeStyle = this.style.strokeColor
                this.context.lineWidth = this.style.lineWidth
                this.context.stroke(path)
                
            }
        }

    }

}

export default View