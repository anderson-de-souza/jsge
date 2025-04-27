import expect from './expect.js'
import Shape from '../../core/shape/shape.js';
import Vector from './vector.js'

class SpatialGrid {
    
    #cellSize
    #grid
    
    constructor(cellSize) {
        this.cellSize = cellSize
        this.#grid = new Map()
    }
    
    get cellSize() {
        return this.#cellSize
    }
    
    set cellSize(value) {
        this.#cellSize = expect('number', value)
    }
    
    generateKey(vector) {
        return `${ Math.floor(expect(Vector, vector).x / this.cellSize) },${ Math.floor(vector.y / this.cellSize) }`
    }

    findCell(vector, autoCreate = false) {
        const key = this.generateKey(vector)
        const cell = this.#grid.get(key)
        
        if (!cell && autoCreate) {
            cell = new Set()
            this.#grid.set(key, cell)
        }
        
        return cell
        
    }
    
    removeEmptyCell(vector) {
        const cell = this.findCell(vector)
        if (cell?.size === 0) {
            this.#grid.delete(
                    this.generateKey(vector)
                )
        }
    }

    add(object) {
        const corners = expect(Shape, object).getCorners()
        for (const corner of corners) {
            const cell = this.findCell(corner, true)
            cell.add(object)
        }
    }

    remove(object) {
        const corners = expect(Shape, object).getCorners()
        for (const corner of corners) {
            const cell = this.findCell(corner)
            if (cell) {
                cell.delete(object)
                if (cell.size === 0) {
                    this.removeEmptyCell(corner)
                }
            }
        }
    }

    findNearby(object) {
        const objects = new Set()
        const corners = expect(Shape, object).getCorners()
        
        for (const corner of corners) {
            const cell = this.findCell(corner)
            if (cell) {
                for (const child of cell) {
                    if (child !== object) {
                        objects.add(child)
                    }
                }
            }
        }
        
        return objects
        
    }

}

export default SpatialGrid
