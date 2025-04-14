import Radians from '../../util/radians.js'
import Shape from './shape.js'

class Rectangle extends Shape {

    constructor(width = 0, height = 0) {
        super()
        this.x = 0
        this.y = 0
        this.width = width
        this.height = height
        this.axisAngle = 0
        this.counterClockwise = true
    }

    get originCorners() {
        return [
            { x: -this.halfWidth, y: -this.halfHeight },
            { x: this.halfWidth, y: -this.halfHeight },
            { x: this.halfWidth, y: this.halfHeight },
            { x: -this.halfWidth, y: this.halfHeight }
        ]
    }

    #rotate() {

        const rad = Radians(this.axisAngle)

        const sin = Math.sin(rad)
        const cos = Math.cos(rad)

        return this.originCorners.map(corner => ({
            x: this.x + corner.x * cos - corner.y * sin,
            y: this.y + corner.x * sin + corner.y * cos
        }))

    }

    create() {

        const path = new Path2D()

        const rotatedCorners = this.#rotate()

        const corners = this.counterClockwise ? rotatedCorners.reverse(): rotatedCorners

        path.moveTo(corners[0].x, corners[0].y)

        for (let i = 1; i < corners.length; i++) {
            path.lineTo(corners[i].x, corners[i].y)
        }

        return path

    }
    
}

export default Rectangle