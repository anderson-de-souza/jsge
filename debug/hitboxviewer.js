import HitBox from '../core/hitbox';

class HitBoxViewer {

    static #instance

    #context
    #hitboxes

    constructor(context) {
        if (HitBoxViewer.#instance) {
            return HitBoxViewer.#instance
        }
        HitBoxViewer.#instance = this
        this.#context = context
        this.#hitboxes = new Set()
    }

    add(newHitBox) {
        if (newHitBox instanceof HitBox) {
            this.#hitboxes.add(newHitBox)
        }
    }

    remove(hitbox) {
        this.#hitboxes.delete(hitbox)
    }

    show() {
        for (const hitbox of this.#hitboxes) {
            this.#context.strokeStyle = hitbox.color
            this.#context.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height)
        }
    }

    static instance(context) {
        return new HitBoxViewer(context)
    }
 
}

export default HitBoxViewer