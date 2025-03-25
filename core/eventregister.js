class EventRegisterer {
    
    #eventTypeSet;
    #registeredsMap;

    constructor(...eventTypeList) {
        this.#eventTypeSet = new Set(eventTypeList)
        this.#registeredsMap = new Map()
    }

    add(newEventType) {
        this.#eventTypeSet.add(newEventType)
    }

    remove(eventType) {
        this.#eventTypeSet.delete(eventType)
    }

    register(target, callback) {
        
        this.unregister(target)
 
        this.#eventTypeSet.forEach(eventType => {
            target.addEventListener(eventType, callback)
        })
        
        this.#registeredsMap.set(target, callback)
        
    }

    unregister(target) {
        
        const callback = this.#registeredsMap.get(target)
        
        if (callback) {
        
            this.#eventTypeSet.forEach(eventType =>
                target.removeEventListener(eventType, callback)
            )
            
            this.#registeredsMap.delete(target)
            
        }
        
    }
    
}