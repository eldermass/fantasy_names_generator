import { _getRarity, _getSkillName } from '../utils'

export function getSkill(number: number, options?: { length: any; kind: any; prefix: any; numfix: any; }) {
    let names = [];
    for (let i = 0; i < number; ++i) {
        let name = _getSkillName(
            options?.length,
            options?.kind,
            options?.prefix,
            options?.numfix
        );
        names.push(name)
    }
    return names
}

