import Shape from '../../shape/shape.js'
import Circle from '../../shape/circle.js'
import Rectangle from '../../shape/rectangle.js'
import Vector from '../../../util/vector.js'

class RigidBody {
    
    static MOVEMENT_THRESHOLD = 0.1
    static TIME_TO_SLEEP = 0.5

    #shape
    #mass
    #invertMass
    #restitution

    #forceX = 0
    #forceY = 0
    #torque = 0

    #velocityX = 0
    #velocityY = 0
    #angularVelocity = 0

    #momentOfInertia = null
    #invertMomentOfInertia = 0

    #hasMoved = false
    #deltaX = 0
    #deltaY = 0
    #angularDelta = 0

    #sleepTime = 0
    #sleeping = false

    constructor({ shape, mass = 1, restitution = 0 }) {
        this.#shape = shape
        this.#shape.body = this
        
        this.mass = mass
        this.restitution = restitution
    }

    update(deltaTime) {
        
        if (this.#sleeping) return

        // 1. Lógica de Sleep PRIMEIRO! (Avalia a velocidade do frame anterior)
        const LINEAR_EPS = 5
        const ANGULAR_EPS = Math.PI / 180 * 2

        const isSlow = Math.abs(this.#velocityX) < LINEAR_EPS &&
                       Math.abs(this.#velocityY) < LINEAR_EPS &&
                       Math.abs(this.#angularVelocity) < ANGULAR_EPS
                       
        if (isSlow) {
            
            this.#sleepTime += deltaTime
            
            // Ajuda o objeto a parar de vez "sugando" a energia restante
            this.#velocityX *= 0.9; 
            this.#velocityY *= 0.9;
            this.#angularVelocity *= 0.9;
            
            if (this.#sleepTime > RigidBody.TIME_TO_SLEEP) {
                this.#sleeping = true
                this.#velocityX = 0
                this.#velocityY = 0
                this.#angularVelocity = 0
                return; // Para a execução aqui, não calcula gravidade
            }
        } else {
            this.#sleepTime = 0
        }

        // 1. Integrar Forças (Aceleração = Força / Massa)
        const accelerationX = this.#forceX * this.invertMass
        const accelerationY = this.#forceY * this.invertMass
        const angularAcceleration = this.#torque * this.invertMomentOfInertia

        // 2. Integrar Velocidade (Semi-Implicit Euler)
        this.#velocityX += accelerationX * deltaTime
        this.#velocityY += accelerationY * deltaTime
        this.#angularVelocity += angularAcceleration * deltaTime

        // 3. Aplicar Damping (Resistência do ar/ambiente)
        const linearDamping = 0.98
        const angularDamping = 0.98
        const dampingFactor = Math.pow(linearDamping, deltaTime * 60)
        
        this.#velocityX *= dampingFactor
        this.#velocityY *= dampingFactor
        this.#angularVelocity *= Math.pow(angularDamping, deltaTime * 60)

        // 4. Integrar Posição
        this.centerX += this.#velocityX * deltaTime
        this.centerY += this.#velocityY * deltaTime
        this.rotationAngle += this.#angularVelocity * deltaTime

        // 5. Limpar Forças para o próximo frame
        this.#forceX = 0
        this.#forceY = 0
        this.#torque = 0

    }

    // --- MÉTODOS DE FORÇA E IMPULSO ---
    
    addForce(x, y) {
        this.#forceX += x
        this.#forceY += y
    }

    // Impulsos alteram a velocidade INSTANTANEAMENTE
    applyImpulse(x, y, angular) {
        // 1. Se estiver dormindo, verifica se o impacto é forte o suficiente para acordar
        if (this.#sleeping) {
            
            const thresholdX = 0.5
            const thresholdY = 0.5
            const thresholdAng = Math.PI / 180
    
            if (Math.abs(x) > thresholdX || Math.abs(y) > thresholdY || Math.abs(angular) > thresholdAng) {
                this.wakeUp()
            } else {
                // Impacto muito fraco em corpo adormecido: ignoramos para manter estabilidade
                return 
            }
            
        }
    
        // 2. SE CHEGOU AQUI (corpo já estava acordado OU acabou de acordar), aplica as velocidades
        this.#velocityX += x * this.invertMass
        this.#velocityY += y * this.invertMass
        this.#angularVelocity += angular * this.invertMomentOfInertia
        
    }


    // --- GETTERS E SETTERS CORE ---

    get id() { 
        return this.#shape.id
    }
    
    get shape() { 
        return this.#shape
    }

    get mass() {
        return this.#mass
    }
    
    set mass(value) {
        if (value < -1 || !Number.isFinite(value)) {
            throw new Error('Mass must be > -1 and finite')
        }
        this.#mass = value
        this.#invertMass = value !== 0 ? 1 / value : 0
        this.#momentOfInertia = null // Invalida para recalcular
    }

    get invertMass() { 
        return this.#invertMass
    }

    get restitution() {
        return this.#restitution
    }
    
    set restitution(value) {
        if (value < 0 || value > 1) {
            throw new Error('Restitution between 0 and 1')
        }
        this.#restitution = value
    }

    // --- KINEMATICS (Velocidade e Posição) ---

    // REMOVIDO: O Threshold dos setters que quebrava o Solver!
    get velocityX() { 
        return this.#velocityX 
    }
    
    set velocityX(value) { 
        this.#velocityX = value
    }

    get velocityY() {
        return this.#velocityY
    }
    
    set velocityY(value) { 
        this.#velocityY = value
    }

    get angularVelocity() {
        return this.#angularVelocity
    }
    
    set angularVelocity(value) {
        this.#angularVelocity = value
    }

    getVelocity() { 
        return new Vector(this.#velocityX, this.#velocityY)
    }
    
    setVelocity(value) {
        this.#velocityX = value.x
        this.#velocityY = value.y
    }

    get centerX() {
        return this.#shape.centerX
    }
    
    set centerX(value) {
        const dx = value - this.#shape.centerX
        this.#deltaX += dx
        this.#hasMoved ||= Math.abs(dx) > RigidBody.MOVEMENT_THRESHOLD
        this.#shape.centerX = value
    }

    get centerY() {
        return this.#shape.centerY
    }
    
    set centerY(value) {
        const dy = value - this.#shape.centerY
        this.#deltaY += dy
        this.#hasMoved ||= Math.abs(dy) > RigidBody.MOVEMENT_THRESHOLD
        this.#shape.centerY = value
    }

    getCenter() {
        return this.#shape.getCenter()
    }
    
    setCenter(value) {
        const center = this.getCenter()
        const dx = value.x - center.x
        const dy = value.y - center.y
        this.#deltaX += dx
        this.#deltaY += dy
        this.#hasMoved ||= Math.abs(dx) > RigidBody.MOVEMENT_THRESHOLD || Math.abs(dy) > RigidBody.MOVEMENT_THRESHOLD
        this.#shape.setCenter(value)
    }

    get rotationAngle() {
        return this.#shape.rotationAngle
    }
    
    set rotationAngle(value) {
        const delta = value - this.#shape.rotationAngle
        this.#angularDelta += delta
        this.#hasMoved ||= Math.abs(delta) > (Math.PI / 180)
        this.#shape.rotationAngle = value
    }

    // --- INÉRCIA ---

    get momentOfInertia() {
        if (this.#momentOfInertia == null) {
            if (this.#shape.getType() === 'circle') {
                this.#momentOfInertia = 0.5 * this.mass * (this.#shape.radius ** 2)
            } else if (this.#shape.getType() === 'rectangle') {
                const w = this.#shape.width
                const h = this.#shape.height
                this.#momentOfInertia = (1 / 12) * this.#mass * ((w ** 2) + (h ** 2))
            } else {
                // Polígonos Customizados
                const corners = this.#shape.getLocalCorners()
                let area = 0
                let inertia = 0

                for (let i = 0; i < corners.length; i++) {
                    const p0 = corners[i]
                    const p1 = corners[(i + 1) % corners.length]
                    const cross = p0.cross(p1)
                    const dot0 = p0.dot(p0)
                    const dot1 = p0.dot(p1)
                    const dot2 = p1.dot(p1)

                    area += cross
                    inertia += cross * (dot0 + dot1 + dot2)
                }

                area = Math.abs(area) * 0.5
                if (area <= 0) throw new Error('Invalid polygon area')
                
                const density = this.#mass / area
                this.#momentOfInertia = Math.abs((density / 6) * inertia)
            }

            if (this.#momentOfInertia < -1 || !Number.isFinite(this.#momentOfInertia)) {
                throw new Error('Invalid Moment Of Inertia')
            }
            this.#invertMomentOfInertia = this.#momentOfInertia !== 0 ? 1 / this.#momentOfInertia : 0
        }
        return this.#momentOfInertia
    }

    get invertMomentOfInertia() {
        if (this.#momentOfInertia == null) this.momentOfInertia; // Força o cálculo
        return this.#invertMomentOfInertia
    }

    // --- ESTADO ---
    
    get hasMoved() { 
        return this.#hasMoved
    }
    
    markAsMoved() {
        this.#hasMoved = true
    }
    
    clearMoved() { 
        this.#hasMoved = false
        this.#deltaX = 0
        this.#deltaY = 0
        this.#angularDelta = 0
    }

    wakeUp() {
        this.#sleeping = false
        this.#sleepTime = 0
    }
    
    get sleeping() {
        return this.#sleeping
    }
    
}

export default RigidBody