import { useCallback, useReducer } from "react"
import * as importAxnTypes from "../constants/actionTypes/imports"
import { v4 } from "uuid"

const initialProperties = { 
    offsetX: [ 0, 0 ], offsetY: [ 0, 0 ], lifetime: [ 1, 2 ], velX: [ -15, 15 ], velY: [ -15, 15 ], accX: [ 0, 0 ], accY: [ 0, 0 ], alpha: [ 1, 1 ], alphaEasingFn: "x => 1 - x", rotation: [ 0, 0 ], rotationEasingFn: "x => x * 2 * Math.PI", weight: 1
}

export default () => {
    const [ imports, setImports ] = useReducer((prevImports, action) => {
        const { type, payload } = action
        switch(type) {
            case importAxnTypes.add:
                const newImport = {
                    id: v4(),
                    ...payload,
                    ...initialProperties
                }
                return [ newImport, ...prevImports ]
            case importAxnTypes.update:
                return prevImports.map(imp => imp.id === payload.id ? { ...imp, ...payload }: imp)
            case importAxnTypes.remove:
                return prevImports.filter(({ id }) => id !== payload.id)
            case importAxnTypes.clear:
                return []
        }
    }, [])

    const add = useCallback(item => {
        setImports({ type: importAxnTypes.add, payload: item })
    }, [])

    const update = useCallback(payload => {
        setImports({ type: importAxnTypes.update, payload })
    })
    
    const remove = useCallback(item => {
        setImports({ type: importAxnTypes.remove, payload: item })
    }, [])

    const clear = useCallback(() => {
        setImports({ type: importAxnTypes.clear })
    }, [])

    return {
        imports,
        importAxns: {
            add,
            update,
            remove,
            clear
        }
    }
}