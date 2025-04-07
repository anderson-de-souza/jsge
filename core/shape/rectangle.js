import Shape from './shape.js'

class Rectangle extends Shape {

    constructor(width = 0, height = 0) {
        super()
        this.x = 0
        this.y = 0
        this.width = width
        this.height = height
        this.angle = 0
    }

    get top() {
        return this.y
    }
    
    get bottom() {
        return this.y + this.height
    }
    
    get left() {
        return this.x
    }
    
    get right() {
        return this.x + this.width
    }
    
    get halfWidth() {
        return this.width / 2
    }
    
    get halfHeight() {
        return this.height / 2
    }

    get centerX() {
        return this.x + this.halfWidth
    }
    
    get centerY() {
        return this.y + this.halfHeight
    }

    create() {
        const path = new Path2D()
        path.moveTo(this.left, this.top)
        path.lineTo(this.right, this.top)
        path.lineTo(this.right, this.bottom)
        path.lineTo(this.left, this.bottom)
        path.closePath()
        return path
    }
    
}

export default Rectangle