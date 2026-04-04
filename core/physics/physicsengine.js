import applyRestitution from './interaction/rigidbody/restitution.js'
import applyRotation from './interaction/rigidbody/rotation.js'
import applySeparation from './interaction/rigidbody/separation.js'

import expect from '../../util/expect.js'
import RigidBody from './body/rigidbody.js'
import SAT from './collision-method/separatingaxistheorem.js'
import SpatialGrid from '../../util/spatialgrid.js'
import Collision from './collision.js'

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

    resolveCollisions(collisions = new Map()) {
        for (const collision of collisions.values()) {

            const { bodyA, bodyB, mtv } = collision

            applySeparation(bodyA, bodyB, mtv)
            applyRestitution(bodyA, bodyB, mtv)
            applyRotation(bodyA, bodyB, mtv)

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