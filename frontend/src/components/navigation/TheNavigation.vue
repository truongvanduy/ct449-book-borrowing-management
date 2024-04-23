<script setup>
import { storeToRefs } from 'pinia'
import NavigationList from '@/components/navigation/NavigationList.vue'

import { onMounted, ref } from 'vue'
import { useMenuStore } from '@/stores/MenuStore'

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.role === 'admin') {
    navItems.value = [
      {
        name: 'Quản lý phiếu mượn',
        icon: 'home',
        urlName: 'admin.borrowings'
      },
      {
        name: 'Quản lý sách',
        icon: 'books',
        urlName: 'admin.books'
      },
      {
        name: 'Quản lý NXB',
        icon: 'apartment',
        urlName: 'admin.publishers'
      }
    ]
  }
})

const navItems = ref([
  {
    name: 'Trang chủ',
    icon: 'home',
    urlName: 'home'
  },
  {
    name: 'Thư viện',
    icon: 'books',
    urlName: 'books'
  },
  {
    name: 'Đang mượn',
    icon: 'dashboard',
    urlName: 'borrowings'
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
