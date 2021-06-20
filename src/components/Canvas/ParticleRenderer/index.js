import Node from "./entities/Node"
import Canvas2DRenderer from "./renderer/Canvas2D"
import startGameLoop from "./utils/startGameLoop"
import ParticleEmitter from "./ParticleEmitter"

class ParticleRenderer {
    constructor(canvasId) {
        this.rootNode = new Node()
        this.renderer = new Canvas2DRenderer({ canvasId, scene: this.rootNode })
        this.loopControls = startGameLoop({ renderer: this.renderer })
    }
    setParams(params) {
        const newEmitter = new ParticleEmitter(params)
        newEmitter.pos.x = this.renderer.canvas.width / 2
        newEmitter.pos.y = this.renderer.canvas.height / 2
        this.rootNode.children.length = 0
        this.rootNode.add(newEmitter)
    }
}

export default ParticleRenderer