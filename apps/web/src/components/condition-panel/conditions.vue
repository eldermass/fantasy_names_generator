<script setup lang="ts">
defineProps<{
    tabKey: string
}>()
</script>

<script lang="ts">
import Name from './name.vue'
import Dao from './dao.vue'

export default {
    components: { Name, Dao }
}
</script>

<template>
    <Transition name="slide-fade" mode="out-in">
        <component :is="tabKey || 'name'" />
    </Transition>
</template>

<style lang="scss">
.slide-fade-enter-active {
    transition: all 0.2s ease-in;
}

.slide-fade-leave-active {
    transition: all 0.2s ease-out;
}

.slide-fade-enter-from {
    transform: translateX(40px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(-40px);
    opacity: 0;
}
</style>