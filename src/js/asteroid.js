import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from './resources'

export class Asteroid extends Actor {
    constructor() {
        super({width:Resources.Asteroid.width, height:Resources.Asteroid.height, collisionType:CollisionType.Active})
        console.log("Asteroid Loaded")
        this.graphics.use(Resources.Asteroid.toSprite())

        this.scale = new Vector (0.7, 1.5)
        this.pos = new Vector (1280, Math.random() * 720)
         this.vel = new Vector(-(Math.random() * 90 + 10), Math.random() * 20 - 10) 

        this.events.on("exitviewport", (e) => this.asteroidLeft(e))
    }

    asteroidLeft(e) {
        e.target.pos = new Vector(1280, Math.random() * 720) 
        e.target.vel = new Vector(-(Math.random() * 90 + 10), Math.random() * 20 - 10)
    }

}