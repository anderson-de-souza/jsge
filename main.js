
import Circle from './core/shape/circle.js'
import Polygon from './core/shape/polygon.js'
import Rectangle from './core/shape/rectangle.js'

import View from './core/view/view.js'
import ViewRenderer from './core/view/viewrenderer.js'
import LayeredViewRenderer from './core/view/layeredviewrenderer.js'

import RigidBody from './core/physics/body/rigidbody.js'
import PhysicsEngine from './core/physics/physicsengine.js'

import Looper from './core/loop/looper.js'

import Vector from './util/vector.js'
import SpatialGridViewer from './debug/spatialgridviewer.js'

const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const context = canvas.getContext('2d')

const rect = new Polygon(50, 4)
rect.setCenter(new Vector(100, 160))

const rectView = new View(context, rect)
rectView.style.strokeColor = 'red'
rectView.style.zIndex = 1
const renderer = new LayeredViewRenderer(context)

renderer.addView(rectView)

const physicEngine = new PhysicsEngine(100)

const body1 = new RigidBody(rect)

//physicEngine.addBody(body1)

//setTimeout(() => body1.forceX = 17000, 1000)

const rect2 = new Polygon(50, 4)
rect2.setCenter(new Vector(100, 160))

const rectView2 = new View(context, rect2)
rectView2.style.strokeColor = 'green'

renderer.addView(rectView2)

const body2 = new RigidBody(rect2)

//physicEngine.addBody(body2)

//setTimeout(() => body2.forceX = -17000, 1000)

const looper = Looper.instance

const gridDebug = new SpatialGridViewer(context, physicEngine.gridCellSize)

//looper.addCallback((deltaTime) => physicEngine.run(deltaTime))
looper.addCallback(() => renderer.run())
looper.addCallback(() => gridDebug.show())

looper.startLoop()
