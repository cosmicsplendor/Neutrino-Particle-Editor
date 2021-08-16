import { useContext, useMemo } from "react"
import { Space, notification, Typography, Input, InputNumber } from "antd"

import AppContext from ".././../AppContext"
import { initialProperties as defaultProperties } from "../../hooks/useImports"
import ParticleProperty from "./ParticleProperty"
import OptionalProperty from "./OptionalProperty"
import placeholderImg from "../../images/placeholder.png"
import styles from "./style.css"
import { HBOX_EDITOR_W, HBOX_EDITOR_IMG_W } from "../../constants"

const hitboxEditorStyle = {
    width: HBOX_EDITOR_W,
    height: HBOX_EDITOR_W 
}
const hitboxEditorImgStyle = {
    width: HBOX_EDITOR_IMG_W,
    height: HBOX_EDITOR_IMG_W
}

const { Text } = Typography

export default () => {
    const { activeSprite: activeSpriteID, imports, importAxns } = useContext(AppContext)
    const activeSprite = useMemo(() => {
        return imports.find(({ id }) => activeSpriteID === id) || {}
    }, [ activeSpriteID, imports ])
    const inputsDisabled = !Boolean(activeSpriteID)
    const { 
        src: spriteImg, 
        name,
        offsetX, offsetY, lifetime, velX, velY, easingX, easingY, alpha, alphaDecayFn, rotation, angularVel, weight 
    } = inputsDisabled ? defaultProperties: activeSprite
    return (
        <div className={styles.metaPanel}>
            <Space direction="vertical">
                <div className={styles.sectionHeader}>
                    Particle Properties
                </div>
                <Space direction="horizontal">
                   <div className={styles.hitboxEditor} style={hitboxEditorStyle}>
                        <img 
                            className={styles.metaImage} 
                            src={spriteImg || placeholderImg} 
                            style={hitboxEditorImgStyle}
                        />
                        {/* <div className={styles.hitbox} style={hitboxElStyle}/> */}
                   </div>
                   <Space direction="vertical">
                        <Text type="secondary">Texture Name</Text>
                        <Input 
                            className={styles.input} 
                            value={name} placeholder="not selected" 
                            onChange={e => {
                                const newName = e.target.value
                                const duplicate = !!imports.some(({ name }) => {
                                    return name === newName
                                })
                                if (duplicate) {
                                    notification.open({
                                        message: "Clashing Names",
                                        description: `"${newName}" clashes with the name of one of the imported textures. Name field has to be unique.`
                                    })
                                    return
                                }
                                importAxns.update({ id: activeSpriteID, name: newName})
                            }} 
                            disabled={inputsDisabled}
                        />
                    </Space>
                </Space>
                <Space direction="horizontal">
                    <Text type="secondary">distribution weight</Text>
                    <InputNumber value={weight} onChange={value => importAxns.update({ id: activeSpriteID, weight: value })} disabled={inputsDisabled}/>
                </Space>
                    <OptionalProperty activeSpriteID={activeSpriteID} name="alphaDecayFn" label="alpha decay function" value={alphaDecayFn} update={importAxns.update} disabled={inputsDisabled}/>
         
                <Space direction="vertical" style={{ marginTop: "1em" }}>
                    <ParticleProperty activeSpriteID={activeSpriteID} name="offsetX" value={offsetX} update={importAxns.update} disabled={inputsDisabled}/>
                    <ParticleProperty activeSpriteID={activeSpriteID} name="offsetY" value={offsetY} update={importAxns.update} disabled={inputsDisabled}/>
                    <ParticleProperty activeSpriteID={activeSpriteID} name="lifetime" value={lifetime} update={importAxns.update} disabled={inputsDisabled}/>
                    <ParticleProperty activeSpriteID={activeSpriteID} name="velX" label="velocityX" value={velX} update={importAxns.update} disabled={inputsDisabled}/>
                    <ParticleProperty activeSpriteID={activeSpriteID} name="velY" label="velocityY" value={velY} update={importAxns.update} disabled={inputsDisabled}/>

                    <ParticleProperty activeSpriteID={activeSpriteID} name="alpha" value={alpha} update={importAxns.update} disabled={inputsDisabled}/>
                </Space>
                <OptionalProperty activeSpriteID={activeSpriteID} name="easingX" value={easingX} label="easing X" update={importAxns.update} disabled={inputsDisabled}/>
                <OptionalProperty activeSpriteID={activeSpriteID} name="easingY" value={easingY} label="easing Y" update={importAxns.update} disabled={inputsDisabled}/>
            </Space>
        </div>
    )
}