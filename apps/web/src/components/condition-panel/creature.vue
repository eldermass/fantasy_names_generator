<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { numberOptions, creatureCategory, creatureCategoryNames, rarityNames, rarityLevels } from 'fantasy-names'

interface Item {
    value: string | null; 
    text: string;
}

const categoryOptions: Item[] = creatureCategory.map(item => ({
    value: item,
    text: creatureCategoryNames[item as keyof typeof creatureCategoryNames]
}))
categoryOptions.unshift({ value: null, text: "随机" })

const rarityOptions: Item[] = rarityLevels.map(item => ({
    value: item,
    text: rarityNames[item as keyof typeof rarityNames]
}))
rarityOptions.unshift({ value: null, text: "随机" })

// data
const number = ref(10);
const category = ref(null);
const rarity = ref(null);


// use hook
const params = {
    number, category, rarity
}
const { generateResult } = generator("creature", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="category" title="类别" :optionList="categoryOptions" />
            <condition-item v-model:value="rarity" title="等级" :optionList="rarityOptions" />
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