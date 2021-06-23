import Node from "../Node"
import { rect } from "./types"

class Rect extends Node {
    constructor({ width, height, fill = "rgba(0, 0, 0, 0)", stroke = "red", ...nodeProps }) {
        super({ ...nodeProps })
        this.width = width
        this.height = height
        this.fill = fill
        this.stroke = stroke
        this.type = rect
    }
}

export default Rect