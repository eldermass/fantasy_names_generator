import { rarityValues, _kParenthesisLeft, _kParenthesisRight } from "../constants";
import { colorPrefix, common, spiritPrefix } from "../data/shared";
import { talisman, talismanMaterial, talismanPostfix } from "../data/talisman";
import { _getRarity } from "../utils";

export function getTalisman(number: number, options?: { kind: any; rarity: any; postfix: string; }) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let name = '';
        let prefix = common[Math.floor(Math.random() * common.length)];
        let c = colorPrefix[Math.floor(Math.random() * colorPrefix.length)];
        let m =
            talismanMaterial[Math.floor(Math.random() * talismanMaterial.length)];
        let s = spiritPrefix[Math.floor(Math.random() * spiritPrefix.length)];
        let k = options?.kind;
        let r = options?.rarity ?? _getRarity(rarityValues.uncommon).rarity;
        if (r == 'exotic') {
            let t = [
                ...talisman.exotic,
                ...talisman.mythic,
                ...talisman.legendary,
                ...talisman.epic,
                ...talisman.rare,
                ...talisman.uncommon,
                ...talisman.common,
            ];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = prefix + s + k;
        } else if (r == 'mythic') {
            let t = [
                ...talisman.mythic,
                ...talisman.legendary,
                ...talisman.epic,
                ...talisman.rare,
                ...talisman.uncommon,
                ...talisman.common,
            ];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = prefix + s + k;
        } else if (r == 'legendary') {
            let t = [
                ...talisman.legendary,
                ...talisman.epic,
                ...talisman.rare,
                ...talisman.uncommon,
                ...talisman.common,
            ];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = prefix + c + m + k;
        } else if (r == 'epic') {
            let t = [
                ...talisman.epic,
                ...talisman.rare,
                ...talisman.uncommon,
                ...talisman.common,
            ];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = prefix + m + k;
        } else if (r == 'rare') {
            let t = [...talisman.rare, ...talisman.uncommon, ...talisman.common];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = prefix + k;
        } else if (r == 'uncommon') {
            let t = [...talisman.uncommon, ...talisman.common];
            k ??= t[Math.floor(Math.random() * t.length)];
            name = c + m + k;
        } else if (r == 'common') {
            k ??= talisman.common[Math.floor(Math.random() * talisman.common.length)];
            name = m + k;
        }
        let post = options?.postfix || '';
        if (!post) {
            let r1 = Math.random();
            let r2 = Math.random();
            if (r1 < rarityValues.rare && r2 < rarityValues.rare) {
                post =
                    _kParenthesisLeft +
                    talismanPostfix.broken[
                    Math.floor(Math.random() * talismanPostfix.broken.length)
                    ] +
                    _kParenthesisRight;
            } else if (r1 < rarityValues.uncommon && r2 < rarityValues.uncommon) {
                post =
                    _kParenthesisLeft +
                    talismanPostfix.handmade[
                    Math.floor(Math.random() * talismanPostfix.handmade.length)
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
