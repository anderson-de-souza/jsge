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
        #mousePointerPosition

        constructor() {
            if (Input.#instance) {
                return Input.#instance
            }
            Input.#instance = this
            
            this.#keyPressedSet = new Set()
            
            this.#mouseButtonPressedSet = new Set()
            this.#mousePointerPosition = new Vector()
            
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
        
        static isKeyPressed(key) {
            return Input.getInstance().isKeyPressed(key)
        }
        
        setMousePointerPosition(x, y) {
            this.#mousePointerPosition = new Vector(x, y)
        }
        
        getMousePointerPosition() {
            return this.#mousePointerPosition
        }
        
        static getMousePointerPosition() {
            return Input.getInstance().getMousePointerPosition()
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
        
        static isMouseButtonPressed(buttonName) {
            return Input.getInstance().isMouseButtonPressed(buttonName)
        }
        
        static getInstance() {
            return Input.#instance ?? new Input()
        }
        
    }
    
    return Input
    
})()

export default Input