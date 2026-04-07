import Circle from '../core/shape/circle.js'
import Polygon from '../core/shape/polygon.js'
import Rectangle from '../core/shape/rectangle.js'
import RigidBody from '../core/physics/body/rigidbody.js'
import Vector from './vector.js'
import AnimatedImageView from '../core/view/animatedimageview.js'
import View from '../core/view/view.js'
import Entity from '../core/entity/entity.js'

function createEntity({
    context,
    x = 0, 
    y = 0, 
    width = 1, 
    height = 1,
    radius = 1,
    mass = 1,
    restitution = 0.5,
    sides = 4,
    color,
    filled = true,
    spriteUrl,
    spriteWidth = 64,
    spriteHeight = 64 }) {

    let shape = null
    let body = null
    let view = null

    if (spriteUrl != null) {
        view = new AnimatedImageView(context, width, height, spriteWidth, spriteHeight)
        shape = view.shape
    } else {
        if (sides === 4) {
            shape = new Rectangle(width, height)
        } else if (sides >= 36) {
            shape = new Circle(radius)
        } else {
            shape = new Polygon(radius, sides)
        }

        view = new View(context, shape)
        view.style.filled = filled
        view.style.color = color
    }

    shape.setPosition(new Vector(x, y))

    body = new RigidBody({ shape, mass, restitution })

    return new Entity({ shape, body, view })

}