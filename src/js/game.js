import '../css/style.css'
import { Engine, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background.js'
import { Playership } from './playership.js'
import { Asteroid } from './asteroid.js'
import { UI } from './UI.js'
import { Blob } from './blob.js'

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
        this.currentScene.clear()

        const ui = new UI()
        this.add(ui)

        const background = new Background()
        this.add(background)

        this.player = new Playership(ui)
        this.add(this.player)


        const lanes = [100, 250, 400, 550]
        for (let i = 0; i < 4; i++) {
        this.clock.schedule(() => {
            const asteroid = new Asteroid(lanes[i])
            this.add(asteroid)
        }, i * 2000)
        }

        this.clock.schedule(() => {
        const blob = new Blob()
        this.add(blob)
        }, 20000)

    }

    gameOver() {
        this.currentScene.clear()
        setTimeout(() => {
            this.startGame()
        }, 0)
    }
}

new Game()