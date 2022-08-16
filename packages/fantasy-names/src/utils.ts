import { rarityValues } from './constants'

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