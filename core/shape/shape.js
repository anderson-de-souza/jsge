import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Vector from '../../util/vector.js'

class Shape {

    #center = new Vector(0, 0)

    #width = 0
    #height = 0

    #rotationAngle = 90
    #counterClockwise = true

    get center() {
        return this.#center
    }

    set center(value) {
        this.#center = expect(Vector, value)
    }

    get centerX() {
        return this.center.x
    }

    set centerX(value) {
        this.center.x = expect('number', value)
    }

    get centerY() {
        return this.center.y
    }

    set centerY(value) {
        this.center.y = expect('number', value)
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

    rotate() {
        throw new Error('getDrawingPath must be implemented by subclasses of Shape.')
    }

    getDrawingPath(context) {
        throw new Error('getDrawingPath must be implemented by subclasses of Shape.')
    }

}

export default Shape
