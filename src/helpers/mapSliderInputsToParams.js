const paramsRange = Object.freeze({
    offsetX: [ -500, 500 ],
    offsetY: [ -500, 500 ],
    lifetime: [ 0, 10 ],
    velX: [ -100, 100 ],
    velY: [ -250, 250 ],
    accX: [ - 250, 250 ],
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

export const mapToWorldValues = props => {
    const propNames = Object.keys(props)
    const mappedVal = { }
    propNames.forEach(propName => {
        const range = paramsRange[propName]
        const val = props[propName]
        if (!range) { return }
        const roundValues = !floatProps.includes(propName)
        mappedVal[propName] = [
            interpolate(range, val[0], roundValues),
            interpolate(range, val[1], roundValues),
        ]
    })
    return mappedVal
}

export default inputs => {
    return inputs.map(({ alphaDecayFn = "", name, src, weight, width, height, ...rest }) => {
        const kinematicProps = mapToWorldValues(rest)
        return { alphaDecayFn, weight, imgUrl: src, frame: name, width, height, ...kinematicProps }
    })
}