<script setup lang="ts">
import { ref } from 'vue';
import ConditionItem from './condition-item.vue';
import generator from './generate-result'
import { numberOptions, location } from '@chenxuanyu/fantasy-names'


const locationOptions = ["随机"].concat(location)

// data
const number = ref(10)
const kind = ref("随机")

// use hook
const params = {
    kind, number
}
const { generateResult } = generator("location", params)

// methods


</script>
<template>
    <div>
        <div class="name-condition">
            <condition-item v-model:value="number" title="数量" :optionList="numberOptions" />
            <condition-item v-model:value="kind" title="类别" type="string" :optionList="locationOptions" />
        </div>
        <div class="name-condition">
            <button type="primary" size="large" @click="generateResult">生 成</button>
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