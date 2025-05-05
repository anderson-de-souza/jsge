import expect from './expect.js'

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
        return new Vector(this.x + expect(Vector, other).x, this.y + other.y)
    }

    subtract(other) {
        return new Vector(this.x - expect(Vector, other).x, this.y - other.y)
    }

    scale(scaleX, scaleY = scaleX) {
        return new Vector(this.x * expect('number', scaleX), this.y * expect('number', scaleY))
    }

    rotate(angleInRadians, anticlockwise = true) {

        const rotation = anticlockwise ? angleInRadians : -angleInRadians
        
        const cos = Math.cos(rotation)
        const sin = Math.sin(rotation)
        
        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        )

    }

    dot(other) {
        return this.x * expect(Vector, other).x + this.y * other.y
    }
    
    reverse() {
        return new Vector(-this.x, -this.y)
    }

    perpendicular() {
        return new Vector(-this.y, this.x)
    }

    normalize() {

        const magnitude = this.magnitude()

        if (magnitude === 0) {
            return new Vector(0, 0)
        }

        return new Vector(this.x / magnitude, this.y / magnitude)

    }

    clone() {
        return new Vector(this.x, this.y)
    }
    
    toString(precision = 2) {
        return `(${ this.x.toFixed(precision) }, ${ this.y.toFixed(precision) })`
    }
    
    equals(other) {
        return this.x === expect(Vector, other).x && this.y === other.y
    }
    
    magnitude() {
        return Math.hypot(this.x, this.y)
    }
    
    angle() {
        return Math.atan2(this.y, this.x)
    }    

}

export default Vector