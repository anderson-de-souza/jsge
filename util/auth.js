function auth(type, value) {

    if (
        (typeof type === 'function' && typeof value === 'object' && value instanceof type) ||
        (typeof type === 'string' && type === typeof value)
    ) {
        return value
    }

    throw new Error(`${ value } is not a ${ typeof type === 'function' ? type.name: type } `)
    
}

export default auth
