import { Actor, Vector } from "excalibur"
import { Resources } from './resources'

export class Explosion extends Actor {

    constructor(x, y) {
        super({ x, y, width: 10, height: 10 })
        this.graphics.use(Resources.Explosion.toSprite())
        this.scale = new Vector(0.1, 0.1)
    }

    onPostUpdate(engine) {
        this.scale = this.scale.add(new Vector(0.01, 0.01))
        this.graphics.opacity -= 0.05
        if (this.graphics.opacity < 0.01) {
            this.kill()
        }
    }
}