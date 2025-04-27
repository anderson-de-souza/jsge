import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Vector from '../../util/vector.js'

class Shape {

    #centerX
    #centerY
    
    #radius
    
    #x
    #y
    
    #width
    #height

    #rotationAngle
    #counterClockwise
    
    constructor() {
        
        this.#centerX = 0
        this.#centerY = 0
        
        this.#radius = 0
        
        this.#x = 0
        this.#y = 0
        
        this.#width = 0
        this.#height = 0
        
        this.#rotationAngle = 90
        this.#counterClockwise = true
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
        expect(Vector, vector)
        this.centerX = vector.x
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

    get rotationAngleRadians() {
        return Radians(this.#rotationAngle)
    }

    get counterClockwise() {
        return this.#counterClockwise
    }

    set counterClockwise(value) {
        this.#counterClockwise = expect('boolean', value)
    }

    getDrawingPath(context) {
        throw new Error('getDrawingPath must be implemented by subclasses of Shape.')
    }

}

export default Shape
