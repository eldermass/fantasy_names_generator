import { commonNames, spiritPrefix } from '../data/shared'
import { _getRarity } from '../utils';
import { rarityValues } from '../constants';
import { alchemy } from '../data/alchemy';

const commonAlchemyNames = [
    ...commonNames.dao,
    ...commonNames.element,
    ...commonNames.color,
    ...commonNames.number,
    ...commonNames.action,
];

export function getAlchemy(number: number, kind?: string) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let rarity = 'common';
        let pre =
            commonAlchemyNames[Math.floor(Math.random() * commonAlchemyNames.length)];
        let s = '';
        let r = _getRarity();
        if (r.value < rarityValues.rare) {
            s = spiritPrefix[Math.floor(Math.random() * spiritPrefix.length)];
        }
        rarity = r.rarity;
        let k = kind || '';
        if (!kind) {
            k = alchemy[Math.floor(Math.random() * alchemy.length)];
        }
        names.push({ name: pre + s + k, rarity });
    }
    return names;
}