import expect from '../../util/expect.js'
import Radians from '../../util/radians.js'

class Shape {

    #x = 0
    #y = 0

    #width = 0
    #height = 0

    #axisAngle = 90
    #counterClockwise = true

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

    }

    getDrawingPath(context) {
        
    }

}

export default Shape
