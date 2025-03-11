import { useContext } from "react"
import { Select, InputNumber, Typography, Space, Switch } from "antd"

import Panel from "../UIPrimitives/Panel"
import { distributions, blendModes } from "../../hooks/useSettings"
import AxnBtn from "./AxnBtn"
import AppContext from "../../AppContext"
import styles from "../SidePanel/style.css"

const { Text } = Typography
const { Option } = Select

export default () => {
    const { settings: {
        blendMode,
        distribution,
        numOfParticles,
        loop,
        debug
    }, updateSettings } = useContext(AppContext)
    return (
        <Panel className={styles.sidePanel}>
            <div>
                <div className={styles.sectionHeader}>
                    Emitter Properties (Global)
                </div>
            <Space direction="vertical">
                    <div>
                        <Space direction="vertical">
                            <Text type="secondary">blend mode</Text>
                            <Select value={blendMode} style={{ width: 150 }} onChange={value => updateSettings({ blendMode: value })} size="small">
                                {blendModes.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
                            </Select>
                        </Space>
                    </div>
                    <div>
                        <Space direction="vertical">
                            <Text type="secondary">particle type distribution</Text>
                            <Select value={distribution} className={styles.select} onChange={value => updateSettings({ distribution: value })} size="small">
                                {distributions.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
                            </Select>
                        </Space>
                    </div>
                    <div>
                        <Space direction="vertical">
                            <Text type="secondary">number of particles</Text>
                            <Space>
                                <InputNumber className={styles.input} value={numOfParticles} onChange={value => {
                                    updateSettings({ numOfParticles: Number.parseInt(value) || 0 })
                                }} size="small"/>
                            </Space>
                        </Space>
                    </div>
                    <Space>
                        <Space>
                            <Text type="secondary">Loop</Text>
                            <Switch checked={loop} onChange={checked => updateSettings({ loop: checked })}/>
                        </Space>
                        <Space>
                            <Text type="secondary">debug</Text>
                            <Switch checked={debug} onChange={checked => updateSettings({ debug: checked })}/>
                        </Space>
                    </Space>
                    <AxnBtn />
            </Space>
            </div>
        </Panel>
    )
}