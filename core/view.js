
class View {

    constructor(context, width, height) {
        
        this.context = context
        
        this.x = 0
        this.y = 0
        
        this.width = width
        this.height = height
        
        this.isFill = false
        this.color = 'black'
        
        this.url = ''
        this.image = new Image()
        this.image.onload = () => this.isLoaded = true
        this.image.onerror = () => this.isLoaded = false
        
        this.isLoaded = false
        this.isCrop = false
        
        this.cropX = this.x
        this.cropY = this.y
        this.cropWidth = this.width
        this.cropHeight = this.height
        
        this.isVisible = true
        
    }
    
    set src(url) {
        this.url = url
        this.image.src = this.url
    }
    
    crop(cropX, cropY, cropWidth, cropHeight) {
        this.cropX = cropX
        this.cropY = cropY
        this.cropWidth = cropWidth
        this.cropHeight = cropHeight
    }
    
    draw() {
        
        if (this.isVisible) {
        
            if (this.isLoaded && !this.isCrop) {
                this.context.drawImage(
                    this.image, 
                    this.x, this.y, 
                    this.width, this.height
                )
            } else if (this.isLoaded && this.isCrop) {
                this.context.drawImage(
                    this.image,
                    this.cropX, this.cropY, this.cropWidth, this.cropHeight,
                    this.x, this.y, this.width, this.height
                )
            } else {
                
                if (this.isFill) {
                    this.context.fillStyle = this.color
                    this.context.fillRect(this.x, this.y, this.width, this.height)
                } else {
                    this.context.strokeStyle = this.color
                    this.context.strokeRect(this.x, this.y, this.width, this.height)
                }
                
            }
            
        }
    }
    
}

export default View
