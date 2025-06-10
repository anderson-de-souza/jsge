import EventRegisterer from '../../util/eventregisterer.js'
import Input from './input.js'

class MouseInputHandler {
    
    #eventMapping
    #eventRegister

    constructor(
        eventMapping, 
        events = [
            'click', 'dblclick', 'mousedown',
            'mouseup', 'mousemove', 'mouseover',
            'mouseout','mouseenter','mouseleave'
        ]
    ) {
        this.#eventMapping = eventMapping
        this.#eventRegister = new EventRegisterer(events)
    }

    register(target) {
        this.#eventRegister.register(target, (event) => this.onEvent(event))
    }

    unregister(target) {
        this.#eventRegister.unregister(target)
    }

    onEvent(event) {
        
        if (event.type === 'mousemove') {
            Input.getInstance().setMousePointerPosition(event.clientX, event.clientY)
        } else if (event.type === 'mousedown') {
            Input.getInstance().addMouseButtonPressed(event.button)
        } else if (event.type === 'mouseup') {
            Input.getInstance().removeMouseButtonPressed(event.button)
        }
        
        this.#eventMapping[event.type]?.(event)
        
    }

}

export default MouseInputHandler