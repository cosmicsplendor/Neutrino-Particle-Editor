import Node from "./entities/Node"
import Rect from "./entities/core/Rect"
import Canvas2DRenderer from "./renderer/Canvas2D"
import startGameLoop from "./utils/startGameLoop"
import ParticleEmitter from "./ParticleEmitter"
import mapSliderInputsToParams from "../../../helpers/mapSliderInputsToParams"
import calcEmitterBounds from "../../../helpers/calcEmitterBounds"

class ParticleRenderer {
    constructor(canvasId, updateFrequency = 1) {
        this.rootNode = new Node()
        this.centerIndicator = new Rect({
            width: 2, height: 2, fill: "silver"
        })
        this.particleRoot = new Node()
        this.renderer = new Canvas2DRenderer({ canvasId, scene: this.rootNode })
        this.loopControls = startGameLoop({ mainUpdateFn: this.update.bind(this), renderer: this.renderer })
        this.updateFrequency = updateFrequency
        this.timeSinceStart = 0
        this.lastUpdated = 0
        this.dirty = false

        this.rootNode.add(this.particleRoot)
        this.rootNode.add(this.centerIndicator)
        this.alignItems()
    }
    alignItems() {
        this.particleRoot.pos.x = this.renderer.canvas.width / 2
        this.particleRoot.pos.y = this.renderer.canvas.height / 2
        this.centerIndicator.pos.x = this.particleRoot.pos.x - 1
        this.centerIndicator.pos.y = this.particleRoot.pos.y - 1
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
        const { x, y} = calcEmitterBounds(mappedParams)
        const newEmitter = new ParticleEmitter({ params: mappedParams, hitbox: { pos: { x: x.min, y: y.min }, width: x.max - x.min, height: y.max - y.min }, ...rest })
        this.alignItems()
        this.particleRoot.children.length = 0
        this.particleRoot.add(newEmitter)
    }
    update(dt) {
        this.timeSinceStart += dt
        if (this.dirty) { 
            this.setParams()
        }
    }
}

export default ParticleRenderer