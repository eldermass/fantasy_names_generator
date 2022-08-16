<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { sexOptions, numberOptions } from 'fantasy-names'

const styleOptions = [
    { text: '随机', value: null },
    { text: '一个实字', value: 'single' },
    { text: '两个实字', value: 'double' },
    { text: '虚字 + 实字', value: 'combine' },
] as const

// data
const number = ref<number>(10)
const isFemale = ref<(typeof sexOptions)[number]['value']>(null)
const style = ref<(typeof styleOptions)[number]['value']>(null)
const familyName = ref()
const middleCharacter = ref()

const params = {
    number, isFemale, style, familyName, middleCharacter
}
// use hook
const { generateResult } = generator("name", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="isFemale" title="性别" :optionList="sexOptions" />
            <condition-item v-model:value="style" title="样式" :optionList="styleOptions" />
        </div>
        <div class="name-condition">
            <a-input v-model:value="familyName" style="max-width: 400px;" addon-before="姓氏" />
            <a-input v-model:value="middleCharacter" style="max-width: 400px;" addon-before="字辈" />
        </div>
        <div class="name-condition">
            <a-space :size="30">
                <a-button type="primary" size="large" @click="generateResult">生 成</a-button>
            </a-space>
        </div>
    </div>

</template>
<style lang="scss">
.name-condition {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
}
</style>