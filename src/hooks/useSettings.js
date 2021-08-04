import { useState, useCallback, useMemo } from "react"

export const blendModes = [
    "source-over",
    "multiply",
    "exclusion",
    "lighten",
    "darken",
    "difference",
    "xor",
    "hue",
    "color",
    "saturation",
    "luminosity",
    "color-burn",
    "color-dodge"
]

export const distributions = [
    "random",
    "proportionate"
]

const initialSettings = {
    blendMode:"source-over",
    distribution: "random",
    numOfParticles: 40,
    loop: true,
    debug: false
}

export default () => {
    const [ blendMode, setBlendMode ] = useState(initialSettings.blendMode)
    const [ distribution, setDistribution ] = useState(initialSettings.distribution)
    const [ loop, setLoop ] = useState(initialSettings.loop)
    const [ debug, setDebug ] = useState(initialSettings.debug)
    const [ numOfParticles, setNumOfParticles ] = useState(initialSettings.numOfParticles)

    const updateSettings = useCallback(({ blendMode, distribution, loop, debug, numOfParticles }) => {
        if (!!blendMode) {
            return setBlendMode(blendMode)
        }
        if (!!distribution) {
            return setDistribution(distribution)
        }
        if (typeof loop !== "undefined" && typeof loop !== "null") {
            return setLoop(loop)
        }
        if (typeof debug !== "undefined" && typeof debug !== "null") {
            return setDebug(debug)
        }
        if (!!numOfParticles) {
            return setNumOfParticles(numOfParticles)
        }
    }, [])

    const settings = useMemo(() => {
        return { blendMode, distribution, loop, numOfParticles, debug }
    }, [ blendMode, distribution, loop, numOfParticles, debug ])

    return [
        settings,
        updateSettings
    ]
}

