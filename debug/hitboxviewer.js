import expect from '../../../util/expect.js'
import HitBox from '../interactive/hitbox.js';

class HitBoxViewer {

    static #instance

    #hitBoxes

    constructor() {
        if (HitBoxViewer.#instance) {
            return HitBoxViewer.#instance
        }
        HitBoxViewer.#instance = this
        this.#hitBoxes = new Set()
    }

    addHitBox(hitBox) {
        expect(HitBox, hitbox)
        this.#hitBoxes.add(newHitBox)
    }

    removeHitBox(hitbox) {
        this.#hitBoxes.delete(hitbox)
    }

    show(context) {
        for (const hitbox of this.#hitboxes) {
            context.strokeStyle = hitbox.color
            context.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height)
        }
    }

    static getInstance() {
        return HitBoxViewer.#instance ?? new HitBoxViewer()
    }
 
}

export default HitBoxViewer