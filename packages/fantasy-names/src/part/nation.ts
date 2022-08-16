import { rarityValues } from "../constants";
import { nation } from "../data/organization";
import { place, placePrefix } from "../data/place";
import { common, strangeNames } from "../data/shared";

const _kContry = '国';
export function getNation(number: number, kind?: string) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let name = '';
        let k = kind ?? '';
        let rarity = 'common';
        let r = Math.random();
        if (r < rarityValues.rare) {
            name = strangeNames[Math.floor(Math.random() * strangeNames.length)];
            rarity = 'rare';
            if (!kind) {
                if (name.length == 1) {
                    k = _kContry;
                } else {
                    k = nation[Math.floor(Math.random() * nation.length)];
                }
            }
        } else if (r < rarityValues.uncommon) {
            name = common[Math.floor(Math.random() * common.length)];
            rarity = 'uncommon';
            if (!kind) {
                if (name.length == 1) {
                    k = _kContry;
                } else {
                    k = nation[Math.floor(Math.random() * nation.length)];
                }
            }
        } else {
            let prefix = '';
            if (Math.random() < rarityValues.rare) {
                prefix = placePrefix[Math.floor(Math.random() * placePrefix.length)];
            }
            name = prefix + place[Math.floor(Math.random() * place.length)];
            if (!kind) {
                k = _kContry;
            }
        }
        names.push({ name: name + k, rarity });
    }
    return names;
}