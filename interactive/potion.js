class Portion {
    
    #effectDuration
    
    constructor(name, description) {
        this.name = name
        this.description = description
        this.#effectDuration = 1000
    }
    
    get effectDuration() {
        return this.#effectDuration
    }
    
    set effectDuration(duration) {
        if (typeof duration === 'number' && duration >= 0) {
            this.#effectDuration = duration
        }
    }
    
    applyEffect(target) {
        return true
    }
    
    removeEffect(target) {
        
    }
    
    errorToApply(error) {
        
    }
    
    takeEffect(target) {
        return new Promise((resolve, reject) => {
            
            const result = this.applyEffect(target)
            
            if (result) {
                if (this.effectDuration > 0) {
                    setTimeout(() => resolve(false), this.effectDuration)
                } else {
                    resolve(true)
                }
            } else {
                reject(new Error('error applying effect'))
            }
            
        }).then(isPermanent => {
            if (!isPermanent) {
                this.removeEffect(target)
            }
        }).catch(error => this.errorToApply(error))
    }
}