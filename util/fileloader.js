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
    
    async loadFile(url) {
        
        expect('string', url)
        
        let text = this.#cache.get(url)
        
        if (text) {
            return { url, content: text }
        }
        
        const response = await fetch(url)
        text = await response.text()
        this.#cache.set(url, text)
        
        return { url, content: text }
        
    }
    
    async loadFiles(...urls) {
        const results = await Promise.all(urls.map(url =>
                this.loadFile(url).catch(error => {
                        console.error(`Error at loading "${ url }":`, error)
                        return undefined
                    })
            ))
        return results.filter(item => item !== undefined)
    }
    
    static getInstance() {
        return FileLoader.#instance ?? new FileLoader()
    }
    
}

export default FileLoader
