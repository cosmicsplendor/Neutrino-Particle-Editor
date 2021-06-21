const paramsRange = Object.freeze({
    offsetX: [ -500, 500 ],
    offsetY: [ -500, 500 ],
    lifetime: [ 0, 10 ],
    velX: [ -100, 100 ],
    velY: [ -100, 100 ],
    accX: [ - 100, 100 ],
    accY: [ - 100, 100 ],
    alpha: [ 0, 1 ],
    rotation: [ 0, Math.PI * 2 ],
    angularVel: [ 0, Math.PI * 10 ]
})

const floatProps = [ "alpha", "lifetime" ]
const interpolate = (range, percent, round) => {
    const output = range[0] + (range[1] - range[0]) * percent / 100
    return round ? Math.round(output): output
} 
export default inputs => {
    return inputs.map(({ alphaDecayFn = "", name, src, weight, ...rest }) => {
        const mappedVal = { alphaDecayFn, weight, imgUrl: src, frame: name }
        const restOfTheProps = Object.keys(rest)
        restOfTheProps.forEach(prop => {
            const range = paramsRange[prop]
            const val = rest[prop]
            if (!range) { return }
            const roundValues = !floatProps.includes(prop)
            mappedVal[prop] = [
                interpolate(range, val[0], roundValues),
                interpolate(range, val[1], roundValues),
            ]
        })
        return mappedVal
    })
}