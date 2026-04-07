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

const target = createBody(
    canvas.width / 2 + 150,
    canvas.height / 2,
    120,
    'blue',
    1
)

const attacker = createBody(
    canvas.width / 2 - 200,
    canvas.height / 2 - 150,
    80,
    'red',
    1,
    1
)

setTimeout(() => {
    attacker.forceX = 3000
    attacker.forceY = 3000
}, 500)

function createTachometer(body) {

    let elapsedTime = 0
    let accumulatedAngle = 0
    let totalRotations = 0

    return function renderTachometer(deltaTime) {

        elapsedTime += deltaTime

        const deltaAngle = body.angularVelocity * deltaTime
        accumulatedAngle += deltaAngle

        const fullTurns = Math.floor(Math.abs(accumulatedAngle) / (2 * Math.PI))

        if (fullTurns > 0) {
            totalRotations += fullTurns
            accumulatedAngle -= fullTurns * (2 * Math.PI) * Math.sign(accumulatedAngle)
        }

        const radPerSec = body.angularVelocity
        const rpm = radPerSec * (60 / (2 * Math.PI))

        const totalWithFraction = totalRotations + (accumulatedAngle / (2 * Math.PI))

        context.save()

        context.fillStyle = 'black'
        context.font = '20px monospace'

        context.fillText(`ω: ${radPerSec.toFixed(3)} rad/s`, 20, 30)
        context.fillText(`RPM: ${rpm.toFixed(2)}`, 20, 60)
        context.fillText(`Tempo: ${elapsedTime.toFixed(2)} s`, 20, 90)
        context.fillText(`Giros: ${totalWithFraction.toFixed(2)}`, 20, 120)

        context.restore()
    }
}

const tachometer = createTachometer(attacker)

looper.addCallback((dt) => physicEngine.run(dt))
looper.addCallback(() => renderer.run())
looper.addCallback((dt) => tachometer(dt))

looper.startLoop()