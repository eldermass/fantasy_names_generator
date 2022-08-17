// @ts-nocheck
import material from './material.json'
import materialPostfix from './postfix.json'

const materialPostfixStrings = Object.values(materialPostfix).flat(1)
const materialStrings = Object.values(material).flat(1)

export {
    material,
    materialPostfix,
    materialStrings,
    materialPostfixStrings
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    material,
    materialPostfix
}