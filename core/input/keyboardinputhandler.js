import EventRegisterer from '../eventregisterer.js'

class KeyboardInputHandler {

    constructor(
        keyMapping,
        events = [
            'keydown', 'keyup'
        ]
    ) {
        this.keyMapping = keyMapping
        this.eventRegister = new EventRegisterer(events)
    }

    register() {
        this.eventRegister.register(window, (event) => this.onKey(event))
    }

    unregister() {
        this.eventRegister.unregister(window)
    }

    onKey(event) {
        this.keyMapping[event.key]?.(event)
    }

}

export default KeyboardInputHandler