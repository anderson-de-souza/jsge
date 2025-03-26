class SpatialGridViewer {

    constructor(context, cellSize) {
        this.context = context
        this.cellSize = cellSize
        this.color = 'black'
    }

    show() {

        this.context.strokeStyle = this.color

        for (let x = 0; x < this.context.canvas.width; x += this.cellSize) {

            this.context.beginPath()
            this.context.moveTo(x, 0)
            this.context.lineTo(x, this.context.canvas.height)
            this.context.stroke()

            for (let y = 0; y < this.context.canvas.height; y += this.cellSize) {
                this.context.beginPath()
                this.context.moveTo(0, y)
                this.context.lineTo(this.context.canvas.width, y)
                this.context.stroke()
            }
        }

    }

}