import { useResultStore } from '@/stores/results'
import type { Ref } from 'vue'
import { getName, getDao } from 'fantasy-names'

export default function generator(type: string, params?: { [prop: string]: Ref }) {
    const store = useResultStore()

    const generateResult = () => {
        let result: (string | { name: string; rarity: string; })[] = []
        switch (type) {
            case 'name':
                result = handleName(params)
                break
            case 'dao':
                result = handleDao(params)
                break
        }
        console.log(result)
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