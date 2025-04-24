
import Configuration from '../core/configuration'
import HitBoxViewer from '../debug/hitboxviewer'

class HitBox {

    constructor(x, y, width, height, color = 'black') {

        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color

        const config = Configuration.instance
        if (config.isDebugMode) {
            const hitBoxViewer = HitBoxViewer.instance
            hitBoxViewer.add(this)
        }

    }

    onHit(target) {
        // apply some effect
    }

}

export default HitBox