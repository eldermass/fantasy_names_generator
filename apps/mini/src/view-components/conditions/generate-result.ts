import { useResultStore } from '../../store/results'
import type { Ref } from 'vue'
import { getName, getDao, getSkill, getBook, getMaterial, getAlchemy, getTalisman, getCreature, getClan, getNation, getLocation, getZone } from '@chenxuanyu/fantasy-names'

export default function generator(type: string, params?: { [prop: string]: Ref }) {
    const store = useResultStore()

    const generateResult = () => {
        // console.log(type, Object.values(params).map(item => item.value))
        let result: (string | { name: string; rarity: string; })[] = []
        switch (type) {
            case 'name':
                result = handleName(params)
                break
            case 'dao':
                result = handleDao(params)
                break
            case 'skill':
                result = handleSkill(params)
                break
            case 'book':
                result = handleBook(params)
                break
            case 'creature':
                result = handleCreature(params)
                break
            case 'material':
                result = handleMaterial(params)
                break
            case 'alchemy':
                result = handleAlchemy(params)
                break
            case 'talisman':
                result = handleTalisman(params)
                break
            case 'clan':
                result = handleClan(params)
                break
            case 'nation':
                result = handleNation(params)
                break
            case 'location':
                result = handleLocation(params)
                break
            case 'zone':
                result = handleZone(params)
                break
        }
        // console.log(result)
        store.set_results(result)
    }

    return {
        generateResult
    }
}

function handleName(options: { [prop: string]: Ref<any> } | undefined) {
    const number = options?.number.value
    const isFemale = options?.isFemale.value
    const style = options?.style.value
    const familyName = options?.familyName.value
    const middleCharacter = options?.middleCharacter.value
    return getName(number, { familyName, isFemale, style, middleCharacter })
}

function handleDao(options: { [prop: string]: Ref<any> } | undefined) {
    const number = options?.number.value
    const isFemale = options?.isFemale.value
    const title = options?.title.value === '随机' ? null : options?.title.value
    const firstCharacter = options?.firstCharacter.value

    return getDao(number, { firstCharacter, isFemale, title })
}

function handleSkill(options: { [prop: string]: Ref<any> } | undefined) {
    const length = options?.length.value === '随机' ? null : options?.length.value
    const kind = options?.kind.value === '随机' ? null : options?.kind.value
    const prefix = options?.prefix.value === '随机' ? null : options?.prefix.value
    const numfix = options?.numfix.value === '随机' ? null : options?.numfix.value

    return getSkill(options?.number.value, { length, kind, prefix, numfix })
}

function handleBook(options: { [prop: string]: Ref<any> } | undefined) {
    const length = options?.length.value === '随机' ? null : options?.length.value
    const mainkind = options?.mainKind.value === '随机' ? null : options?.mainKind.value
    const postkind = options?.postKind.value === '随机' ? null : options?.postKind.value
    const prefix = options?.prefix.value === '随机' ? null : options?.prefix.value
    const postfix = options?.postfix.value === '随机' ? null : options?.postfix.value

    return getBook(options?.number.value, { length, mainkind, postkind, prefix, postfix })
}

function handleCreature(options: { [prop: string]: Ref<any> } | undefined) {
    const category = options?.category.value === '随机' ? null : options?.category.value
    const rarity = options?.rarity.value === '随机' ? null : options?.rarity.value

    return getCreature(options?.number.value, { category, rarity })
}

function handleMaterial(options: { [prop: string]: Ref<any> } | undefined) {
    const kind = options?.kind.value === '随机' ? null : options?.kind.value
    const rarity = options?.rarity.value
    const postfix = options?.postfix.value === '随机' ? null : options?.postfix.value

    return getMaterial(options?.number.value, { kind, rarity, postfix })
}

function handleAlchemy(options: { [prop: string]: Ref<any> } | undefined) {
    const kind = options?.kind.value === '随机' ? null : options?.kind.value

    return getAlchemy(options?.number.value, kind)
}

function handleTalisman(options: { [prop: string]: Ref<any> } | undefined) {
    const kind = options?.kind.value === '随机' ? null : options?.kind.value
    const rarity = options?.rarity.value
    const postfix = options?.postfix.value === '随机' ? null : options?.postfix.value

    return getTalisman(options?.number.value, { kind, rarity, postfix })
}

function handleClan(options: { [prop: string]: Ref<any> } | undefined) {
    const kind = options?.kind.value === '随机' ? null : options?.kind.value

    return getClan(options?.number.value, kind)
}

function handleNation(options: { [prop: string]: Ref<any> } | undefined) {
    const kind = options?.kind.value === '随机' ? null : options?.kind.value

    return getNation(options?.number.value, kind)
}

function handleLocation(options: { [prop: string]: Ref<any> } | undefined) {
    const kind = options?.kind.value === '随机' ? null : options?.kind.value

    return getLocation(options?.number.value, kind)
}

function handleZone(options: { [prop: string]: Ref<any> } | undefined) {
    const kind = options?.kind.value === '随机' ? null : options?.kind.value
    const category = options?.category.value === '随机' ? null : options?.category.value

    return getZone(options?.number.value, { kind, category })
}