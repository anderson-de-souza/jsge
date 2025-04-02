class Configuration {

    static #instance

    constructor() {
        if (Configuration.#instance) {
            return Configuration.#instance
        }
        Configuration.#instance = this
        this.language = 'en'
        this.isDebugMode = false
    }

    static get instance() {
        return new Configuration()
    }

}

export default Configuration