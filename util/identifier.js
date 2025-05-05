import expect from '../../util/expect.js';

class Identifier {
    
    static #instance
    
    #maxSize
    #idSet
    
    constructor() {

        if (Identifier.#instance) {
            return Identifier.#instance
        }

        Identifier.#instance = this

        this.#maxSize = 64
        this.#idSet = new Set()

    }
    
    get maxSize() {
        return this.#maxSize
    }
    
    set maxSize(value) {
        this.#maxSize = expect('number', value)
    }
    
    generateId() {
        
        if (this.#idSet.size >= this.maxSize) {
            throw new Error("the maximum number of ids was reached")
        }
        
        let newId
        
        do {
            newId = Math.floor(Math.random() * 1000)
        } while(this.#idSet.has(newId))
        
        this.#idSet.add(newId)
        
        return newId
        
    }
    
    static get instance() {
        return Identifier.#instance ?? new Identifier()
    }
    
}

export default Identifier