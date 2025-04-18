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

    get startAngleRadians() {
        return Radians(this.#startAngle)
    }

    get endAngle() {
        return this.#endAngle
    }

    set endAngle(value) {
        this.#endAngle = expect('number', value)
    }

    get endAngleRadians() {
        return Radians(this.#endAngle)
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

    /*
     * O diâmetro é calculado como a média entre a largura (width) e a altura (height),
     * caso esses valores sejam definidos dinamicamente através dos setters.
     */

    set width(value) {
        expect('number', value)
        super.width = value 
        this.radius = (value + super.height) / 4
    }
    
    set height(value) {
        expect('number', value)
        super.height = value
        this.radius = (value + super.width) / 4
    }    

    get width() {
        return this.diameter
    }
    
    get height() {
        return this.diameter
    }

    /*
     * O ângulo do eixo (axisAngle) representa a direção para a qual o topo do desenho está apontando.
     * Ele é diferente do ângulo de início (startAngle) e fim (endAngle), que indicam
     * onde o desenho começa e onde ele termina.
     */
    
    rotateAxis() {
        const rotation = this.axisAngle + (this.counterClockwise ? -90: 90)
        this.startAngle -= rotation
        this.endAngle -= rotation
    }

    getDrawingPath() {
        this.rotateAxis()
        const path = new Path2D()
        path.arc(this.x, this.y, this.radius, this.startAngleRadians, this.endAngleRadians, this.counterClockwise)
        if (this.closeDrawing) {
            path.closePath() 
        }
        return path
    }

}

export default Circle