<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { skill as skillKind, lengthValues, numberOptions, bookPrefixStrings, bookPostfixStrings, book as bookKind } from 'fantasy-names'


const bookPrefixOptions = ["随机"].concat(bookPrefixStrings)
const bookPostfixOptions = ["随机"].concat(bookPostfixStrings)
const skillKindOptions = ["随机"].concat(skillKind)
const bookKindOptions = ["随机"].concat(bookKind)

// data
const number = ref(10)
const length = ref("随机")
const mainKind = ref("随机")
const postKind = ref("随机")
const prefix = ref("随机")
const postfix = ref("随机")

// use hook
const params = {
    number, length, mainKind, postKind, prefix, postfix
}
const { generateResult } = generator("book", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="length" title="类别长度" type="string" :optionList="lengthValues" />
            <condition-item v-model:value="prefix" title="前缀" type="string" :optionList="bookPrefixOptions" />
        </div>
        <div class="name-condition">
            <condition-item v-model:value="mainKind" title="主类别" type="string" :optionList="skillKindOptions" />
            <condition-item v-model:value="postKind" title="副类别" type="string" :optionList="bookKindOptions" />
            <condition-item v-model:value="postfix" title="后缀" type="string" :optionList="bookPostfixOptions" />
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