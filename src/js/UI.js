import { Actor, ScreenElement, Color, Vector } from "excalibur"
import { Scoreboard } from "./scoreboard.js"

export class UI extends ScreenElement {
    healthbar
    scoreboard

    constructor() {
        super()
        this.scoreboard = new Scoreboard()
    }

    onInitialize(engine) {
        this.healthbar = new Actor({ width: 60, height: 4, color: Color.Green, anchor: Vector.Zero })
        this.healthbar.pos = new Vector(-15, -40)
        this.addChild(this.healthbar)
        this.addChild(this.scoreboard)
    }

    updateHealth(amount) {
        this.healthbar.scale = new Vector(amount, 1)
    }

    attachTo(actor) {
        this.onPreUpdate = () => {
            if (actor && !actor.isKilled()) {
                this.healthbar.visible = true
                this.healthbar.pos = new Vector(actor.pos.x - 15, actor.pos.y - 40)
            } else {
                this.healthbar.visible = false
            }
        }
    }

    addPoint() {
        this.scoreboard.addPoint()
    }

    resetScore() {
        this.scoreboard.reset()
    }
}