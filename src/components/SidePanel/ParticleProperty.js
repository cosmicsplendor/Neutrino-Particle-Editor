import { Input, Typography, Space } from "antd"
const { Text } = Typography

import styles from "./style.css"

const ParticleProperty = ({ disabled, activeSpriteID, name, label, value, update }) => {
    return (
        <Space direction="horizontal">
            <Text type="secondary">{label || name}</Text>
            <Space>
                <Input disabled={disabled} className={styles.inputSm} addonBefore="from" value={value[0]} onChange={e => update({ id: activeSpriteID, [name]: [ Number.parseInt(e.target.value || 0), value[1]]})}/>
                <Input disabled={disabled} className={styles.inputSm} addonBefore="to" value={value[1]} onChange={e => update({ id: activeSpriteID, [name]: [ value[0], Number.parseInt(e.target.value || 0)]})}/>
            </Space>
        </Space>
    )
}

export default ParticleProperty