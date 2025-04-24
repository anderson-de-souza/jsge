import expect from './expect.js'

function Radians(deg) {
    return expect('number', deg) * Math.PI / 180
}

export default Radians