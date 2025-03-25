class ContextDelegate {
    
    constructor(canvas) {
        
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Error: arg passed is not a <canvas>')
        }
        
        this.context = canvas.getContext('2d')
        
        this.renderer = new Renderer(this)
        
    }
    
    get canvas() {
        return this.context.canvas
    }
    
    fillRect(x, y, width, height) {
        this.context.fillRect(x, y, width, height)
    }
    
    strokeRect(x, y, width, height) {
        this.context.strokeRect(x, y, width, height)
    }
    
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }
    
    clearRect(x, y, width, height) {
        this.context.clearRect(x, y, width, height)
    }
    
    set fillStyle(config) {
        this.context.fillStyle = config
    }
    
    get fillStyle() {
        return this.context.fillStyle
    }
    
    set strokeStyle(config) {
        this.context.strokeStyle = config
    }
    
    get strokeStyle() {
        return this.context.strokeStyle
    }
    
}
