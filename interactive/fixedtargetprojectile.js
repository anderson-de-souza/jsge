import RigidBody from '../core/rigidbody.js'

class FixedTargetProjectile extends RigidBody {
    
    static EPSILON = 1e-15
    
    #ontargethit
    
    constructor(context, width, height) {
        super(context, width, height)
        
        this.targetX = this.x
        this.targetY = this.y
        
        this.#ontargethit = () => {
            ProjectilePhysics.fixOverlap(this)
        }
        
    }
    
    launch(targetX, targetY, appliedAcceleration) {
        this.targetX = targetX
        this.targetY = targetY
        this.forceX = (this.mass * appliedAcceleration) * this.directionX
        this.forceY = (this.mass * appliedAcceleration) * this.directionY
    }
    
    update() {
        super.update()
        if (ProjectilePhysics.isTargetHit(this)) {
            this.#ontargethit()
        }
    }
    
    set ontargethit(callback) {
        if (typeof callback === 'function') {
            this.#ontargethit = callback
        }
    }
    
    get deltaX() {
        return (this.targetX + this.halfWidth) - this.centerX
    }
    
    get deltaY() {
        return (this.targetY + this.halfHeight) - this.centerY
    }
    
    get magnitude() {
        return Math.hypot(this.deltaX, this.deltaY)
    }
    
    get directionX() {
        return this.magnitude > FixedTargetProjectile.EPSILON? this.deltaX / (this.magnitude + FixedTargetProjectile.EPSILON): 0
    }
    
    get directionY() {
        return this.magnitude > FixedTargetProjectile.EPSILON? this.deltaY / (this.magnitude + FixedTargetProjectile.EPSILON): 0
    }
    
}

export default FixedTargetProjectile
