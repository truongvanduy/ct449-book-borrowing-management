<script setup>
import NavigationItem from './NavigationItem.vue'

defineProps({
  title: {
    type: String
  },
  haveSeparator: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <md-list
    class="nav"
    style="max-width: 300px"
  >
    <md-item v-if="title">
      <div slot="headline">{{ title }}</div>
    </md-item>
    <NavigationItem
      v-for="(item, index) in items"
      :key="index"
      :name="item.name"
      :icon="item.icon"
      :url="item.url"
    />
    <slot></slot>
    <md-divider
      v-if="haveSeparator"
      role="separator"
    />
  </md-list>
</template>
