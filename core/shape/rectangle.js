import expect from '../../util/expect.js'
import Polygon from './polygon.js'
import Vector from '../../util/vector.js'

class Rectangle extends Polygon {

    #localCorners
    #corners

    constructor(width = 0, height = 0) {
        super((width + height) / 4, 4)
        this.width = width
        this.height = height
    }
    
    getType() {
        return 'rectangle'
    }
    
    get edgeCount() {
        return super.edgeCount
    }

    set edgeCount(value) {
        if (expect('number', value) !== 4) {
            throw new Error('Rectangle needs to have 4 edges')
        }
        super.edgeCount = value
    }

    getLocalCorners() {

        if (this.#localCorners == null) {
            this.#localCorners = [
                new Vector(-this.halfWidth, -this.halfHeight),
                new Vector( this.halfWidth, -this.halfHeight),
                new Vector( this.halfWidth,  this.halfHeight),
                new Vector(-this.halfWidth,  this.halfHeight)
            ]
        }

        return this.#localCorners

    }

    getCorners() {

        if (this.body && !this.body.hasMoved && this.#corners) {
            return this.#corners
        }
        
        const corners = new Array()
        const center = new Vector(this.centerX, this.centerY)
        
        for (const corner of this.getLocalCorners()) {
            corners.push(
                corner.rotate(this.rotationAngle)
                    .add(center)
            )
        }
        
        this.#corners = corners
        return this.#corners
        
    }
    
}

export default Rectangle