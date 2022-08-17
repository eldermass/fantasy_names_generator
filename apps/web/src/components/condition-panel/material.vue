<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { numberOptions, materialStrings, rarityOptions, materialPostfixStrings } from '@chenxuanyu/fantasy-names'

const materialPostfixOptions = ["随机"].concat(materialPostfixStrings)
const materialOptions = ["随机"].concat(materialStrings)

// data
const number = ref(10);
const kind = ref("随机");
const rarity = ref(null);
const postfix = ref("随机");

// use hook
const params = {
    kind, rarity, postfix, number
}
const { generateResult } = generator("material", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="kind" title="类别" type="string" :optionList="materialOptions" />
            <condition-item v-model:value="rarity" title="等级" :optionList="rarityOptions" />
            <condition-item v-model:value="postfix" title="后缀" type="string" :optionList="materialPostfixOptions" />
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