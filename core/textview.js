class TextView {
    
    constructor(context, charSequence) {
        this.context = context
        this.charSequence = charSequence
        this.x = 0
        this.y = 0
        this.fontStyle = 'normal'
        this.fontSize = 1
        this.fontFamily = 'Arial'
        this.textBaseline = 'top'
    }

    get width() {
        return this.context.measureText(this.charSequence).width
    }

    get height() {
        const metrics = this.context.measureText(this.charSequence)
        return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    }
    
    draw() {
        this.context.font = `${ this.fontStyle } ${ this.fontSize }rem ${ this.fontFamily }`
        this.context.textBaseline = this.textBaseline
        this.context.fillText(this.charSequence, this.x, this.y)
    }

}
