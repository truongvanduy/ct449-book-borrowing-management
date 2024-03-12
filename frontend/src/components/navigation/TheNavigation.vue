<script setup>
import { storeToRefs } from 'pinia'
import NavigationList from '@/components/navigation/NavigationList.vue'

import { ref } from 'vue'
import { useMenuStore } from '@/stores/MenuStore'

const navItems = ref([
  {
    name: 'Home',
    icon: 'home',
    url: '/'
  },
  {
    name: 'Books',
    icon: 'books',
    url: '/books'
  },
  {
    name: 'Dashboard',
    icon: 'dashboard',
    url: '/dashboard'
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

const { isOpened, isExpanded } = storeToRefs(menuStore)
</script>

<template>
  <nav-drawer
    :data-expanded="isExpanded"
    :class="isOpened ? 'open' : undefined"
  >
    <nav>
      <NavigationList
        :haveSeparator="false"
        :items="navItems"
      >
      </NavigationList>
    </nav>
  </nav-drawer>
  <div
    class="overlay"
    @click="menuStore.toggleMenu"
  ></div>
</template>
