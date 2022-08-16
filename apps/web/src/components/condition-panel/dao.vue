<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { sexOptions, numberOptions, daoMaleStrings, daoFemaleStrings, daoTitles } from 'fantasy-names'


const titleOptions = ["随机"].concat(daoTitles)

// data
const number = ref<number>(10)
const isFemale = ref<(typeof sexOptions)[number]['value']>(null)
const title = ref<(typeof titleOptions)[number]>("随机")
const firstCharacter = ref()

// use hook
const params = {
    firstCharacter, isFemale, title, number
}
const { generateResult } = generator("dao", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="isFemale" title="性别" :optionList="sexOptions" />
            <condition-item v-model:value="title" title="称号" type="string" :optionList="titleOptions" />
        </div>
        <div class="name-condition">
            <a-input v-model:value="firstCharacter" style="max-width: 400px;" addon-before="字辈" />
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