<script setup lang="ts">
import { useResultStore } from '@/stores/results'

const store = useResultStore()

</script>
<template>
    <div class="result-container">
        <div class="result-item" v-for="(item, index) in store.results" :key="index">
            {{ typeof item === 'string' ? item : item.name }}
        </div>
    </div>
</template>
<style lang="scss">
.result-container {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    .result-item {
        min-width: 100px;
        padding: 10px 20px;
        font-size: 18px;
        display: inline-block;
        font-weight: bold;
        color: #888;
        text-align: left;
    }
}
</style>