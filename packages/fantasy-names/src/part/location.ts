import { rarityValues } from "../constants";
import { place, placePostfix, location } from "../data/place";
import { common, strangeNames } from "../data/shared";

export function getLocation(number: number, kind?: string) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let name = '';
        let k = kind ?? '';
        let rarity = 'common';
        let r = Math.random();
        if (r < rarityValues.rare) {
            name = strangeNames[Math.floor(Math.random() * strangeNames.length)];
            rarity = 'rare';
        } else if (r < rarityValues.uncommon) {
            name = common[Math.floor(Math.random() * common.length)];
            rarity = 'uncommon';
        } else {
            let placeIndex = Math.floor(Math.random() * place.length);
            let postfix = '';
            if (Math.random() < rarityValues.uncommon) {
                let postfixIndex = Math.floor(Math.random() * placePostfix.length);
                postfix = placePostfix[postfixIndex];
            }
            name = place[placeIndex] + postfix;
        }
        if (!kind) {
            k = location[Math.floor(Math.random() * location.length)];
        }
        names.push({ name: name + k, rarity });
    }
    return names;
}