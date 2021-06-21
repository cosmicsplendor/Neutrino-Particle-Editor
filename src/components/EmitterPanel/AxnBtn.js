import { useContext, useCallback } from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { Button, Typography } from "antd"
const { Text } = Typography

import AppContext from "../../AppContext"
import * as download from "./download"
import mapSliderInputsToParams from "../../helpers/mapSliderInputsToParams"
import styles from "../SidePanel/style.css"

export default () => {
    const { settings, imports } = useContext(AppContext)

    const downloadMeta = useCallback(() => {
        if (imports.length === 0) return
        const exports = { ...settings, params: mapSliderInputsToParams(imports) }
        exports.params.forEach(param => delete param.imgUrl)
        exports.randomDistribution = exports.distribution === "random"
        delete exports.distribution

        const body = JSON.stringify(exports, null, 4)
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
