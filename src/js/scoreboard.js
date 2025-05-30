import { ScreenElement, Label, Color, Vector } from "excalibur"

export class Scoreboard extends ScreenElement {
    score = 0

    onInitialize(engine) {
        this.label = new Label({
            text: "Score: 0",
            pos: new Vector(20, 20),
            color: Color.White,
            fontSize: 24
        })
        this.addChild(this.label)
    }

    addPoint() {
        this.score++
        this.label.text = `Score: ${this.score}`
    }

    reset() {
        this.score = 0
        this.label.text = `Score: 0`
    }
}