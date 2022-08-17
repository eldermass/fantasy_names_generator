// @ts-nocheck
import talismanMaterial from './material.json'
import talismanPostfix from './postfix.json'
import talisman from './talisman.json'

const talismanStrings = Object.values(talisman).flat(1)
const talismanPostfixStrings = Object.values(talismanPostfix).flat(1)

export {
    talismanMaterial,
    talisman,
    talismanPostfix,
    talismanStrings,
    talismanPostfixStrings
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    talismanMaterial,
    talisman,
    talismanPostfix
}