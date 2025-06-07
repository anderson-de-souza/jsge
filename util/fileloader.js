import expect from './expect.js'

class FileLoader {
    
    static #instance
    
    #cache
    
    constructor() {
        if (FileLoader.#instance) {
            return FileLoader.#instance
        }
        FileLoader.#instance = this
        this.#cache = new Map()
    }
    
    async load(url) {
        let data
        if ((data = this.#cache.get(url))) {
            return data.clone()
        }
        try {
            data = await fetch(url)
            if (data.ok) {
                this.#cache.set(url, data)
                return data.clone()
            } else {
                throw new Error('failed to fetch data: ' + data.status)
            }
        } catch (error) {
            throw new Error(`${ error.message }: "${url}";`)
        }
    }
    
    async loadText(url) {
        const response = await this.load(url)
        return await response.text()
    }
    
    async loadArrayBuffer(url) {
        const response = await this.load(url)
        return await response.arrayBuffer()
    }
    
    async loadJSON(url) {
        const response = await this.load(url)
        return await response.json()
    }
    
    static getInstance() {
        return FileLoader.#instance ?? new FileLoader()
    }
    
}

export default FileLoader
