import expect from '../../util/expect.js'
import Shape from '../shape/shape.js'
import Vector from '../../util/vector.js'

class Solid extends Shape {
    
    #z
    #depth
    
    constructor() {
        super()
        this.#z = 0
        this.#depth = 0
    }
    
    get z() {
        return this.#z
    }
    
    set z(value) {
        this.#z = expect('number', value)
    }
    
    get depth() {
        return this.#depth
    }
    
    set depth(value) {
        this.#depth = expect('number', value)
    }
    
    get halfDepth() {
        return this.#depth / 2
    }
    
    get centerZ() {
        return this.#z + this.halfDepth
    }
    
    set centerZ(value) {
        expect('number', value)
        this.z = value - this.halfDepth
    }
    
    getPosition() {
        return new Vector(
                this.x, 
                this.y, 
                this.z
            )
    }
    
    setPosition(vector) {
        expect(Vector, vector)
        super.setPosition(vector)
        this.z = vector.z
    }
    
    getCenter() {
        return new Vector(
                this.centerX, 
                this.centerY, 
                this.centerZ
            )
    }
    
    setCenter(vector) {
        expect(Vector, vector)
        super.setCenter(vector)
        this.centerZ = vector.z
    }
    
}

export default Solid