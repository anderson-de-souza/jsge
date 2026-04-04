
import Circle from '../core/shape/circle.js'
import Polygon from '../core/shape/polygon.js'
import Rectangle from '../core/shape/rectangle.js'

import View from '../core/view/view.js'
import ViewRenderer from '../core/view/viewrenderer.js'
import LayeredViewRenderer from '../core/view/layeredviewrenderer.js'

import RigidBody from '../core/physics/body/rigidbody.js'
import PhysicsEngine from '../core/physics/physicsengine.js'

import Looper from '../core/loop/looper.js'

import Vector from '../util/vector.js'
import SpatialGridViewer from '../debug/spatialgridviewer.js'

const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const context = canvas.getContext('2d')

const renderer = new LayeredViewRenderer(context)
const physicEngine = new PhysicsEngine(100)
const looper = Looper.getInstance()
const gridDebug = new SpatialGridViewer(context, physicEngine.gridCellSize)

const bodies = []

function createBody(x, y, sides, size, color, mass = 1) {

    const shape = new Polygon(size, sides)
    shape.setCenter(new Vector(x, y))

    const view = new View(context, shape)
    view.style.strokeColor = color
    view.style.zIndex = 1

    renderer.addView(view)

    const body = new RigidBody({ shape, mass })
    physicEngine.addBody(body)

    bodies.push(body)

    return body
}

// Criando 5 corpos
const b1 = createBody(200, 200, 4, 40, 'red', 0.2)
const b2 = createBody(350, 230, 4, 40, 'green', 0.5)
const b3 = createBody(500, 200, 4, 40, 'blue', 0.1)
const b4 = createBody(275, 350, 3, 50, 'yellow', 0.3)
const b5 = createBody(425, 350, 6, 35, 'purple', 0.4)

// Aplicando impulsos depois de 1s
setTimeout(() => {

    b1.forceX = 2000
    b2.forceX = -3500
    b3.forceY = 2000
    b4.forceY = -1500
    b5.forceX = -1000
    b5.forceY = 1000

}, 1000)

// Loop
looper.addCallback((deltaTime) => physicEngine.run(deltaTime))
looper.addCallback(() => renderer.run())
looper.addCallback(() => gridDebug.show())

looper.startLoop()