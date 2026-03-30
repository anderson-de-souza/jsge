import expect from '../../../../util/expect.js'
import Vector from '../../../../util/vector.js'
import RigidBody from '../../body/rigidbody.js'

export default function applyRestitution(a, b, mtv) {
    expect(RigidBody, a)
    expect(RigidBody, b)
    expect(Vector, mtv)

    const normal = mtv.normalize()

    const relativeVelocity = a.getVelocity().subtract(b.getVelocity())
    const velocityAlongNormal = relativeVelocity.dot(normal)

    if (velocityAlongNormal > 0) return

    const restitution = (a.restitution + b.restitution) / 2

    const invMassA = a.mass === Infinity ? 0 : 1 / a.mass
    const invMassB = b.mass === Infinity ? 0 : 1 / b.mass

    const impulseMagnitude =
        -(1 + restitution) * velocityAlongNormal /
        (invMassA + invMassB)

    const impulse = normal.scale(impulseMagnitude)

    a.setVelocity(
        a.getVelocity().add(impulse.scale(invMassA))
    )

    b.setVelocity(
        b.getVelocity().subtract(impulse.scale(invMassB))
    )
    
}
