import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Vector from '../../util/vector.js'
import Shape from './shape.js'

class Polygon extends Shape {

    #radius
    #edgeCount
    #localCorners
    #rotatedCorners
    #globalEdges
    #globalAxes

    constructor(radius, edgeCount = 3) {
        super()
        this.radius = radius
        this.edgeCount = edgeCount
    }
    
    #clearCache() {
        this.#localCorners = null
        this.#rotatedCorners = null
        this.#globalEdges = null
        this.#globalAxes = null
    }

    get radius() {
        return this.#radius
    }

    set radius(value) {
        this.#radius = expect('number', value)
        this.#clearCache()
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
        this.#clearCache()
    }
    
    getLocalCorners() {

        if (this.#localCorners) {
            return this.#localCorners
        }
        
        const angleStep = Radians(360) / this.edgeCount
        
        this.#localCorners = new Array(this.edgeCount)

        for (let i = 0; i < this.edgeCount; i++) {

            const angle = i * angleStep
            this.#localCorners[i] = new Vector(this.radius * Math.cos(angle),this.radius * Math.sin(angle))

        }

        return this.#localCorners

    }

    getRotatedCorners() {
        
        if (this.#rotatedCorners) {
            return this.#rotatedCorners
        }
        
        this.#rotatedCorners = this.getLocalCorners().map(corner => 
            corner.rotate(this.rotationAngle, this.counterClockwise)
        )
        
        return this.#rotatedCorners
        
    }

    getGlobalCorners() {
        return this.getLocalCorners().map(corner => corner.add(this.center))
    }
    
    getGlobalRotatedCorners() {
        return this.getRotatedCorners().map(corner => corner.add(this.center))
    }
    
    getGlobalEdges(rotate = true) {
        
        if (this.#globalEdges) {
            return this.#globalEdges
        }
        
        const corners = rotate ? this.getGlobalRotatedCorners(): this.getGlobalCorners()
        
        this.#globalEdges = new Array(this.edgeCount)
        
        for (let i = 0; i < this.edgeCount; i++) {
            let corner = corners[i]
            let nextCorner = corners[(i + 1) % corners.length]
            this.#globalEdges[i] = new Vector(nextCorner.x - corner.x, nextCorner.y - corner.y)
        }
        
        return this.#globalEdges
        
    }
    
    getGlobalAxes(rotate = true) {
        
        if (this.#globalAxes) {
            return this.#globalAxes
        }
        
        const edges = this.getGlobalEdges(rotate)
        
        this.#globalAxes = new Array(this.edgeCount)
        
        for (let i = 0; i < this.edgeCount; i++) {
            this.#globalAxes[i] = edges[i].perpendicular().normalize()
        }
        
        return this.#globalAxes
        
    }

    getDrawingPath(transform = true) {

        const path = new Path2D()

        const globalCorners = transform ? this.getGlobalRotatedCorners(): this.getGlobalCorners()

        for (let i = 0; i < this.edgeCount; i++) {

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