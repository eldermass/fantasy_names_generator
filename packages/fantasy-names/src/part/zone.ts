import { rarityValues, zoneCategories } from "../constants";
import { place, placePrefix, zone } from "../data/place";
import { common, strangeNames } from "../data/shared";

const _kLinkWord = '之'

export function getZone(number: number, options?: { kind: any; category: any; }) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let name = '';
        let k = options?.kind ?? getZoneKind(options?.category);
        let rarity = 'common';
        let r = Math.random();
        if (r < rarityValues.rare) {
            name = strangeNames[Math.floor(Math.random() * strangeNames.length)];
            rarity = 'rare';
        } else if (r < rarityValues.uncommon) {
            name = common[Math.floor(Math.random() * common.length)];
            rarity = 'uncommon';
        } else {
            let prefix = '';
            if (Math.random() < rarityValues.rare) {
                prefix = placePrefix[Math.floor(Math.random() * placePrefix.length)];
            }
            name = prefix + place[Math.floor(Math.random() * place.length)];
            if (name.length == 1) {
                if (k.length > 1) {
                    name += _kLinkWord;
                } else {
                    if (Math.random() < rarityValues.rare) {
                        name += _kLinkWord;
                    }
                }
            }
        }
        names.push({ name: name + k, rarity });
    }
    return names;
}

function getZoneKind(category: string | number) {
    category ??=
        zoneCategories[Math.floor(Math.random() * zoneCategories.length)]
    // @ts-ignore
    let group = zone[category];
    return group[Math.floor(Math.random() * group.length)];
}