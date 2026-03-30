import expect from '../../../../util/expect.js'
import RigidBody from '../../body/rigidbody.js'
import SAT from '../../collision-method/separatingaxistheorem.js'
import Vector from '../../../../util/vector.js'

export default function applyRotation(a, b, mtv) {
    expect(RigidBody, a)
    expect(RigidBody, b)
    expect(Vector, mtv)

    const contactPoints = SAT.getInsideCorners(a.shape, b.shape)

    if (contactPoints.length === 0) return

    const contact = contactPoints
        .reduce((sum, p) => sum.add(p), new Vector(0, 0))
        .unscale(contactPoints.length)

    const ra = contact.subtract(a.getCenter())
    const rb = contact.subtract(b.getCenter())

    const normal = mtv.normalize()

    const impulseMag = mtv.magnitude()

    const impulse = normal.scale(impulseMag)

    const torqueA = ra.x * impulse.y - ra.y * impulse.x
    const torqueB = rb.x * impulse.y - rb.y * impulse.x

    a.angularVelocity += torqueA / a.momentOfInertia
    b.angularVelocity -= torqueB / b.momentOfInertia
}
