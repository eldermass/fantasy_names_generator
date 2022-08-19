<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { sexOptions, numberOptions } from '@chenxuanyu/fantasy-names'
import cyInput from '../cy-input/cy-input.vue';

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
    <view>
        <view class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="isFemale" title="性别" :optionList="sexOptions" />
            <condition-item v-model:value="style" title="样式" :optionList="styleOptions" />
        </view>
        <view class="name-condition">
            <cy-input v-model:value="familyName" style="max-width: 400px;" label="姓氏" />
            <cy-input v-model:value="middleCharacter" style="max-width: 400px;" label="字辈" />
        </view>
        <view class="name-condition">
            <button type="primary" size="large" @click="generateResult">生 成</button>
        </view>
    </view>

</template>
<style lang="scss">
.name-condition {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
}
</style>