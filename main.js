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
circle.centerX = 200
circle.centerY = 200
circle.endAngle = 180
circle.closeDrawing = false
circle.axisAngle = 360

const rect = new Rectangle(170, 90)
rect.centerX = 200
rect.centerY = 200

rect.axisAngle = 45

const view = new View(context, rect)
view.style.filled = false

const rect2 = new Rectangle(200, 200)
rect2.centerX = 100
rect2.centerY = 100
const view2 = new View(context, rect2)
view2.style.filled = false

view.draw()
view2.draw()

const player = new Player(context)

player.addOnClickCallback((event) => {

})