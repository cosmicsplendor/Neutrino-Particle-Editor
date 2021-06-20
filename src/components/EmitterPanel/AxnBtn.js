import { useContext, useCallback } from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { Button, Space, Typography } from "antd"
const { Text } = Typography

import Panel from "../UIPrimitives/Panel"
import * as download from "../../utils/download"
import AppContext from "../../AppContext"
import texAtlas from "../../utils/texAtlas"
import styles from "../SidePanel/style.css"

export default () => {
    const { settings: { metaFormat }, imports } = useContext(AppContext)

    const downloadMeta = useCallback(() => {
        if (imports.length === 0) return
        const body = JSON.stringify(texAtlas.getMeta(metaFormat), null, 4)
        download.text({ 
            body, name: `atlasmeta-${Date.now()}`, 
            format: "json"
        })
    }, [ imports, metaFormat ])
    
    const downloadImg = useCallback(() => {
        if (imports.length === 0) return
        download.canvas({ 
            canvas: texAtlas.renderer.canvas, 
            offscreen: true, 
            name: `texatlas-${Date.now()}`, 
            format: "png"
        })
    }, [ imports, metaFormat ])

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
