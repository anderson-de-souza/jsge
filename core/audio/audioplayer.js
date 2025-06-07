import AudioClip from './audioclip.js'
import AudioLoader from './audioloader.js'
import expect from '../../../util/expect.js'

class AudioPlayer {
    
    static #instance
    
    #context
    #audioLoader
    #activeClips
    
    constructor() {
        
        if (AudioPlayer.#instance) {
            return AudioPlayer.#instance
        }
        
        AudioPlayer.#instance = this
        this.#context = new AudioContext()
        this.#audioLoader = AudioLoader.getInstance(this.#context)
        this.#activeClips = new Map()
        
    }
    
    async requestAudioUnlock(rootElement, message) {
        expect(HTMLElement, rootElement)
        expect('string', message)
        return new Promise((resolved) => {
            if (this.#context.state === 'suspended') {
                const dialog = document.createElement('dialog')
                dialog.classList.add('alert-dialog')
                    
                const containerTextElement = document.createElement('div')
                const textElement = document.createElement('p')
                textElement.classList.add('alert-dialog-text')
                    
                containerTextElement.appendChild(textElement)
                dialog.appendChild(containerTextElement)
                    
                textElement.innerHTML = message
                    
                const containerButtons = document.createElement('div')
                containerButtons.classList.add('alert-dialog-container-buttons')
                    
                const buttonOk = document.createElement('button')
                buttonOk.classList.add('alert-dialog-button')
                    
                const buttonNo = document.createElement('button')
                buttonNo.classList.add('alert-dialog-button')
                    
                buttonNo.innerHTML = 'NO'
                    
                buttonNo.addEventListener('click', () => {
                    dialog.remove()
                    resolved(false)
                })
                    
                buttonOk.innerHTML = 'OK'
                    
                buttonOk.addEventListener('click', () => {
                    dialog.remove()
                    this.#context.resume()
                    resolved(true)
                })
                    
                containerButtons.appendChild(buttonOk)
                containerButtons.appendChild(buttonNo)
                    
                dialog.appendChild(containerButtons)
                    
                rootElement.appendChild(dialog)
                dialog.showModal()
            } else {
                resolved(true)
            }
        })
    }
    
    getAudioLoader() {
        return this.#audioLoader
    }
    
    play(clip, onended = () => {}) {
        expect(AudioClip, clip)
        
        const bufferSourceNode = this.#context.createBufferSource()
        bufferSourceNode.buffer = clip.audioBuffer
        bufferSourceNode.playbackRate.value = clip.pitch
            
        const gainNode = this.#context.createGain()
        gainNode.gain.value = 0
            
        const stereoPannerNode = this.#context.createStereoPanner()
        stereoPannerNode.pan.value = clip.pan
            
        bufferSourceNode.connect(gainNode)
        gainNode.connect(stereoPannerNode)
        stereoPannerNode.connect(this.#context.destination)
            
        const now = this.#context.currentTime
        const fadeInEnd = now + clip.fadeIn
        gainNode.gain.setValueAtTime(0, now)
            
        gainNode.gain.linearRampToValueAtTime(clip.volume, fadeInEnd)
            
        if (clip.fadeOut > 0 && clip.duration > clip.fadeOut) {
            const fadeOutStart = now + clip.duration - clip.fadeOut
            gainNode.gain.setValueAtTime(clip.volume, fadeOutStart)
            gainNode.gain.linearRampToValueAtTime(0, fadeOutStart + clip.fadeOut)
        }
            
        const nodes = { bufferSourceNode, gainNode, stereoPannerNode }
            
        this.#activeClips.set(clip, nodes)
            
        bufferSourceNode.onended = () => {
            bufferSourceNode.disconnect()
            gainNode.disconnect()
            stereoPannerNode.disconnect()
            this.#activeClips.delete(clip)
            onended(this, clip)
        }
            
        bufferSourceNode.start(now + clip.start, clip.offset, clip.duration)
        
    }
    
    stop(clip) {
        expect(AudioClip, clip)
        const nodes = this.#activeClips.get(clip)
        if (nodes) {
            const { bufferSourceNode, gainNode } = nodes
            try {
                const now = this.#context.currentTime
                gainNode.gain.cancelScheduledValues(now)
                gainNode.gain.setValueAtTime(gainNode.gain.value, now)
                gainNode.gain.linearRampToValueAtTime(0, now + 0.2)
                bufferSourceNode.stop(now + 0.2)
            } catch (error) {
                console.error("error at stop audio clip: ", error)
            }
        }
        
    }
    
    static getInstance() {
        return AudioPlayer.#instance ?? new AudioPlayer()
    }
    
}

export default AudioPlayer