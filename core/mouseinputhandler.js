import EventRegisterer from './eventregisterer.js'

class MouseInputHandler {

    constructor(
        eventMapping, 
        events = [
            'click', 'dblclick', 'mousedown',
            'mouseup', 'mousemove', 'mouseover',
            'mouseout','mouseenter','mouseleave'
        ]
    ) {
        this.eventMapping = eventMapping
        this.eventRegister = new EventRegisterer(events)
    }

    register(target) {
        this.eventRegister.register(target, (event) => this.onEvent(event))
    }

    unregister(target) {
        this.eventRegister.unregister(target)
    }

    onEvent(event) {
        this.eventMapping[event.type]?.(event)
    }

}

export default MouseInputHandler