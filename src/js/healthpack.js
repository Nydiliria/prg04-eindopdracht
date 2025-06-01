import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from './resources'

export class Healthpack extends Actor {
    constructor() {
        super({width:700, height:700, collisionType:CollisionType.Active})
        this.graphics.use(Resources.Healthpack.toSprite())
        this.scale = new Vector( 0.1, 0.1 )  
        this.pos = new Vector(1280, Math.random() * 720)
        this.vel = new Vector(-(Math.random() * 250 + 50), 0) 

        this.events.on("exitviewport", (e) => this.healthpackLeft(e))
    }

    healthpackLeft(e) {
        this.vel = new Vector(0, 0)
        this.pos = new Vector(-1000, -1000)
        this.scene.engine.clock.schedule(() => {
            this.pos = new Vector(1280, Math.random() * 720)
            this.vel = new Vector(-(Math.random() * 250 + 50), 0)
        }, 15000)
    }
}