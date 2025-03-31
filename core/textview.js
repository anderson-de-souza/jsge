import AnimatedView from './animatedview.js'

class TextView extends AnimatedView {
    
    constructor(context, charSequence) {
        super(context, 0, 0)

        this.context = context
        this.charSequence = charSequence

        this.x = 0
        this.y = 0
        
        this.fontStyle = 'normal'
        this.fontSize = 4
        this.fontFamily = 'Arial'
        this.textBaseline = 'top'

        this.isCrop = false

    }

    get measureText() {
        return this.context.measureText(this.charSequence)
    }

    get textWidth() {
        return this.measureText.actualBoundingBoxLeft + this.measureText.actualBoundingBoxRight
    }

    get textHeight() {
        return this.measureText.actualBoundingBoxAscent + this.measureText.actualBoundingBoxDescent
    }

    updateSize() {
        this.width = this.textWidth
        this.height = this.textHeight
    }
    
    draw() {

        this.updateSize()
        
        this.context.font = `${ this.fontStyle } ${ this.fontSize }rem ${ this.fontFamily }`
        this.context.textBaseline = this.textBaseline

        let realTextX = this.x + this.measureText.actualBoundingBoxLeft
        let realTextY = this.y + this.measureText.actualBoundingBoxAscent

        this.context.fillText(this.charSequence, realTextX, realTextY)

        super.draw()

    }

}

export default TextView
