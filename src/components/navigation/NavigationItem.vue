<script setup>
import { useMenuStore } from '@/stores/MenuStore'

defineProps({
  name: {
    type: String,
    required: true,
    default: 'Menu Item'
  },
  icon: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: '#'
  },
  expanded: {
    type: Boolean,
    default: true
  }
})

const menuStore = useMenuStore()
</script>

<template>
  <router-link
    :to="url"
    tabindex="-1"
    v-slot="{ isActive }"
    @click="menuStore.toggleMenu"
  >
    <md-list-item
      style="{{ !expanded ? 'width: fit-content' :'' }};"
      :selected="isActive ? 'selected' : undefined"
      interactive
      :href="url"
    >
      <md-icon
        v-if="icon !== '' && expanded"
        slot="start"
        >{{ icon }}</md-icon
      >
      <template v-if="expanded"> {{ name }} </template>
      <md-icon
        v-else
        slot="headline"
        >{{ icon }}</md-icon
      >
    </md-list-item>
  </router-link>
</template>
