import Degrees from './degrees.js'
import expect from './expect.js'
import Radians from './radians.js'

class Vector {

    #x = 0
    #y = 0

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
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

    add(other) {
        expect(Vector, other)
        const result = new Vector(this.x + other.x, this.y + other.y)
        return result
    }

    subtract(other) {
        expect(Vector, other)
        const result = new Vector(this.x - other.x, this.y - other.y)
        return result
    }

    scale(scaleX, scaleY) {
        return new Vector(this.x * scaleX, this.y * scaleY)
    }

    rotate(angleDegrees, counterClockwise = true) {

        const rotation = Radians(angleDegrees * (counterClockwise ? -1 : 1))
        
        const cos = Math.cos(rotation)
        const sin = Math.sin(rotation)
        
        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        )

    }

    dot(other) {
        expect(Vector, other)
        const result = this.x * other.x + this.y * other.y
        return result
    }
    
    reverse() {
        const result = new Vector(-this.x, -this.y)
        return result
    }

    perpendicular() {
        const result = new Vector(-this.y, this.x)
        return result
    }

    normalize() {

        const magnitude = this.magnitude()

        if (magnitude === 0) {
            return new Vector(0, 0)
        }

        const normal = new Vector(this.x / magnitude, this.y / magnitude)

        return normal

    }

    clone() {
        return new Vector(this.x, this.y)
    }
    
    toString(precision = 2) {
        return `(${ this.x.toFixed(precision) }, ${ this.y.toFixed(precision) })`
    }
    
    magnitude() {
        return Math.hypot(this.x, this.y)
    }
    
    angle() {
        const rad = Math.atan2(this.y, this.x)
        return Degrees(rad)
    }    

}

export default Vector