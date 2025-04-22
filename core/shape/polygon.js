
import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Vector from '../../util/vector.js'
import Shape from './shape.js'

class Polygon extends Shape {

    #radius
    #edgeCount
    
    #localCorners

    constructor(radius, edgeCount = 3) {
        super()
        this.radius = radius
        this.edgeCount = edgeCount
    }

    get radius() {
        return this.#radius
    }

    set radius(value) {
        this.#radius = expect('number', value)
    }

    get edgeCount() {
        return this.#edgeCount
    }

    set edgeCount(value) {
        expect('number', value)
        if (value < 3) {
            throw new Error('Polygon needs to have at least 3 edges')
        }
        this.#edgeCount = value
    }

    get localCorners() {

        if (this.#localCorners && this.#edgeCount === this.#localCorners.length) {
            return this.#localCorners
        }
        
        this.#localCorners = []

        const angleStep = Radians(360) / this.edgeCount

        for (let i = 0; i < this.edgeCount; i++) {

            const angle = i * angleStep - Radians(90)
            
            this.#localCorners.push(new Vector(
                this.radius * Math.cos(angle),
                this.radius * Math.sin(angle)
            ))

        }

        return this.#localCorners

    }

    get transformedCorners() {
        return this.localCorners.map(corner => 
            corner.rotate(this.rotationAngle, this.counterClockwise)
        )
    }

    getGlobalCorners(corners) {
        return corners.map(corner => corner.add(this.center))
    }

    getDrawingPath(transform = true) {

        const path = new Path2D()

        const globalCorners = this.getGlobalCorners(transform ? this.transformedCorners: this.localCorners)

        for (let i = 0; i < globalCorners.length; i++) {

            if (i === 0) {
                path.moveTo(globalCorners[i].x, globalCorners[i].y)
                continue
            }

            path.lineTo(globalCorners[i].x, globalCorners[i].y)

        }

        path.closePath()

        return path

    }

}

export default Polygon