import expect from '../../util/expect.js'
import RigidBody from '../physics/body/rigidbody.js'
import Shape from '../shape/shape.js'
import View from '../view/view.js'

class Entity {

    #id

    #shape
    #body
    #view

    constructor({ shape, body, view }) {

        this.#id = crypto.randomUUID()
        
        this.shape = expect(Shape, shape)
        this.body = expect(RigidBody, body)
        this.view = expect(View, view)

    }

    get id() {
        return this.#id
    }

    get shape() {
        return this.#shape
    }

    get body() {
        return this.#body
    }

    get view() {
        return this.#view
    }

}

export default Entity