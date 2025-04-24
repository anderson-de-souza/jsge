import expect from './expect.js'

function Degrees(rad) {
    return expect('number', rad) * (180 / Math.PI)
}

export default Degrees