import Degrees from './degrees.js'
import expect from './expect.js'
import Radians from './radians.js'

/*
 * Um vetor em 2D pode ser interpretado como uma seta (reta orientada) que vai da origem (0, 0)
 * até o ponto (x, y) no plano cartesiano. Ele representa tanto uma direção quanto uma magnitude.
 *
 * Por exemplo, o vetor (3, 4) aponta da origem até o ponto (3, 4), e sua magnitude é 5,
 * calculada com o Teorema de Pitágoras: sqrt(3² + 4²) = 5.
 * 
 * Math.atan2(y, x) retorna o ângulo que esse vetor forma com o eixo X, em radianos.
 * 
 */


class Vector {

    #x = 0
    #y = 0

    constructor(x, y) {
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