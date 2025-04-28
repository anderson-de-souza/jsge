import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Vector from '../../util/vector.js'

class Shape {

    #x
    #y
    
    #centerX
    #centerY
    
    #width
    #height

    #rotationAngle
    #anticlockwise
    
    constructor() {
        this.#x = 0
        this.#y = 0
        
        this.#centerX = 0
        this.#centerY = 0
        
        this.#width = 0
        this.#height = 0
        
        this.#rotationAngle = 90
        this.#anticlockwise = true
        
    }
    
    get x() {
        return this.#x
    }
    
    set x(value) {
        this.#x = expect('number', value)
    }
    
    get y() {
        return this.#y
    }
    
    set y(value) {
        this.#y = expect('number', value)
    }
    
    get centerX() {
        return this.x + this.halfWidth
    }
    
    set centerX(value) {
        this.x = expect('number', value) - this.halfWidth
    }
    
    get centerY() {
        return this.y + this.halfHeight
    }
    
    set centerY(value) {
        this.y = expect('number', value) - this.halfHeight
    }
    
    getPosition() {
        return new Vector(
                this.x,
                this.y
            )
    }
    
    setPosition(vector) {
        this.x = expect(Vector, vector).x
        this.y = vector.y
    }

    getCenter() {
        return new Vector(
                this.centerX,
                this.centerY
            )
    }
    
    setCenter(vector) {
        this.centerX = expect(Vector, vector).x
        this.centerY = vector.y
    }
    
    get radius() {
        return (this.width + this.height) / 4
    }
    
    set radius(value) {
        this.width = value * 2
        this.height = value * 2
    }
    
    get diameter() {
        return this.radius * 2
    }
    
    get width() {
        return this.#width
    }

    set width(value) {
        this.#width = expect('number', value)
    }

    get height() {
        return this.#height
    }

    set height(value) {
        this.#height = expect('number', value)
    }

    get halfWidth() {
        return this.#width / 2
    }

    get halfHeight() {
        return this.#height / 2
    }
    
    get rotationAngle() {
        return this.#rotationAngle
    }

    set rotationAngle(value) {
        this.#rotationAngle = expect('number', value)
    }

    get anticlockwise() {
        return this.#anticlockwise
    }

    set anticlockwise(value) {
        this.#anticlockwise = expect('boolean', value)
    }
    
    getCorners() {
        throw new Error('getCorners must be implemented by subclasses of Shape.')
    }
    
    getBounds() {
        
        let minX =  Infinity
        let minY =  Infinity
        let maxX = -Infinity
        let maxY = -Infinity
        
        for (let corner of expect(Array, this.getCorners())) {
            
            corner = expect(Vector, corner)
            
            if (corner.x < minX) {
                minX = corner.x
            }
            
            if (corner.y < minY) {
                minY = corner.y
            }
            
            if (corner.x > maxX) {
                maxX = corner.x
            }
            
            if (corner.y > maxY) {
                maxY = corner.y
            }
            
        }
        
        return {
            min: new Vector(minX, minY),
            max: new Vector(maxX, maxY)
        }
        
    }
    
    getBoundingBox() {
        const bounds = this.getBounds()
        return {
            x: bounds.min.x,
            y: bounds.min.y,
            width: bounds.max.x - bounds.min.x,
            height: bounds.max.y - bounds.min.y
        }
    }
    
    getEdges() {
        throw new Error('getEdges must be implemented by subclasses of Shape.')
    }
    
    getAxes() {
        throw new Error('getAxes must be implemented by subclasses of Shape.')
    }

    getDrawingPath(context) {
        throw new Error('getDrawingPath must be implemented by subclasses of Shape.')
    }

}

export default Shape
