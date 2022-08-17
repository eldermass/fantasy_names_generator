<script setup lang="ts">
defineProps<{
    tabKey: string
}>()
</script>

<script lang="ts">
import Name from './name.vue'
import Dao from './dao.vue'
import Skill from './skill.vue'
import Book from './book.vue'
import Creature from './creature.vue'
import Material from './material.vue'
import Alchemy from './alchemy.vue'
import Talisman from './talisman.vue'
import Clan from './clan.vue'
import Nation from './nation.vue'
import Location from './location.vue'
import Zone from './zone.vue'

// 'name', 'dao', 'skill', 'book', 'creature', 'material', 'alchemy', 'talisman', 'clan', 'nation', 'location', 'zone'
export default {
    components: { Name, Dao, Skill, Book, Creature, Material, Alchemy, Talisman, Clan, Nation, Location, Zone }
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