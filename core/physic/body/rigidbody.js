
import expect from '../../util/expect.js'
import Shape from '../../shape/shape.js'

class RigidBody {

    #shape

    #mass = 1
    #restitution = 0.5

    #forceX = 0
    #forceY = 0

    #isImpulse = true

    #accelerationX = 0
    #accelerationY = 0

    #velocityX = 0
    #velocityY = 0

    constructor(shape) {
        this.shape = shape
    }

    update(deltaTime) {

        this.accelerationX = this.forceX / this.mass
        this.accelerationY = this.forceY / this.mass
        
        this.velocityX += this.accelerationX * deltaTime
        this.velocityY += this.accelerationY * deltaTime
        
        this.shape.x += this.velocityX * deltaTime
        this.shape.y += this.velocityY * deltaTime
        
        if (this.isImpulse) {
            this.forceX = 0
            this.forceY = 0
        }

    }

    get shape() {
        return this.#shape
    }

    set shape(value) {
        this.#shape = expect(Shape, value)
    }

    get mass() {
        return this.#mass
    }

    set mass(value) {
        this.#mass = expect('number', value)
    }

    get restitution() {
        return this.#restitution
    }

    set restitution(value) {
        this.#restitution = expect('number', value)
    }

    get forceX() {
        return this.#forceX
    }

    set forceX(value) {
        this.#forceX = expect('number', value)
    }

    get forceY() {
        return this.#forceY
    }

    set forceY(value) {
        this.#forceY = expect('number', value)
    }

    get isImpulse() {
        return this.#isImpulse
    }

    set isImpulse(value) {
        this.#isImpulse = expect('boolean', value)
    }

    get accelerationX() {
        return this.#accelerationX
    }

    set accelerationX(value) {
        this.#accelerationX = expect('number', value)
    }

    get accelerationY() {
        return this.#accelerationY
    }

    set accelerationY(value) {
        this.#accelerationY = expect('number', value)
    }

    get velocityX() {
        return this.#velocityX
    }

    set velocityX(value) {
        this.#velocityX = Math.abs(expect('number', value)) > 0.1 ? value: 0
    }

    get velocityY() {
        return this.#velocityY
    }

    set velocityY(value) {
        this.#velocityY = Math.abs(expect('number', value)) > 0.1 ? value: 0
    }

}

export default RigidBody