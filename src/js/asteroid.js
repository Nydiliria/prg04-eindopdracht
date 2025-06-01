import { Actor, Vector } from "excalibur"
import { Resources } from './resources'

export class Asteroid extends Actor {
    laneY

    constructor(laneY) {
        super({
            width: 160,
            height: 100
        })
        this.graphics.use(Resources.Asteroid.toSprite())
        this.scale = new Vector(0.7, 1)
        this.laneY = laneY
        this.pos = new Vector(1280, laneY)
        this.vel = new Vector(-(Math.random() * 250 + 50), 0)
        this.angularVelocity = (Math.random() - 0.5) * 1

        this.events.on("exitviewport", (e) => this.asteroidLeft(e))
    }

    asteroidLeft(e) {
        e.target.pos = new Vector(1280, this.laneY)
        e.target.vel = new Vector(-(Math.random() * 250 + 50), 0)
        e.target.angularVelocity = (Math.random() - 0.5) * 1
    }
}