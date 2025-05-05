import expect from '../../../util/expect.js'
import Shape from '../../shape/shape.js'
import ShapeLinker from '../../global/shapelinker.js'
import Vector from '../../../util/vector.js'

class RigidBody {

    #shape

    #mass
    #restitution

    #forceX
    #forceY

    #isImpulse

    #accelerationX
    #accelerationY

    #velocityX
    #velocityY
    
    #torque
    
    #angularAcceleration
    
    #angularVelocity

    constructor(shape) {
        
        this.shape = shape
        
        this.#mass = 1
        this.#restitution = 0
    
        this.#forceX = 0
        this.#forceY = 0
    
        this.#isImpulse = true
    
        this.#accelerationX = 0
        this.#accelerationY = 0
    
        this.#velocityX = 0
        this.#velocityY = 0
        
        this.#torque = 0
        
        this.#angularAcceleration = 0
        
        this.#angularVelocity = 0
        
        const shapeLinker = ShapeLinker.instance
        shapeLinker.link(shape, { body: this })

        
    }

    update(deltaTime) {

        this.accelerationX = this.forceX / this.mass
        this.accelerationY = this.forceY / this.mass
        
        this.velocityX += this.accelerationX * deltaTime
        this.velocityY += this.accelerationY * deltaTime
        
        this.shape.centerX += this.velocityX * deltaTime
        this.shape.centerY += this.velocityY * deltaTime
        
        this.angularAcceleration = this.torque / this.momentOfInertia
        
        this.angularVelocity += this.angularAcceleration * deltaTime
        
        this.shape.rotationAngle += this.angularVelocity * deltaTime
        
        if (this.isImpulse) {
            this.forceX = 0
            this.forceY = 0
            this.torque = 0
        }

    }

    get shape() {
        return this.#shape
    }

    set shape(value) {
        this.#shape = expect(Shape, value)
    }
    
    get centerX() {
        return this.shape.centerX
    }
    
    set centerX(value) {
        this.shape.centerX = value
    }
    
    get centerY() {
        return this.shape.centerY
    }
    
    set centerY(value) {
        this.shape.centerY = value
    }
    
    getCenter() {
        return this.shape.getCenter()
    }
    
    setCenter(value) {
        this.shape.setCenter(value)
    }
    
    get mass() {
        return this.#mass
    }

    set mass(value) {
        if (expect('number', value) <= 0) {
            throw new Error('mass value needs to be greater than 0')
        }
        this.#mass = value
    }

    get restitution() {
        return this.#restitution
    }

    set restitution(value) {
        if (expect('number', value) < 0 || value > 1) {
            throw new Error('restitution value needs to be between 0 and 1')
        }
        this.#restitution = value
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
    
    getVelocity() {
        return new Vector(
                this.velocityX,
                this.velocityY
            )
    }
    
    setVelocity(value) {
        this.velocityX = expect(Vector, value).x
        this.velocityY = value.y
    }
    
    get torque() {
        return this.#torque
    }
    
    set torque(value) {
        this.#torque = expect('number', value)
    }
    
    get angularAcceleration() {
        return this.#angularAcceleration
    }
    
    set angularAcceleration(value) {
        this.#angularAcceleration = expect('number', value)
    }
    
    get angularVelocity() {
        return this.#angularVelocity
    }
    
    set angularVelocity(value) {
        this.#angularVelocity = expect('number', value)
    }
    
    get momentOfInertia() {
        return this.mass * this.shape.radius ** 2
    }

}

export default RigidBody