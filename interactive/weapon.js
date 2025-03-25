class Weapon extends RigidBody {
    
    #attackDuration
    
    constructor(width, height, spriteWidth, spriteHeight) {
        super(width, height, spriteWidth, spriteHeight)
        this.isVisible = false
        this.#attackDuration = 1000
    }
    
    get attackDuration() {
        return this.#attackDuration
    }
    
    set attackDuration(duration) {
        if (typeof duration === 'number' && duration >= 0) {
            this.#attackDuration = duration
        }
    }
    
    attack(entity, normalX, normalY) {
        
        this.x = entity.x + (normalX * this.width)
        this.y = entity.y + (normalY * this.height)
        
        this.isVisible = true
        
        setTimeout(() => {
            this.isVisible = false
        }, this.#attackDuration)
        
    }
    
    onFrameUpdate() {
        this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    }
    
}