import auth from '../../util/auth.js'
import ContextProxy from '../contextproxy.js'
import Rectangle from '../shape/rectangle.js'
import Shape from '../shape/shape.js'

class View {

    constructor(context, shape = new Rectangle()) {
        this.context = auth(ContextProxy, context)
        this.shape = auth(Shape, shape)
        this.style = { 
            color: 'black',
            filled: true,
            visible: true 
        }
    }

    draw() {

        if (this.style.visible) {

            const path = auth(Path2D, this.shape.create())

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