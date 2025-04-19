import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'
import Vector from '../../util/vector.js'

class Shape {

    #centerVector = new Vector(0, 0)

    #width = 0
    #height = 0

    #axisAngle = 90
    #counterClockwise = true

    get centerVector() {
        return this.#centerVector
    }

    set centerVector(value) {
        this.#centerVector = expect(Vector, value)
    }

    get centerX() {
        return this.centerVector.x
    }

    set centerX(value) {
        this.centerVector.x = expect('number', value)
    }

    get centerY() {
        return this.centerVector.y
    }

    set centerY(value) {
        this.centerVector.y = expect('number', value)
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

    get axisAngle() {
        return this.#axisAngle
    }

    set axisAngle(value) {
        this.#axisAngle = expect('number', value)
    }

    get axisAngleRadians() {
        return Radians(this.#axisAngle)
    }

    get counterClockwise() {
        return this.#counterClockwise
    }

    set counterClockwise(value) {
        this.#counterClockwise = expect('boolean', value)
    }

    rotateAxis() {
        throw new Error('getDrawingPath must be implemented by subclasses of Shape.')
    }

    getDrawingPath(context) {
        throw new Error('getDrawingPath must be implemented by subclasses of Shape.')
    }

}

export default Shape
