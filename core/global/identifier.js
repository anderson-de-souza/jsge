import expect from '../../util/expect.js';

class Identifier {
    
    static #instance
    
    #maxSize
    #currentId
    
    constructor() {

        if (Identifier.#instance) {
            return Identifier.#instance
        }

        Identifier.#instance = this

        this.#maxSize = 64
        this.#currentId = 0 

    }
    
    get maxSize() {
        return this.#maxSize
    }
    
    set maxSize(value) {
        this.#maxSize = expect('number', value)
    }
    
    generateId() {
        
        if (this.#currentId >= this.maxSize) {
            throw new Error("the maximum number of ids was reached")
        }
        
        return this.#currentId++
        
    }
    
    static getInstance() {
        return Identifier.#instance ?? new Identifier()
    }
    
}

export default Identifier