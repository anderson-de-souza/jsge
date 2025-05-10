import expect from '../../util/expect.js'
import View from './view.js'
import ViewRenderer from './viewrenderer.js'

class LayeredViewRenderer extends ViewRenderer {
    
    #layers
    
    constructor(context) {
        super(context)
        this.#layers = new Map()
    }
    
    addView(view) {
        expect(View, view)
        expect('number', view.style.zIndex)
        
        let zIndex = view.style.zIndex
        let layer = this.#layers.get(zIndex)
        
        if (!layer) {
            layer = new Set()
            this.#layers.set(zIndex, layer)
        }
        
        layer.add(view)
        
    }
    
    removeView(view) {
        expect(View, view)
        expect('number', view.style.zIndex)
        
        let zIndex = view.style.zIndex
        let layer = this.#layers.get(zIndex)
        
        if (layer) {
            layer.delete(view)
            if (layer.size === 0) {
                this.#layers.delete(zIndex)
            }
        }
        
    }
    
    get viewSet() {
        return super.viewSet
    }
    
    set viewSet(value) {
        super.viewSet = value
        for (let view of value) {
            this.addView(view)
        }
        
    }
    
    run() {
        
        if (this.clearBefore) {
            this.clearContext()
        }
        
        const indexes = [ ...this.#layers.keys() ].sort((a, b) => a - b)
        
        for (let z of indexes) {
            for (let view of this.#layers.get(z)) {
                view.draw()
            }
        }
        
    }
    
}

export default LayeredViewRenderer