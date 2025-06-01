import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class Background extends Actor {
    #bg1
    #bg2
    #speed = 50  

    onInitialize(engine) {
        let width = engine.drawWidth
        let height = engine.drawHeight

        this.z = -100

        this.#bg1 = new Actor({ width, height, anchor: Vector.Zero })

        let sprite1 = Resources.Background.toSprite()
        sprite1.width = width
        sprite1.height = height
        this.#bg1.graphics.use(sprite1)
        this.#bg1.pos = new Vector(0, 0)
        this.#bg1.z = -100

        this.#bg2 = new Actor({ width, height, anchor: Vector.Zero })
        let sprite2 = Resources.Background.toSprite()
        sprite2.width = width
        sprite2.height = height
        this.#bg2.graphics.use(sprite2)
        this.#bg2.pos = new Vector(width, 0)
        this.#bg2.z = -100

        this.addChild(this.#bg1)
        this.addChild(this.#bg2)
    }

    onPreUpdate(engine, delta) {
        let move = (this.#speed * delta) / 1000
        this.#bg1.pos.x -= move
        this.#bg2.pos.x -= move

        let width = engine.drawWidth

        if (this.#bg1.pos.x <= -width) {
            this.#bg1.pos.x = this.#bg2.pos.x + width
        }
        if (this.#bg2.pos.x <= -width) {
            this.#bg2.pos.x = this.#bg1.pos.x + width
        }
    }
}