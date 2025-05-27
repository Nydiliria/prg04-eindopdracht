import { Actor, Vector, Keys, CollisionType } from "excalibur"
import { Resources } from './resources'
import { Asteroid } from "./asteroid"

export class Playership extends Actor {
    constructor() {
        super({width:Resources.Playership.width, height:Resources.Playership.height, collisionType:CollisionType.Active})
        console.log("Playership loaded")
        this.graphics.use(Resources.Playership.toSprite())
        this.pos = new Vector (100, Math.random() * 720) 
        this.scale = new Vector (0.5, 0.5)
        this.rotation = Math.PI / 2
    }

    onPreUpdate(engine) {
    let xspeed = 0;
    let yspeed = 0;

    let kb = engine.input.keyboard;
    
    if (kb.isHeld(Keys.W) && this.pos.y > this.height / 2) {
        yspeed = -300;
    }
    if (kb.isHeld(Keys.S) && this.pos.y < engine.drawHeight - this.height / 2) {
        yspeed = 300;
    }
    if (kb.isHeld(Keys.A) && this.pos.x > this.width / 2) {
        xspeed = -300;
    }
    if (kb.isHeld(Keys.D) && this.pos.x < engine.drawWidth - this.width / 2) {
        xspeed = 300;
    }
    this.vel = new Vector(xspeed, yspeed);
}

     onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event){
        if (event.other.owner instanceof Asteroid) {
            console.log('hit asteroid')
        }
    }


}