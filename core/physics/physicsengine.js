import expect from '../../util/expect.js'
import RigidBody from './body/rigidbody.js'
import SAT from './collision-method/separatingaxistheorem.js'
import SpatialGrid from '../../util/spatialgrid.js'
import Collision from './collision.js'
import Vector from '../../util/vector.js'

class PhysicsEngine {
    
    #physicsIterations
    #gridCellSize
    #spatialgrid
    #bodies
    
    constructor(physicsIterations, gridCellSize) {
        this.#physicsIterations = physicsIterations
        this.#gridCellSize = gridCellSize
        this.#spatialgrid = new SpatialGrid(gridCellSize)
        this.#bodies = new Set()
    }

    get physicsIterations() {
        return this.#physicsIterations
    }
    
    get gridCellSize() {
        return this.#gridCellSize
    }
    
    addBody(body) {
        expect(RigidBody, body)
        this.#bodies.add(body)
        this.#spatialgrid.addShape(body.shape)
    }
    
    removeBody(body) {
        expect(RigidBody, body)
        this.#bodies.delete(body)
        this.#spatialgrid.removeShape(body.shape)
    }

    run(deltaTime) {
        this.update(deltaTime)
        for (let i = 0; i < this.#physicsIterations; i++) {
            const collisions = this.findCollisions()
            this.resolveCollisions(collisions)
        }
        
    }

    findCollisions() {

        const collisions = new Map()

        for (let bodyA of this.#bodies) {

            const shapeA = bodyA.shape
            const aroundShapes = this.#spatialgrid.findAround(shapeA)

            for (let shapeB of aroundShapes) {

                const bodyB = expect(RigidBody, shapeB.body)
                if (bodyA === bodyB) continue

                const pairId = bodyA.id < bodyB.id
                    ? `${bodyA.id}:${bodyB.id}`
                    : `${bodyB.id}:${bodyA.id}`

                if (collisions.has(pairId)) continue

                const mtv = SAT.getMTV(shapeA, shapeB)

                if (mtv) {
                    collisions.set(pairId, new Collision(bodyA, bodyB, mtv))
                }

            }

        }

        return collisions
    }

    resolveCollisions(collisions = new Map()) {
        for (const collision of collisions.values()) {

            const { bodyA, bodyB, mtv } = collision

            this.resolveCollision(bodyA, bodyB, mtv)

        }
    }

    applyImpulse(a, b, impulse, ra, rb) {
        // Corpo A (Reação)
        a.velocityX -= impulse.x * a.invertMass;
        a.velocityY -= impulse.y * a.invertMass;
        a.angularVelocity -= (ra.x * impulse.y - ra.y * impulse.x) * a.invertMomentOfInertia;

        // Corpo B (Ação)
        b.velocityX += impulse.x * b.invertMass;
        b.velocityY += impulse.y * b.invertMass;
        b.angularVelocity += (rb.x * impulse.y - rb.y * impulse.x) * b.invertMomentOfInertia;
    }

    resolveCollision(a, b, mtv) {

        if (a.sleeping && b.sleeping) return;

        let normal = mtv.normalize();
        const delta = b.getCenter().subtract(a.getCenter());
        if (normal.dot(delta) < 0) normal = normal.reverse();

        const penetration = mtv.magnitude();
        const totalInvMass = a.invertMass + b.invertMass;
        if (totalInvMass === 0) return;

        // --- CONTACT POINT ---
        const insideA = SAT.getInsideCorners(a.shape, b.shape);
        const insideB = SAT.getInsideCorners(b.shape, a.shape);
        const contactPoints = [...insideA, ...insideB];

        let contact = contactPoints.length > 0 
            ? contactPoints.reduce((sum, p) => sum.add(p), new Vector(0, 0)).unscale(contactPoints.length)
            : a.getCenter().add(normal.scale(penetration * 0.5));

        const ra = contact.subtract(a.getCenter());
        const rb = contact.subtract(b.getCenter());

        // --- VELOCIDADE RELATIVA ---
        const getRelativeVel = (obj, r) => new Vector(
            obj.velocityX - obj.angularVelocity * r.y,
            obj.velocityY + obj.angularVelocity * r.x
        );

        let rv = getRelativeVel(b, rb).subtract(getRelativeVel(a, ra));
        let velAlongNormal = rv.dot(normal);

        // Se já estão se afastando, ignora o impulso
        if (velAlongNormal > 0) return;

        // --- IMPULSO NORMAL ---
        const raCrossN = ra.x * normal.y - ra.y * normal.x;
        const rbCrossN = rb.x * normal.y - rb.y * normal.x;
        
        const invMassSum = a.invertMass + b.invertMass +
            (raCrossN * raCrossN) * a.invertMomentOfInertia +
            (rbCrossN * rbCrossN) * b.invertMomentOfInertia;

        const restitution = Math.min(a.restitution, b.restitution);
        let j = -(1 + restitution) * velAlongNormal;
        j /= invMassSum;

        const impulse = normal.scale(j);
        this.applyImpulse(a, b, impulse, ra, rb);

        // --- FRICÇÃO (Atrito) ---
        // Atualizamos rv após o primeiro impulso para maior precisão
        rv = getRelativeVel(b, rb).subtract(getRelativeVel(a, ra));
        let tangent = rv.subtract(normal.scale(rv.dot(normal)));

        if (tangent.magnitude() > 1e-6) {
            tangent = tangent.normalize();
            const raCrossT = ra.x * tangent.y - ra.y * tangent.x;
            const rbCrossT = rb.x * tangent.y - rb.y * tangent.x;
            
            const invMassSumTangent = a.invertMass + b.invertMass +
                (raCrossT * raCrossT) * a.invertMomentOfInertia +
                (rbCrossT * rbCrossT) * b.invertMomentOfInertia;

            let jt = -rv.dot(tangent);
            jt /= invMassSumTangent;

            const mu = 0.5; // Coeficiente de atrito (pode ser dinâmico)
            // Calcula o limite máximo de atrito baseado no impulso normal (j) e no coeficiente (mu)
            const maxFriction = j * mu;

            // O equivalente a clamp(jt, -maxFriction, maxFriction) em JS puro:
            const clampedJt = Math.max(-maxFriction, Math.min(jt, maxFriction));

            const frictionImpulse = tangent.scale(clampedJt);
            this.applyImpulse(a, b, frictionImpulse, ra, rb);
        }

        // --- CORREÇÃO POSICIONAL (Anti-Tremor / Slop) ---
        const percent = 0.2; 
        const slop = 0.05;
        const correctionMagnitude = Math.max(penetration - slop, 0) / totalInvMass * percent;
        const correction = normal.scale(correctionMagnitude);

        a.setCenter(a.getCenter().subtract(correction.scale(a.invertMass)));
        b.setCenter(b.getCenter().add(correction.scale(b.invertMass)));

        // --- ACORDAR OS CORPOS ---
        // Se houve colisão significativa, ambos devem sair do sleep
        if (j > 0.0001) {
            a.wakeUp();
            b.wakeUp();
        }
    }

    update(deltaTime) {
        for (const body of this.#bodies) {
            body.update(deltaTime)
            if (body.hasMoved) {
                this.#spatialgrid.updateShape(body.shape)
            }
        }
    }
    
}

export default PhysicsEngine