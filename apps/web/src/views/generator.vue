<script setup lang="ts">
import { ref } from 'vue'
import ConditionPanel from '@/components/condition-panel'
import ResultPanel from '@/components/result-panel'

// data
const key = ref<string>('name')
const title = "名词生成器"
const list = [
    { value: 'name', label: '人名' },
    { value: 'dao', label: '法号' },
    { value: 'skill', label: '功法' },
    { value: 'book', label: '秘籍' },
    { value: 'creature', label: '生灵' },
    { value: 'material', label: '材料' },
    { value: 'alchemy', label: '丹药' },
    { value: 'talisman', label: '法宝' },
    { value: 'clan', label: '门派' },
    { value: 'nation', label: '国家' },
    { value: 'location', label: '据点' },
    { value: 'zone', label: '地域' },
]
// watch

// methods

</script>

<template>
    <div class="generator">
        <h1>{{ title }}</h1>
        <a-radio-group v-model:value="key" size="large" style="margin-bottom: 16px;">
            <a-radio-button style="width: 100px;" :value="item.value" v-for="(item, index) in list"
                :key="index">
                {{ item.label }}
            </a-radio-button>
        </a-radio-group>
        <condition-panel :tab-key="key" />
        <result-panel />
    </div>
</template>

<style lang="scss" scoped>
.generator {
    text-align: center;
    h1 {
        font-weight: bold;
    }
}
</style>