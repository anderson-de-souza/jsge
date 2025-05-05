import {
    applyRestitution, 
    applyRotation, 
    applySeparation
} from './interaction/rigidbodyinteractions.js'

import expect from '../../util/expect.js'
import Record from '../../util/record.js'
import RigidBody from './body/rigidbody.js'
import SAT from './collision-method/separatingaxistheorem.js'
import ShapeLinker from '../global/shapelinker.js'
import SpatialGrid from '../../util/spatialgrid.js'

class PhysicsEngine {
    
    #gridCellSize
    #spatialgrid
    #bodies
    
    constructor(gridCellSize) {
        this.#gridCellSize = gridCellSize
        this.#spatialgrid = new SpatialGrid(gridCellSize)
        this.#bodies = new Set()
    }
    
    get gridCellSize() {
        return this.#gridCellSize
    }
    
    addBody(body) {
        expect(RigidBody, body)
        this.#bodies.add(body)
        this.#spatialgrid.addShape(body.shape)
    }
    
    removeBody(body) {
        expect(RigidBody, body)
        this.#bodies.delete(body)
        this.#spatialgrid.removeShape(body.shape)
    }

    run(deltaTime) {
        const bodyRecord = new Record()
        const processedPairs = new Set()
        
        for (let obj of this.#bodies) {
            
            this.#spatialgrid.removeShape(obj.shape)
            bodyRecord.save(obj)
            
            const around = this.#spatialgrid.findAround(obj.shape)
            
            for (let obstShape of around) {
                const obst = ShapeLinker.instance.getBody(obstShape)
                if (obj === obst) continue
                
                const pairId = [obj, obst].sort().join('-')
                if (processedPairs.has(pairId)) continue
                
                processedPairs.add(pairId)
                
                const mtv = SAT.getMTV(obj.shape, obstShape)
                
                if (mtv) {
                    applyRestitution(obj, obst)
                    applyRotation(obj, obst)
                    applySeparation(obj, obst)
                }
                
            }
            
            obj.update(deltaTime)
            
            this.#spatialgrid.addShape(obj.shape)
            
        }
    }
    
}

export default PhysicsEngine