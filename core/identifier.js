class Identifier {
    
    static #instance
    
    constructor() {

        if (Identifier.#instance) {
            return Identifier.#instance
        }

        Identifier.#instance = this

        this.maxSize = 64
        this.idList = new Set()

    }
    
    generateId() {
        
        if (this.idList.size >= this.maxSize) {
            throw new Error("the maximum number of ids was reached")
        }
        
        let newId
        
        do {
            newId = Math.floor(Math.random() * 1000)
        } while(this.idList.has(newId))
        
        this.idList.add(newId)
        
        return newId
        
    }
    
    static destroy() {
        Identifier.#instance = null
    }
    
    static get instance() {
        return Identifier.#instance ?? new Identifier()
    }
    
}

export default Identifier