<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { numberOptions, materialStrings, rarityOptions, talismanPostfixStrings, talismanStrings } from 'fantasy-names'

const talismanOptions = ["随机"].concat(talismanStrings)
const talismanPostfixOptions = ["随机"].concat(talismanPostfixStrings)

// data
const number = ref(10);
const kind = ref("随机");
const rarity = ref(null);
const postfix = ref("随机");

// use hook
const params = {
    kind, rarity, postfix, number
}
const { generateResult } = generator("talisman", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="kind" title="类别" type="string" :optionList="talismanOptions" />
            <condition-item v-model:value="rarity" title="等级" :optionList="rarityOptions" />
            <condition-item v-model:value="postfix" title="后缀" type="string" :optionList="talismanPostfixOptions" />
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