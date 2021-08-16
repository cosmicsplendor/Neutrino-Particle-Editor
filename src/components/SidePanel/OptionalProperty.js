import { Space, Select, Typography } from "antd"

import { easingFns } from "../../hooks/useImports"
import styles from "./style.css"

const { Text } = Typography
const { Option } = Select

export default ({ disabled, activeSpriteID, name, update, value, label }) => {
    return (
        <Space direction="horizontal">
            <Text type="secondary">{label}</Text>
            <Select value={value} className={styles.select} onChange={value => update({ id: activeSpriteID, [name]: value })} size="large" disabled={disabled}>
                {easingFns.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
            </Select>
        </Space>
    )
}