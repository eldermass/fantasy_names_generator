<script setup lang="ts">
import { withDefaults, ref } from 'vue'

// props
withDefaults(
    defineProps<{
        title: string,
        type?: "string" | "object"
        value: any,
        optionList: readonly any[]
    }>(), {
    value: '',
    type: 'object',
    optionList: () => []
}
)

// emits
const emits = defineEmits(['update:value', 'change'])

// data
const value1 = ref()

// methods
const handleChange = (value: string) => {
    emits("update:value", value)
    emits("change", value)
}
</script>
<template>
    <div class="condition-item">
        <span class="title">{{ title }}: </span>
        <a-select v-model:value="value" style="width: 120px" @change="handleChange">
            <a-select-option v-for="(item, index) in optionList" :key="index"
                :value="type === 'string' ? item : item.value">
                {{ type === 'string' ? item : item.text }}
            </a-select-option>
        </a-select>
    </div>
</template>
<style lang="scss">
.condition-item {
    .title {
        font-weight: bold;
    }
}
</style>