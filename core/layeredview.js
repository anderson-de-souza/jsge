class LayeredView extends View {
    
    constructor(context, width, height, depth) {
        super(context, width, height)
        this.z = 0
        this.depth = depth
        this.scaledWidth = this.width
        this.scaledHeight = this.height
    }
    
    applyScale() {
        
        const scale = 1 / this.z + this.depth
        
        
        
    }
    
    draw() {
        
        this.applyScale()
        super.draw()
        
    }
    
}