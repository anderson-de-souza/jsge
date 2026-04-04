import expect from '../../../util/expect.js'
import Shape from '../../shape/shape.js'
import Circle from '../../shape/circle.js'
import Rectangle from '../../shape/rectangle.js'
import Vector from '../../../util/vector.js'

class RigidBody {

    #shape

    #mass
    #invertMass
    
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
    #invertMomentOfInertia

    #hasMoved
    
    #deltaX
    #deltaY
    
    #angularDelta

    constructor({ 
        shape,
        mass = 1,
        restitution = 0
    }) {
        expect(Shape, shape)
        
        this.#shape = shape
        this.#shape.body = this
        
        this.mass = mass
        this.restitution = restitution
        
        this.#impulseX = 0
        this.#impulseY = 0
        
        this.#forceX = 0
        this.#forceY = 0
    
        this.#accelerationX = 0
        this.#accelerationY = 0
    
        this.#velocityX = 0
        this.#velocityY = 0
        
        this.#torque = 0

        this.#angularImpulse = 0
        
        this.#angularAcceleration = 0
        
        this.#angularVelocity = 0
        
        this.#momentOfInertia = null
        this.#invertMomentOfInertia = 0
        
        this.#hasMoved = false
        
        this.#deltaX = 0
        this.#deltaY = 0
        
        this.#angularDelta = 0

    }

    update(deltaTime) {
        
        this.velocityX += this.#impulseX * this.invertMass
        this.velocityY += this.#impulseY * this.invertMass
        
        this.#accelerationX = this.#forceX * this.invertMass
        this.#accelerationY = this.#forceY * this.invertMass

        this.velocityX += this.#accelerationX * deltaTime
        this.velocityY += this.#accelerationY * deltaTime
        
        this.centerX += this.#velocityX * deltaTime
        this.centerY += this.#velocityY * deltaTime
        
        this.#forceX = 0
        this.#forceY = 0
        
        this.#impulseX = 0
        this.#impulseY = 0
        
        this.angularVelocity += this.#angularImpulse * this.invertMomentOfInertia
        
        this.#angularAcceleration = this.#torque * this.invertMomentOfInertia

        this.angularVelocity += this.#angularAcceleration * deltaTime
        
        this.rotationAngle += this.angularVelocity * deltaTime
        
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
        expect('number', value)
        const dx = value - this.#shape.centerX
        this.#deltaX += dx
        this.#hasMoved ||= Math.abs(dx) > 1e-6
        this.#shape.centerX = value
    }
    
    get deltaX() {
        return this.#deltaX
    }
    
    get centerY() {
        return this.#shape.centerY
    }
    
    set centerY(value) {
        expect('number', value)
        const dy = value - this.#shape.centerY
        this.#deltaY += dy
        this.#hasMoved ||= Math.abs(dy) > 1e-6
        this.#shape.centerY = value
    }
    
    get deltaY() {
        return this.#deltaY
    }
    
    getCenter() {
        return this.#shape.getCenter()
    }
    
    setCenter(value) {
        expect(Vector, value)
        const center = this.getCenter()
        const dx = value.x - center.x
        const dy = value.y - center.y
        this.#deltaX += dx
        this.#deltaY += dy
        this.#hasMoved ||= Math.abs(dx) > 1e-6 || Math.abs(dy) > 1e-6
        this.#shape.setCenter(value)
    }
    
    get delta() {
        return new Vector(
                this.deltaX,
                this.deltaY
            )
    }
    
    get mass() {
        return this.#mass
    }

    set mass(value) {
        expect('number', value)
        
        if (value <= 0 || !Number.isFinite(value)) {
            throw new Error('Mass value must be greater than 0 and finite')
        }
        
        this.#mass = value
        this.#invertMass = 1 / this.#mass
        
        this.#momentOfInertia = null
        this.#invertMomentOfInertia = 0
        
    }
    
    get invertMass() {
        return this.#invertMass
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
    
    applyImpulse(x, y) {
        this.#impulseX += x
        this.#impulseY += y
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
        this.#velocityX = Math.abs(expect('number', value)) > 1e-6 ? value: 0
    }

    get velocityY() {
        return this.#velocityY
    }

    set velocityY(value) {
        this.#velocityY = Math.abs(expect('number', value)) > 1e-6 ? value: 0
    }
    
    getVelocity() {
        return new Vector(
                this.velocityX,
                this.velocityY
            )
    }
    
    setVelocity(value) {
        expect(Vector, value)
        this.velocityX = value.x
        this.velocityY = value.y
    }
    
    get rotationAngle() {
        return this.#shape.rotationAngle
    }
    
    set rotationAngle(value) {
        expect('number', value)
        const delta = value - this.rotationAngle
        this.#angularDelta += delta
        this.#hasMoved ||= Math.abs(delta) > 1e-6
        this.#shape.rotationAngle = value
    }
    
    get angularDelta() {
        return this.#angularDelta
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
        this.#angularVelocity = Math.abs(expect('number', value)) > 1e-6 ? value: 0
    }
    
    get momentOfInertia() {
        if (this.#momentOfInertia == null) {
            
            if (expect(Circle, this.#shape, false)) {
                this.#momentOfInertia = 0.5 * this.mass * (this.#shape.radius ** 2)
                
            } else if (expect(Rectangle, this.#shape, false)) {
                const w = this.#shape.width
                const h = this.#shape.height
                this.#momentOfInertia = (1 / 12) * this.#mass * ((w ** 2) + (h ** 2))
                
            } else {
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
                
                let density = 0
                
                if (area > 0) {
                    density = this.#mass / area
                } else {
                    throw new Error('Invalid polygon area')
                }
    
                const result = Math.abs((density / 6) * inertia)
    
                this.#momentOfInertia = result
                
            }
            
            if (this.#momentOfInertia <= 0 || !Number.isFinite(this.#momentOfInertia)) {
                throw new Error('Moment Of Inertia value must be greater than 0 and finite')
            }
            
            this.#invertMomentOfInertia = 1 / this.#momentOfInertia

        }

        return this.#momentOfInertia

    }
    
    get invertMomentOfInertia() {
        if (this.#momentOfInertia == null) {
            this.momentOfInertia
        }
        return this.#invertMomentOfInertia
    }
    
    get hasMoved() {
        return this.#hasMoved
    }
    
    markAsMoved() {
        this.#hasMoved = true
    }
    
    clearMoved() {
        this.#hasMoved = false
    }

}

export default RigidBody