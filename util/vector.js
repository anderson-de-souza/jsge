import expect from './expect.js'

class Vector {

    #x
    #y
    #z

    constructor(x, y, z = 0) {
        this.x = x
        this.y = y
        this.z = z
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

    get z() {
        return this.#z
    }

    set z(value) {
        this.#z = expect('number', value)
    }

    add(other) {
        expect(Vector, other)
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z)
    }

    reverse() {
        return new Vector(-this.x, -this.y, -this.z)
    }

    rotate(angleInRadians, anticlockwise = true) {
        const rotation = anticlockwise ? angleInRadians : -angleInRadians
        const cos = Math.cos(rotation)
        const sin = Math.sin(rotation)
        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos,
            this.z
        )
    }

    scale(scaleX, scaleY = scaleX, scaleZ = scaleX) {
        expect('number', scaleX)
        expect('number', scaleY)
        expect('number', scaleZ)
        return new Vector(this.x * scaleX, this.y * scaleY, this.z * scaleZ)
    }

    subtract(other) {
        expect(Vector, other)
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z)
    }

    unscale(scaleX, scaleY = scaleX, scaleZ = scaleX) {
        expect('number', scaleX)
        expect('number', scaleY)
        expect('number', scaleZ)

        if (scaleX === 0 || scaleY === 0 || scaleZ === 0) {
            throw new Error(`the unscale args can't be 0: scaleX === ${ scaleX }, scaleY ===  ${ scaleY }, scaleZ === ${ scaleZ }`)
        }

        return new Vector(this.x / scaleX, this.y / scaleY, this.z / scaleZ)
    }
    
    cross(other) {
        expect(Vector, other)
        return new Vector(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        )
    }

    dot(other) {
        expect(Vector, other)
        return this.x * other.x + this.y * other.y + this.z * other.z
    }

    perpendicular() {
        return new Vector(-this.y, this.x, this.z)
    }

    projectOnto(other) {
        expect(Vector, other)
        const scalar = this.dot(other) / other.magnitude() ** 2
        return other.scale(scalar)
    }

    angle() {
        return Math.atan2(this.y, this.x)
    }

    angleTo(other) {
        expect(Vector, other)
        const dotProduct = this.dot(other)
        const magProduct = this.magnitude() * other.magnitude()
        if (magProduct === 0) {
            return 0
        }
        const ratio = Math.min(1, Math.max(-1, dotProduct / magProduct))
        return Math.acos(ratio)
    }

    magnitude() {
        return Math.hypot(this.x, this.y, this.z)
    }

    clone() {
        return new Vector(this.x, this.y, this.z)
    }

    equals(other) {
        expect(Vector, other)
        return this.x === other.x && this.y === other.y && this.z === other.z
    }

    isZero() {
        return this.x === 0 && this.y === 0 && this.z === 0
    }

    normalize() {
        const magnitude = this.magnitude()
        if (magnitude === 0) {
            return new Vector(0, 0, 0)
        }
        return new Vector(this.x / magnitude, this.y / magnitude, this.z / magnitude)
    }

    toString(precision = 2) {
        return `(${ this.x.toFixed(precision) }, ${ this.y.toFixed(precision) }, ${ this.z.toFixed(precision) })`
    }

}

export default Vector