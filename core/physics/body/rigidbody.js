import expect from '../../../util/expect.js'
import Shape from '../../shape/shape.js'
import Vector from '../../../util/vector.js'

class RigidBody {

    #shape

    #mass
    #restitution

    #forceX
    #forceY

    #impulseX
    #impulseY

    #accelerationX
    #accelerationY

    #velocityX
    #velocityY
    
    #torque
    #angularImpulse
    
    #angularAcceleration
    
    #angularVelocity

    #momentOfInertia

    constructor(shape) {
        expect(Shape, shape)
        
        this.#shape = shape

        this.#shape.body = this
        
        this.#mass = 1
        this.#restitution = 0
    
        this.#forceX = 0
        this.#forceY = 0
    
        this.#impulseX = 0
        this.#impulseY = 0
    
        this.#accelerationX = 0
        this.#accelerationY = 0
    
        this.#velocityX = 0
        this.#velocityY = 0
        
        this.#torque = 0

        this.#angularImpulse = 0
        
        this.#angularAcceleration = 0
        
        this.#angularVelocity = 0

    }

    update(deltaTime) {

        this.#accelerationX = this.#forceX / this.#mass
        this.#accelerationY = this.#forceY / this.#mass

        this.velocityX += this.#impulseX / this.#mass
        this.velocityY += this.#impulseY / this.#mass

        this.velocityX += this.#accelerationX * deltaTime
        this.velocityY += this.#accelerationY * deltaTime
        
        
        this.centerX += this.#velocityX * deltaTime
        this.centerY += this.#velocityY * deltaTime
        
        this.#angularAcceleration = this.#torque / this.momentOfInertia
        
        this.angularVelocity += this.#angularImpulse / this.momentOfInertia

        this.angularVelocity += this.#angularAcceleration * deltaTime
        
        this.#shape.rotationAngle += this.angularVelocity * deltaTime

        this.#forceX = 0
        this.#forceY = 0
        
        this.#impulseX = 0
        this.#impulseY = 0

        this.#torque = 0
        this.#angularImpulse = 0

    }

    get id() {
        return this.#shape.id
    }

    get shape() {
        return this.#shape
    }
    
    get centerX() {
        return this.#shape.centerX
    }
    
    set centerX(value) {
        this.#shape.centerX = value
    }
    
    get centerY() {
        return this.#shape.centerY
    }
    
    set centerY(value) {
        this.#shape.centerY = value
    }
    
    getCenter() {
        return this.#shape.getCenter()
    }
    
    setCenter(value) {
        this.#shape.setCenter(value)
    }
    
    get mass() {
        return this.#mass
    }

    set mass(value) {
        expect('number', value)
        
        if (value <= 0 || !Number.isFinite(value)) {
            throw new Error('mass value must be greater than 0 and finite')
        }
        
        this.#mass = value
        this.#momentOfInertia = null
        
    }

    get restitution() {
        return this.#restitution
    }

    set restitution(value) {
        expect('number', value)
        if (value < 0 || value > 1) {
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

    get impulseX() {
        return this.#impulseX
    }

    set impulseX(value) {
        this.#impulseX = expect('number', value)
    }

    get impulseY() {
        return this.#impulseY
    }

    set impulseY(value) {
        this.#impulseY = expect('number', value)
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
        this.#velocityX = Math.abs(expect('number', value)) > 0.001 ? value: 0
    }

    get velocityY() {
        return this.#velocityY
    }

    set velocityY(value) {
        this.#velocityY = Math.abs(expect('number', value)) > 0.001 ? value: 0
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

    get angularImpulse() {
        return this.#angularImpulse
    }
    
    set angularImpulse(value) {
        this.#angularImpulse = expect('number', value)
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
        this.#angularVelocity = Math.abs(expect('number', value)) > 0.001 ? value: 0
    }
    
    get momentOfInertia() {
        if (this.#momentOfInertia === undefined || this.#momentOfInertia === null) {

            const corners = this.#shape.getLocalCorners()
            
            let area = 0
            let inertia = 0

            for (let i = 0; i < corners.length; i++) {

                const p0 = corners[i]
                const p1 = corners[(i + 1) % corners.length]

                const cross = p0.cross(p1)

                const dot0 = p0.dot(p0)
                const dot1 = p0.dot(p1)
                const dot2 = p1.dot(p1)

                area += cross
                inertia += cross * (dot0 + dot1 + dot2)
            }

            area = Math.abs(area) * 0.5

            const density = this.#mass / area

            const result = (density / 6) * inertia

            this.#momentOfInertia = result

        }

        return this.#momentOfInertia

    }

}

export default RigidBody