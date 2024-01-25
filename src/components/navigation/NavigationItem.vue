<script setup>
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
  }
})
</script>

<template>
  <router-link
    :to="url"
    tabindex="-1"
    v-slot="{ isActive }"
  >
    <md-list-item
      :selected="isActive ? 'selected' : undefined"
      interactive
      :href="url"
    >
      <md-icon
        v-if="icon !== ''"
        slot="start"
        >{{ icon }}</md-icon
      >
      {{ name }}
    </md-list-item>
  </router-link>
</template>
