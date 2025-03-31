import View from './view.js'

class AnimatedView extends View {
    
    constructor(context, width, height, spriteWidth = 64, spriteHeight = 64) {
        super(context, width, height)
        
        this.spriteWidth = spriteWidth
        this.spriteHeight = spriteHeight
        
        this.spriteCountX = 0
        this.spriteCountY = 0
        
        this.spriteMaxCountX = 0
        this.spriteMaxCountY = 0
        
        this.isCrop = true
        
        this.frameCount = 0
        this.frameMaxCount = 5
        
        this.image.onload = () => {
            this.spriteMaxCountX = Math.floor(this.image.width / this.spriteWidth)
            this.spriteMaxCountY = Math.floor(this.image.height / this.spriteHeight)
            this.isLoaded = true
        }
        
    }
    
    
    draw() {
        
        if (this.isCrop) {
            
            this.frameCount++
        
            if (this.frameCount >= this.frameMaxCount) {
                
                this.onFrameUpdate()
                
                this.frameCount = 0
                
            }
            
            this.crop(
                this.spriteCountX * this.spriteWidth,
                this.spriteCountY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight
            )

        }
        
        super.draw()
        
    }
    
    onFrameUpdate() {
        // TODO: changes spriteCountX and spriteCountY
    }
    
}

export default AnimatedView