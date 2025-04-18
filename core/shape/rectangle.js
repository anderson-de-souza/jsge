import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Shape from './shape.js'

class Rectangle extends Shape {

    #corners

    constructor(width = 0, height = 0) {
        super()
        this.x = 0
        this.y = 0
        this.width = width
        this.height = height
        this.#corners = this.originCorners
    }

    get originCorners() {
        return [
            { x: -this.halfWidth, y: -this.halfHeight },
            { x: this.halfWidth, y: -this.halfHeight },
            { x: this.halfWidth, y: this.halfHeight },
            { x: -this.halfWidth, y: this.halfHeight }
        ]
    }

    get corners() {
        return this.#corners
    }

    rotateAxis() {

        const rotation = this.axisAngle + (this.counterClockwise ? -90: 90)
        const rotationAngleRadians = Radians(rotation)

        const sin = Math.sin(rotationAngleRadians)
        const cos = Math.cos(rotationAngleRadians)

        this.#corners = this.originCorners.map(corner => ({
            x: this.x + corner.x * cos - corner.y * sin,
            y: this.y + corner.x * sin + corner.y * cos
        }))

    }

    getDrawingPath() {

        this.rotateAxis()

        const path = new Path2D()

        path.moveTo(this.corners[0].x, this.corners[0].y)

        for (let i = 1; i < this.corners.length; i++) {
            path.lineTo(this.corners[i].x, this.corners[i].y)
        }

        path.lineTo(this.corners[0].x, this.corners[0].y)

        return path

    }
    
}

export default Rectangle