// @ts-nocheck
import colorPrefix from './color.json'
import commonNames from './common.json'
import spiritPrefix from './spirit.json'
import strangeNames from './strange.json'

export const common = Object.values(commonNames).flat(1)

export {
    colorPrefix,
    spiritPrefix,
    commonNames,
    strangeNames
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    colorPrefix,
    commonNames,
    spiritPrefix,
    strangeNames,
    common
}