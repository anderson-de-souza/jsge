import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Vector from '../../util/vector.js'
import Shape from './shape.js'

class Polygon extends Shape {

    #edgeCount

    constructor(radius, edgeCount = 3) {
        super()
        this.radius = radius
        this.edgeCount = edgeCount
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
    
    getCorners() {
        
        const angleStep = Radians(360) / this.edgeCount
        
        const corners = new Array(this.edgeCount)

        for (let i = 0; i < this.edgeCount; i++) {

            const angle = i * angleStep
            corners[i] = new Vector(
                    this.radius * Math.cos(angle),
                    this.radius * Math.sin(angle)
                ).rotate(
                        this.rotationAngle, 
                        this.counterClockwise
                    ).add(new Vector(
                                this.centerX,
                                this.centerY
                            ))

        }

        return corners

    }
    
    getEdges() {
        
        const corners = this.getCorners()
        
        const edges = new Array(this.edgeCount)
        
        for (let i = 0; i < this.edgeCount; i++) {
            const corner = corners[i]
            const nextCorner = corners[(i + 1) % corners.length]
            edges[i] = new Vector(
                    nextCorner.x - corner.x, 
                    nextCorner.y - corner.y
                )
        }
        
        return edges
        
    }
    
    getAxes() {
        
        const edges = this.getEdges()
        
        const axes = new Array(this.edgeCount)
        
        for (let i = 0; i < this.edgeCount; i++) {
            axes[i] = edges[i].perpendicular().normalize()
        }
        
        return axes
        
    }

    getDrawingPath() {

        const path = new Path2D()

        const corners = this.getCorners()

        for (let i = 0; i < this.edgeCount; i++) {

            if (i === 0) {
                path.moveTo(corners[i].x, corners[i].y)
                continue
            }

            path.lineTo(corners[i].x, corners[i].y)

        }

        path.closePath()

        return path

    }

}

export default Polygon