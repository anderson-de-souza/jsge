class Record {
    
    #data = {}
    #isClean = true
    
    constructor(data) {
        this.save(data)
    }
    
    save(data) {
        if (data && this.#isClean) {
            this.#data = Record.deepClone(data)
            this.#isClean = false
        }
    }
    
    restore(target) {
        
        if (!this.#isClean) {
            
            if (!target || !(target instanceof this.#data.constructor)) {
                throw new Error('target is not valid')
            }
            
            for (let key in this.#data) {
                if (this.#data.hasOwnProperty(key)) {
                    target[key] = this.#data[key]
                }
            }
            
            this.#data = {}
            this.#isClean = true
            
        }
        
    }
    
    static deepClone(data) {
        
        if (!data || typeof data !== 'object' || Record.isWebAPIObject(data)) {
            return data
        }
        
        if (data instanceof Array) {
            return data.map(Record.deepClone)
        }
        
        if (data instanceof Date) {
            return new Date(data.getTime())
        }
        
        if (data instanceof Map) {
            const clone = new Map()
            for (let [key, value] of data) {
                clone.set(key, Record.deepClone(value))
            }
            return clone
        }
        
        if (data instanceof Set) {
            const clone = new Set()
            for (let value of data) {
                clone.add(Record.deepClone(value))
            }
            return clone
        }
        
        let clone = Object.create(Object.getPrototypeOf(data))
        
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                clone[key] = Record.deepClone(data[key])
            }
        }
        
        return clone
        
    }
    
    static isWebAPIObject(data) {
        return data 
            && typeof data === 'object'
            && data.constructor
            && typeof window[data.constructor.name] === 'function'
    }
    
}

export default Record