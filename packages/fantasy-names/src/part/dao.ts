import { _getRarity } from '../utils'
import daos from '../data/dao/index'
const { dao, daoTitleMale, daoTitleFemale } = daos

export function getDao(number: number, options: { firstCharacter: string; isFemale: boolean; title: string; }) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let theFirstCharacter;
        if (options?.firstCharacter) {
            theFirstCharacter = options.firstCharacter;
        } else {
            let nameIndex1 = Math.floor(Math.random() * dao.length);
            theFirstCharacter = dao[nameIndex1];
        }
        let nameIndex2 = Math.floor(Math.random() * dao.length);
        let name = theFirstCharacter + dao[nameIndex2];
        let titleGroup =
            options?.isFemale ?? Math.floor(Math.random() * 10) % 2 == 0
                ? daoTitleFemale
                : daoTitleMale;
        let t = options?.title || '';
        let rarity = 'common';
        if (!t) {
            rarity = _getRarity().rarity;
            if (rarity == 'exotic') {
                t =
                    titleGroup.exotic[
                    Math.floor(Math.random() * titleGroup.exotic.length)
                    ];
            } else if (rarity == 'mythic') {
                t =
                    titleGroup.mythic[
                    Math.floor(Math.random() * titleGroup.mythic.length)
                    ];
            } else if (rarity == 'legendary') {
                t =
                    titleGroup.legendary[
                    Math.floor(Math.random() * titleGroup.legendary.length)
                    ];
            } else if (rarity == 'epic') {
                t = titleGroup.epic[Math.floor(Math.random() * titleGroup.epic.length)];
            } else if (rarity == 'rare') {
                t = titleGroup.rare[Math.floor(Math.random() * titleGroup.rare.length)];
            } else if (rarity == 'uncommon') {
                t =
                    titleGroup.uncommon[
                    Math.floor(Math.random() * titleGroup.uncommon.length)
                    ];
            }
        } else {
            if (
                daoTitleFemale.exotic.includes(t) ||
                daoTitleMale.exotic.includes(t)
            ) {
                rarity = 'exotic';
            } else if (
                daoTitleFemale.mythic.includes(t) ||
                daoTitleMale.mythic.includes(t)
            ) {
                rarity = 'mythic';
            }
            if (
                daoTitleFemale.legendary.includes(t) ||
                daoTitleMale.legendary.includes(t)
            ) {
                rarity = 'legendary';
            }
            if (daoTitleFemale.epic.includes(t) || daoTitleMale.epic.includes(t)) {
                rarity = 'epic';
            }
            if (daoTitleFemale.rare.includes(t) || daoTitleMale.rare.includes(t)) {
                rarity = 'rare';
            }
            if (
                daoTitleFemale.uncommon.includes(t) ||
                daoTitleMale.uncommon.includes(t)
            ) {
                rarity = 'uncommon';
            }
        }
        names.push({ name: name + t, rarity });
    }
    return names;
}