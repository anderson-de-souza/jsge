import expect from './expect.js'
import Shape from '../core/shape/shape.js'

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
    
    generateKey(x, y) {
        expect('number', x)
        expect('number', y)
        return `${ Math.floor(expect('number', x) / this.cellSize) },${ Math.floor(expect('number', y) / this.cellSize) }`
    }
    
    generateKeys(shape) {
        shape = expect(Shape, shape)
        
        const box = shape.getBoundingBox()
        
        const startX = Math.floor(box.x / this.cellSize)
        const startY = Math.floor(box.y / this.cellSize)
        
        const endX = Math.floor((box.x + box.width) / this.cellSize)
        const endY = Math.floor((box.y + box.height) / this.cellSize)
        
        const keys = new Set()
    
        for (let cellX = startX; cellX <= endX; cellX++) {
            for (let cellY = startY; cellY <= endY; cellY++) {
                keys.add(`${ cellX },${ cellY }`)
            }
        }
        
        return keys
        
    }

    findCell(x, y, autoCreate = false) {
        const key = this.generateKey(x, y)
        
        let cell = this.#grid.get(key)
        if (!cell && autoCreate) {
            cell = new Set()
            this.#grid.set(key, cell)
        }
        
        return cell
        
    }
    
    removeEmptyCell(x, y) {
        const key = this.generateKey(x, y)
        const cell = this.#grid.get(key)
        if (cell?.size === 0) {
            this.#grid.delete(key)
        }
    }

    addShape(shape) {
        for (const key of this.generateKeys(shape)) {
            let cell = this.#grid.get(key)
            if (!cell) {
                cell = new Set()
                this.#grid.set(key, cell)
            }
            cell.add(shape)
        }
    }

    removeShape(shape) {
        for (const key of this.generateKeys(shape)) {
            const cell = this.#grid.get(key)
            if (cell) {
                cell.delete(shape)
                if (cell.size === 0) {
                    this.#grid.delete(key)
                }
            }
        }
    }

    updateShape(shape) {
        this.removeShape(shape)
        this.addShape(shape)
    }

    rebuild(shapes) {
        expect(Array, shapes)
        
        this.#grid.clear()

        for (const shape of shapes) {
            this.addShape(shape)
        }
    }

    findAround(shape, range = 1) {
        expect(Shape, shape)
        
        const around = new Set()
        
        const box = shape.getBoundingBox()
        
        const startX = Math.floor(box.x / this.cellSize) - range
        const startY = Math.floor(box.y / this.cellSize) - range
        
        const endX = Math.floor((box.x + box.width) / this.cellSize) + range
        const endY = Math.floor((box.y + box.height) / this.cellSize) + range
        
        for (let cellX = startX; cellX < endX; cellX++) {
            for (let cellY = startY; cellY < endY; cellY++) {
                
                const cell = this.#grid.get(`${ cellX },${ cellY }`)
                
                if (cell) {
                    for (const child of cell) {
                        if (child !== shape) {
                            around.add(child)
                        }
                    }
                }
            }
        }
        
        return around
        
    }

}

export default SpatialGrid
