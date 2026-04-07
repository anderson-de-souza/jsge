import expect from '../../util/expect.js'

class Looper {
    
    static #instance
    
    #loopId
    
    #callbacks
    
    #loopCount
    #loopInterval
    
    #lastTime
    
    constructor() {

        if (Looper.#instance) {
            return Looper.#instance
        }
        
        Looper.#instance = this
        
        this.#loopId = null

        this.#callbacks = new Set()

        this.#loopCount = 0
        this.#loopInterval = 0
        
        this.#lastTime = 0

    }
    
    get loopInterval() {
        return this.#loopInterval
    }
    
    set loopInterval(value) {
        this.#loopInterval = expect('number', value)
    }
    
    addCallback(callback) {
        expect('function', callback)
        this.#callbacks.add(callback)
    }
    
    removeCallback(callback) {
        this.callbacks.delete(callback)
    }
    
    startLoop() {
        if (!this.#loopId) {
            this.#loop()
        }
    }
    
    clearLoop() {
        if (this.#loopId) {
            cancelAnimationFrame(this.#loopId)
            this.#loopId = null
        }
    }
    
    #loop(timestamp = 0) {
        
        if (this.#callbacks.size === 0) {
            this.clearLoop()
            return
        }

        if (this.#lastTime === 0) {
            this.#lastTime = timestamp
        }
        
        const deltaTime = (timestamp - this.#lastTime) / 1000
        this.#lastTime = timestamp
        
        this.#loopCount++
        
        if (this.#loopCount > this.loopInterval) {
            for (const callback of this.#callbacks) {
                callback(deltaTime)
            }
            this.#loopCount = 0
        }
        
        this.#loopId = requestAnimationFrame((timestamp) => this.#loop(timestamp))
        
    }
    
    destroy() {
        this.clearLoop()
        Looper.#instance = null
    }
    
    static getInstance() {
        return Looper.#instance ?? new Looper()
    }
    
}

export default Looper
