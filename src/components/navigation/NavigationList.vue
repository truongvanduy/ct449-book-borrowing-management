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
  },
  expanded: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <md-list class="nav">
    <md-item v-if="title">
      <div slot="headline">{{ expanded ? title : '' }}</div>
    </md-item>
    <NavigationItem
      :expanded="expanded"
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
