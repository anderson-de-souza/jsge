import expect from '../util/expect.js'
import CanvasProxy from './canvasproxy.js'

class ContextProxy {

    constructor(canvas) {

        const context = expect(CanvasProxy, canvas).getContext('2d')

        return new Proxy(this, {
            get(target, propName) {
                
                if (target[propName]) {
                    return target[propName]

                } else if (context[propName]) {

                    if (typeof context[propName] === 'function') {
                        return context[propName].bind(context)
                    } else {
                        return context[propName]
                    }

                }
                
                return undefined

            },
            set(target, propName, newValue) {

                if (target[propName]) {
                    target[propName] = newValue

                } else if (context[propName]) {
                    context[propName] = newValue
                }

                return target[propName] || context[propName]

            }
        })

    }

}

export default ContextProxy
