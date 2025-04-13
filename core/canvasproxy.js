class CanvasProxy {

    constructor(selector) {

        const canvas = document.querySelector(selector)
        
        return new Proxy(this, {

            get(target, propName) {

                if (target[propName]) {
                    return target[propName]

                } else if (canvas[propName]) {

                    if (typeof canvas[propName] === 'function') {
                        return canvas[propName].bind(canvas)
                    } else {
                        return canvas[propName]
                    }

                }

                return undefined

            },
            
            set(target, propName, newValue) {

                if (target[propName]) {
                    target[propName] = newValue

                } else if (canvas[propName]) {
                    canvas[propName] = newValue
                }

                return target[propName] || canvas[propName]

            }

        })
    }

    fullScreen() {
        this.width = innerWidth
        this.height = innerHeight
    }

}

export default CanvasProxy