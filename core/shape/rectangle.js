import expect from '../../util/expect.js'
import Polygon from './polygon.js'
import Vector from '../../util/vector.js'

class Rectangle extends Polygon {

    constructor(width = 0, height = 0) {
        super((width + height) / 4, 4)
        this.width = width
        this.height = height
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
        const corners = [
            new Vector(-this.halfWidth, -this.halfHeight),
            new Vector( this.halfWidth, -this.halfHeight),
            new Vector( this.halfWidth,  this.halfHeight),
            new Vector(-this.halfWidth,  this.halfHeight)
        ].map(corner => corner.rotate(this.rotationAngle, this.anticlockwise))
            
        return corners
    }

    getCorners() {
        
        const corners = [
            new Vector(-this.halfWidth, -this.halfHeight),
            new Vector( this.halfWidth, -this.halfHeight),
            new Vector( this.halfWidth,  this.halfHeight),
            new Vector(-this.halfWidth,  this.halfHeight)
        ].map(corner =>
                corner.rotate(this.rotationAngle, this.anticlockwise)
                    .add(new Vector(
                            this.centerX,
                            this.centerY
                        ))
            )
            
        return corners
        
    }
    
}

export default Rectangle