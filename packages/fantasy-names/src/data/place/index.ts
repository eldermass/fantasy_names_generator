// @ts-nocheck
import continent from './continent.json'
import location from './location.json'
import place from './place.json'
import placePostfix from './postfix.json'
import placePrefix from './prefix.json'
import zone from './zone.json'

const zoneStrings = Object.values(zone).flat(1)

export {
    continent,
    location,
    place,
    placePostfix,
    placePrefix,
    zone,
    zoneStrings
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    continent,
    location,
    place,
    placePostfix,
    placePrefix,
    zone
}