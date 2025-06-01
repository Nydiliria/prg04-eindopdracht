import { Actor, Vector } from "excalibur"
import { Resources } from './resources'
import { Asteroid } from "./asteroid"
import { Blob } from "./blob"
import { Explosion } from "./explosion"

export class Bullet extends Actor {
    constructor(x, y, ui) {
        super({ width: Resources.Bullet.width, height: Resources.Bullet.height })
        this.graphics.use(Resources.Bullet.toSprite())
        this.vel = new Vector(200, 0)
        this.pos = new Vector(x, y)
        this.scale = new Vector(0.1, 0.1)
        this.rotation = Math.PI / 2
        this.ui = ui
    }

    onInitialize(engine) {
        this.events.on("exitviewport", () => this.kill())
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        if (event.other.owner instanceof Asteroid) {
            Resources.ExplosionSound.play()
            let explosion = new Explosion(event.other.owner.pos.x, event.other.owner.pos.y)
            event.other.owner.asteroidLeft({ target: event.other.owner })
            this.scene.add(explosion)
            if (this.ui) {
                this.ui.addPoint()
            }
            this.kill()
        }
        
        if (event.other.owner instanceof Blob) {
            Resources.Death.play()
            let explosion = new Explosion(event.other.owner.pos.x, event.other.owner.pos.y)
            event.other.owner.blobLeft({ target: event.other.owner })
            this.scene.add(explosion)
            if (this.ui) {
                this.ui.addPoint()
            }
            this.kill()
        }
    }
}