import expect from '../../util/expect.js'
import Vector from '../../util/vector.js'
import Shape from './shape.js'

class Rectangle extends Shape {

    #corners

    constructor(width = 0, height = 0) {
        super()
        this.centerX = 0
        this.centerY = 0 
        this.width = width
        this.height = height
        this.corners = this.originCorners
    }

    get originCorners() {
        return [
            new Vector(-this.halfWidth, -this.halfHeight),
            new Vector( this.halfWidth, -this.halfHeight),
            new Vector( this.halfWidth,  this.halfHeight),
            new Vector(-this.halfWidth,  this.halfHeight)
        ]
    }

    get corners() {
        return this.#corners
    }

    set corners(value) {
        expect(Array, value)
        if (value.length !== 4) {
            throw new Error('value.length must be equals to 4')
        }
        this.#corners = value
    }
    
    rotate() {

        const rotation = this.rotationAngle + (this.counterClockwise ? -90 : 90)

        this.corners = this.originCorners.map(corner => 
            corner.rotate(this.center, rotation, this.counterClockwise)
        )

    }

    getDrawingPath() {
        
        this.rotate()

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