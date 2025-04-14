import Shape from './shape.js'
import Radians from '../../util/radians.js'
import expect from '../../util/expect.js'

class Circle extends Shape {

    #radius
    #startAngle
    #endAngle
    #closeDrawing

    constructor(radius = 0) {
        super()
        this.x = 0
        this.y = 0
        this.radius = radius
        this.startAngle = 0
        this.endAngle = 360
        this.axisAngle = 0
        this.counterClockwise = true
        this.closeDrawing = true
    }

    get radius() {
        return this.#radius
    }

    set radius(value) {
        this.#radius = expect('number', value)
    }

    get startAngle() {
        return this.#startAngle
    }

    set startAngle(value) {
        this.#startAngle = expect('number', value)
    }

    get endAngle() {
        return this.#endAngle
    }

    set endAngle(value) {
        this.#endAngle = expect('number', value)
    }

    get closeDrawing() {
        return this.#closeDrawing
    }

    set closeDrawing(value) {
        this.#closeDrawing = expect('boolean', value)
    }

    get diameter() {
        return this.#radius * 2
    }

    get width() {
        return this.diameter
    }
    
    get height() {
        return this.diameter
    }    

    create() {
        const path = new Path2D()
        const axisAngleRad = Radians(this.axisAngle)
        const start = axisAngleRad + Radians(this.startAngle)
        const end = axisAngleRad + Radians(this.endAngle)
        path.arc(this.x, this.y, this.radius, start, end, this.counterClockwise)
        if (this.closeDrawing) {
            path.closePath() 
        }
        return path
    }

}

export default Circle