import CanvasDelegate from './core/canvasdelegate.js'
import ContextDelegate from './core/contextdelegate.js'
import KeyboardInputHandler from './core/keyboardinputhandler.js'
import Looper from './core/looper.js'
import MouseInputHandler from './core/mouseinputhandler.js'
import TextView from './core/textview.js'

const canvas = new CanvasDelegate('canvas')
canvas.fullScreen()

const context = new ContextDelegate(canvas)

const text = new TextView(context, '')
text.color = 'red'
text.x = 0
text.y = 0

const keyMapping = {

    ArrowUp: function() {
        text.charSequence = 'UP'
        text.x = (canvas.width / 2) - (text.textWidth / 2)
        text.y = 50
    },

    ArrowLeft: function() {
        text.charSequence = 'LEFT'
        text.x = 50
        text.y = (canvas.height / 2) - (text.textHeight / 2)
    },

    ArrowRight: function() {
        text.charSequence = 'RIGHT'
        text.x = canvas.width - text.textWidth - 50
        text.y = (canvas.height / 2) - (text.textHeight / 2)
    },

    ArrowDown: function() {
        text.charSequence = 'DOWN'
        text.x = (canvas.width / 2) - (text.textWidth / 2)
        text.y = canvas.height - text.textHeight - 50
    }

}

const keyboardInputHandler = new KeyboardInputHandler(keyMapping)
keyboardInputHandler.register()

const mouseinputhandler = new MouseInputHandler({
    mousemove: function(event) {
        console.log(event.x, event.y)
    }
})

mouseinputhandler.register(canvas)

context.background.add(text)

context.background.clearBefore = true

Looper.instance.add(() => context.background.run())
Looper.instance.startLoop()