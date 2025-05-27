import { Actor, Vector, Sprite } from "excalibur"
import { Resources } from './resources.js'

export class Background extends Actor {
    sprite

    onInitialize(engine) {
        this.sprite = Resources.Background.toSprite()
        this.anchor = Vector.Zero
        this.graphics.use(this.sprite)
        this.pos = new Vector(0, 0)
        const scaleX = engine.drawWidth / Resources.Background.width
        const scaleY = engine.drawHeight / Resources.Background.height
        this.scale = new Vector(scaleX, scaleY)
    }

    onPostUpdate(engine, delta) {
        this.sprite.sourceView.x += 0.05 * delta
        if (this.sprite.sourceView.x > this.sprite.image.width - this.sprite.sourceView.width) {
            this.sprite.sourceView.x = 0
        }
    }
}


    /* sprite

    onInitialize(engine){
        this.sprite = new Sprite({
            image: Resources.Background,
            sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
        })
        this.anchor = Vector.Zero
        this.graphics.use(this.sprite)
    }

    onPostUpdate(engine, delta) {
        this.sprite.sourceView.x += .05 * delta;
    } */