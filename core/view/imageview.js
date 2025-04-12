import Circle from '../shape/circle.js'
import expect from '../../util/expect.js'
import Rectangle from '../shape/rectangle.js'
import View from './view.js'

class ImageView extends View { 

    constructor(context, shape = new Rectangle()) {
        super(context, shape)

        this.cropArea = { 
            x: 0, 
            y: 0, 
            width: 0,
            height: 0 
        }

        this.isCropped = false
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
        this.cropArea.x = cropX
        this.cropArea.y = cropY
        this.cropArea.width = cropWidth
        this.cropArea.height = cropHeight
    }

    draw() {

        if (this.style.visible) {

            const path = expect(Path2D, this.shape.create())

            if (this.isLoaded && !this.isCropped) {
                
                this.context.clip(path)

                if (expect(Rectangle, this.shape, false)) {

                    this.context.drawImage(
                        this.image, 
                        this.shape.x, this.shape.y, 
                        this.shape.width, this.shape.height
                    )

                } else if (expect(Circle, this.shape, false)) {

                    this.context.drawImage(
                        this.image, 
                        this.shape.x - this.shape.radius,
                        this.shape.y - this.shape.radius, 
                        this.shape.diameter, 
                        this.shape.diameter
                    )

                }

            } else if (this.isLoaded && this.isCropped) {

                this.context.clip(path)

                if (expect(Rectangle, this.shape, false)) {

                    this.context.drawImage(
                        this.image,
                        this.cropArea.x, this.cropArea.y,
                        this.cropArea.width, this.cropArea.height,
                        this.shape.x, this.shape.y, 
                        this.shape.width, this.shape.height
                    )

                } else if (expect(Circle, this.shape, false)) {

                    this.context.drawImage(
                        this.image, 
                        this.cropArea.x, this.cropArea.y,
                        this.cropArea.width, this.cropArea.height,
                        this.shape.x - this.shape.radius,
                        this.shape.y - this.shape.radius, 
                        this.shape.diameter, 
                        this.shape.diameter
                    )

                }

            } else {
                super.draw()

            }
        }
        
    }

}

export default ImageView