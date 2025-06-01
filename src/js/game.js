import { Engine, DisplayMode, Label, Color, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background.js'
import { Playership } from './playership.js'
import { Asteroid } from './asteroid.js'
import { UI } from './UI.js'
import { Blob } from './blob.js'
import { Healthpack } from './healthpack.js'

class Game extends Engine {

    #player
    #ui

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.toggleDebug()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.currentScene.clear()

        this.#ui = new UI()
        this.add(this.#ui)

        let background = new Background()
        this.add(background)

        this.#player = new Playership(this.#ui)
        this.add(this.#player)

        let lanes = [100, 250, 400, 550]
        for (let i = 0; i < 4; i++) {
            this.clock.schedule(() => {
                let asteroid = new Asteroid(lanes[i])
                this.add(asteroid)
            }, i * 2000)
        }

        this.clock.schedule(() => {
            let blob = new Blob()
            this.add(blob)
        }, 100)

        let healthpack = new Healthpack()
        this.add(healthpack)
    }

    gameOver() {
        this.currentScene.clear()

        let gameOverBackground = new Background()
        this.add(gameOverBackground)
        
        const gameOverLabel = new Label({
            text: "GAME OVER",
            pos: new Vector(this.drawWidth / 2, this.drawHeight / 2),
            color: Color.Red,
            fontSize: 120,
            anchor: new Vector(0.5, 0.5)
        })
        this.add(gameOverLabel)

        setTimeout(() => {
            this.startGame()
        }, 2000)
    }
}

new Game()