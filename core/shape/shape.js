import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Vector from '../../util/vector.js'

class Shape {

    #centerX
    #centerY
    
    #radius
    
    #width
    #height

    #rotationAngle
    #anticlockwise
    
    constructor() {
        
        this.#centerX = 0
        this.#centerY = 0
        
        this.#radius = 0
        
        this.#width = 0
        this.#height = 0
        
        this.#rotationAngle = 90
        this.#anticlockwise = true
        
    }

    get centerX() {
        return this.#centerX
    }

    set centerX(value) {
        this.#centerX = expect('number', value)
    }

    get centerY() {
        return this.#centerY
    }

    set centerY(value) {
        this.#centerY = expect('number', value)
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
        return this.#radius
    }

    set radius(value) {
        this.#radius = expect('number', value)
    }
    
    get diameter() {
        return this.#radius * 2
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
