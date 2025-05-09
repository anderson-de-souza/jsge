import expect from '../../../util/expect.js'
import RigidBody from '../body/rigidbody.js'
import SAT from '../collision-method/separatingaxistheorem.js'
import Vector from '../../../util/vector.js'

export function applyRestitution(a, b) {
    expect(RigidBody, a)
    expect(RigidBody, b)
    
    const direction = a.getCenter().subtract(b.getCenter())
    const directionNormal = direction.normalize()
    
    const relativeVelocity = a.getVelocity().subtract(b.getVelocity())
    
    const velocityAlongNormal = relativeVelocity.dot(directionNormal)
    
    if (velocityAlongNormal < 0) {
            
        const restitution = (a.restitution + b.restitution) / 2
        const totalReciprocalMass = (1 / a.mass) + (1 / b.mass)
        const impulseMagnitude = -(1 + restitution) * velocityAlongNormal / totalReciprocalMass
            
        const impulse = directionNormal.scale(impulseMagnitude)
            
        a.setVelocity(
            a.getVelocity().add(
                    impulse.unscale(a.mass)
                )
            )
            
        b.setVelocity(
            b.getVelocity().subtract(
                    impulse.unscale(b.mass)
                )
            )
            
    }
}

export function applyRotation(a, b) {
    expect(RigidBody, a)
    expect(RigidBody, b)
    
    const mtv = SAT.getMTV(a.shape, b.shape)
    
    const contactPoints = SAT.getInsideCorners(a.shape, b.shape)
    
    if (contactPoints.length > 0) {
    
        const contactPointsAverage = contactPoints
            .reduce((sum, corner) => sum.add(corner), new Vector(0, 0))
                .unscale(contactPoints.length)
                
        const aContactPointsAverage = contactPointsAverage.add(a.getCenter())
        const bContactPointsAverage = contactPointsAverage.subtract(b.getCenter())
        
        const aTorque = aContactPointsAverage.x * mtv.y - aContactPointsAverage.y * mtv.x
        const bTorque = bContactPointsAverage.x * mtv.y - bContactPointsAverage.y * mtv.x
        
        a.angularVelocity += aTorque / a.momentOfInertia
        b.angularVelocity -= bTorque / b.momentOfInertia
        
    }
    
}

export function applyFriction(a, b) {
    expect(RigidBody, a)
    expect(RigidBody, b)
    
    // todo: implements z exis to make friction with areas
    
}

export function applySeparation(a, b) {
    expect(RigidBody, a)
    expect(RigidBody, b)
    
    let mtv = SAT.getMTV(a.shape, b.shape)
    
    const deltaCenter = a.getCenter().subtract(
            b.getCenter()
        )
    
    if (mtv.dot(deltaCenter) < 0) {
        mtv = mtv.reverse()
    }
    
    const totalReciprocalMass = 1 / a.mass + 1 / b.mass
    
    const correction = mtv.unscale(totalReciprocalMass)
    
    a.setCenter(
        a.getCenter().add(
                correction.unscale(a.mass)
            )
        )
    
    b.setCenter(
        b.getCenter().subtract(
                correction.unscale(b.mass)
            )
        )
    
}
