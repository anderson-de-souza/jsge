import Polygon from './core/shape/Polygon.js'
import SAT from './core/physic/collision-method/separatingaxistheorem.js'
import Vector from './util/vector.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const context = canvas.getContext('2d')

const polygonA = new Polygon(20, 6)
polygonA.centerX = 64
polygonA.centerY = 64
polygonA.rotationAngle = 45

const polygonB = new Polygon(20, 6)
polygonB.centerX = 256
polygonB.centerY = 64
polygonB.rotationAngle = 45

function draw(polygon, color = 'green') {
    
    
    const path = polygon.getDrawingPath()

    context.fillStyle = color
    context.strokeStyle = 'black'
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
        
        polygonB.setCenter(
            polygonB.getCenter().add(mtv)
        )
            
        v = 1
        
    }
    
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    draw(polygonA, 'purple')
    draw(polygonB)
    
    requestAnimationFrame(animate)
    
}

animate()