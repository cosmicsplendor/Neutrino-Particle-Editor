import { useContext, useEffect, useRef, useState } from "react"

import ParticleRenderer from "./ParticleRenderer"
import AppContext from "../../AppContext"
import styles from "../style.css"
import { PREVIEW_ID } from "../../constants"

let particleRenderer = null

export default () => {
    const { settings, imports } = useContext(AppContext)
    const [ bgColor, setBgColor ] = useState("#333333")
    const previewContainerRef = useRef()
    
    useEffect(() => {
        const previewContainer = previewContainerRef.current
        const previewImage = previewContainer.querySelector(`#${PREVIEW_ID}`)
        const { width, height } = previewContainer.getBoundingClientRect()
        previewImage.width = width
        previewImage.height = height
    }, [])

    useEffect(() => {
        if (!particleRenderer) { particleRenderer = new ParticleRenderer(PREVIEW_ID) }
        if (imports.length === 0) { return }
        particleRenderer.setParams({
            ...settings,
            distribution: null,
            size: settings.numOfParticles,
            randomDistribution: settings.distribution === "random",
            params: imports
        })
    }, [ settings.blendMode, settings.distribution, settings.debug, settings.numOfParticles, imports ])

    return (
       <div className={styles.preview} style={{ background: bgColor }} ref={previewContainerRef}>
            <canvas style={{ display: !!imports.length ? "block": "none"}} className={styles.previewImg} id={PREVIEW_ID} />
            <input value={"bgColor"} type="color" onChange={e => setBgColor(e.target.value)}/>
       </div>
    )
}