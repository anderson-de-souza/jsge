import AudioClip from './audioclip.js'
import expect from '../../../util/expect.js'
import FileLoader from '../../../util/fileloader.js'

class AudioLoader {
    
    static #instance
    
    #context
    #cache
    
    constructor(context) {
        if (AudioLoader.#instance) {
            return AudioLoader.#instance
        }
        AudioLoader.#instance = this
        this.#context = expect(AudioContext, context)
        this.#cache = new Map()
    }
    
    async loadAudioClip(url) {
        expect('string', url)
        
        let clip = this.#cache.get(url)
        
        if (clip) {
            return clip
        }
        
        const fileLoader = FileLoader.getInstance()
        const arrayBuffer = await fileLoader.loadArrayBuffer(url)
        const audioBuffer = await this.#context.decodeAudioData(arrayBuffer)
        
        clip = new AudioClip(audioBuffer)
        clip.volume = 0.2
        this.#cache.set(url, clip)
        
        return clip
        
    }
    
    static getInstance(context) {
        return AudioLoader.#instance ?? new AudioLoader(context)
    }
    
}

export default AudioLoader
