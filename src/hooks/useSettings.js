import { useState, useReducer, useCallback, useMemo } from "react"

export const sortingFns = [
    "max-side",
    "perimeter",
    "area",
    "diagonal",
    "width",
    "height",
]

export const blendModes = [
    "none",
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
    blendMode:"",
    distribution: distributions[0],
    numOfParticles: 40,
    loop: false
}

export default () => {
    const [ blendMode, setBlendMode ] = useState(initialSettings.blendMode)
    const [ distribution, setDistribution ] = useState(initialSettings.distribution)
    const [ loop, setLoop ] = useState(initialSettings.loop)
    const [ numOfParticles, updateNumOfParticles ] = useReducer((prevMargin, update) => {
        return { ...prevMargin, ...update }
    }, initialSettings.numOfParticles)

    const updateSettings = useCallback(({ blendMode, distribution, loop, numOfParticles }) => {
        if (!!blendMode) {
            return setBlendMode(blendMode)
        }
        if (!!distribution) {
            return setDistribution(distribution)
        }
        if (typeof loop !== "undefined" && typeof loop !== "null") {
            return setLoop(loop)
        }
        if (!!numOfParticles) {
            return updateNumOfParticles(numOfParticles)
        }
    }, [])

    const settings = useMemo(() => {
        return { blendMode, distribution, loop, numOfParticles }
    }, [ blendMode, distribution, loop, numOfParticles])

    return [
        settings,
        updateSettings
    ]
}

