import SpatialGridViewer from '../../debug/spatialgridviewer.js'
import Looper from '../loop/looper.js'
import PhysicsEngine from '../physics/physicsengine.js'
import LayeredViewRenderer from '../view/layeredviewrenderer.js'
import ViewRenderer from '../view/viewrenderer.js'

class GameEngine {

    #entities
    #renderer
    #physicsEngine
    #looper
    #gridDebug

    constructor({
        context,
        useLayeredRenderer = true,
        physicsIterations = 100,
        showGrid = false,
        gridCellSize = 64
    }) {

        this.#entities = new Map()

        this.#renderer = useLayeredRenderer
            ? new LayeredViewRenderer(context)
            : new ViewRenderer(context)

        this.#physicsEngine = new PhysicsEngine(physicsIterations, gridCellSize)

        this.#looper = Looper.getInstance()

        this.#gridDebug = showGrid
            ? new SpatialGridViewer(context, this.#physicsEngine.gridCellSize)
            : null
    }

    addEntity(entity) {

        this.#entities.set(entity.id, entity)

        if (entity.body) {
            this.#physicsEngine.addBody(entity.body)
        }

        if (entity.view) {
            this.#renderer.addView(entity.view)
        }

    }

    removeEntity(entity) {

        this.#entities.delete(entity.id)

        if (entity.body) {
            this.#physicsEngine.removeBody(entity.body)
        }

        if (entity.view) {
            this.#renderer.removeView(entity.view)
        }

    }

    start() {

        this.#looper.addCallback((deltaTime) => this.#physicsEngine.run(deltaTime))

        this.#looper.addCallback(() => this.#renderer.run())

        if (this.#gridDebug) {
            this.#looper.addCallback(() => this.#gridDebug.show())
        }

        this.#looper.startLoop()
    }

    stop() {
        this.#looper.stopLoop()
    }

    get entities() {
        return this.#entities
    }

    get physics() {
        return this.#physicsEngine
    }

    get renderer() {
        return this.#renderer
    }
}

export default GameEngine