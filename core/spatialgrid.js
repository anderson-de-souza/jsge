class SpatialGrid {
    
    constructor(cellSize) {
        this.cellSize = cellSize
        this.grid = new Map()
    }
    
    generateKey(x, y) {
        return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`
    }

    generateKeys(body) {
        const keys = new Set()
        const startX = Math.floor(body.left / this.cellSize)
        const startY = Math.floor(body.top / this.cellSize)
        const endX = Math.floor(body.right / this.cellSize)
        const endY = Math.floor(body.bottom / this.cellSize)
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                keys.add(`${x},${y}`)
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

    addBody(body) {
        this.generateKeys(body).forEach(key => {
            let cell = this.grid.get(key)
            if (!cell) {
                cell = new Set()
                this.grid.set(key, cell)
            }
            cell.add(body)
        })
    }

    removeBody(body) {
        this.generateKeys(body).forEach(key => {
            const cell = this.grid.get(key)
            if (cell) {
                cell.delete(body)
                if (cell.size === 0) {
                    this.grid.delete(key)
                }
            }
        })
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

export default SpatialGrid
