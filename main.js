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
circle.endAngle = 180
circle.closeDrawing = false
circle.axisAngle = 45

const rect = new Rectangle(170, 90)
rect.x = 200
rect.y = 200

rect.axisAngle = 90

const view = new View(context, circle)
view.style.filled = false

view.draw()

const player = new Player(context)

player.addOnClickCallback((event) => {

})