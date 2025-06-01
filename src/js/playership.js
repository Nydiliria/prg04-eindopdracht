import { Actor, Vector, Keys, CollisionType } from "excalibur"
import { Resources } from './resources'
import { Asteroid } from "./asteroid"
import { Blob } from "./blob"
import { UI } from "./UI"
import { Bullet } from "./bullet"
import { Healthpack } from "./healthpack"

export class Playership extends Actor {
    ui
    #health = 1
    #maxHealth = 1

    constructor(ui) {
        super({
            width: 220, height: 170, collisionType: CollisionType.Active
        })
        this.graphics.use(Resources.Playership.toSprite())
        this.pos = new Vector(100, Math.random() * 720)
        this.scale = new Vector(0.5, 0.5)
        this.rotation = Math.PI / 2
        this.ui = ui
        this.ui.attachTo(this)
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.#hitSomething(event))
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
            this.#shoot()
        }
    }

    #hitSomething(event) {
        if (event.other.owner instanceof Asteroid) {
            this.scene.engine.gameOver()
        }

        if (event.other.owner instanceof Blob) {
            this.#reduceHealth(0.5)
            event.other.owner.blobLeft({ target: event.other.owner })
        }

        if (event.other.owner instanceof Healthpack) {
            this.#gainHealth(0.5)
            event.other.owner.healthpackLeft({ target: event.other.owner })
        }
    }

    #reduceHealth(amount) {
        Resources.Death.play()
        this.#health -= amount
        if (this.#health < 0) this.#health = 0
        this.ui.updateHealth(this.#health / this.#maxHealth)
        if (this.#health <= 0) {
            this.scene.engine.gameOver()
        }
    }

    #gainHealth(amount) {
        Resources.Heal.play()
        this.#health += amount
        if (this.#health > this.#maxHealth) this.#health = this.#maxHealth
        this.ui.updateHealth(this.#health / this.#maxHealth)
    }

    #shoot() {
        Resources.Shoot.play()
        let a = new Bullet(this.pos.x, this.pos.y, this.ui)
        this.scene.add(a)
    }
}