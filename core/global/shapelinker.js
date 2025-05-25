
import expect from '../../../util/expect.js'
import Shape from '../shape/shape.js'
import RigidBody from '../physics/body/rigidbody.js'
import View from '../view/view.js'

class ShapeLinker {
    
    static #instance
    
    #bodyMap
    #viewMap
    
    constructor() {
        
        if (ShapeLinker.#instance) {
            return ShapeLinker.#instance
        }
        
        ShapeLinker.#instance = this
        
        this.#bodyMap = new Map()
        this.#viewMap = new Map()
        
    }
    
    link(shape, { view = null, body = null }) {
        
        expect(Shape, shape)
        
        if (expect(View, view, false)) {
            this.#viewMap.set(shape, view)
        }
        
        if (expect(RigidBody, body, false)) {
            this.#bodyMap.set(shape, body)
        }
        
    }

    unlink(shape) {
        expect(Shape, shape)
        this.#viewMap.delete(shape)
        this.#bodyMap.delete(shape)
    }
    
    getView(shape) {
        return this.#viewMap.get(expect(Shape, shape))
    }
    getBody(shape) {
        return this.#bodyMap.get(expect(Shape, shape))
    }
    
    static getInstance() {
        return ShapeLinker.#instance ?? new ShapeLinker()
    }
    
}

export default ShapeLinker