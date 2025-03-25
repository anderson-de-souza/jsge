class SpatialGrid {
    
    constructor(cellSize) {
        this.cellSize = cellSize

        this.grid = new Map()

    }
    
    generateKey(x, y) {
        const cellX = Math.floor(x / this.cellSize)
        const cellY = Math.floor(y / this.cellSize)
        return `${ cellX },${ cellY }`
    }

    generateKeys(body) {

        const keys = new Set()

        for (let x = body.left; x <= body.right; x += this.cellSize) {
            for (let y = body.top; y <= body.bottom; y += this.cellSize) {

                keys.add(this.generateKey(x, y))

            }
        }

        return keys
    }
    
    findCell(x, y, autoCreate = false) {
        
        const key = this.generateKey(x, y)
        let cell = this.grid.get(key)
        
        if (!cell && autoCreate) {
            cell = new Set() 
            this.grid.set(key, cell)
        }
        
        return cell
        
    }
    
    removeEmptyCell(x, y) {
        
        const key = this.generateKey(x, y)
        const cell = this.grid.get(key)
        
        if (cell?.size === 0) {
            this.grid.delete(key)
        }
        
    }

    findCells(body) {
        const cells = new Set()
        for (let x = body.left; x <= body.right; x += this.cellSize) {
            for (let y = body.top; y <= body.bottom; y += this.cellSize) {
                const cell = this.findCell(x, y, true)
                cells.add(cell)
            }
        }
        return cells
    }
    
    addBody(body) {
        
        for (let x = body.left; x <= body.right; x += this.cellSize) {
            for (let y = body.top; y <= body.bottom; y += this.cellSize) {
                
                const cell = this.findCell(x, y, true)
                cell.add(body)
                
            }
        }
        
    }
    
    removeBody(body) {

        this.findCells(body).forEach(cell =>
            cell.delete(body)
        )
        
    }
    
    findNearbyBodies(body) {
        
        const nearbyBodies = new Set()
        
        this.generateKeys(body).forEach(key => {

            const cell = this.grid.get(key)
            
            if (cell) {
                cell.forEach(cellChild => {
                    if (cellChild !== body) {
                        nearbyBodies.add(cellChild)
                    }
                })
            }
            
        })
        
        return nearbyBodies
        
    }
    
}
