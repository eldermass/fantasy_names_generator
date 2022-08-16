import { _getSkillName } from '../utils'
import { book, bookPostfix, bookPrefix } from '../data/book/index'
import { rarityValues } from '../constants'

const _kParenthesisLeft = '（';
const _kParenthesisRight = '）';
const _kBookLeft = '《';
const _kBookRight = '》';

export function getBook(number: number, options?: { length: any; mainkind: any; prefix: string; postkind: string; postfix: string; }) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let skillname = _getSkillName(options?.length, options?.mainkind);
        let rarity = skillname.rarity;
        let pre = options?.prefix || '';
        if (!pre) {
            if (rarity == 'exotic') {
                pre =
                    bookPrefix.exotic[
                    Math.floor(Math.random() * bookPrefix.exotic.length)
                    ];
            } else if (rarity == 'mythic') {
                pre =
                    bookPrefix.mythic[
                    Math.floor(Math.random() * bookPrefix.mythic.length)
                    ];
            } else if (rarity == 'legendary') {
                pre =
                    bookPrefix.legendary[
                    Math.floor(Math.random() * bookPrefix.legendary.length)
                    ];
            } else if (rarity == 'epic') {
                pre =
                    bookPrefix.epic[Math.floor(Math.random() * bookPrefix.epic.length)];
            }
        }
        let pk = options?.postkind || '';
        if (pre && !pk) {
            pk = book[Math.floor(Math.random() * book.length)];
        }
        let post = options?.postfix || '';
        if (!post) {
            let r1 = Math.random();
            let r2 = Math.random();
            if (r1 < rarityValues.rare && r2 < rarityValues.rare) {
                post =
                    _kParenthesisLeft +
                    bookPostfix.rare[
                    Math.floor(Math.random() * bookPostfix.rare.length)
                    ] +
                    _kParenthesisRight;
            } else if (r1 < rarityValues.uncommon && r2 < rarityValues.uncommon) {
                post =
                    _kParenthesisLeft +
                    bookPostfix.uncommon[
                    Math.floor(Math.random() * bookPostfix.uncommon.length)
                    ] +
                    _kParenthesisRight;
            }
        } else {
            post = _kParenthesisLeft + post + _kParenthesisRight;
        }
        names.push({
            name: _kBookLeft + skillname.name + pre + pk + post + _kBookRight,
            rarity: rarity,
        });
    }
    return names;
}