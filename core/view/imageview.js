import expect from '../../util/expect.js'
import imageViewDefaultStyle from './json/image-view-default-style.js'
import Rectangle from '../shape/rectangle.js'
import View from './view.js'
import Radians from '../../util/radians.js'

class ImageView extends View { 

    constructor(context, shape = new Rectangle()) {
        super(context, shape)

        this.style = imageViewDefaultStyle
        
        this.isLoaded = false

        this.image = new Image()
        this.image.onload = () => {
            this.isLoaded = true
            this.draw()
        }

        this.url = ''

    }

    load(value) {
        this.url = expect('string', value)
        this.image.src = this.url
    }

    crop(cropX, cropY, cropWidth, cropHeight) {
        this.style.cropArea.x = cropX
        this.style.cropArea.y = cropY
        this.style.cropArea.width = cropWidth
        this.style.cropArea.height = cropHeight
    }

    draw() {
        
        if (this.style.visible) {

            const path = expect(Path2D, this.shape.getDrawingPath())
    
            this.context.clip(path)
        
            if (this.isLoaded) {

                this.context.save()

                this.context.rotate(this.style.rotationAngle)

                if (this.style.cropped) {

                    this.context.drawImage(
                        this.image,
                        this.style.cropArea.x, this.style.cropArea.y,
                        this.style.cropArea.width, this.style.cropArea.height,
                        this.shape.x - (this.shape.width / 2),
                        this.shape.y - (this.shape.height / 2),
                        this.shape.width,
                        this.shape.height
                    )

                } else {

                    this.context.drawImage(
                        this.image,
                        this.shape.x - (this.shape.width / 2),
                        this.shape.y - (this.shape.height / 2),
                        this.shape.width,
                        this.shape.height
                    )

                }

                this.context.restore()

            } else {

                super.draw()

            }
            
        }  

    }
    

}

export default ImageView