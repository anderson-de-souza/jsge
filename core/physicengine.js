
import Record from './record.js'
import RigidBody from '../rigidbody.js'
import SpatialGrid from './spatialgrid.js'

class PhysicEngine {
    
    constructor(context) {
        
        const magnitude = Math.hypot(context.canvas.width, context.canvas.height)
        const cellSize = magnitude / 5
        
        this.spatialgrid = new SpatialGrid(cellSize)
        
        this.bodies = new Set()
        
    }
    
    add(body) {
        if (body instanceof RigidBody) {
            this.bodies.add(body)
            this.spatialgrid.addBody(body)
        }
    }
    
    remove(body) {
        this.bodies.delete(body)
        this.spatialgrid.removeBody(body)
    }

    run(deltaTime) {

        const ghost = new RigidBody()
        const bodyRecord = new Record()

        for (let body of this.bodies) {

            this.spatialgrid.removeBody(body)

            bodyRecord.save(body)
            bodyRecord.restore(ghost)

            ghost.update(deltaTime)

            const nearbyBodies = this.spatialgrid.findNearbyBodies(ghost)

            for (let otherBody of nearbyBodies) {
                if (this.isIntersected(ghost, otherBody)) {
                    this.applyRestitution(otherBody, body)
                }
            }

            body.update(deltaTime)

            this.spatialgrid.addBody(body)

        }
        
    }

    applyRestitution(obj, obst) {
    
        let deltaX = obj.centerX - obst.centerX
        let deltaY = obj.centerY - obst.centerY
    
        let normalMagnitude = Math.hypot(deltaX, deltaY)

        let normalX = 0
        let normalY = 0

        if (deltaX >= deltaY && normalMagnitude > 0) {
            normalX = deltaX / normalMagnitude
        } else if (normalMagnitude > 0) {
            normalY = deltaY / normalMagnitude
        }
    
        let relativeVelocityX = obj.velocityX - obst.velocityX
        let relativeVelocityY = obj.velocityY - obst.velocityY
        
        let velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY

        if (velocityAlongNormal > 0) return

        let restitution = Math.min(obj.restitution, obst.restitution)
        let totalReciprocalMass = 1 / obj.mass + 1 / obst.mass
        let impulseMagnitude = -(1 + restitution) * velocityAlongNormal / totalReciprocalMass 

        let impulseX = impulseMagnitude * normalX
        let impulseY = impulseMagnitude * normalY
    
        obj.velocityX += impulseX / obj.mass
        obj.velocityY += impulseY / obj.mass
    
        obst.velocityX -= impulseX / obst.mass
        obst.velocityY -= impulseY / obst.mass

    }    
    
    
    
    isIntersected(obj, obst) {

        let deltaX = obj.centerX - obst.centerX
        let deltaY = obj.centerY - obst.centerY
        
        let thresholdX = obj.halfWidth + obst.halfWidth
        let thresholdY = obj.halfHeight + obst.halfHeight
        
        return Math.abs(deltaX) < thresholdX && Math.abs(deltaY) < thresholdY

    }
    
}

export default PhysicEngine