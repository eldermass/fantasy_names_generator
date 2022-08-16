import { common, colorPrefix, spiritPrefix } from "../data/shared"
import { _getRarity } from "../utils"
import { rarityValues } from '../constants'
import { material, materialPostfix } from '../data/material'


const _kAge1 = '百年';
const _kAge10 = '千年';
const _kAge100 = '万年';
const _kParenthesisLeft = '（';
const _kParenthesisRight = '）';

export function getMaterial(number: number, options?: { kind: any; rarity: any; postfix: string; }) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let name = '';
        let age = '';
        let pre = common[Math.floor(Math.random() * common.length)];
        let c = colorPrefix[Math.floor(Math.random() * colorPrefix.length)];
        let s = spiritPrefix[Math.floor(Math.random() * spiritPrefix.length)];
        let k = options?.kind;
        let r = options?.rarity || _getRarity(rarityValues.uncommon).rarity;
        if (r == 'exotic') {
            let t = [
                ...material.exotic,
                ...material.mythic,
                ...material.legendary,
                ...material.epic,
                ...material.rare,
                ...material.uncommon,
                ...material.common,
            ];
            k ??= t[Math.floor(Math.random() * t.length)];
            age = _kAge100;
            name = age + pre + c + s + k;
        } else if (r == 'mythic') {
            let t = [
                ...material.mythic,
                ...material.legendary,
                ...material.epic,
                ...material.rare,
                ...material.uncommon,
                ...material.common,
            ];
            k ??= t[Math.floor(Math.random() * t.length)];
            age = _kAge10;
            name = age + pre + c + s + k;
        } else if (r == 'legendary') {
            let t = [
                ...material.legendary,
                ...material.epic,
                ...material.rare,
                ...material.uncommon,
                ...material.common,
            ];
            k ??= t[Math.floor(Math.random() * t.length)];
            age = _kAge1;
            name = age + pre + c + s + k;
        } else if (r == 'epic') {
            let t = [
                ...material.epic,
                ...material.rare,
                ...material.uncommon,
                ...material.common,
            ];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = pre + c + s + k;
        } else if (r == 'rare') {
            let t = [...material.rare, ...material.uncommon, ...material.common];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = pre + s + k;
        } else if (r == 'uncommon') {
            let t = [...material.uncommon, ...material.common];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = c + s + k;
        } else if (r == 'common') {
            k ??= material.common[Math.floor(Math.random() * material.common.length)];
            name = c + k;
        }
        let post = options?.postfix || '';
        if (!post) {
            let r1 = Math.random();
            let r2 = Math.random();
            if (r1 < rarityValues.rare && r2 < rarityValues.rare) {
                post =
                    _kParenthesisLeft +
                    materialPostfix.broken[
                    Math.floor(Math.random() * materialPostfix.broken.length)
                    ] +
                    _kParenthesisRight;
            } else if (r1 < rarityValues.uncommon && r2 < rarityValues.uncommon) {
                post =
                    _kParenthesisLeft +
                    materialPostfix.handmade[
                    Math.floor(Math.random() * materialPostfix.handmade.length)
                    ] +
                    _kParenthesisRight;
            }
        } else {
            post = _kParenthesisLeft + post + _kParenthesisRight;
        }
        names.push({ name: name + post, rarity: r });
    }
    return names;
}