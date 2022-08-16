import { rarityValues } from './constants'
import { common } from './data/shared/index'
import { skillPrefix, skillNumfix, skill } from './data/skill/index'

export function _getRarity(max?: number) {
    let rarity;
    let value = Math.random() * (max || 1.0);
    if (value < rarityValues.exotic) {
        rarity = 'exotic';
    } else if (value < rarityValues.mythic) {
        rarity = 'mythic';
    } else if (value < rarityValues.legendary) {
        rarity = 'legendary';
    } else if (value < rarityValues.epic) {
        rarity = 'epic';
    } else if (value < rarityValues.rare) {
        rarity = 'rare';
    } else if (value < rarityValues.uncommon) {
        rarity = 'uncommon';
    } else {
        rarity = 'common';
    }
    return { rarity, value };
}

const _kNumberBeginSupplement = '路'
const _kNumberEndSupplement = '式'

export function _getSkillName(length: number, kind?: any, prefix?: string, numfix?: string) {
    let l = length || 1;
    let rarity = 'common';
    if (!length) {
        let r = _getRarity();
        if (r.value < rarityValues.rare) {
            l = 3;
        } else if (r.value < rarityValues.uncommon) {
            l = 2;
        }
        rarity = r.rarity;
    } else {
        if (length > 2) {
            rarity = 'rare';
        } else if (length > 1) {
            rarity = 'uncommon';
        }
    }
    let name = '';
    for (let i = 0; i < l; ++i) {
        name += common[Math.floor(Math.random() * common.length)];
    }
    let pre = prefix || '';
    if (!pre && Math.random() < rarityValues.epic) {
        pre = skillPrefix[Math.floor(Math.random() * skillPrefix.length)];
    }
    let n = numfix || '';
    if (!n && Math.random() < rarityValues.epic) {
        n = skillNumfix[Math.floor(Math.random() * skillNumfix.length)];
    }
    let k = kind || skill[Math.floor(Math.random() * skill.length)];
    if (Math.random() < 0.5) {
        name = (n != '' ? n + _kNumberBeginSupplement : '') + pre + name + k;
    } else {
        if (k.length > 1) {
            name = pre + name + k + (n != '' ? n + _kNumberEndSupplement : '');
        } else {
            name = pre + name + n + k;
        }
    }
    return { name, rarity };
}
