<script setup lang="ts">
import { useResultStore } from '../../store/results'

const store = useResultStore()

</script>
<template>
    <scroll-view class="result-container" :scroll-y="true">
        <div class="result-item" v-for="(item, index) in store.results" :key="index">
            {{ typeof item === 'string' ? item : item.name }}
        </div>
    </scroll-view>
</template>
<style lang="scss">
.result-container {
    height: 750rpx;
    margin-top: 30rpx;
    display: flex;
    flex-wrap: wrap;
    .result-item {
        min-width: 150rpx;
        padding: 10rpx 20rpx;
        font-size: 18px;
        display: inline-block;
        font-weight: bold;
        color: #888;
        text-align: left;
    }
}
</style>