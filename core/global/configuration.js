class Configuration {

    static #instance

    constructor() {
        if (Configuration.#instance) {
            return Configuration.#instance
        }
        Configuration.#instance = this
        
        this.isDebugMode = false
        
        this.language = 'en'
        this.collisionMethod = 'sat'
        this.viewType = '2d'
        this.gameGenre = 'rpg'
        
    }

    static getInstance() {
        return Configuration.#instance ?? new Configuration()
    }

}

export default Configuration