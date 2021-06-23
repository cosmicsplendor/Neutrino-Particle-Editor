import Node from "./entities/Node"
import Canvas2DRenderer from "./renderer/Canvas2D"
import startGameLoop from "./utils/startGameLoop"
import ParticleEmitter from "./ParticleEmitter"
import mapSliderInputsToParams from "../../../helpers/mapSliderInputsToParams"
import calcBounds from "../../../helpers/calcBounds"

class ParticleRenderer {
    constructor(canvasId, updateFrequency = 1) {
        this.rootNode = new Node()
        this.renderer = new Canvas2DRenderer({ canvasId, scene: this.rootNode })
        this.loopControls = startGameLoop({ mainUpdateFn: this.update.bind(this), renderer: this.renderer })
        this.updateFrequency = updateFrequency
        this.timeSinceStart = 0
        this.lastUpdated = 0
        this.dirty = false
    }
    setParams({ params, ...rest} = this.unduePayload) {
        if (this.timeSinceStart - this.lastUpdated < this.updateFrequency) {
            this.unduePayload = { params, ...rest }
            this.dirty = true
            return
        }
        this.dirty = false
        this.lastUpdated = this.timeSinceStart
        const mappedParams = mapSliderInputsToParams(params)
        const hitbox = calcBounds(mappedParams)
        const newEmitter = new ParticleEmitter({ params: mappedParams, hitbox, ...rest })
        newEmitter.pos.x = this.renderer.canvas.width / 2
        newEmitter.pos.y = this.renderer.canvas.height / 2
        this.rootNode.children.length = 0
        this.rootNode.add(newEmitter)
    }
    update(dt) {
        this.timeSinceStart += dt
        if (this.dirty) { 
            this.setParams()
        }
    }
}

export default ParticleRenderer