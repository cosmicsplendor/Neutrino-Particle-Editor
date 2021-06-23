import { useContext, useCallback } from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { Button, Typography } from "antd"
const { Text } = Typography

import AppContext from "../../AppContext"
import * as download from "./download"
import mapSliderInputsToParams from "../../helpers/mapSliderInputsToParams"
import styles from "../SidePanel/style.css"
import calcEmitterBounds from "../../helpers/calcEmitterBounds"

export default () => {
    const { settings, imports } = useContext(AppContext)

    const downloadMeta = useCallback(() => {
        if (imports.length === 0) return
        const mappedInputs = mapSliderInputsToParams(imports)
        const { x, y} = calcEmitterBounds(mappedInputs)
        const hitbox = { x: x.min, y: y.min, width: x.max - x.min, height: y.max - y.min }
        const exports = { ...settings, params: mappedInputs, hitbox }
        exports.params.forEach(param => delete param.imgUrl)
        exports.randomDistribution = exports.distribution === "random"
        exports.size = exports.numOfParticles
        delete exports.numOfParticles
        delete exports.distribution

        const body = JSON.stringify(exports, null, 1)
        download.text({ 
            body, name: `particle-data-${Date.now()}`, 
            format: "json"
        })
    }, [ imports, settings ])
    
    return (
        <div className={styles.axnBtn} size="large">
            <Text type="secondary" style={{ marginRight: "0.5em" }}>Export</Text>
            <Button onClick={downloadMeta}> 
                <DownloadOutlined />
                <span>Data</span>
            </Button>
        </div>
    )
}
