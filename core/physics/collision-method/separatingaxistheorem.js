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
    
    static getInsideCorners(a, b) {

        expect(Polygon, a)
        expect(Polygon, b)
        
        const bAxes = b.getAxes()
        
        const aCorners = a.getCorners()
        const bCorners = b.getCorners()
        
        const insideCorners = []
        
        for (const corner of aCorners) {
            
            let isInside = true
            
            inner: for (const bAxis of bAxes) {
                
                const [ bMin, bMax ] = SAT.project(bAxis, bCorners)
                
                const pointProjection = corner.dot(bAxis)
                
                if (pointProjection < bMin || pointProjection > bMax) {
                    isInside = false
                    break inner
                }
                
            }
            
            if (isInside) {
                insideCorners.push(corner)
            }
            
        }
        
        return insideCorners
        
    }
    
    static project(axis, corners) {
        
        expect(Vector, axis)
        expect(Array, corners)
        
        let min =  Infinity
        let max = -Infinity
        
        for (const corner of corners) {
            
            const projection = corner.dot(axis)
            
            min = Math.min(min, projection)
            max = Math.max(max, projection)
            
        }
        
        return [ min, max ]
        
    }
 
}

export default SAT