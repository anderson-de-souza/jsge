class KeyboardInputHandler {

    constructor(keyMapping) {
        this.keyMapping = keyMapping
        this.eventRegister = new EventRegisterer('keydown', 'keyup')
    }

    register() {
        this.eventRegister.register(window, (event) => this.onKey(event))
    }

    unregister() {
        this.eventRegister.unregister(window)
    }

    onKey(event) {
        this.keyMapping[event.key]?.()
    }

}