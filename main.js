const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const context = new ContextDelegate(canvas)

const text = new TextView(context, '')
text.x = 0
text.y = 0

const keyMapping = {

    ArrowUp: function() {
        text.charSequence = 'UP'
        text.x = (canvas.width / 2) - (text.width / 2)
        text.y = 50
    },

    ArrowLeft: function() {
        text.charSequence = 'LEFT'
        text.x = 50
        text.y = (canvas.height / 2) - (text.height / 2)
    },

    ArrowRight: function() {
        text.charSequence = 'RIGHT'
        text.x = canvas.width - text.width - 50
        text.y = (canvas.height / 2) - (text.height / 2)
    },

    ArrowDown: function() {
        text.charSequence = 'DOWN'
        text.x = (canvas.width / 2) - (text.width / 2)
        text.y = canvas.height - text.height - 50
    }

}

const keyboardInputHandler = new KeyboardInputHandler(keyMapping)
keyboardInputHandler.register()

context.renderer.add(text)

Looper.instance.add(() => context.renderer.run())
Looper.instance.startLoop()