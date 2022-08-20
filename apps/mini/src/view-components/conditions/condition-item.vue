<script setup lang="ts">
import { withDefaults, ref, onMounted } from 'vue'

// props
const props = withDefaults(
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

// onMounted(() => {
//     console.log(props.optionList)
// })

// emits
const emits = defineEmits(['update:value', 'change'])

// data
const index = ref<number>(0)

// methods
const handleChange = (e: { detail: { value: number } }) => {
    index.value = e.detail.value
    const value = props.type !== 'string' ? props.optionList[index.value].value : props.optionList[index.value]
    emits("update:value", value)
    emits("change", value)
}
</script>
<template>
    <div class="condition-item">
        <span class="title">{{ title }}: </span>
        <picker mode="selector" @change="handleChange" :value="index"
            :range-key="type !== 'string' ? 'text' : undefined" :range="optionList">
            <view class="uni-input">
                {{ type !== 'string' ? optionList[index].text : optionList[index] }}
            </view>
        </picker>
    </div>
</template>
<style lang="scss">
.condition-item {
    .title {
        font-weight: bold;
    }

    .uni-input {
        color: #cb5757;
        border: 1px solid salmon;
        border-radius: 4rpx;
    }
}
</style>