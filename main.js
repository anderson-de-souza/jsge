const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const context = new ContextDelegate(canvas)

const player = new RigidBody(context, 50, 50)
player.x = 150

const enemy = new RigidBody(context, 100, 100)
enemy.x = 700

setTimeout(() => {
    player.forceX = 15000
    
}, 1000)

context.renderer.add(player)
context.renderer.add(enemy)
context.renderer.run()

const physicEngine = new PhysicEngine(context)

physicEngine.add(player)
physicEngine.add(enemy)

Looper.instance.add((deltaTime) => physicEngine.run(deltaTime))
Looper.instance.add(() => context.renderer.run())
Looper.instance.startLoop()