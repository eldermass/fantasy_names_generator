import names from '../data/name/index'
const { family, female, male, middle } = names

export function getName(number: number, options?: { familyName?: string; isFemale?: boolean; style?: 'single' | 'double' | 'combine'; middleCharacter?: string; }) {
    console.log(options)
    let names = [];
    for (let i = 0; i < number; ++i) {
        let theFamilyName;
        if (options?.familyName) {
            theFamilyName = options.familyName;
        } else {
            let familyIndex = Math.floor(Math.random() * family.length);
            theFamilyName = family[familyIndex];
        }
        let f = options?.isFemale ?? Math.floor(Math.random() * 10) % 2 == 0;
        let namesOfASex = f ? female : male;
        let r = Math.random();
        let s = options?.style;
        if (!s) {
            s = r < 0.33333333 ? 'single' : r < 0.66666666 ? 'double' : 'combine';
        }
        let name = '';
        if (s == 'single') {
            if (options?.middleCharacter) {
                name = options.middleCharacter;
            } else {
                let nameIndex = Math.floor(Math.random() * namesOfASex.length);
                name = namesOfASex[nameIndex];
            }
        } else if (s == 'double') {
            let theMiddleCharacter;
            if (options?.middleCharacter) {
                theMiddleCharacter = options.middleCharacter;
            } else {
                let nameIndex = Math.floor(Math.random() * namesOfASex.length);
                theMiddleCharacter = namesOfASex[nameIndex];
            }
            let nameIndex = Math.floor(Math.random() * namesOfASex.length);
            let theLastCharacter = namesOfASex[nameIndex];
            name = theMiddleCharacter + theLastCharacter;
        } else {
            let theMiddleCharacter;
            if (options?.middleCharacter) {
                theMiddleCharacter = options.middleCharacter;
            } else {
                let nameIndex = Math.floor(Math.random() * middle.length);
                theMiddleCharacter = middle[nameIndex];
            }
            let nameIndex = Math.floor(Math.random() * namesOfASex.length);
            let theLastCharacter = namesOfASex[nameIndex];
            name = theMiddleCharacter + theLastCharacter;
        }
        names.push(theFamilyName + name);
    }
    return names;
}