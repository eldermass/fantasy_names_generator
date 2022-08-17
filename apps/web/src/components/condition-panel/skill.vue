<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { numberOptions, lengthValues, skillPrefix, skillNumfix, skill as skillKind } from 'fantasy-names'

const skillPrefixOptions = ['随机'].concat(skillPrefix)
const skillNumfixOptions = ['随机'].concat(skillNumfix)
const skillKindOptions = ['随机'].concat(skillKind)

// data
const number = ref(10)
const length = ref('随机')
const kind = ref('随机')
const prefix = ref('随机')
const numfix = ref('随机')

// use hook
const params = {
    number, length, kind, prefix, numfix
}
const { generateResult } = generator("skill", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="length" title="类别长度" type="string" :optionList="lengthValues" />
            <condition-item v-model:value="kind" title="类别" type="string" :optionList="skillKindOptions" />
        </div>
        <div class="name-condition">
            <condition-item v-model:value="prefix" title="前缀" type="string" :optionList="skillPrefixOptions" />
            <condition-item v-model:value="numfix" title="后缀" type="string" :optionList="skillNumfixOptions" />
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