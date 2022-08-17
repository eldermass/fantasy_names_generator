<script setup lang="ts">
import { ref } from 'vue'
import ConditionItem from './condition-item.vue'
import generator from './generate-result'
import { numberOptions, alchemy as alchemyKind } from 'fantasy-names'

const alchemyOptions = ["随机"].concat(alchemyKind)

// data
const number = ref(10)
const kind = ref("随机")

// use hook
const params = {
    kind, number
}
const { generateResult } = generator("alchemy", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="kind" type="string" title="类别" :optionList="alchemyOptions" />
        </div>
        <div class="name-condition">
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