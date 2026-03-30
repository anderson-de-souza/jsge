import expect from '../../../../util/expect.js'
import Vector from '../../../../util/vector.js'
import RigidBody from '../../body/rigidbody.js'

export default function applySeparation(a, b, mtv) {
    expect(RigidBody, a)
    expect(RigidBody, b)
    expect(Vector, mtv)
    
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
