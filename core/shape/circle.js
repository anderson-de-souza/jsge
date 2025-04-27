import expect from '../../util/expect.js'
import Polygon from './polygon.js'

class Circle extends Polygon {

    constructor(radius) {
        super(radius, 36)
    }
    
    get edgeCount() {
        return super.edgeCount
    }

    set edgeCount(value) {
        if (expect('number', value) < 36) {
            throw new Error('Circle needs to have at least 36 edges')
        }
        super.edgeCount = value
    }
    
}

export default Circle