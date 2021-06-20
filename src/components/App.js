import { PageHeader, Tag } from "antd"

import Canvas from "./Canvas"
import SidePanel from "./SidePanel"
import EmitterPanel from "./EmitterPanel"
import ImportPanel from "./ImportPanel"
import ClearBtn from "./ClearBtn"
import styles from "./style.css"

const  App = () => {
    return (
        <div id="app">
            <PageHeader
                ghost={false}
                backIcon=""
                onBack={() => {}}
                title="Particle Editor"
                subTitle="made for"
                tags={<Tag color="grey" style={{ cursor: "pointer" }}>Neutrino.js</Tag>}
                extra={
                    <ClearBtn />
                }
                className={styles.appbar}
            />
            <ImportPanel />
            <div className={styles.upperSection}>
                <SidePanel />
                <Canvas />
                <EmitterPanel />
            </div>
        </div>
    )
}

export default App