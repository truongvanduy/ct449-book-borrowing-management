<script setup>
import { computed, onMounted, ref } from 'vue'
import BookList from '@/components/cards/BookList.vue'
// import bookSource from '@/assets/json/philosophy.json'
// import bookSource from '@/assets/json/bussiness_and_economics.json'
// import bookSource from '@/assets/json/computers.json'
import ThePagination from '@/components/ThePagination.vue'

// let items = bookSource
const items = ref([])
const itemPerPage = ref(12)
const currentPage = ref(1)

const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * itemPerPage.value
  const end = start + itemPerPage.value
  return items.value.slice(start, end)
})

const handlePageChange = (page) => {
  currentPage.value = page
}

onMounted(async () => {
  const response = await fetch('http://localhost:3000/')
  items.value = await response.json()
})
</script>

<template>
  <h1 class="fs-2">Gợi ý cho bạn</h1>

  <ThePagination
    v-if="items.length"
    :itemCount="items.length"
    :itemPerPage="itemPerPage"
    @changePage="handlePageChange"
  >
    <BookList :book="displayedItems" />
  </ThePagination>
</template>
