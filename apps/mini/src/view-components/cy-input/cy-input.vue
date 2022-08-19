<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
    value?: string | null,
    label?: string
}>()

const emits = defineEmits(["update:value", "change"])

// data
const val = ref()

const handleInput = (e: any) => {
    console.log(e.target)
    emits("update:value", e.target.value)
    emits("change", e.target.value)
}
</script>

<template>
    <div class="cy-input">
        <view class="input-label">{{ label || "label" }}:</view>
        <input class="input-inner" :value="val" @input="handleInput" />
    </div>
</template>
<style scoped lang="scss">
.cy-input {
    box-sizing: border-box;
    display: flex;
    padding: 5rpx 10rpx;
    .input-label {
        white-space: nowrap;
    }
    .input-inner {
        margin-left: 20rpx;
        max-width: 400rpx;
        background: rgba(255, 255, 255, .4);
    }
}
</style>