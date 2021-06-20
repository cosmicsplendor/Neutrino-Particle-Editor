import Panel from "../UIPrimitives/Panel"
import MetaPanel from "./MetaPanel"

import styles from "./style.css"


export default () => {
    return (
        <Panel className={styles.sidePanel}>
                <MetaPanel />
        </Panel>
    )
}
