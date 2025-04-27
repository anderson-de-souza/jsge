import expect from '../../../util/expect.js'
import Polygon from '../../shape/polygon.js'
import Vector from '../../../util/vector.js'

class SAT {

    constructor() {
        throw new Error('This class cannot be instantiated')
    }

    static isColliding(a, b) {

        expect(Polygon, a)
        expect(Polygon, b)
        
        const axes = [ ...a.getAxes(), ...b.getAxes() ]
        
        const aCorners = a.getCorners()
        const bCorners = b.getCorners()
        
        for (const axis of axes) {
            
            const [ aMin, aMax ] = SAT.project(axis, aCorners)
            const [ bMin, bMax ] = SAT.project(axis, bCorners)
            
            if (aMax < bMin || bMax < aMin) {
                return false
            }
            
        }
        
        return true
        
    }
    
    static getMTV(a, b) { // Minimum Translate Vector
        
        expect(Polygon, a)
        expect(Polygon, b)
        
        const axes = [...a.getAxes(), ...b.getAxes()]
        
        const aCorners = a.getCorners()
        const bCorners = b.getCorners()
        
        let smallestAxis = null
        let smallestOverlap = Infinity
        
        for (const axis of axes) {
            
            const [aMin, aMax] = SAT.project(axis, aCorners)
            const [bMin, bMax] = SAT.project(axis, bCorners)
            
            if (aMax < bMin || bMax < aMin) {
                return null
            }
            
            const overlapLeft = aMax - bMin
            const overlapRight = bMax - aMin
            
            const overlap = Math.min(overlapLeft, overlapRight)
            
            if (overlap < smallestOverlap) {
                smallestOverlap = overlap
                smallestAxis = axis
            }
            
        }
        
        return new Vector(
            smallestAxis.x * smallestOverlap,
            smallestAxis.y * smallestOverlap
        )
        
    }
    
    static project(axis, corners) {
        
        expect(Vector, axis)
        expect(Array, corners)
        
        let min = Infinity
        let max = -Infinity
        
        for (const corner of corners) {
            
            const scalarProduct = corner.dot(axis)
            
            min = Math.min(min, scalarProduct)
            max = Math.max(max, scalarProduct)
            
        }
        
        return [ min, max ]
        
    }
 
}

export default SAT