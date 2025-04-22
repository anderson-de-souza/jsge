
import expect from '../../../util/expect.js'
import Shape from '../../shape/shape.js'

class AABB {

    constructor() {
        throw new Error('This class cannot be instantiated')
    }

    static isCollided(obj, obst) {

        expect(Shape, obj)
        expect(Shape, obst)

        let deltaX = obj.centerX - obst.centerX
        let deltaY = obj.centerY - obst.centerY
        
        let thresholdX = obj.halfWidth + obst.halfWidth
        let thresholdY = obj.halfHeight + obst.halfHeight
        
        return Math.abs(deltaX) < thresholdX && Math.abs(deltaY) < thresholdY

    }

    static getOverlap(obj, obst) {
        
        expect(Shape, obj)
        expect(Shape, obst)

        const overlap = { x: 0, y: 0 }

        let deltaX = obj.centerX - obst.centerX
        let deltaY = obj.centerY - obst.centerY
        
        let thresholdX = obj.halfWidth + obst.halfWidth
        let thresholdY = obj.halfHeight + obst.halfHeight
        
        if (Math.abs(deltaX) < thresholdX && Math.abs(deltaY) < thresholdY) {
            overlap.x = thresholdX - Math.abs(deltaX)
            overlap.y = thresholdY - Math.abs(deltaY)
        }

        return overlap

    }
 
} 

export default AABB