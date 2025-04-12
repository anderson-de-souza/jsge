import expect from '../../util/expect.js'
import Rectangle from '../shape/rectangle.js'
import View from './view.js'

class TextView extends View {

    
    constructor(context, shape = new Rectangle()) {
        super(context, expect(Rectangle, shape))
        this.content = ''
        this.style = {
            ...this.style,
            color: 'transparent',
            fontColor: 'black',
            fontFamily: 'Arial',
            fontSize: 32,
            fontStyle: 'normal',
            textBaseline: 'top',
        }
    }

    updateFontStyle() {
        this.context.fillStyle = this.style.fontColor
        this.context.font = `${ this.style.fontStyle } ${ this.style.fontSize }px ${ this.style.fontFamily }`
        this.context.textBaseline = this.style.textBaseline
    }

    get textMetrics() {
        this.updateFontStyle()
        return this.context.measureText(this.content)
    }

    get textWidth() {
        return this.textMetrics.actualBoundingBoxLeft + this.textMetrics.actualBoundingBoxRight
    }

    get textHeight() {
        return this.textMetrics.actualBoundingBoxAscent + this.textMetrics.actualBoundingBoxDescent
    }

    resize() {
        this.shape.width = this.textWidth
        this.shape.height = this.textHeight
    }

    draw() {

        this.resize()
        super.draw()

        if (this.style.visible) {
      
            let realTextX = this.shape.x + this.textMetrics.actualBoundingBoxLeft
            let realTextY = this.shape.y + this.textMetrics.actualBoundingBoxAscent

            this.context.fillText(this.content, realTextX, realTextY)

        }

    }

}

export default TextView