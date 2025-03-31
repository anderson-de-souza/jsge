class EventRegisterer {

    constructor(...eventTypeList) {

        this.eventTypeSet = new Set()

        for (const eventType of eventTypeList) {
            this.add(eventType)
        }

        this.registeredsMap = new Map()

    }

    add(eventType) {
        if (typeof eventType === 'string') {
            this.eventTypeSet.add(eventType)
        }
    }

    remove(eventType) {
        this.eventTypeSet.delete(eventType)
    }

    register(target, callback) {
        
        this.unregister(target)
 
        this.eventTypeSet.forEach(eventType => {
            target.addEventListener(eventType, callback)
        })
        
        this.registeredsMap.set(target, callback)
        
    }

    unregister(target) {
        
        const callback = this.registeredsMap.get(target)
        
        if (callback) {
        
            this.eventTypeSet.forEach(eventType =>
                target.removeEventListener(eventType, callback)
            )
            
            this.registeredsMap.delete(target)
            
        }
        
    }
    
}

export default EventRegisterer