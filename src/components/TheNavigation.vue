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

const menuStore = useMenuStore()

const { isOpened } = storeToRefs(menuStore)
</script>

<template>
  <nav-drawer :class="isOpened ? 'open' : undefined">
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
  <div
    class="overlay"
    @click="menuStore.toggleMenu"
  ></div>
</template>
<style lang="scss">
nav {
  max-height: calc(100vh - var(--header-height));
  overflow-y: scroll;
}
</style>
