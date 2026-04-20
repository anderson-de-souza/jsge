import expect from '../../util/expect.js'
import Vector from '../../util/vector.js'
import RigidBody from './body/rigidbody.js'

class Collision {

    #bodyA
    #bodyB

    #mtv

    constructor(bodyA, bodyB, mtv) {
        this.#bodyA = bodyA
        this.#bodyB = bodyB
        this.#mtv = mtv
    }

    get bodyA() {
        return this.#bodyA
    }

    get bodyB() {
        return this.#bodyB
    }

    get mtv() {
        return this.#mtv
    }

}

export default Collision