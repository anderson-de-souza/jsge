import Polygon from '../../core/shape/polygon.js'
import View from '../../core/view/view.js'
import LayeredViewRenderer from '../../core/view/layeredviewrenderer.js'
import RigidBody from '../../core/physics/body/rigidbody.js'
import PhysicsEngine from '../../core/physics/physicsengine.js'
import Looper from '../../core/loop/looper.js'
import Vector from '../../util/vector.js'

// --- CANVAS ---
const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const context = canvas.getContext('2d')

// --- SYSTEMS ---
const renderer = new LayeredViewRenderer(context)
const physicEngine = new PhysicsEngine(8, 32)
const looper = Looper.getInstance()

// --- BODY ---
function createBody(x, y, size, color, mass = 100) {

    const shape = new Polygon(size, 3)
    shape.setCenter(new Vector(x, y))

    const view = new View(context, shape)
    view.style.color = color
    view.style.zIndex = 1

    renderer.addView(view)

    const body = new RigidBody({ shape, mass })
    physicEngine.addBody(body)

    return body
}

// --- CHÃO (fake pesado) ---
function createFloor() {

    const size = 60
    const count = Math.ceil(canvas.width / size)

    for (let i = 0; i < count; i++) {

        createBody(
            i * size + size / 2,
            canvas.height - size / 2,
            size,
            'black',
            0 // muito pesado
        )
    }
}

// --- TORRE ---
function createStack(bodies, x, baseY, size, height) {

    for (let i = 0; i < height; i++) {

        const y = baseY - i * (size * 3)

        const body = createBody(
            x,
            y,
            size,
            `hsl(${(i / height) * 360}, 70%, 60%)`,
            1
        )

        bodies.push(body)
    }

    return bodies
}

// --- INIT ---
createFloor()

const stack = createStack(
    [],
    canvas.width / 2,
    canvas.height - 200,
    30,
    8 // começa com 5–8
)

// --- GRAVIDADE FAKE ---
function applyFakeGravity() {
    for (const body of stack) {
        body.addForce(0, 800)
    }
}

// No motor ou no loop
function applyGravity() {
    for (const body of stack) {
        if (body.mass <= 0 || body.sleeping) continue
        
        const g = 800
        body.addForce(0, body.mass * g)
    }
}


// --- LOOP ---
looper.addCallback((dt) => {
    const fixedDt = Math.min(dt, 0.060);

applyGravity(fixedDt);
physicEngine.run(fixedDt);
})

looper.addCallback(() => renderer.run())

looper.startLoop()
