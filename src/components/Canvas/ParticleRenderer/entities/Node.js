class Node {
    constructor({ pos = { x: 0, y: 0}, rotation = 0, scale,  anchor, pivot } = {}) {
        this.children = []
        this.pos = pos
        this.scale = scale
        this.rotation = rotation
        this.anchor = anchor
        this.pivot = pivot
    }
    static clone(node) {
        
    }   
    add(childNode) {
        this.children.push(childNode)
        return this
    }
    remove(childNode) {
        this.children.filter(n => n !== childNode)
    }
    updateRecursively(dt) {
        this.update && this.update(dt)
        this.children.forEach(node => {
            node.updateRecursively(dt)
        })
    }
}

export default Node