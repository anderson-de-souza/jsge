import Shape from './shape.js'

class Circle extends Shape {

    constructor(radius = 0) {
        super()
        this.x = 0
        this.y = 0
        this.radius = radius
        this.startAngle = 0
        this.endAngle = Math.PI * 2
        this.angle = 0
    }

    get diameter() {
        return this.radius * 2
    }

    create() {
        const path = new Path2D()
        path.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true)
        path.closePath()
        return path
    }

}

export default Circle