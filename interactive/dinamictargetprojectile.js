class DinamicTargetProjectile extends FixedTargetProjectile {
    
    static LERP_FACTOR = 0.2
    
    constructor(context, width, height) {
        super(context, width, height)
        
        this.targetBody = {
            x: this.targetX,
            y: this.targetY
        }
        
        this.appliedAcceleration = 0
        
    }

    launch(targetBody, appliedAcceleration) {
        this.targetBody = targetBody
        this.appliedAcceleration = appliedAcceleration
    }
    
    locateTarget() {
        this.targetX = this.targetBody.x
        this.targetY = this.targetBody.y
    }
    
    reapplyForces() {
        this.forceX = (this.forceX * (1 - DinamicTargetProjectile.LERP_FACTOR)) + ((this.mass * this.appliedAcceleration) * this.directionX * DinamicTargetProjectile.LERP_FACTOR)
        this.forceY = (this.forceY * (1 - DinamicTargetProjectile.LERP_FACTOR)) + ((this.mass * this.appliedAcceleration) * this.directionY * DinamicTargetProjectile.LERP_FACTOR)
    }
    
    update() {
        this.locateTarget()
        this.reapplyForces()
        super.update()
    }
    
}