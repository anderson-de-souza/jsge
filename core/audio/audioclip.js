import expect from '../../../util/expect.js'

class AudioClip {
    
    #audioBuffer
    
    #offset
    #start
    #duration
    #volume
    #pitch
    #pan
    #fadeIn
    #fadeOut
    
    constructor(audioBuffer) {
        this.audioBuffer = audioBuffer
        this.#offset = 0
        this.#start = 0
        this.#duration = this.audioBuffer.duration
        this.#volume = 1
        this.#pitch = 1
        this.#pan = 0
        this.#fadeIn = 0
        this.#fadeOut = 0
    }
    
    get audioBuffer() {
        return this.#audioBuffer
    }
    
    set audioBuffer(value) {
        this.#audioBuffer = expect(AudioBuffer, value)
    }
    
    get offset() {
        return this.#offset
    }
    
    set offset(value) {
        this.#offset = expect('number', value)
    }
    
    get start() {
        return this.#start
    }
    
    set start(value) {
        this.#start = expect('number', value)
    }
    
    get duration() {
        return this.#duration
    }
    
    set duration(value) {
        this.#duration = expect('number', value)
    }
    
    get volume() {
        return this.#volume
    }
    
    set volume(value) {
        this.#volume = expect('number', value)
    }
    
    get pitch() {
        return this.#pitch
    }
    
    set pitch(value) {
        this.#pitch = expect('number', value)
    }
    
    get pan() {
        return this.#pan
    }
    
    set pan(value) {
        this.#pan = expect('number', value)
    }
    
    get fadeIn() {
        return this.#fadeIn
    }
    
    set fadeIn(value) {
        this.#fadeIn = expect('number', value)
    }
    
    get fadeOut() {
        return this.#fadeOut
    }
    
    set fadeOut(value) {
        this.#fadeOut = expect('number', value)
    }
    
}

export default AudioClip