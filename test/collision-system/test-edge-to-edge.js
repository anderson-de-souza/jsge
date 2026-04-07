import Polygon from '../../core/shape/polygon.js'
import View from '../../core/view/view.js'
import LayeredViewRenderer from '../../core/view/layeredviewrenderer.js'
import RigidBody from '../../core/physics/body/rigidbody.js'
import PhysicsEngine from '../../core/physics/physicsengine.js'
import Looper from '../../core/loop/looper.js'
import Vector from '../../util/vector.js'

const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const context = canvas.getContext('2d')

const renderer = new LayeredViewRenderer(context)
const physicEngine = new PhysicsEngine(100, 100)
const looper = Looper.getInstance()

function createBody(x, y, size, color, mass = 1, rotation = 0) {

    const shape = new Polygon(size, 4)
    shape.setCenter(new Vector(x, y))
    shape.rotationAngle = rotation

    const view = new View(context, shape)
    view.style.color = color
    view.style.zIndex = 1

    renderer.addView(view)

    const body = new RigidBody({ shape, mass })
    physicEngine.addBody(body)

    return body
}

const b1 = createBody(
    canvas.width / 2,
    canvas.height / 2,
    100,
    'red',
    1,
    Math.PI / 4
)

const b2 = createBody(
    canvas.width / 2,
    canvas.height / 2,
    100,
    'orange',
    1,
    -Math.PI / 4
)

const b3 = createBody(
    canvas.width / 2,
    canvas.height / 2 - 150,
    80,
    'purple',
    1,
    0
)

setTimeout(() => {
    b1.forceX = 2000 * 4
    b2.forceX = -2000
}, 1000)

setTimeout(() => {
    b3.forceY = 12000
}, 2000)

looper.addCallback((dt) => physicEngine.run(dt))
looper.addCallback(() => renderer.run())

looper.startLoop()