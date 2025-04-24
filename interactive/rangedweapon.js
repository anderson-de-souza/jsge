import RigidBody from '../core/rigidbody.js'

class RangedWeapon extends RigidBody {
    
    #attackDuration
    
    constructor(context, width, height) {
        super(context, width, height)
        this.isVisible = false
        this.#attackDuration = 500
    }
    
    get attackDuration() {
        return this.#attackDuration
    }
    
    set attackDuration(duration) {
        if (typeof duration === 'number' && duration >= 0) {
            this.#attackDuration = duration
        }
    }
    
    attack(entity, normalX, normalY, targetX, targetY, acceleration) {
        
        this.x = entity.x + (normalX * this.width)
        this.y = entity.y + (normalY * this.height)
        
        this.isVisible = true
        
        const projectile = new FixedTargetProjectile(this.context, this.width, this.height)
        projectile.x = this.x
        projectile.y = this.y
        
        projectile.launch(targetX, targetY, 20)
        
        projectile.isFill = true
        
        projectile.onFrameUpdate = function() {
            this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
        }
        
        Looper.instance.add(() => {
            projectile.draw()
            projectile.update()
        })
        
        setTimeout(() => {
            this.isVisible = false
        }, this.#attackDuration)
        
    }
    
    onFrameUpdate() {
        this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    }
    
}

export default RangedWeapon