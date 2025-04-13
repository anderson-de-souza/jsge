import CanvasProxy from './core/canvasproxy.js'
import ContextProxy from './core/contextproxy.js'
import Circle from './core/shape/circle.js'
import Rectangle from './core/shape/rectangle.js'
import Player from './interactive/player.js'
import View from './core/view/view.js'

let canvas = new CanvasProxy('canvas')
canvas.fullScreen()

let context = new ContextProxy(canvas)

const circle = new Circle(100)
circle.x = 200
circle.y = 200

const rect = new Rectangle(100, 100)
rect.x = 50
rect.y = 50
rect.rotate(45)

const view = new View(context, rect)

view.draw()

setTimeout(() => {

    context.clearRect(0, 0, canvas.width, canvas.height)

    rect.x = 150
    rect.y = 150

    rect.width = 50
    rect.height = 50

    view.draw()

    console.log('ok');
    

}, 1000)

const player = new Player(context)

player.addOnClickCallback((event) => {

})