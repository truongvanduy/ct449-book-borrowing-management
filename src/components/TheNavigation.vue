<script setup>
import NavigationList from './navigation/NavigationList.vue'

import { ref } from 'vue'

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
</script>

<template>
  <nav-drawer>
    <nav class="nav">
      <NavigationList
        title="Natalya"
        :haveSeparator="false"
        :items="navItems"
      >
      </NavigationList>
    </nav>
  </nav-drawer>
</template>
<style>
nav {
  max-height: calc(100vh - 72px);
  overflow-y: scroll;
}
</style>
