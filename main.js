import Circle from './core/shape/circle.js'
import Polygon from './core/shape/polygon.js'
import Rectangle from './core/shape/rectangle.js'
import SAT from './core/physic/collision-method/separatingaxistheorem.js'
import Vector from './util/vector.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const context = canvas.getContext('2d')

const polygonA = new Rectangle(20, 50)
polygonA.centerX = 64
polygonA.centerY = 64
polygonA.rotationAngle = 90

const polygonB = new Circle(70)
polygonB.height = 100
polygonB.centerX = 256
polygonB.centerY = 64
polygonB.rotationAngle = 136

function draw(polygon, color = 'green') {
    
    
    const path = polygon.getDrawingPath()

    context.fillStyle = color
    context.strokeStyle = color
    context.lineWidth = 1
    context.stroke(path)
    
}

let v = 2

function animate() {
    
    polygonA.centerX += v
    polygonB.centerX -= v
    
    let mtv = SAT.getMTV(polygonA, polygonB)
    
    if (mtv) {
        
        const direction = polygonB.getCenter().subtract(polygonA.getCenter())
        
        if (direction.dot(mtv) < 0) {
            mtv = mtv.reverse()
        }
        
        polygonA.setCenter(
            polygonA.getCenter().subtract(mtv)
        )
            
        v = 1
        
    }
    
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    const box = polygonB.getBoundingBox()
    context.fillStyle = 'green'
    context.fillRect(box.x, box.y, box.width, box.height)

    draw(polygonA, 'red')
    
    draw(polygonB, 'purple')
    
    requestAnimationFrame(animate)
    
}

animate()