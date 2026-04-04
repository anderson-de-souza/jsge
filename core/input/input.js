import expect from '../../util/expect.js'
import Vector from '../../util/vector.js'

const Input = (function() {
    
    const mouseButtonMap = new Map([
        ['left', 0],
        ['middle', 1],
        ['right', 2]
    ])
    
    class Input {
        
        static #instance
        
        #keyPressedSet
        
        #mouseButtonPressedSet

        #mousePointerPositionX
        #mousePointerPositionY
        
        #mouseWheelDeltaX
        #mouseWheelDeltaY

        constructor() {

            if (Input.#instance) {
                return Input.#instance
            }

            Input.#instance = this
            
            this.#keyPressedSet = new Set()
            this.#mouseButtonPressedSet = new Set()
            
        }
        
        addKeyPressed(key) {
            expect('string', key)
            this.#keyPressedSet.add(key)
        }
        
        removeKeyPressed(key) {
            this.#keyPressedSet.delete(key)
        }
        
        isKeyPressed(key) {
            return this.#keyPressedSet.has(key)
        }
        
        setMousePointerPosition(x, y) {
            this.#mousePointerPositionX = x
            this.#mousePointerPositionY = y
        }

        getMousePointerPosition() {
            return new Vector(this.#mousePointerPositionX, this.#mousePointerPositionY)
        }
        
        getMousePointerPositionX() {
            return this.#mousePointerPositionX
        }

        getMousePointerPositionY() {
            return this.#mousePointerPositionY
        }
        
        addMouseButtonPressed(buttonCode) {
            expect('number', buttonCode)
            if (buttonCode < 0 || buttonCode > 3) {
                throw new Error('button code not supported')
            }
            this.#mouseButtonPressedSet.add(buttonCode)
        }
        
        removeMouseButtonPressed(buttonCode) {
            this.#mouseButtonPressedSet.delete(buttonCode)
        }
        
        isMouseButtonPressed(buttonName) {
            expect('string', buttonName)
            const buttonCode = mouseButtonMap.get(buttonName)
            return this.#mouseButtonPressedSet.has(buttonCode)
        }
        
        setMouseWheelDeltaX(value) {
            this.#mouseWheelDeltaX = expect('number', value)
        }
        
        getMouseWheelDeltaX() {
            return this.#mouseWheelDeltaX
        }
        
        setMouseWheelDeltaY(value) {
            this.#mouseWheelDeltaY = expect('number', value)
        }
        
        getMouseWheelDeltaY() {
            return this.#mouseWheelDeltaY
        }
        
        static getInstance() {
            return Input.#instance ?? new Input()
        }
        
    }
    
    return Input
    
})()

export default Input