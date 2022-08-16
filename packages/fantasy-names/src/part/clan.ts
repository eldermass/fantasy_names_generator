import { clan } from "../data/organization";
import { common } from "../data/shared";

export function getClan(number: number, kind?: any) {
    let names = [];
    for (let i = 0; i < number; ++i) {
      let name = common[Math.floor(Math.random() * common.length)];
      let k = kind;
      if (!k) {
        k = clan[Math.floor(Math.random() * clan.length)];
      }
      names.push(name + k);
    }
    return names;
  }