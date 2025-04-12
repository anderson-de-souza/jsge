import expect from '../../util/expect.js'
import ContextProxy from '../contextproxy.js'
import Rectangle from '../shape/rectangle.js'
import Shape from '../shape/shape.js'

class View {

    constructor(context, shape = new Rectangle()) {
        this.context = expect(ContextProxy, context)
        this.shape = expect(Shape, shape)
        this.style = { 
            color: 'black',
            filled: true,
            visible: true 
        }
    }

    draw() {

        if (this.style.visible) {

            const path = expect(Path2D, this.shape.create())

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