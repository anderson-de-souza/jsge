class Looper {
    
    static #instance

    #callbacks 
    #loopId
    
    #loopCount = 0
    #loopInterval = 0
    
    #lastTime = 0
    
    constructor() {
        if (Looper.#instance) {
            return Looper.#instance
        }
        Looper.#instance = this
        this.#callbacks = new Set()
    }
    
    add(callback) {
        if (typeof callback === 'function') {
            this.#callbacks.add(callback)
        } else {
            console.warn('arg passed is not a function', callback)
        }
    }
    
    remove(callback) {
        this.#callbacks.delete(callback)
    }
    
    startLoop() {
        if (!this.#loopId) {
            this.#loop()
        }
    }
    
    clearLoop() {
        if (this.#loopId) {
            cancelAnimationFrame(this.#loopId)
            this.#loopId = undefined
        }
    }
    
    #loop(timestamp = 0) {
        
        if (this.#callbacks.size === 0) {
            this.clearLoop()
            return
        }
        
        let deltaTime = (timestamp - this.#lastTime) / 1000
        this.#lastTime = timestamp
        
        this.#loopCount++
        
        if (this.#loopCount > this.#loopInterval) {
            this.#callbacks.forEach(callback => callback(deltaTime))
            this.#loopCount = 0
        }
        
        this.#loopId = requestAnimationFrame((timestamp) => this.#loop(timestamp))
        
    }
    
    destroy() {
        this.clearLoop()
        Looper.#instance = null
    }
    
    static get instance() {
        return Looper.#instance ?? new Looper()
    }
    
}