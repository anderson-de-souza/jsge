import EventRegisterer from '../../util/eventregisterer.js'
import Input from './input.js'

class KeyboardInputHandler {
    
    #keyMapping
    #eventRegister

    constructor(
        keyMapping,
        events = [
            'keydown', 'keyup'
        ]
    ) {
        this.#keyMapping = keyMapping
        this.#eventRegister = new EventRegisterer(events)
    }

    register() {
        this.#eventRegister.register(window, (event) => this.onKey(event))
    }

    unregister() {
        this.#eventRegister.unregister(window)
    }

    onKey(event) {
        if (event.type === 'keydown') {
            Input.getInstance().addKeyPressed(event.key)
        } else if (event.type === 'keyup') {
            Input.getInstance().removeKeyPressed(event.key)
        }
        this.#keyMapping[event.key]?.(event)
    }

}

export default KeyboardInputHandler