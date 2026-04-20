import Shape from '../core/shape/shape.js'

class SpatialGrid {
    
    #cellSize
    #invertCellSize
    
    #shapeKeys
    #grid
    
    constructor(cellSize) {
        this.cellSize = cellSize
        this.#shapeKeys = new Map()
        this.#grid = new Map()
    }
    
    get cellSize() {
        return this.#cellSize
    }
    
    set cellSize(value) {
        this.#cellSize = value
        this.#invertCellSize = 1 / this.#cellSize
    }
    
    generateKey(x, y) {
        return `${Math.floor(x * this.#invertCellSize)},${Math.floor(y * this.#invertCellSize)}`
    }
    
    cellToKey(cellX, cellY) {
        return `${cellX},${cellY}`
    }
    
    generateKeys(shape) {
        const box = shape.getBoundingBox()
        
        const startX = Math.floor(box.x * this.#invertCellSize)
        const startY = Math.floor(box.y * this.#invertCellSize)
        
        const endX = Math.floor((box.x + box.width) * this.#invertCellSize)
        const endY = Math.floor((box.y + box.height) * this.#invertCellSize)
        
        const keys = []
    
        for (let cellX = startX; cellX <= endX; cellX++) {
            for (let cellY = startY; cellY <= endY; cellY++) {
                keys.push(this.cellToKey(cellX, cellY))
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
        
        if (this.#shapeKeys.has(shape)) {
            this.removeShape(shape)
        }
        
        const keys = this.generateKeys(shape)
        this.#shapeKeys.set(shape, keys)
        
        for (const key of keys) {
            let cell = this.#grid.get(key)
            if (!cell) {
                cell = new Set()
                this.#grid.set(key, cell)
            }
            cell.add(shape)
        }
    }

    removeShape(shape) {
        const keys = this.#shapeKeys.get(shape)
        if (!keys) return
        for (const key of keys) {
            const cell = this.#grid.get(key)
            if (cell) {
                cell.delete(shape)
                if (cell.size === 0) {
                    this.#grid.delete(key)
                }
            }
        }
        this.#shapeKeys.delete(shape)
    }

    updateShape(shape) {
        this.removeShape(shape)
        this.addShape(shape)
    }

    rebuild(shapes) {
        
        this.#grid.clear()
        this.#shapeKeys.clear()

        for (const shape of shapes) {
            this.addShape(shape)
        }
        
    }

    findAround(shape, range = 1) {
        
        const around = new Set()
        
        const box = shape.getBoundingBox()
        
        const startX = Math.floor(box.x * this.#invertCellSize) - range
        const startY = Math.floor(box.y * this.#invertCellSize) - range
        
        const endX = Math.floor((box.x + box.width) * this.#invertCellSize) + range
        const endY = Math.floor((box.y + box.height) * this.#invertCellSize) + range
        
        for (let cellX = startX; cellX <= endX; cellX++) {
            for (let cellY = startY; cellY <= endY; cellY++) {
                
                const cell = this.#grid.get(this.cellToKey(cellX, cellY))
                
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
