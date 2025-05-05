import expect from '../../../util/expect.js'
import RigidBody from '../body/rigidbody.js'
import SAT from '../collision-method/separatingaxistheorem.js'
import Vector from '../../../util/vector.js'

export function applyRestitution(obj, obst) {
    
    expect(RigidBody, obj)
    expect(RigidBody, obst)
    
    const direction = obj.getCenter().subtract(obst.getCenter())
    const directionNormal = direction.normalize()
    
    const relativeVelocity = obj.getVelocity().subtract(obst.getVelocity())
    
    const velocityAlongNormal = relativeVelocity.dot(directionNormal)
    
    if (velocityAlongNormal < 0) {
            
        const restitution = (obj.restitution + obst.restitution) / 2
        const totalReciprocalMass = (1 / obj.mass) + (1 / obst.mass)
        const impulseMagnitude = -(1 + restitution) * velocityAlongNormal / totalReciprocalMass
            
        const impulse = directionNormal.scale(impulseMagnitude)
            
        obj.setVelocity(
            obj.getVelocity().add(
                    impulse.scale(1 / obj.mass)
                )
            )
            
        obst.setVelocity(
            obst.getVelocity().subtract(
                    impulse.scale(1 / obst.mass)
                )
            )
            
    }
}

export function applyRotation(obj, obst) {
    expect(RigidBody, obj)
    expect(RigidBody, obst)
    
    const mtv = SAT.getMTV(obj.shape, obst.shape)
    
    const contactPoints = SAT.getInsideCorners(obj.shape, obst.shape)
    
    if (contactPoints.length === 0) return
    
    const penetration = contactPoints
        .reduce((sum, corner) => sum.add(corner), new Vector(0, 0))
            .scale(1 / contactPoints.length)
            
    const penetrationDeepthObj = penetration.add(obj.getCenter())
    const penetrationDeepthObst = penetration.subtract(obst.getCenter())
    
    
    const torqueObj = penetrationDeepthObj.x * mtv.y - penetrationDeepthObj.y * mtv.x
    const torqueObst = penetrationDeepthObst.x * mtv.y - penetrationDeepthObst.y * mtv.x
    
    obj.angularVelocity += torqueObj / obj.momentOfInertia
    obst.angularVelocity -= torqueObst / obst.momentOfInertia
    
}

export function applySeparation(obj, obst) {
    expect(RigidBody, obj)
    expect(RigidBody, obst)
    
    let mtv = SAT.getMTV(obj.shape, obst.shape)
    const deltaCenter = obj.getCenter().subtract(obst.getCenter())
    
    if (mtv.dot(deltaCenter) < 0) {
        mtv = mtv.reverse()
    }
    
    const totalReciprocalMass = 1 / obj.mass + 1 / obst.mass
    
    const correction = mtv.scale(1 / totalReciprocalMass)
    
    obj.setCenter(
        obj.getCenter().add(
                correction.scale(1 / obj.mass)
            )
        )
    
    obst.setCenter(
        obst.getCenter().subtract(
                correction.scale(1 / obst.mass)
            )
        )
    
}
