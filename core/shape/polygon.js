import expect from '../../util/expect.js'
import Vector from '../../util/vector.js'
import Shape from './shape.js'

class Polygon extends Shape {

    #edgeCount
    #localCorners
    
    #corners
    #edges
    #axes
    
    constructor(radius = 0, edgeCount = 3) {
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
        this.#localCorners = null
        this.#corners = null
        this.#edges = null
        this.#axes = null
    }

    getLocalCorners() {
        
        if (this.#localCorners == null) {

            const angleStep = (2 * Math.PI) / this.edgeCount
    
            const corners = new Array(this.edgeCount)
    
            for (let i = 0; i < this.edgeCount; i++) {
                
                const angle = i * angleStep
    
                corners[i] = new Vector(
                        this.halfWidth * Math.cos(angle),
                        this.halfHeight * Math.sin(angle)
                    )
                    
            }
            
            this.#localCorners = corners
            
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
    
    getEdges() {
        
        if (this.body && !this.body.hasMoved && this.#edges) {
            return this.#edges
        }
        
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
        
        this.#edges = edges
        
        return this.#edges
        
    }
    
    getAxes() {
        
        if (this.body && !this.body.hasMoved && this.#axes) {
            return this.#axes
        }
        
        const edges = this.getEdges()
        
        const axes = new Array(this.edgeCount)
        
        for (let i = 0; i < this.edgeCount; i++) {
            axes[i] = edges[i].perpendicular().normalize()
        }
        
        this.#axes = axes
        return this.#axes
        
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