import Radians from '../../util/radians.js'
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

    get halfWidth() {
        return this.width / 2
    }
    
    get halfHeight() {
        return this.height / 2
    }

    get originCorners() {
        return [
            { x: -this.halfWidth, y: -this.halfHeight },
            { x: this.halfWidth, y: -this.halfHeight },
            { x: this.halfWidth, y: this.halfHeight },
            { x: -this.halfWidth, y: this.halfHeight }
        ]
    }

    rotate() {

        const rad = Radians(this.angle)

        const sin = Math.sin(rad)
        const cos = Math.cos(rad)

        return this.originCorners.map(corner => ({
            x: this.x + corner.x * cos - corner.y * sin,
            y: this.y + corner.x * sin + corner.y * cos
        }))

    }

    create() {

        const path = new Path2D()

        const rotatedCorners = this.rotate()

        path.moveTo(rotatedCorners[0].x, rotatedCorners[0].y)

        for (let i = 1; i < rotatedCorners.length; i++) {
            path.lineTo(rotatedCorners[i].x, rotatedCorners[i].y)
        }

        path.closePath()

        return path

    }
    
}

export default Rectangle