import { useContext, useCallback } from "react"
import { Button } from "antd"

import AppContext from "../AppContext"

const ClearApp = () => {
    const { importAxns } = useContext(AppContext)
    const clickHandler = useCallback(() => {
        importAxns.clear()
    }, [])
    return (
        <Button onClick={clickHandler}> Clear </Button>
    )
}

export default ClearApp