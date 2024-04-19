<script setup>
import { storeToRefs } from 'pinia'
import NavigationList from '@/components/navigation/NavigationList.vue'

import { ref } from 'vue'
import { useMenuStore } from '@/stores/MenuStore'

const navItems = ref([
  {
    name: 'Trang chủ',
    icon: 'home',
    url: '/'
  },
  {
    name: 'Thư viện',
    icon: 'books',
    url: '/books'
  },
  {
    name: 'Đang mượn',
    icon: 'dashboard',
    url: '/my-borrowings'
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
