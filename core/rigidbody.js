import AnimatedView  from './animatedview.js'

class RigidBody extends AnimatedView {
    
    constructor(context, width, height, mass = 1, restitution = 0.5, friction = 1, damping = 0.1) {
        super(context, width, height)
        
        this.mass = mass
        this.restitution = restitution
        this.friction = friction
        this.damping = damping
        
        this.forceX = 0
        this.forceY = 0
        
        this.isImpulse = true
        
        this.accelerationX = 0
        this.accelerationY = 0
        
        this.velocityX = 0
        this.velocityY = 0
        
    }
    
    get top() {
        return this.y
    }
    
    get bottom() {
        return this.y + this.height
    }
    
    get left() {
        return this.x
    }
    
    get right() {
        return this.x + this.width
    }
    
    get centerX() {
        return this.x + this.halfWidth
    }
    
    get centerY() {
        return this.y + this.halfHeight
    }
    
    get halfWidth() {
        return this.width / 2
    }
    
    get halfHeight() {
        return this.height / 2
    }

    get directionX() {
        return Math.sign(this.velocityX)
    }

    get directionY() {
        return Math.sign(this.velocityY)
    }

    get speedX() {
        return Math.abs(this.velocityX)
    }

    get speedY() {
        return Math.abs(this.velocityY)
    }

    get absoluteForceX() {
        return Math.abs(this.forceX)
    }
    
    get absoluteForceY() {
        return Math.abs(this.forceY)
    }
    
    update(deltaTime) {
        
        this.accelerationX = this.forceX / this.mass
        this.accelerationY = this.forceY / this.mass
        
        this.velocityX += this.accelerationX * deltaTime
        this.velocityY += this.accelerationY * deltaTime
        
        this.velocityX = Math.abs(this.velocityX) > 0.1 ? this.velocityX: 0
        this.velocityY = Math.abs(this.velocityY) > 0.1 ? this.velocityY: 0
        
        this.x += this.velocityX * deltaTime
        this.y += this.velocityY * deltaTime
        
        if (this.isImpulse) {
            this.forceX = 0
            this.forceY = 0
        }
        
    }
    
}

export default RigidBody
