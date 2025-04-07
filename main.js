import CanvasProxy from './core/canvasproxy.js'
import ContextProxy from './core/contextproxy.js'
import Circle from './core/shape/circle.js'
import ImageView from './core/view/imageview.js'
import TextView from './core/view/textview.js'
import View from './core/view/view.js'

let canvas = new CanvasProxy('canvas')
canvas.fullScreen()

let context = new ContextProxy(canvas)

const circle = new Circle(100)
circle.x = 200
circle.y = 200

let view = new ImageView(context, circle)
view.isCropped = true
view.crop(16, 16, 20, 30)
view.load('./resources/hero.png')

let text = new TextView(context)
text.content = 'so good!'
text.shape.x = 400
text.shape.y = 200
text.draw()
