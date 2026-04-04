import expect from '../../util/expect.js'
import RigidBody from './body/rigidbody.js'
import SAT from './collision-method/separatingaxistheorem.js'
import SpatialGrid from '../../util/spatialgrid.js'
import Collision from './collision.js'
import Vector from '../../util/vector.js'

class PhysicsEngine {
    
    #gridCellSize
    #spatialgrid
    #bodies
    
    constructor(gridCellSize) {
        this.#gridCellSize = gridCellSize
        this.#spatialgrid = new SpatialGrid(gridCellSize)
        this.#bodies = new Set()
    }
    
    get gridCellSize() {
        return this.#gridCellSize
    }
    
    addBody(body) {
        expect(RigidBody, body)
        this.#bodies.add(body)
        this.#spatialgrid.addShape(body.shape)
    }
    
    removeBody(body) {
        expect(RigidBody, body)
        this.#bodies.delete(body)
        this.#spatialgrid.removeShape(body.shape)
    }

    run(deltaTime) {
        this.update(deltaTime)
        const collisions = this.findCollisions()
        this.resolveCollisions(collisions)
    }

    findCollisions() {

        const collisions = new Map()

        for (let bodyA of this.#bodies) {

            const shapeA = bodyA.shape
            const aroundShapes = this.#spatialgrid.findAround(shapeA)

            for (let shapeB of aroundShapes) {

                const bodyB = expect(RigidBody, shapeB.body)
                if (bodyA === bodyB) continue

                const pairId = bodyA.id < bodyB.id
                    ? `${bodyA.id}:${bodyB.id}`
                    : `${bodyB.id}:${bodyA.id}`

                if (collisions.has(pairId)) continue

                const mtv = SAT.getMTV(shapeA, shapeB)

                if (mtv) {
                    collisions.set(pairId, new Collision(bodyA, bodyB, mtv))
                }

            }

        }

        return collisions
    }

    resolveCollision(a, b, mtv) {

        // --- NORMAL ---
        let normal = mtv.clone().normalize()

        const delta = b.getCenter().subtract(a.getCenter())
        if (normal.dot(delta) < 0) {
            normal = normal.reverse()
        }

        const penetration = mtv.magnitude()

        // --- POSITION CORRECTION ---
        const percent = 0.8
        const slop = 0.01

        const totalInvMass = a.invertMass + b.invertMass

        if (totalInvMass === 0) return

        const correction = normal.clone().scale(
            Math.max(penetration - slop, 0) / totalInvMass * percent
        )

        a.setCenter(
            a.getCenter().subtract(correction.clone().scale(a.invertMass))
        )

        b.setCenter(
            b.getCenter().add(correction.clone().scale(b.invertMass))
        )

        // --- CONTACT POINT (aproximação simples) ---
        const contactPoints = SAT.getInsideCorners(a.shape, b.shape)

        let contact

        if (contactPoints.length > 0) {
            contact = contactPoints
                .reduce((sum, p) => sum.add(p), new Vector(0, 0))
                .unscale(contactPoints.length)
        } else {
            contact = a.getCenter()
                .add(b.getCenter())
                .unscale(2)
                .add(normal.clone().scale(penetration * 0.5))
        }

        const ra = contact.subtract(a.getCenter())
        const rb = contact.subtract(b.getCenter())

        // --- RELATIVE VELOCITY (com rotação) ---
        const velA = new Vector(
            a.velocityX - a.angularVelocity * ra.y,
            a.velocityY + a.angularVelocity * ra.x
        )

        const velB = new Vector(
            b.velocityX - b.angularVelocity * rb.y,
            b.velocityY + b.angularVelocity * rb.x
        )

        const rv = velB.subtract(velA)

        const velAlongNormal = rv.dot(normal)

        if (velAlongNormal > -0.0001) return

        // --- RESTITUTION ---
        const restitution = Math.min(a.restitution, b.restitution)

        // --- IMPULSE (COM ROTAÇÃO) ---
        const raCrossN = ra.x * normal.y - ra.y * normal.x
        const rbCrossN = rb.x * normal.y - rb.y * normal.x

        const invMassSum =
            a.invertMass +
            b.invertMass +
            (raCrossN * raCrossN) * a.invertMomentOfInertia +
            (rbCrossN * rbCrossN) * b.invertMomentOfInertia

        const j = Math.max(
            -(1 + restitution) * velAlongNormal / invMassSum,
            0
        )

        const impulse = normal.clone().scale(j)

        // --- APPLY LINEAR ---
        a.velocityX -= impulse.x * a.invertMass
        a.velocityY -= impulse.y * a.invertMass

        b.velocityX += impulse.x * b.invertMass
        b.velocityY += impulse.y * b.invertMass

        // --- APPLY ANGULAR ---
        const torqueA = ra.x * impulse.y - ra.y * impulse.x
        const torqueB = rb.x * impulse.y - rb.y * impulse.x

        a.angularVelocity -= torqueA * a.invertMomentOfInertia
        b.angularVelocity += torqueB * b.invertMomentOfInertia

    }

    resolveCollisions(collisions = new Map()) {
        for (const collision of collisions.values()) {

            const { bodyA, bodyB, mtv } = collision

            this.resolveCollision(bodyA, bodyB, mtv)

        }
    }

    update(deltaTime) {
        for (const body of this.#bodies) {
            body.update(deltaTime)
            if (body.hasMoved) {
                this.#spatialgrid.updateShape(body.shape)
            }
        }
    }
    
}

export default PhysicsEngine