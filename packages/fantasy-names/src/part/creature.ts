import { creatureCategory, rarityValues } from "../constants";
import { creature, creaturePrefix, strangeCreature } from "../data/creature";
import { colorPrefix, commonNames } from "../data/shared";
import { _getRarity } from "../utils";

const commonCreatureNames = [
    ...commonNames.dao,
    ...commonNames.element,
    ...commonNames.thing,
    ...commonNames.color,
    ...commonNames.number,
    ...commonNames.action,
  ];

export function getCreature(number: number, options?: { category: any; rarity: any; }) {
    let names = [];
    for (let i = 0; i < number; ++i) {
      let name = '';
      let pre =
        commonCreatureNames[
          Math.floor(Math.random() * commonCreatureNames.length)
        ];
      let c = colorPrefix[Math.floor(Math.random() * colorPrefix.length)];
      let s = creaturePrefix[Math.floor(Math.random() * creaturePrefix.length)];
      let cat = options?.category;
      let k = '';
      if (!cat) {
        cat =
          creatureCategory[Math.floor(Math.random() * creatureCategory.length)];
      }
      // @ts-ignore
      k = creature[cat][Math.floor(Math.random() * creature[cat].length)];
      let r = options?.rarity || _getRarity(rarityValues.uncommon).rarity;
      if (r == 'exotic') {
        name =
          strangeCreature[Math.floor(Math.random() * strangeCreature.length)];
      } else if (r == 'mythic') {
        name = pre + c + s + k;
      } else if (r == 'legendary') {
        name = pre + s + k;
      } else if (r == 'epic') {
        name = pre + c + k;
      } else if (r == 'rare') {
        name = pre + k;
      } else if (r == 'uncommon') {
        name = c + s + k;
      } else if (r == 'common') {
        name = c + k;
      }
      names.push({ name, rarity: r, category: cat });
    }
    return names;
  }
  