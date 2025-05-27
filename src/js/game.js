import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background.js'
import { Playership } from './playership.js'
import { Asteroid } from './asteroid.js'

class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.showDebug = true
        this.start(ResourceLoader).then(() => this.startGame())
        
    }

    startGame() {
        console.log("start de game!")

        let background = new Background
        this.add(background)

        this.player = new Playership()
        this.add(this.player)

        for (let i = 0; i < 4; i++) {
            let asteroidOne = new Asteroid()
            this.add(asteroidOne)
        }

    }

}

new Game()
