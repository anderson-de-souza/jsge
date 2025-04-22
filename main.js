import Circle from './core/shape/circle.js'
import Rectangle from './core/shape/rectangle.js'
import Player from './interactive/player.js'
import Polygon from './core/shape/polygon.js'
import View from './core/view/view.js'

let canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

let context = canvas.getContext('2d')

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

const rect2 = new Rectangle(200, 200)
rect2.centerX = 100
rect2.centerY = 100

const view2 = new View(context, rect2)

const poly = new Polygon(8, 4)
poly.centerX = 400
poly.centerY = 400

const viewpoly = new View(context, poly)

view.draw()
view2.draw()
viewpoly.draw()

poly.centerX = 200
poly.centerY = 200
poly.edgeCount = 7
viewpoly.draw()


const player = new Player(context)

player.addOnClickCallback((event) => {

})