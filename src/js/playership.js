import { Actor, Vector, Keys, CollisionType } from "excalibur"
import { Resources } from './resources'
import { Asteroid } from "./asteroid"
import { Blob } from "./blob"
import { UI } from "./UI"
import { Bullet } from "./bullet"

export class Playership extends Actor {
    ui

    constructor(ui) {
        super({
            width: 100, height: 150, collisionType: CollisionType.Active
        })
        this.graphics.use(Resources.Playership.toSprite())
        this.pos = new Vector(100, Math.random() * 720)
        this.scale = new Vector(0.5, 0.5)
        this.rotation = Math.PI / 2
        this.ui = ui
        this.ui.attachTo(this)
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    onPreUpdate(engine) {
        let xspeed = 0
        let yspeed = 0
        let kb = engine.input.keyboard

        if (kb.isHeld(Keys.W) && this.pos.y > this.height / 2) yspeed = -300
        if (kb.isHeld(Keys.S) && this.pos.y < engine.drawHeight - this.height / 2) yspeed = 300
        if (kb.isHeld(Keys.A) && this.pos.x > this.width / 2) xspeed = -300
        if (kb.isHeld(Keys.D) && this.pos.x < engine.drawWidth - this.width / 2) xspeed = 300

        this.vel = new Vector(xspeed, yspeed)

        if (kb.wasPressed(Keys.Space)) {
        this.shoot()
}
    }

    hitSomething(event) {
        if (event.other.owner instanceof Asteroid) {
            this.scene.engine.gameOver()
        }

        if (event.other.owner instanceof Blob) {
            this.scene.engine.gameOver()
        }
    }

    reduceHealth() {
        this.ui.updateHealth(0.5)
    }

    shoot() {
        let a = new Bullet(this.pos.x, this.pos.y, this.ui)
        this.scene.add(a)
}
}