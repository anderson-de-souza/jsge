function typed(type, value) {
    return (typeof type === 'function' && typeof value === 'object' && value instanceof type) ||
        (typeof type === 'string' && type === typeof value)
}

export default typed