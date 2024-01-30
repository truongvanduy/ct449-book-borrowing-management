<script setup>
import { storeToRefs } from 'pinia'
import NavigationList from './navigation/NavigationList.vue'

import { ref } from 'vue'
import { useMenuStore } from '@/stores/MenuStore'

const navItems = ref([
  {
    name: 'Dashboard',
    icon: 'dashboard',
    url: '/'
  },
  {
    name: 'Settings',
    icon: 'settings',
    url: '/settings'
  },
  {
    name: 'Users Management',
    icon: 'manage_accounts',
    url: '/users-management'
  }
])

const { isOpened } = storeToRefs(useMenuStore())
</script>

<template>
  <nav-drawer :class="{ open: isOpened }">
    <nav class="nav">
      <NavigationList
        title="Navigation"
        :haveSeparator="false"
        :items="navItems"
        :expanded="true"
      >
      </NavigationList>
    </nav>
  </nav-drawer>
</template>
<style lang="scss">
nav {
  max-height: calc(100vh - var(--header-height));
  overflow-y: scroll;
}
</style>
