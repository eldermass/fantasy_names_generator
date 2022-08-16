// @ts-nocheck
import dao from './dao.json'
import daoTitleMale from './title_male.json'
import daoTitleFemale from './title_female.json'

export const daoMaleStrings = Object.values(daoTitleMale).flat(1)
export const daoFemaleStrings = Object.values(daoTitleFemale).flat(1)
export const daoTitles = daoMaleStrings.concat(daoFemaleStrings)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    dao,
    daoTitleMale,
    daoTitleFemale
}