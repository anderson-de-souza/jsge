const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const context = new ContextDelegate(canvas)

const player = new RigidBody(context, 50, 50)
player.x = 150

const enemy = new RigidBody(context, 100, 100)
enemy.x = 700

const enemy2 = new RigidBody(context, 100, 100)
enemy2.x = 1200

setTimeout(() => {
    player.forceX = 15000
    enemy2.forceX = -20000
}, 1000)

context.renderer.add(player)
context.renderer.add(enemy)
context.renderer.add(enemy2)
context.renderer.run()

const physicEngine = new PhysicEngine(context)

const gridViewer = new SpatialGridViewer(context, physicEngine.spatialgrid.cellSize)

physicEngine.add(player)
physicEngine.add(enemy)
physicEngine.add(enemy2)

Looper.instance.add((deltaTime) => physicEngine.run(deltaTime))
Looper.instance.add(() => context.renderer.run())
Looper.instance.add(() => gridViewer.show())
Looper.instance.startLoop()