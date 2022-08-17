<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { numberOptions, zoneStrings, zoneCategories } from 'fantasy-names'

const cateNames = ['陆', '水', '空']
const zoneOptions = ["随机"].concat(zoneStrings)
const zoneCategorieOptions = zoneCategories.map((item, index) => ({
    text: cateNames[index],   
    value: item
}))
// @ts-ignore
zoneCategorieOptions.unshift({ text: '随机', value: null })

// data
const number = ref(10)
const kind = ref("随机")
const category = ref(null)

// use hook
const params = {
    kind, number, category
}
const { generateResult } = generator("zone", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="kind" title="类别" type="string" :optionList="zoneOptions" />
            <condition-item v-model:value="category" title="类型" :optionList="zoneCategorieOptions" />
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