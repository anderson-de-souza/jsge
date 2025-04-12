const expect = (function() {
    
    const TYPES = [
        'bigint',
        'boolean',
        'function',
        'null',
        'number',
        'object',
        'string',
        'symbol',
        'undefined'
    ]
    
    function expect(type, field, throwError = true) {
        
        let expected, actual
        
        if (type === null) {
            expected = 'null'
        } else if (typeof type === 'function' && TYPES.includes(type.name.toLowerCase()) && typeof field !== 'function') {
            expected = type.name.toLowerCase()
        } else if (typeof type === 'function' && typeof field !== 'function') {
            expected = type.name
        } else if (typeof type === 'object') {
            expected = type.constructor.name
        } else if (typeof type === 'string' && TYPES.includes(type)) {
            expected = type
        } else {
            expected = typeof type
        }
        
        if (field === null) {
            actual = 'null'
        } else if (typeof field === 'function' && !(typeof type === 'string' && TYPES.includes(type)) && typeof type !== 'function') {
            actual = field.name
        } else if (typeof field === 'object') {
            actual = field.constructor.name
        } else {
            actual = typeof field
        }
        
        if (expected === 'function' && !(typeof type === 'string') && actual === 'function') {
            if (field.prototype && type.prototype && field.prototype instanceof type) {
                return field
            }
            if (throwError) {
                throw new Error(`"${ !field.name ? 'Anon Function' : field.name }" does not extend "${ !type.name ? 'Anon Function' : type.name }"`)
            }
        } else if (expected === actual || (typeof type === 'function' && field instanceof type)) {
            return field
        }
        
        if (throwError) {
            throw new Error(`"${ actual }" is not a "${ expected }", but got "${ field.toString() }"`)
        }

        return null
        
    }
    
    return expect
    
})()

export default expect
