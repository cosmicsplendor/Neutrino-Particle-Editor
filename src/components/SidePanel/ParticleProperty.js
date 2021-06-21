import { Slider, Typography, Space } from "antd"
const { Text } = Typography

import styles from "./style.css"

const ParticleProperty = ({ disabled, activeSpriteID, name, label, value, update }) => {
    return (
        <Space direction="horizontal">
            <Text type="secondary">{label || name}</Text>
            <Space>
                <Slider range value={[value[0],value[1]]} tipFormatter={null} style={{ width: 250 }} onChange={([ x, y ]) => update({ id: activeSpriteID, [name]: [ x, y ]})} disabled={disabled}/>
            </Space>
        </Space>
    )
}

export default ParticleProperty