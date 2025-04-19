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

    add(otherVector) {
        expect(Vector, otherVector)
        const result = new Vector(this.x + otherVector.x, this.y + otherVector.y)
        return result
    }

    subtract(otherVector) {
        expect(Vector, otherVector)
        const result = new Vector(this.x - otherVector.x, this.y - otherVector.y)
        return result
    }

    rotate(centerVector, angleDegrees, counterClockwise = true) {

        expect(Vector, centerVector)

        const rotation = angleDegrees * (counterClockwise ? -1 : 1)
        const rotationRadians = Radians(rotation)

        const cos = Math.cos(rotationRadians)
        const sin = Math.sin(rotationRadians)
        
        return new Vector(
            centerVector.x + this.x * cos - this.y * sin,
            centerVector.y + this.x * sin + this.y * cos
        )

    }

    dot(otherVector) {
        expect(Vector, otherVector)
        const result = this.x * otherVector.x + this.y * otherVector.y
        return result
    }

    perpendicular() {
        const result = new Vector(-this.y, this.x)
        return result
    }

    normalize() {

        const length = Math.hypot(this.x, this.y)

        if (length === 0) {
            return new Vector(0, 0)
        }

        const normal = new Vector(this.x / length, this.y / length)

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