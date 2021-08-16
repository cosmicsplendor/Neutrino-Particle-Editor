import Node from "./entities/Node"
import Texture from "./entities/core/Texture"
import { rand, randf, pickOne, easingFns } from "./utils/math"
import Movement from "./utils/Movement"

class Particle extends Texture {
    constructor({ imgUrl, pos, lifetime, velX, velY, alpha, alphaDecayFn, easingX, easingY, loop }) {
        super({ imgUrl, pos })
        this.lifetime = lifetime
        this.velX0 = velX
        this.velY0 = velY
        this.alpha0 = alpha
        this.pos0 = { ...pos }
        this.alpha = alpha
        this.alphaDecayFn = alphaDecayFn
        this.elapsed = 0
        this.loop = loop
        this.distX = velX * lifetime
        this.distY = velY * lifetime
        this.easingX = easingX
        this.easingY = easingY
    }
    reset() {
        this.elapsed = 0
        this.velX = this.velX0
        this.velY = this.velY0
        this.alpha = this.alpha0
        this.pos.x = this.pos0.x
        this.pos.y = this.pos0.y
    }
    update(dt) {
        this.elapsed += dt
        const param = this.elapsed / this.lifetime
        if (this.elapsed > this.lifetime && this.loop) {
            this.reset()
        }
        this.pos.x = this.pos0.x + this.distX * easingFns[this.easingX](param)
        this.pos.y = this.pos0.y + this.distY * easingFns[this.easingY](param)
        if (this.alphaDecayFn) {
            this.alpha = 1 - easingFns[this.alphaDecayFn](param)
        }
    }
}

class ParticleEmitter extends Node {
    constructor({ size, blendMode, randomDistribution = true, hitbox, debug, params, ...nodeProps }) {
        super({ ...nodeProps })
        this.blendMode = blendMode
        this.debug = debug
        this.hitbox = hitbox
        let paramIndices
        if (randomDistribution) {
            paramIndices = params.reduce((distribution, param, index) => {
                return distribution.concat(Array(param.weight || 1).fill(index))
            },[])
        } else {
            const sumOfWeights = params.reduce((prevTotal, param) => {
                return prevTotal + (param.weight || 1)
            }, 0)
            paramIndices = params.reduce((prevIndices, param, index) => {
                return prevIndices.concat(Array(Math.round(size * (param.weight || 1) / sumOfWeights)).fill(index))
            }, [])
        }
        for (let i = 0; i < size; i++) {
            const index = randomDistribution ? pickOne(paramIndices): paramIndices[i]
            const param = params[index]
            const deserializedParam = {
                imgUrl: param.imgUrl,
                pos: {
                    x:  rand(param.offsetX[0], param.offsetX[1]),
                    y:  rand(param.offsetY[0], param.offsetY[1]),
                },
                lifetime:  randf(param.lifetime[0], param.lifetime[1]),
                velX:  rand(param.velX[0], param.velX[1]),
                velY:  rand(param.velY[0], param.velY[1]),
                alpha:  randf(param.alpha[0], param.alpha[1]),
                alphaDecayFn: param.alphaDecayFn === "none" ? null: param.alphaDecayFn,
                easingX: param.easingX === "none" ? "linear": param.easingX,
                easingY: param.easingY === "none" ? "linear": param.easingY,
                loop: true
            }
            this.add(new Particle(deserializedParam))
        }
    }
}

export default ParticleEmitter