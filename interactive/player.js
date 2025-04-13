import expect from '../util/expect.js'
import KeyboardInputHandler from '../core/keyboardinputhandler.js'
import MouseInputHandler from '../core/mouseinputhandler.js'
import ContextProxy from '../core/contextproxy.js'

class Player {

    static #instance

    #cursor
    #mouseEventMapping
    #mouseInputHandler
    #keyboardInputHandler

    constructor(context) {

        if (Player.#instance) {
            return Player.#instance
        }

        Player.#instance = this

        this.context = expect(ContextProxy, context)

        this.#cursor = {
            x: 0,
            y: 0
        }

        this.onClickCallbacks = new Set()

        this.#mouseEventMapping = {
            click: (event) => {
                for (let callback of this.onClickCallbacks) {
                    callback(event)
                }
            },
            mousemove: (() => {

                let ticking = false

                return (event) => {

                    if (!ticking) {

                        window.requestAnimationFrame(() => {
                            const rect = event.currentTarget.getBoundingClientRect()
                            this.#cursor.x = event.clientX - rect.left
                            this.#cursor.y = event.clientY - rect.top
                            ticking = false
                        })

                        ticking = true

                    }
                }

            })()
        }
        
        this.#mouseInputHandler = new MouseInputHandler(this.#mouseEventMapping)
        this.#mouseInputHandler.register(this.context.canvas)

        this.keyMapping = {

        }

        this.#keyboardInputHandler = new KeyboardInputHandler(this.keyMapping)
        this.#keyboardInputHandler.register()

    }

    get cursor() {
        return { ...this.#cursor }
    }

    addOnClickCallback(callback) {
        if (expect('function', callback, false)) {
            this.onClickCallbacks.add(callback)
        }
    }

    removeOnClickCallback(callback) {
        this.onClickCallbacks.delete(callback)
    }

    destroy() {
        this.#mouseInputHandler.unregister(this.context.canvas)
        this.#keyboardInputHandler.unregister()
    }

    static get instance() {
        return new Player()
    }

}

export default Player