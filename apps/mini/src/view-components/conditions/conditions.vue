<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps<{
    tabKey: string
}>()

watch(() => props.tabKey, (key) => {
    console.log(key)
})
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
        <Name v-if="tabKey === 'name'" />
        <Dao v-else-if="tabKey === 'dao'" />
        <Skill v-else-if="tabKey === 'skill'" />
        <Book v-else-if="tabKey === 'book'" />
        <Creature v-else-if="tabKey === 'creature'" />
        <Material v-else-if="tabKey === 'material'" />
        <Alchemy v-else-if="tabKey === 'alchemy'" />
        <Talisman v-else-if="tabKey === 'talisman'" />
        <Clan v-else-if="tabKey === 'clan'" />
        <Nation v-else-if="tabKey === 'nation'" />
        <Location v-else-if="tabKey === 'location'" />
        <Zone v-else-if="tabKey === 'zone'" />
        <!-- <component :is="tabKey || 'name'" /> -->
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