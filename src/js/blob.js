import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from './resources'

export class Blob extends Actor {
    constructor() {
        super({
            width: 1000, 
            height: 1000,
            collisionType: CollisionType.Active
        })
        this.graphics.use(Resources.Blob.toSprite())
        this.scale = new Vector( 0.1, 0.1 )  
        this.pos = new Vector(1280, Math.random() * 720)
        this.vel = new Vector(-(Math.random() * 250 + 50), 0) 

        this.events.on("exitviewport", (e) => this.blobLeft(e))
    }

    blobLeft(e) {
        e.target.pos = new Vector(1280, Math.random() * 720)
        e.target.vel = new Vector(-(Math.random() * 250 + 50), 0) 
    }
}